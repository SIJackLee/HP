# 월드맵(글로벌 네트워크 지도) 테두리 그림자 제거 계획

## 1. 현재 상태
- **선택자**: `.global-network-map` (이미지에 적용)
- **적용 스타일**: `box-shadow: var(--shadow);` → 카드형 그림자가 테두리 주변에 있음

## 2. 목표
- 월드맵 이미지에 **그림자를 주지 않음** → 지도가 평면적으로 보이도록

## 3. 방법

### 방법 A: 그림자만 제거 (권장)
- **파일**: `style.css`
- **수정**: `.global-network-map` 에서 `box-shadow: var(--shadow);` 를 **`box-shadow: none;`** 으로 변경
- **효과**: 지도만 그림자 없이 표시, `border-radius` 등 나머지 스타일 유지

### 방법 B: 그림자 + 모서리 둥글기 제거
- `.global-network-map` 에서 `box-shadow: none;` 과 **`border-radius: 0;`** 적용
- **효과**: 완전한 직사각형 지도, 가장 평면적인 느낌

### 방법 C: 래퍼에만 스타일, 이미지는 비침
- `.global-network-map-wrap` 에는 그림자/테두리 없이 둠
- `.global-network-map` 에서 `box-shadow: none` 적용 (이미지 자체에는 장식 없음)
- 필요 시 나중에 래퍼에만 얇은 border 등 적용 가능

## 4. 권장 적용
- **방법 A** 적용: `box-shadow: none;` 만 추가하여 그림자 제거.

## 5. 수정 위치 (style.css)
```css
.global-network-map {
  max-width: 100%;
  width: 100%;
  height: auto;
  border-radius: var(--radius);
  display: block;
  box-shadow: none;   /* 기존: var(--shadow) → 그림자 제거 */
}
```
