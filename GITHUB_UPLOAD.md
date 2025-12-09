# 📤 GitHub 리포지토리 업로드 가이드

현재 시스템에 Git이 설치되어 있지 않아 자동 업로드가 불가능합니다. 다음 방법 중 하나를 선택하여 GitHub에 업로드하세요.

## 방법 1: GitHub Desktop 사용 (가장 쉬움) ⭐

### 1단계: GitHub Desktop 설치
- https://desktop.github.com/ 에서 다운로드 및 설치

### 2단계: 리포지토리 연결
1. GitHub Desktop 실행
2. **File** → **Add Local Repository**
3. 프로젝트 폴더 선택: `C:\Users\GKN\Desktop\gkn-001`
4. "This is a Git repository" 선택 (없으면 "create a repository" 클릭)

### 3단계: GitHub에 푸시
1. 왼쪽 하단에 변경사항 확인
2. **Summary**에 커밋 메시지 입력: `Initial commit: API Key Leak Detector`
3. **Commit to main** 클릭
4. **Publish repository** 클릭
5. Repository name: `vibe-KeyLeakDetector`
6. **Publish repository** 클릭

---

## 방법 2: Git CLI 설치 후 사용

### 1단계: Git 설치
- https://git-scm.com/download/win 에서 다운로드 및 설치
- 설치 후 PowerShell 재시작

### 2단계: 리포지토리 초기화
```bash
cd C:\Users\GKN\Desktop\gkn-001
git init
git branch -M main
git remote add origin https://github.com/LeeHannaa/vibe-KeyLeakDetector.git
```

### 3단계: 파일 커밋 및 푸시
```bash
git add .
git commit -m "Initial commit: API Key Leak Detector web app"
git push -u origin main
```

**인증 필요 시:**
- GitHub Personal Access Token 사용
- 또는 GitHub Desktop에서 인증 후 CLI 사용

---

## 방법 3: GitHub 웹사이트에서 직접 업로드

### 1단계: 리포지토리 준비
1. https://github.com/LeeHannaa/vibe-KeyLeakDetector 접속
2. 리포지토리가 비어있는지 확인

### 2단계: 파일 업로드
1. **"uploading an existing file"** 링크 클릭
2. 또는 **"Add file"** → **"Upload files"** 클릭

### 3단계: 파일 선택
다음 파일들을 드래그 앤 드롭:
- `package.json`
- `vite.config.js`
- `vercel.json`
- `index.html`
- `.gitignore`
- `README.md`
- `DEPLOYMENT.md`
- `src/` 폴더 전체
- `api/` 폴더 전체

**주의:** 다음은 업로드하지 마세요:
- `node_modules/` (너무 큼)
- `dist/` (빌드 결과물, 필요 없음)
- `.env` (보안상 위험)

### 4단계: 커밋
1. 커밋 메시지 입력: `Initial commit: API Key Leak Detector`
2. **"Commit changes"** 클릭

---

## 📋 업로드할 파일 목록

다음 파일들이 GitHub에 있어야 합니다:

```
✅ package.json
✅ vite.config.js
✅ vercel.json
✅ index.html
✅ .gitignore
✅ README.md
✅ DEPLOYMENT.md
✅ GITHUB_UPLOAD.md
✅ src/
   ✅ App.jsx
   ✅ main.jsx
   ✅ components/
   ✅ utils/
   ✅ styles/
✅ api/
   ✅ analyze.js
```

**업로드하지 않을 파일:**
- ❌ `node_modules/` (`.gitignore`에 포함)
- ❌ `dist/` (빌드 결과물)
- ❌ `.env` (보안상 위험)
- ❌ `.vercel/` (로컬 설정)

---

## ✅ 업로드 확인

업로드 후 다음을 확인하세요:

1. GitHub 리포지토리에서 모든 파일이 보이는지 확인
2. `package.json`이 올바른지 확인
3. `api/analyze.js` 파일이 있는지 확인
4. `.gitignore`에 `.env`가 포함되어 있는지 확인

---

## 🚀 다음 단계

GitHub에 업로드가 완료되면:

1. **Vercel 배포 진행**
   - `DEPLOYMENT.md` 파일 참고
   - Vercel Dashboard에서 GitHub 리포지토리 연결

2. **환경 변수 설정**
   - Vercel Dashboard → Settings → Environment Variables
   - `ANTHROPIC_API_KEY` 추가

3. **배포 완료!**
   - 자동으로 배포 URL 생성됨

