import React, { useState } from 'react';
import UrlInput from './components/UrlInput';
import AnalysisButton from './components/AnalysisButton';
import ResultCard from './components/ResultCard';
import { KEY_PATTERNS, getSecurityLevel, getRiskDescription, getActionSteps } from './utils/keyPatterns';

function App() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  // GitHub URL을 Raw URL로 변환
  const convertToRawUrl = (githubUrl) => {
    // 이미 Raw URL인 경우
    if (githubUrl.includes('raw.githubusercontent.com')) {
      return githubUrl;
    }
    
    // .git으로 끝나는 리포지토리 URL인 경우 에러
    if (githubUrl.endsWith('.git') || githubUrl.includes('.git/')) {
      throw new Error('리포지토리 URL이 아닌 파일 URL을 입력해주세요.\n예: https://github.com/username/repo/blob/main/file.js');
    }
    
    // GitHub 파일 URL을 Raw URL로 변환
    // 형식: https://github.com/owner/repo/blob/branch/path/to/file
    const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)\/blob\/([^\/]+)\/(.+)/);
    if (match) {
      const [, owner, repo, branch, path] = match;
      return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
    }
    
    // 매칭되지 않는 경우 에러
    throw new Error('올바른 GitHub 파일 URL 형식이 아닙니다.\n예: https://github.com/username/repo/blob/main/file.js\n또는: https://raw.githubusercontent.com/username/repo/branch/file.js');
  };

  // 파일 내용에서 API 키 검색
  const detectApiKeys = (content) => {
    const detectedKeys = [];
    
    KEY_PATTERNS.forEach(({ type, pattern }) => {
      const matches = content.matchAll(pattern);
      for (const match of matches) {
        const value = match[1] || match[0];
        const lineNumber = content.substring(0, match.index).split('\n').length;
        
        detectedKeys.push({
          type,
          value: value.trim(),
          line: lineNumber,
          index: match.index
        });
      }
    });
    
    return detectedKeys;
  };

  // LLM을 통한 보안 분석
  const analyzeWithLLM = async (detectedKeys) => {
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ detectedKeys })
      });

      if (!response.ok) {
        throw new Error('분석 API 호출 실패');
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('LLM 분석 오류:', error);
      // 폴백: 기본 분석 제공
      return detectedKeys.map(key => ({
        ...key,
        level: getSecurityLevel(key.type),
        risks: getRiskDescription(key.type),
        actions: getActionSteps(key.type)
      }));
    }
  };

  // 분석 시작
  const handleAnalyze = async () => {
    if (!url.trim()) {
      setError('URL을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      // Raw URL로 변환 (에러 발생 가능)
      let rawUrl;
      try {
        rawUrl = convertToRawUrl(url.trim());
      } catch (urlError) {
        setError(urlError.message);
        setIsLoading(false);
        return;
      }
      
      // 파일 내용 가져오기
      const response = await fetch(rawUrl);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('파일을 찾을 수 없습니다. URL과 파일 경로를 확인해주세요.');
        } else if (response.status === 403) {
          throw new Error('파일 접근이 거부되었습니다. Private 리포지토리일 수 있습니다.');
        }
        throw new Error(`파일을 가져올 수 없습니다. (상태 코드: ${response.status})`);
      }

      const content = await response.text();
      
      // API 키 검색
      const detectedKeys = detectApiKeys(content);
      
      if (detectedKeys.length === 0) {
        setResults([]);
        setError('API 키가 발견되지 않았습니다. ✅');
        setIsLoading(false);
        return;
      }

      // LLM 분석
      const analyzedResults = await analyzeWithLLM(detectedKeys);
      setResults(analyzedResults);
      
    } catch (err) {
      setError(err.message || '분석 중 오류가 발생했습니다.');
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔐 API Key Leak Detector</h1>
        <p className="subtitle">GitHub 레포지토리에서 API 키 유출을 탐지합니다</p>
      </header>

      <main className="app-main">
        <div className="input-section">
          <UrlInput url={url} setUrl={setUrl} isLoading={isLoading} />
          <AnalysisButton
            onClick={handleAnalyze}
            isLoading={isLoading}
            disabled={!url.trim()}
          />
        </div>

        {error && (
          <div className={`error-message ${error.includes('✅') ? 'success' : ''}`}>
            {error}
          </div>
        )}

        {results.length > 0 && (
          <div className="results-section">
            <h2 className="results-title">
              발견된 API 키: {results.length}개
            </h2>
            <div className="results-grid">
              {results.map((result, idx) => (
                <ResultCard key={idx} result={result} />
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>
          ⚠️ 이 도구는 보안 검토 목적으로만 사용하세요. 발견된 키는 즉시 폐기하세요.
        </p>
      </footer>
    </div>
  );
}

export default App;

