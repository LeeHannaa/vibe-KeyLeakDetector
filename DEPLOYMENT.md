# 🚀 배포 가이드

## 📦 GitHub 리포지토리에 업로드하기

### 방법 1: Git CLI 사용 (권장)

1. **Git 설치 확인**
   ```bash
   git --version
   ```
   - Git이 설치되어 있지 않다면: https://git-scm.com/download/win 에서 다운로드

2. **리포지토리 초기화 및 커밋**
   ```bash
   git init
   git branch -M main
   git remote add origin https://github.com/LeeHannaa/vibe-KeyLeakDetector.git
   git add .
   git commit -m "Initial commit: API Key Leak Detector web app"
   git push -u origin main
   ```

### 방법 2: GitHub Desktop 사용

1. GitHub Desktop 다운로드: https://desktop.github.com/
2. GitHub Desktop에서 "Add" → "Add Existing Repository"
3. 프로젝트 폴더 선택
4. "Publish repository" 클릭
5. 리포지토리 이름: `vibe-KeyLeakDetector`
6. "Publish repository" 클릭

### 방법 3: GitHub 웹사이트에서 직접 업로드

1. https://github.com/LeeHannaa/vibe-KeyLeakDetector 로 이동
2. "uploading an existing file" 클릭
3. 프로젝트의 모든 파일을 드래그 앤 드롭
4. "Commit changes" 클릭

---

## ☁️ Vercel 배포 가이드

### 1단계: Vercel 계정 생성

1. https://vercel.com 접속
2. "Sign Up" 클릭
3. GitHub 계정으로 로그인 (권장)

### 2단계: 프로젝트 배포

#### 방법 A: Vercel Dashboard 사용 (가장 쉬움)

1. **Vercel Dashboard 접속**
   - https://vercel.com/dashboard

2. **새 프로젝트 추가**
   - "Add New..." → "Project" 클릭
   - GitHub 리포지토리에서 `vibe-KeyLeakDetector` 선택
   - "Import" 클릭

3. **프로젝트 설정**
   - **Framework Preset**: Vite (자동 감지됨)
   - **Root Directory**: `./` (기본값)
   - **Build Command**: `npm run build` (기본값)
   - **Output Directory**: `dist` (기본값)
   - **Install Command**: `npm install` (기본값)

4. **환경 변수 설정**
   - "Environment Variables" 섹션 클릭
   - 다음 변수 추가:
     ```
     Name: ANTHROPIC_API_KEY
     Value: sk-ant-your-actual-key-here
     ```
   - "Add" 클릭
   - **중요**: Production, Preview, Development 모두에 체크

5. **배포 시작**
   - "Deploy" 버튼 클릭
   - 배포가 완료되면 자동으로 URL이 생성됩니다!

#### 방법 B: Vercel CLI 사용

1. **Vercel CLI 설치**
   ```bash
   npm install -g vercel
   ```

2. **Vercel 로그인**
   ```bash
   vercel login
   ```

3. **프로젝트 배포**
   ```bash
   vercel
   ```
   - 프로젝트 설정 질문에 답변:
     - Set up and deploy? **Y**
     - Which scope? (기본값 선택)
     - Link to existing project? **N**
     - Project name? **vibe-KeyLeakDetector** (또는 기본값)
     - Directory? **./** (기본값)
     - Override settings? **N**

4. **환경 변수 설정**
   ```bash
   vercel env add ANTHROPIC_API_KEY
   ```
   - Value 입력: `sk-ant-your-actual-key-here`
   - Environment 선택: Production, Preview, Development 모두 선택

5. **프로덕션 배포**
   ```bash
   vercel --prod
   ```

---

## ⚙️ Vercel 설정 확인

### vercel.json 설정

프로젝트 루트의 `vercel.json` 파일이 올바르게 설정되어 있는지 확인:

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "functions": {
    "api/**/*.js": {
      "maxDuration": 30
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ]
}
```

### API Functions 경로

- API Functions는 `/api` 폴더에 있어야 합니다
- 현재 구조: `api/analyze.js` ✅

---

## 🔐 환경 변수 관리

### Vercel Dashboard에서 환경 변수 설정

1. 프로젝트 선택 → **Settings** → **Environment Variables**
2. 다음 변수 추가:

| Name | Value | Environments |
|------|-------|--------------|
| `ANTHROPIC_API_KEY` | `sk-ant-...` | Production, Preview, Development |

### 환경 변수 확인

배포 후 다음 명령어로 확인:
```bash
vercel env ls
```

---

## 🧪 배포 후 테스트

1. **배포된 URL 확인**
   - Vercel Dashboard에서 배포된 URL 확인
   - 예: `https://vibe-key-leak-detector.vercel.app`

2. **API 엔드포인트 테스트**
   - 브라우저에서 앱 접속
   - GitHub URL 입력하여 테스트

3. **API Function 테스트**
   ```bash
   curl -X POST https://your-app.vercel.app/api/analyze \
     -H "Content-Type: application/json" \
     -d '{"detectedKeys": [{"type": "Test", "value": "test123"}]}'
   ```

---

## 🔄 자동 배포 설정

### GitHub 연동 시 자동 배포

1. Vercel Dashboard에서 프로젝트 선택
2. **Settings** → **Git**
3. GitHub 리포지토리가 연결되어 있으면:
   - `main` 브랜치에 푸시할 때마다 자동 배포
   - Pull Request 생성 시 Preview 배포

### 배포 상태 확인

- Vercel Dashboard → **Deployments** 탭에서 모든 배포 내역 확인

---

## 🐛 문제 해결

### 빌드 실패

1. **로컬에서 빌드 테스트**
   ```bash
   npm run build
   ```

2. **의존성 문제**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Vercel 빌드 로그 확인**
   - Vercel Dashboard → Deployments → 실패한 배포 → Build Logs

### API Function 오류

1. **환경 변수 확인**
   - Vercel Dashboard → Settings → Environment Variables
   - `ANTHROPIC_API_KEY`가 올바르게 설정되었는지 확인

2. **로컬 테스트**
   ```bash
   vercel dev
   ```

3. **Function 로그 확인**
   - Vercel Dashboard → Deployments → Functions 탭

### CORS 오류

- `api/analyze.js`에 CORS 헤더가 올바르게 설정되어 있는지 확인

---

## 📊 배포 체크리스트

배포 전 확인 사항:

- [ ] 모든 파일이 GitHub에 푸시됨
- [ ] `.env` 파일이 `.gitignore`에 포함됨 (Git에 커밋되지 않음)
- [ ] `vercel.json` 설정이 올바름
- [ ] `ANTHROPIC_API_KEY` 환경 변수가 Vercel에 설정됨
- [ ] 로컬에서 `npm run build` 성공
- [ ] `api/analyze.js` 파일이 올바른 위치에 있음

---

## 🎉 배포 완료 후

배포가 완료되면:

1. **배포된 URL 공유**
   - 예: `https://vibe-key-leak-detector.vercel.app`

2. **커스텀 도메인 설정** (선택사항)
   - Vercel Dashboard → Settings → Domains
   - 원하는 도메인 추가

3. **모니터링 설정**
   - Vercel Dashboard → Analytics (Pro 플랜 필요)

---

## 📚 추가 리소스

- [Vercel 공식 문서](https://vercel.com/docs)
- [Vercel Serverless Functions 가이드](https://vercel.com/docs/functions)
- [Vite 배포 가이드](https://vitejs.dev/guide/static-deploy.html)

