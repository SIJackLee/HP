# Product Intro 섹션 치수 이미지 조합 방안

제품소개(Product Intro) 섹션에 `assets/images/dimensions/` 치수 도면 이미지를 넣는 **배치 방식**과 **구현 방식**을 정리했습니다.

---

## 1. 이미지–탭 매핑 (고정)

| 탭 | 표시 조건 | 이미지 파일 |
|----|-----------|-------------|
| 모터 | SLB-960 선택 시 치수 카드 표시 시 | SLB_A_Size.png (참고용) |
| 환기팬 | 치수 (A) 표시 시 | SLF_A_Size.png |
| 환기팬 | 치수 (D) 표시 시 | SLF_D_Size.png |
| 후드 | TYPE 선택 후 | SLH_Size.png |
| 셔터 | TYPE 선택 후 | SLS_Size.png |
| 인렛 | 항상 | INLET_Size.png |

**※ 방안 B 채택·구현됨.** 탭별 표시 조건 상세는 `docs/치수이미지_표시조건.md` 참고.

---

## 2. 조합 방안 (레이아웃)

### 방안 A: 도면 상단 + 카드 하단 (권장)

- **구성**: 치수/스펙 영역에서 **이미지 1장** → 그 아래 **치수 카드 그리드**.
- **장점**: 도면으로 위치 파악 후 숫자 확인 흐름이 자연스러움. 기존 카드 구조 유지.
- **적용 위치**:
  - 모터: `#motorDimCards` **앞**에 이미지 래퍼 추가.
  - 환기팬: `#fanDimCards` **앞**에 이미지( A타입 시 SLF_A_Size, D타입 시 SLF_D_Size, 둘 다 있으면 둘 다 또는 탭으로 구분).
  - 후드: `#hoodSpecCards` **앞**에 SLH_Size.png.
  - 셔터: `#shutterSpecCards` **앞**에 SLS_Size.png.
  - 인렛: `#inletSpecCards` **앞**에 INLET_Size.png.

```
[ 선택 영역 ]
[ 치수 도면 이미지 ]   ← 추가
[ 스펙/치수 카드 그리드 ]
```

---

### 방안 B: 2단 (좌 도면 / 우 카드)

- **구성**: 같은 행에 **왼쪽** 치수 도면, **오른쪽** 스펙 카드.
- **장점**: 도면과 수치를 나란히 비교하기 좋음.
- **단점**: 가로 공간 필요, 모바일에서는 세로 쌓기 필요.

```
[ 선택 영역 ]
[ 도면 이미지 ]  |  [ 스펙 카드 그리드 ]
```

- **적용**: 해당 탭 패널 안을 `display: grid; grid-template-columns: 1fr 1fr`(또는 비율 조정)로 감싼 뒤, 첫 번째 칸에 이미지, 두 번째 칸에 기존 카드 컨테이너 배치. 768px 이하에서 `grid-template-columns: 1fr`로 전환.

---

### 방안 C: 도면 접기/펼치기

- **구성**: "치수 도면 보기" 토글로 **이미지 블록만** 표시/숨김.
- **장점**: 도면이 필요할 때만 넓게 보여 줄 수 있음.
- **단점**: 클릭 한 번 더 필요.

---

## 3. 구현 방식 제안 (방안 A 기준)

### 3.1 이미지 경로 설정 (한 곳에서 관리)

**product-intro.js 상단**에 표시 가능 이미지 경로만 두고, 탭/타입에 따라 선택해서 사용합니다.

```javascript
// 치수 도면 이미지 경로 (assets/images/dimensions/ 파일명만)
var DIMENSION_IMAGES = {
  motor: 'SLB_A_Size.png',
  fanA: 'SLF_A_Size.png',
  fanD: 'SLF_D_Size.png',
  hood: 'SLH_Size.png',
  shutter: 'SLS_Size.png',
  inlet: 'INLET_Size.png'
};
var DIM_IMG_BASE = 'assets/images/dimensions/';
```

### 3.2 DOM 구조 (이미지 삽입 위치)

- **모터**: `#motorDimCards`가 비어 있지 않을 때만, 그 **앞**에 `<div class="product-intro-dim-image-wrap">` + `<img>` 삽입.
- **환기팬**: `#fanDimCards` 앞에 래퍼 추가. 내부에 A타입이면 `fanA`, D타입이면 `fanD` 이미지 표시. A·D 동시 표시 시 두 이미지를 세로로 배치하거나 한 줄에 나란히.
- **후드**: `#hoodSpecCards` 앞에 후드 이미지 1장.
- **셔터**: `#shutterSpecCards` 앞에 셔터 이미지 1장.
- **인렛**: `#inletSpecCards` 앞에 인렛 이미지 1장.

HTML을 바꾸지 않고 **JS에서** 해당 컨테이너의 `insertBefore` 또는 `parentNode.insertBefore`로 이미지 래퍼를 넣어도 됩니다.

### 3.3 로직 요약

1. **초기 로드**: 각 탭 패널에 "치수 도면용 빈 래퍼"를 두거나, 첫 렌더 시 한 번만 생성.
2. **탭/선택 변경 시**:
   - 모터: SLB-960이면 `motorDimCards` 앞에 `SLB_A_Size.png` 노출, 아니면 이미지 숨김 또는 제거.
   - 환기팬: `fanDimCards` 갱신 시 baseType이 A면 `SLF_A_Size.png`, D면 `SLF_D_Size.png` 표시(둘 다면 두 장).
   - 후드/셔터/인렛: 해당 패널 활성화 시 해당 이미지 1장 표시.
3. **이미지 태그**: `<img src="..." alt="치수 도면" class="product-intro-dim-image" loading="lazy">` 사용.

### 3.4 CSS 제안

```css
.product-intro-dim-image-wrap {
  margin-bottom: 1.25rem;
}
.product-intro-dim-image {
  max-width: 100%;
  height: auto;
  display: block;
  border-radius: var(--radius);
  border: 1px solid var(--border);
}
```

---

## 4. 적용 순서 (체크리스트)

1. [ ] **product-intro.js**: `DIMENSION_IMAGES`(및 `DIM_IMG_BASE`) 추가.
2. [ ] **product-intro.js**: `updateMotorPanel`에서 SLB960 치수 표시 시 `#motorDimCards` 앞에 모터 도면 삽입/표시.
3. [ ] **product-intro.js**: `updateFanPanel`에서 `#fanDimCards` 앞에 A/D 도면 삽입/표시.
4. [ ] **product-intro.js**: `updateHoodPanel`에서 `#hoodSpecCards` 앞에 후드 도면 삽입.
5. [ ] **product-intro.js**: `updateShutterPanel`에서 `#shutterSpecCards` 앞에 셔터 도면 삽입.
6. [ ] **product-intro.js**: `updateInletPanel`에서 `#inletSpecCards` 앞에 인렛 도면 삽입.
7. [ ] **style.css**: `.product-intro-dim-image-wrap`, `.product-intro-dim-image` 추가.
8. [ ] (선택) 모바일에서 2단일 때 이미지–카드 세로 배치 확인.

---

## 5. 요약

- **조합 방식**: 방안 A(도면 상단 + 카드 하단)를 기본으로 하면, 현재 Product Intro 구조를 최소로 건드리면서 치수 이미지를 붙일 수 있습니다.
- **이미지 선택**: 탭·타입별로 위 표의 파일명을 사용하고, 경로는 `assets/images/dimensions/` 한 곳에서만 관리합니다.
- **표시 조건**: 치수 카드가 실제로 그려질 때만 해당 도면을 보여 주면 됩니다(모터는 SLB-960일 때, 환기팬은 A/D 매칭 시, 후드/셔터/인렛은 탭 진입 시).

원하시면 방안 A 기준으로 `product-intro.js`·`products.html`·`style.css` 수정 예시를 단계별로 작성해 드리겠습니다.
