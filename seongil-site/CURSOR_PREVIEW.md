# Cursor 창에서 브라우저로 확인하며 수정하는 방법

Cursor(또는 VS Code) 안에서 브라우저 미리보기를 보면서 수정하는 workflow 정리입니다.

---

## 방법 1: Live Server + Cursor 분할 화면 (가장 추천)

저장할 때마다 브라우저가 자동으로 새로고침됩니다.

### 1단계: Live Server 확장 설치
1. Cursor 왼쪽 **확장(Extensions)** 아이콘 클릭 (또는 `Ctrl+Shift+X`).
2. 검색창에 **"Live Server"** 입력.
3. **Live Server** (작성자: Ritwick Dey) 설치.

### 2단계: 서버 실행
1. `seongil-site` 폴더에서 **index.html** 열기.
2. 에디터 영역에서 **우클릭** → **"Open with Live Server"** 선택.
3. 기본 브라우저가 열리고 `http://127.0.0.1:5500` (또는 비슷한 주소)로 접속됩니다.

### 3단계: Cursor와 브라우저 나란히 보기
- **Windows**: Cursor 창을 반쪽만 쓰고, 다른 반쪽에 브라우저 창을 붙여서 배치.
- 또는 **Alt+Tab**으로 Cursor ↔ 브라우저 전환하면서 수정 → 저장 → 브라우저에서 자동 새로고침 확인.

### 4단계: 수정 workflow
1. Cursor에서 **content.js**, **style.css**, **index.html** 등 수정.
2. **Ctrl+S**로 저장.
3. 브라우저가 **자동 새로고침**되면 결과 확인.
4. 필요하면 1~3 반복.

---

## 방법 2: Cursor 내장 Simple Browser 사용

Cursor 안에서만 브라우저 탭처럼 보려면 이 방법을 쓰세요.

### 1단계: 로컬 서버 실행 (터미널)
1. **터미널 열기**: `` Ctrl+` `` 또는 메뉴 **Terminal → New Terminal**.
2. 아래 명령 실행 (Python 3 기준):

```powershell
cd seongil-site
python -m http.server 8080
```

3. 서버가 떠 있는 상태로 두세요.

### 2단계: Simple Browser로 열기
1. **Ctrl+Shift+P** (명령 팔레트) → **"Simple Browser: Show"** 입력 후 실행.
2. URL 입력 창에 **http://localhost:8080** 입력 후 Enter.
3. Cursor 오른쪽이나 새 패널에 브라우저 뷰가 열립니다.

### 3단계: 수정 후 확인
- Simple Browser는 **자동 새로고침이 없습니다**.
- 수정 후 **Simple Browser 패널 안에서 새로고침 버튼** 클릭하거나, 해당 뷰에 포커스 두고 **F5**로 새로고침.

### 레이아웃 팁
- Simple Browser 패널을 **에디터 오른쪽**으로 드래그해 두면 코드와 미리보기를 나란히 볼 수 있습니다.
- **View → Appearance → Panel Position → Right** 로 패널을 오른쪽에 고정할 수 있습니다.

---

## 방법 3: 터미널 서버 + 외부 브라우저

Cursor는 코드만 보고, 브라우저는 Chrome/Edge 등으로 따로 띄우는 방식입니다.

1. **터미널**에서:
   ```powershell
   cd seongil-site
   python -m http.server 8080
   ```
2. **브라우저**에서 **http://localhost:8080** 접속.
3. Cursor에서 수정 → 저장 후, 브라우저에서 **F5**로 새로고침.

- Live Server를 쓰면 3번의 수동 새로고침이 자동으로 대체됩니다.

---

## 요약

| 방법 | 자동 새로고침 | Cursor 안에서 보기 | 준비 |
|------|----------------|--------------------|------|
| **Live Server + 분할 화면** | ✅ | ❌ (별도 창) | Live Server 확장 |
| **Simple Browser** | ❌ (F5로 수동) | ✅ | 로컬 서버 실행 |
| **터미널 서버 + 브라우저** | ❌ (F5로 수동) | ❌ | 로컬 서버 실행 |

**추천**: **Live Server** 설치 후 `index.html`에서 "Open with Live Server"로 띄우고, Cursor와 브라우저 창을 나란히 두고 수정 → 저장 시마다 자동 새로고침으로 확인하는 방식이 가장 편합니다.
