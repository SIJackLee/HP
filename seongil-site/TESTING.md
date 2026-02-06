# 홈페이지 구동 테스팅 방법

성일기전 사이트는 **정적 웹사이트**(HTML + CSS + JavaScript)입니다. 아래 방법 중 하나로 로컬에서 실행해 보세요.

---

## 방법 1: 파일로 직접 열기 (가장 간단)

1. **파일 탐색기**에서 `seongil-site` 폴더로 이동합니다.
2. **index.html** 파일을 더블클릭합니다.
3. 기본 브라우저에서 홈페이지가 열립니다.

- **주의**: `file://` 경로로 열리므로, 일부 브라우저에서 스크립트·리소스 제한이 있을 수 있습니다. 문제가 있으면 방법 2를 사용하세요.

---

## 방법 2: 로컬 웹 서버로 실행 (권장)

로컬 서버를 띄우면 실제 배포 환경과 비슷하게 동작합니다.

### A. Python이 설치된 경우

**Python 3:**
```bash
cd seongil-site
python -m http.server 8080
```

**Python 2:**
```bash
cd seongil-site
python -m SimpleHTTPServer 8080
```

브라우저에서 **http://localhost:8080** 으로 접속합니다.

### B. Node.js가 설치된 경우

```bash
cd seongil-site
npx serve .
```

또는 (전역 설치 후):
```bash
npx serve seongil-site
```

표시되는 주소(예: http://localhost:3000)로 접속합니다.

### C. VS Code 사용 시

1. **Live Server** 확장 설치 (권장).
2. `index.html` 또는 아무 HTML 파일에서 우클릭 → **"Open with Live Server"** 선택.
3. 자동으로 브라우저가 열리며 변경 시 자동 새로고침됩니다.

---

## 방법 3: PowerShell에서 한 번에 실행 (Windows)

`seongil-site` 폴더에서:

```powershell
# Python 3로 서버 실행 후 브라우저 열기
Start-Process "http://localhost:8080"; python -m http.server 8080
```

---

## 확인할 페이지

| 페이지 | 파일 | 확인 내용 |
|--------|------|-----------|
| 홈 | index.html | 히어로, 회사 소개 미리보기, 제품 3개 |
| 회사소개 | about.html | 5대 핵심 가치, 연혁 타임라인 |
| 제품소개 | products.html | 제품 카드 6개, 이미지 3개 표시 |
| 자료실 | resources.html | 자료 목록 |
| A/S 문의 | support.html | 연락처, 문의 방법 |

---

## 문제 해결

- **이미지/로고가 안 보일 때**: `assets/logo/`, `assets/products/` 경로와 `content.js`의 `imageFileName`이 일치하는지 확인하세요.
- **페이지가 비어 보일 때**: 브라우저 개발자 도구(F12) → Console에서 JavaScript 오류를 확인하세요.
- **CSS가 적용되지 않을 때**: `style.css`와 HTML이 같은 폴더에 있는지, 로컬 서버로 실행 중인지 확인하세요.

---

## 요약

- **빠른 확인**: `index.html` 더블클릭 → 브라우저에서 열기  
- **안정적인 테스트**: `seongil-site` 폴더에서 `python -m http.server 8080` 실행 후 **http://localhost:8080** 접속
