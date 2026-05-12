핵심 가치 이미지 저장 폴더
========================================
- 통합 이미지 한 장: content.js의 coreValuesImageFileName(예: 3corevalues.png) 파일을 이 폴더에 둡니다.
- 카드별 아이콘: content.js의 coreValues 각 항목에서
  iconImage: "파일명.png" 로 지정하면 이모티콘 대신 이미지가 표시됩니다.
- iconImage를 null로 두면 기존 이모티콘(icon)이 표시됩니다.
- 권장 크기: 56x56px ~ 112x112px (정사각형)

예시 (content.js):
  { title: "신뢰와 책임", description: "...", icon: "🤝", iconImage: "trust.png" }
