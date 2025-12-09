// api/analyze.js - Vercel Serverless Function
// 이 파일은 프로젝트 루트의 /api 폴더에 저장하세요

export default async function handler(req, res) {
  // CORS 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { detectedKeys } = req.body;

    if (!detectedKeys || !Array.isArray(detectedKeys) || detectedKeys.length === 0) {
      return res.status(400).json({ error: 'No keys provided' });
    }

    // Anthropic API 호출
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY, // Vercel 환경변수
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: `다음 API 키들이 코드에서 발견되었습니다. 각 키에 대해 JSON 형식으로 분석해주세요:

키 목록:
${detectedKeys.map((k, i) => `${i + 1}. ${k.type}: ${k.value.substring(0, 20)}...`).join('\n')}

다음 형식의 JSON 배열로 답변해주세요:
[
  {
    "type": "키 타입",
    "level": "high|medium|low",
    "risks": "구체적인 위험 설명",
    "actions": ["조치1", "조치2", "조치3"]
  }
]

Markdown이나 추가 설명 없이 JSON만 반환하세요.`
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', errorText);
      throw new Error('LLM API 호출 실패');
    }

    const data = await response.json();
    const content = data.content[0].text.trim();
    
    // JSON 파싱
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('JSON 파싱 실패');
    }
    
    const analysis = JSON.parse(jsonMatch[0]);

    // 원본 키 정보와 LLM 분석 결합
    const enrichedResults = detectedKeys.map((key, idx) => ({
      ...key,
      ...(analysis[idx] || {
        level: 'medium',
        risks: '보안 위험이 있을 수 있습니다',
        actions: ['즉시 키를 폐기하세요', '새 키를 생성하세요']
      })
    }));

    return res.status(200).json({ results: enrichedResults });
  } catch (error) {
    console.error('Analysis error:', error);
    return res.status(500).json({ 
      error: '분석 중 오류가 발생했습니다',
      details: error.message 
    });
  }
}

