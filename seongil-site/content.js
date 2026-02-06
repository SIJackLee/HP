/**
 * ============================================
 * ★ 디자인팀 수정 가이드 ★
 * ============================================
 * 
 * 이 파일(content.js)만 수정하면 사이트의 모든 문구와 정보가 변경됩니다.
 * 
 * [수정 방법]
 * 1. 문구/연락처/연혁/자료실 변경: 아래 객체의 값만 수정하세요.
 * 2. 제품 사진 넣기: 
 *    - assets/products/ 폴더에 이미지 파일을 넣으세요.
 *    - 아래 products 배열의 imageFileName에 파일명만 입력하세요.
 * 3. 자료실 PDF 넣기:
 *    - assets/resources/ 폴더에 PDF 파일을 넣으세요.
 *    - 아래 resources 배열의 fileName에 파일명만 입력하세요.
 * 
 * ⚠️ 주의: HTML/CSS는 건드리지 않아도 운영 가능합니다.
 * ============================================
 * 
 * [섹션 구조 설명]
 * 
 * 1. basicInfo: 기본 정보
 *    - companyName: 회사명 (모든 페이지에 표시)
 *    - slogan: 슬로건 (모든 페이지에 표시)
 * 
 * 2. pages: 각 페이지별 메타 정보
 *    - home/about/products/resources/support
 *    - 각 페이지의 title, description, ogTitle, ogDescription, pageTitle, pageSubtitle 포함
 * 
 * 3. home: 홈페이지 콘텐츠
 *    - heroTitle, heroSubtitle: 메인 히어로 섹션
 *    - aboutSectionTitle, aboutSectionText: 회사 소개 미리보기
 *    - productsSectionTitle, productsSectionSubtitle: 제품 섹션
 * 
 * 4. about: 회사소개 페이지
 *    - paragraph1, paragraph2: 본문 문단
 *    - brandMessage: 브랜드 메시지
 *    - globalNetworkTitle, globalNetworkDescription, globalCountries: 글로벌 네트워크
 *    - coreValuesTitle, coreValues: 5대 핵심 가치 (icon: 이모티콘, iconImage: 이미지 파일명이면 assets/core-values/ 사용)
 *    - organizationTitle, organization: 조직도
 *    - historyTitle, history: 회사 연혁
 * 
 * 5. products: 제품 정보 배열
 *    - name: 제품명
 *    - description: 제품 설명
 *    - imageFileName: 이미지 파일명 (null이면 placeholder 표시)
 * 
 * 6. resources: 자료실 항목 배열
 *    - title: 자료 제목
 *    - description: 자료 설명
 *    - fileName: PDF 파일명 (null이면 "자료 준비중" 표시)
 * 
 * 7. contact: 연락처 정보
 *    - phone, hours, address, email, mapLink
 * 
 * 8. support: A/S 문의 관련
 *    - contactInfoTitle, locationTitle, inquiryTitle: 섹션 제목
 *    - contactLabels: 라벨 (phone, hours, email, address)
 *    - emailSubject, emailBodyTemplate: 이메일 템플릿
 *    - requiredInfoTitle, requiredInfo: A/S 접수 시 필요한 정보
 *    - clipboard 메시지들
 * 
 * 9. ui: UI 라벨 및 버튼 텍스트
 *    - skipLink, footerContact, footerAddress
 *    - buttons: learnMore, viewAllProducts, download, emailInquiry, copyTemplate, viewMap
 *    - status: imagePlaceholder, resourcePending
 *    - footer: copyright
 * 
 * [하드코딩 제거 결과]
 * - 모든 콘텐츠 문자열이 이 파일로 통합되었습니다.
 * - HTML/CSS/JS 파일에는 렌더링 로직만 남아있습니다.
 * - 디자인팀은 이 파일만 수정하면 모든 페이지의 콘텐츠가 변경됩니다.
 * ============================================
 */

const SITE_CONTENT = {
  // ===== 기본 정보 =====
  basicInfo: {
    companyName: "성일기전",
    slogan: "축산 환경을 위한 스마트 환기 솔루션 리더",
    logoImageFileName: "logo.jpg" // assets/logo/ 폴더에 로고 이미지 넣고 파일명 입력
  },
  
  // ===== 페이지별 제목/설명 =====
  pages: {
    home: {
      title: "성일기전 - 축산 환경을 위한 스마트 환기 솔루션 리더",
      description: "성일기전 - 축산 환경을 위한 스마트 환기 솔루션 리더. 최적의 축사 환경을 위한 끊임없는 노력, 연구하는 성일기전입니다.",
      ogTitle: "성일기전 - 축산 환경을 위한 스마트 환기 솔루션",
      ogDescription: "스마트 축사의 미래, 성일이 함께 합니다. 최적의 축사 환경을 위한 끊임없는 노력, 연구하는 성일기전입니다."
    },
    about: {
      title: "회사소개 - 성일기전",
      description: "성일기전 회사소개 - 1996년 설립 이래 축산 환기 전문 기업으로 전 세계에 신뢰받는 환기 솔루션을 제공하고 있습니다.",
      ogTitle: "회사소개 - 성일기전",
      ogDescription: "성일기전은 축사 환경을 기반으로 한 환기 시스템 및 컨트롤러 개발에 전념해 온 축산 환기 전문 기업입니다.",
      pageTitle: "회사소개",
      pageSubtitle: "축산 환경을 위한 스마트 환기 솔루션 리더"
    },
    products: {
      title: "제품소개 - 성일기전",
      description: "성일기전 제품소개 - SLF 오토휀, 환기 컨트롤러, 환기 시스템 등 축사 환경 최적화를 위한 솔루션을 제공합니다.",
      ogTitle: "제품소개 - 성일기전",
      ogDescription: "축종별 환경 조건에 최적화된 고효율 환기팬과 스마트 컨트롤러를 제공하는 성일기전의 제품을 소개합니다.",
      pageTitle: "제품소개",
      pageSubtitle: "축사 환경 최적화를 위한 성일기전의 솔루션"
    },
    resources: {
      title: "자료실 - 성일기전",
      description: "성일기전 자료실 - 제품 카탈로그, 설치 가이드, 기술 자료 등을 다운로드하실 수 있습니다.",
      ogTitle: "자료실 - 성일기전",
      ogDescription: "성일기전의 제품 카탈로그, 설치 가이드, 기술 자료를 다운로드하실 수 있습니다.",
      pageTitle: "자료실",
      pageSubtitle: "제품 카탈로그, 설치 가이드, 기술 자료를 다운로드하실 수 있습니다.",
      converterSubtitle: "AC 단상 220V / 380V 기준으로\n전류(A)를 소비전력(kW)으로 변환합니다."
    },
    support: {
      title: "A/S 문의 - 성일기전",
      description: "성일기전 A/S 문의 - 제품 A/S 및 기술 지원을 위한 연락처 정보를 제공합니다.",
      ogTitle: "A/S 문의 - 성일기전",
      ogDescription: "성일기전 제품 A/S 및 기술 지원을 위한 연락처 정보를 확인하실 수 있습니다.",
      pageTitle: "A/S 문의",
      pageSubtitle: "제품 A/S 및 기술 지원을 위해 언제든지 연락주세요."
    }
  },
  
  // ===== 홈페이지 콘텐츠 =====
  home: {
    heroTitle: "스마트 축사의 미래, 성일이 함께 합니다.",
    heroSubtitle: "최적의 축사 환경을 위한 끊임없는 노력, 연구하는 성일기전입니다.",
    aboutSectionTitle: "성일기전 소개",
    aboutSectionText: "성일기전은 1996년 설립 이래, 축사 환경을 기반으로 한 환기 시스템 및 컨트롤러 개발에 전념해 온 축산 환기 전문 기업입니다.\n오랜 노하우와 현장 경험을 바탕으로, 축사 내부의 쾌적한 환경과 동물복지를 실현하는 데 필수적인 환기 솔루션을 제공하고 있습니다.",
    productsSectionTitle: "주요 제품",
    productsSectionSubtitle: "축사 환경 최적화를 위한 솔루션"
  },
  
  // ===== 회사소개 페이지 =====
  about: {
    subpageNav: [
      { id: "greeting", label: "대표이사 인삿말" },
      { id: "location", label: "오시는 길" },
      { id: "global", label: "글로벌 네트워크" },
      { id: "values", label: "5대 핵심 가치" },
      { id: "organization", label: "조직도" },
      { id: "history", label: "회사 연혁" }
    ],
    ceoGreetingLabel: "대표이사 인삿말",
    ceoGreetingTitle: "스마트 축산의 내일을 설계합니다.",
    ceoGreetingBody: "안녕하십니까? (주)성일기전 홈페이지를 방문해 주신 고객 여러분께 감사의 인사를 드립니다.\n\n(주)성일기전은 축산 농가에 가장 필요한 환기 솔루션을 제공하겠다는 일념으로 지난 30여 년간 한 길만을 걸어왔습니다. 그동안 대한민국 축산 현장에 최적화된 환기 시스템을 공급하며 고객 여러분과 함께 성장해 온 시간은 저희의 가장 큰 자부심입니다. 지난 성장을 견인해 온 정직과 신뢰의 경영 철학은 변화하는 시대 흐름 속에서 더 큰 도약을 이뤄내는 든든한 뿌리가 되고 있습니다.\n\n이제 축산업은 데이터와 기술이 결합한 '스마트 팜'의 시대로 접어들었습니다. 그간 쌓아온 독보적인 환기 기술력에 ICT기술을 접목한 차세대 브랜드 '블레온(BLEON)'을 통해, 축산 환경의 새로운 기준을 세우고 농가의 수익성과 경쟁력을 극대화하고자 합니다.\n\n(주)성일기전은 언제나 농가의 든든한 상생 파트너가 될 것을 약속드립니다. 고객 여러분과 더 가깝게 소통하며 기술로 보답하는 성일기전이 되겠습니다.\n\n감사합니다.",
    ceoGreetingSign: "주식회사 성일기전 대표이사 이 동 호",
    paragraph1: "성일기전은 1996년 설립 이래, 축사 환경을 기반으로 한 환기 시스템 및 컨트롤러 개발에 전념해 온 축산 환기 전문 기업입니다.\n오랜 노하우와 현장 경험을 바탕으로, 축사 내부의 쾌적한 환경과 동물복지를 실현하는 데 필수적인 환기 솔루션을 제공하고 있습니다.",
    paragraph2: "",
    brandMessage: "성일기전은 '끊임없는 변화, 더불어 하는 발전'이라는 가치 아래 농장·환경·자연과의 공생을 실현하고자 노력합니다.\n고효율 팬, 스마트 컨트롤러, 내구성이 높은 엔지니어링 소재를 기반으로 농장의 생산성과 동물의 편안함을 함께 향상시키는 솔루션을 제공합니다.",
    locationTitle: "오시는 길",
    globalNetworkTitle: "글로벌 네트워크",
    globalNetworkDescription: "대표 브랜드인 SLF 오토휀(SLF Autofan)은 축종별 환경 조건에 최적화된 고효율 환기팬으로\n국내·외 많은 농장 고객들로부터 높은 신뢰를 받고 있으며, 유럽·중동·일본·동남아시아 등 다양한 국가에 수출하고 있습니다.",
    globalMapImageFileName: "global-map.png",
    globalCountries: ["일본", "중국", "헝가리", "베트남", "코스타리카", "남아프리카", "대만", "포루투칼", "스페인", "아르헨티나", "그리스", "호주"],
    globalCountryPins: {
      "일본": { x: 88, y: 32 },
      "중국": { x: 78, y: 38 },
      "헝가리": { x: 52, y: 28 },
      "베트남": { x: 75, y: 48 },
      "코스타리카": { x: 22, y: 45 },
      "남아프리카": { x: 52, y: 72 },
      "대만": { x: 82, y: 42 },
      "포루투칼": { x: 45, y: 30 },
      "스페인": { x: 45, y: 32 },
      "아르헨티나": { x: 28, y: 72 },
      "그리스": { x: 52, y: 32 },
      "호주": { x: 82, y: 68 }
    },
    coreValuesTitle: "5대 핵심 가치",
    coreValues: [
      { title: "신뢰와 책임", description: "고객과의 약속을 지키고\n책임감 있는 제품을 제공합니다.", icon: "🤝", iconImage: null },
      { title: "고객 중심", description: "고객의 요구사항을\n최우선으로 고려합니다.", icon: "👥", iconImage: null },
      { title: "혁신 정신", description: "지속적인 연구개발로\n기술 혁신을 추구합니다.", icon: "💡", iconImage: null },
      { title: "도전적 실행", description: "새로운 시장과 기회에\n적극적으로 도전합니다.", icon: "🎯", iconImage: null },
      { title: "글로벌 지향", description: "세계 시장을 향한\n지속적인 확장을 추구합니다.", icon: "🌍", iconImage: null }
    ],
    organizationTitle: "조직도",
    organization: {
      ceo: "대표이사",
      ceoEn: "CEO",
      departments: [
        { ko: "경영지원부", en: "Management Support Division" },
        { ko: "기술연구소", en: "Technology Research Institute" },
        { ko: "기술지원부", en: "Technical Support Division" },
        { ko: "제조기술부", en: "Manufacturing Technology Division" },
        { ko: "생산관리부", en: "Production Control Division" }
      ]
    },
    historyTitle: "회사 연혁",
    history: [
      { year: "2022", events: ["4.20 주식회사 성일기전 설립 (구 성일기전)"] },
      { year: "2023", events: ["11월 AC모터 CE인증"] },
      { year: "2024", events: ["7월 9시리즈 컨트롤러 KST (한국전파시험연구소) 인증 및 방송통신기자재 등록"] },
      { year: "2025", events: [
        "4월 BLDC(SLB) 디자인 등록",
        "5월 BLDC모터 KTC시험",
        "9월 농림축산식품부장관상",
        "9월 BLDC모터 CE인증",
        "12월 주식회사 성일기전 연구전담부서 설립",
        "12월 축평원 기업등록"
      ]},
      { year: "2026", events: ["BLDC KC인증 예정"] }
    ]
  },
  
  // ===== 제품 정보 =====
  products: [
    {
      name: "환기용 배기휀",
      description: "다양한 타입과 사이즈가 있습니다.",
      imageFileName: "slf-autofan.png" // assets/products/ 폴더에 이미지 넣고 파일명 입력
    },
    {
      name: "휀 컨트롤러",
      description: "커스텀 제작이 가능합니다.",
      imageFileName: "ventilation-controller.png"
    },
    {
      name: "악세사리",
      description: "후드와 샷타(제작가능)이 있습니다.",
      imageFileName: "ventilation-system.png"
    },
    {
      name: "환기팬 시리즈 A",
      description: "고효율 에너지 절약형 환기팬",
      imageFileName: null
    },
    {
      name: "환기팬 시리즈 B",
      description: "대용량 축사용 환기팬",
      imageFileName: null
    },
    {
      name: "스마트 컨트롤러 Pro",
      description: "IoT 연동 스마트 환기 제어 시스템",
      imageFileName: null
    }
  ],
  
  // ===== 자료실 항목 =====
  resources: [
    {
      title: "제품 카탈로그",
      description: "성일기전 제품 전체 카탈로그",
      fileName: null // assets/resources/ 폴더에 PDF 넣고 파일명 입력
    },
    {
      title: "설치 가이드",
      description: "환기팬 설치 및 사용 가이드",
      fileName: null
    },
    {
      title: "기술 자료",
      description: "제품 기술 사양서",
      fileName: null
    },
    {
      title: "유지보수 매뉴얼",
      description: "제품 유지보수 및 점검 가이드",
      fileName: null
    },
    {
      title: "안전 가이드",
      description: "제품 안전 사용 가이드",
      fileName: null
    },
    {
      title: "인증서",
      description: "제품 인증 및 품질 인증서",
      fileName: null
    }
  ],
  
  // ===== 연락처 정보 =====
  contact: {
    phone: "02-830-5803~4",
    hours: "평일 09:00 ~ 18:00 (주말, 공휴일 휴무)",
    address: "서울특별시 금천구 가산디지털2로 169-28\n디지털산전협동화단지 A동",
    email: "autofankorea@gmail.com",
    mapLink: "https://map.naver.com/v5/search/서울특별시 금천구 가산디지털2로 169-28",
    mapEmbedQuery: "서울특별시 금천구 가산디지털2로 169-28",
    mapCenter: { lat: 37.4782, lng: 126.8819 },
    mapApiClientId: "" // 입력 시 네이버 지도 API로 실제 지도+주소 마커 표시 (네이버 클라우드 플랫폼에서 발급)
  },
  
  // ===== A/S 문의 =====
  support: {
    contactInfoTitle: "고객센터 정보",
    locationTitle: "오시는 길",
    showInquiryBox: false,
    inquiryTitle: "문의 방법",
    inquiryDescription: "제품 A/S나 기술 지원이 필요하시면 아래 방법으로 문의해주세요.",
    contactLabels: {
      phone: "전화",
      hours: "운영시간",
      email: "이메일",
      address: "주소"
    },
    emailSubject: "성일기전 A/S 문의",
    emailBodyTemplate: "제품명: \n모델명: \n문의 내용: \n\n연락처: ",
    requiredInfoTitle: "A/S 접수 시 필요한 정보",
    requiredInfo: [
      "제품명 및 모델명",
      "구매일자 (또는 설치일자)",
      "문제 증상 및 상황 설명",
      "연락 가능한 전화번호",
      "주소 (방문 A/S 시 필요)"
    ],
    clipboardSuccessMessage: "문의 템플릿이 클립보드에 복사되었습니다.",
    clipboardFailMessage: "복사에 실패했습니다. 아래 템플릿을 수동으로 복사해주세요:",
    clipboardRestrictionMessage: "※ HTTPS 환경이 아닌 경우 템플릿 복사 기능이 제한될 수 있습니다."
  },
  
  // ===== UI 라벨 =====
  ui: {
    skipLink: "본문으로 건너뛰기",
    menuToggle: "메뉴 열기",
    footerContact: "연락처",
    footerAddress: "주소",
    buttons: {
      learnMore: "더 알아보기",
      viewAllProducts: "전체 제품 보기",
      download: "다운로드",
      emailInquiry: "이메일로 문의하기",
      copyTemplate: "문의 템플릿 복사",
      viewMap: "지도 보기"
    },
    status: {
      imagePlaceholder: "이미지 준비중",
      resourcePending: "자료 준비중"
    },
    footer: {
      copyright: "&copy; 2024 성일기전. All rights reserved."
    }
  }
};

// 전역 변수로 노출 (app.js에서 사용)
window.SITE_CONTENT = SITE_CONTENT;
