@echo off
echo ========================================
echo Git 리포지토리 설정 스크립트
echo ========================================
echo.

REM Git 경로 설정
set GIT="C:\Program Files\Git\bin\git.exe"

echo [1/6] Git 사용자 정보 확인...
%GIT% config --global user.name
%GIT% config --global user.email
echo.

echo [2/6] 리포지토리 초기화...
%GIT% init
echo.

echo [3/6] 브랜치를 main으로 설정...
%GIT% branch -M main
echo.

echo [4/6] 원격 리포지토리 연결...
%GIT% remote add origin https://github.com/LeeHannaa/vibe-KeyLeakDetector.git
echo.

echo [5/6] 파일 추가...
%GIT% add .
echo.

echo [6/6] 커밋 생성...
%GIT% commit -m "Initial commit: API Key Leak Detector web app"
echo.

echo ========================================
echo 설정 완료!
echo ========================================
echo.
echo 다음 단계: GitHub에 푸시하기
echo %GIT% push -u origin main
echo.
pause

