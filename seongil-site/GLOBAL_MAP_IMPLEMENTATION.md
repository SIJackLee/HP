# 글로벌 네트워크 – 지도 이미지 적용 방향

## 1. 적용 방향 요약

- **데이터**: `content.js`의 `about` 객체에 지도 이미지 **파일명**만 추가한다.
- **표시**: 제목·설명 **아래**, 국가 칩 **위**에 지도 이미지를 넣는다. (선택: 칩 아래 배치도 가능)
- **로직**: `app.js`에서 파일명이 있으면 `<img>`를 삽입, 없으면 기존처럼 국가 칩만 표시한다.
- **스타일**: `style.css`에서 지도 영역만 정리한다.

---

## 2. 배치 순서 (권장)

```
[글로벌 네트워크]
  제목 (globalNetworkTitle)
  부제 (globalNetworkDescription)
  ─────────────────────
  지도 이미지 (신규)     ← 여기에 삽입
  ─────────────────────
  국가 칩 목록 (globalCountriesList)
```

- 지도를 **위**에 두면 시선이 지도 → 국가 목록 순으로 흐른다.

---

## 3. 파일별 작업

### 3.1 이미지 파일 위치

- **폴더**: `seongil-site/assets/images/`
- **파일명 예**: `global-map.jpg` (또는 `global-map.png`)
- **권장 사이즈**: 1200×600px (2:1), 용량 200KB 이하

(폴더가 없으면 생성 후 이미지 저장.)

---

### 3.2 content.js

- **about** 객체에 지도 이미지 **파일명** 필드 추가.
- 디자인팀이 이미지 교체 시 **파일만 갈아끼우고 여기 파일명만 수정**하면 되도록 한다.

```javascript
// about 객체 안에 추가
globalNetworkTitle: "글로벌 네트워크",
globalNetworkDescription: "성일기전의 제품은 전 세계 다양한 국가에서 신뢰받고 있습니다.",
globalMapImageFileName: null,  // 예: "global-map.jpg" 로 설정 시 지도 표시
globalCountries: ["한국", "일본", ...],
```

- `null` → 지도 미표시, 문자열(예: `"global-map.jpg"`) → 지도 표시.

---

### 3.3 about.html

- 글로벌 네트워크 섹션에서 **설명문 아래·국가 칩 위**에 지도를 넣을 **빈 컨테이너** 하나 추가.

```html
<!-- 글로벌 네트워크 -->
<section class="section section-compact">
  <div class="container">
    <h2 class="section-title" id="globalNetworkTitle"></h2>
    <p class="section-subtitle" id="globalNetworkDescription"></p>
    <div id="globalNetworkMapWrap" class="global-network-map-wrap">
      <!-- app.js에서 지도 이미지 주입 (파일명 있을 때만) -->
    </div>
    <div class="countries-chip-container" id="globalCountriesList">
      <!-- 기존대로 -->
    </div>
  </div>
</section>
```

- `#globalNetworkMapWrap`: 지도 `<img>`가 들어갈 곳.
- 지도 없을 때는 이 영역만 비워 두면 되므로, 레이아웃/여백은 CSS로 처리.

---

### 3.4 app.js (injectAboutPage)

- **글로벌 네트워크** 블록 안에서, 국가 칩 그리기 **앞**에 다음을 추가한다.

1. `CONTENT.about.globalMapImageFileName` 읽기.
2. 값이 있으면:  
   - `#globalNetworkMapWrap` 찾아서  
   - `<img src="assets/images/파일명" alt="글로벌 네트워크 지도" class="global-network-map">` 생성 후  
   - 해당 요소에 `appendChild` 또는 `innerHTML`로 넣기.
3. 값이 `null`/없으면: `#globalNetworkMapWrap`은 비워 두거나 건드리지 않기.

- 이미지 경로: `assets/images/` + `encodeURIComponent(파일명)` (한글 파일명 대비).

---

### 3.5 style.css

- **.global-network-map-wrap**: 지도 블록의 여백·정렬만 지정.
  - 예: `margin: 1.5rem 0; text-align: center;`
- **.global-network-map**: 이미지 크기·비율.
  - 예: `max-width: 100%; width: 100%; height: auto; border-radius: var(--radius); display: block;`
- 필요 시 `box-shadow` 등으로 카드 느낌만 살리면 됨.

---

## 4. 적용 순서 (작업 시)

| 순서 | 작업 | 파일 |
|------|------|------|
| 1 | `assets/images/` 폴더 생성 후 지도 이미지 저장 (예: global-map.jpg) | - |
| 2 | about 객체에 `globalMapImageFileName` 추가 | content.js |
| 3 | 글로벌 네트워크에 `#globalNetworkMapWrap` 컨테이너 추가 | about.html |
| 4 | 지도 이미지 주입 로직 추가 (파일명 있을 때만 img 삽입) | app.js |
| 5 | .global-network-map-wrap, .global-network-map 스타일 추가 | style.css |
| 6 | content.js에서 `globalMapImageFileName: "global-map.jpg"` 로 설정 후 확인 | content.js |

---

## 5. 선택 사항

- **지도를 국가 칩 아래에 배치**: HTML에서 `#globalNetworkMapWrap`을 `#globalCountriesList` 아래로 옮기면 된다.
- **캡션**: 지도 아래에 짧은 문구가 필요하면 `content.js`에 `globalMapCaption` 같은 필드를 추가하고, app.js에서 지도 아래에 `<p>`로 출력하면 된다.
- **링크**: 지도를 클릭 시 큰 지도/외부 맵으로 넘기려면, app.js에서 `<a>`로 감싸고 `content.js`에 URL 필드를 두면 된다.

이 방향대로 적용하면 글로벌 네트워크 섹션에 지도 이미지를 깔끔하게 넣을 수 있다.
