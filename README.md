# 🔐 API Key Leak Detector

GitHub 레포지토리에서 API 키 유출을 탐지하는 웹 애플리케이션입니다.

## 🚀 기능

- GitHub 레포지토리 파일에서 API 키 자동 탐지
- 20+ 종류의 API 키 패턴 지원 (AWS, GitHub, Stripe, Google 등)
- Claude AI를 활용한 보안 위험 분석
- 위험도 레벨 분류 (High/Medium/Low)
- 구체적인 조치 사항 제공

## 📋 기술 스택

- **Frontend**: React + Vite
- **Backend**: Vercel Serverless Functions
- **AI**: Anthropic Claude API
- **Deployment**: Vercel

## 🛠️ 설치 및 실행

### 1. 프로젝트 클론 및 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env` 파일을 생성하고 다음 변수를 설정하세요:

```env
ANTHROPIC_API_KEY=sk-ant-your-key-here
GITHUB_TOKEN=ghp_your_token_here  # 선택사항
```

### 3. 개발 서버 실행

```bash
npm run dev
```

### 4. Vercel Functions 로컬 테스트

```bash
npm install -g vercel
vercel dev
```

## 📦 배포

### Vercel 배포

1. **Vercel CLI 설치** (처음 한 번만)
   ```bash
   npm install -g vercel
   ```

2. **Vercel 로그인**
   ```bash
   vercel login
   ```

3. **프로젝트 초기화**
   ```bash
   vercel
   ```

4. **환경 변수 설정**
   - Vercel Dashboard 접속
   - 프로젝트 선택 → Settings → Environment Variables
   - `ANTHROPIC_API_KEY` 추가

5. **프로덕션 배포**
   ```bash
   vercel --prod
   ```

## 🔑 지원하는 API 키 타입

- AWS Access Key / Secret Key
- GitHub Token (Personal Access Token, OAuth)
- Google API Key / OAuth Client ID
- Stripe API Key (Live/Test/Publishable)
- Slack Token
- Twitter API Key
- Facebook Access Token
- Heroku API Key
- MongoDB / PostgreSQL / Redis Connection String
- SendGrid / Twilio / Mailgun API Key
- JWT Token
- Generic API Key Pattern

## 📖 사용 방법

1. GitHub 레포지토리의 파일 URL 또는 Raw 파일 URL을 입력
2. "🔍 API 키 검사 시작" 버튼 클릭
3. 발견된 API 키와 위험 분석 결과 확인
4. 제공된 조치 사항에 따라 즉시 키를 폐기하고 새 키 생성

## ⚠️ 보안 주의사항

- **API 키는 절대 프론트엔드에 노출하지 마세요**
  - Vercel Functions에서만 처리
  - 환경 변수로 관리

- **.env 파일은 Git에 커밋하지 마세요**
  - `.gitignore`에 반드시 추가되어 있습니다

- **Rate Limiting 고려**
  - GitHub API: 시간당 60회 (인증 없을 때)
  - Anthropic API: 계정 플랜에 따라 다름

## 🧪 테스트용 샘플 URL

```
https://raw.githubusercontent.com/hwchase17/langchain/master/.env.example
https://github.com/public-apis/public-apis/blob/master/README.md
```

## 📚 프로젝트 구조

```
api-key-detector/
├── src/
│   ├── App.jsx              # 메인 컴포넌트
│   ├── components/
│   │   ├── UrlInput.jsx     # URL 입력 컴포넌트
│   │   ├── AnalysisButton.jsx
│   │   └── ResultCard.jsx   # 결과 표시 카드
│   ├── utils/
│   │   └── keyPatterns.js   # API 키 정규식 패턴
│   └── styles/
│       └── App.css
├── api/
│   └── analyze.js           # Vercel Serverless Function
├── vercel.json              # Vercel 설정
└── package.json
```
