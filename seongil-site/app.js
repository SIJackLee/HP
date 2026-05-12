/**
 * app.js - DOM 주입 및 공통 기능
 * content.js의 데이터를 읽어 각 페이지에 주입합니다.
 * 
 * ⚠️ 주의: 이 파일에는 렌더링 로직만 포함되어야 합니다.
 * 모든 콘텐츠 문자열은 content.js에서 관리됩니다.
 */

const CONTENT = window.SITE_CONTENT || {};

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
  // 메뉴 활성화 처리
  setActiveMenu();
  
  // 공통 요소 주입
  injectCommonElements();
  
  // 페이지별 메타 태그 주입
  injectMetaTags();
  
  // 페이지별 주입
  const page = getCurrentPage();
  switch(page) {
    case 'index':
      injectHomePage();
      break;
    case 'about':
      injectAboutPage();
      initAboutSubpages();
      break;
    case 'products':
      injectProductsPage();
      break;
    case 'resources':
      injectResourcesPage();
      break;
    case 'support':
      injectSupportPage();
      break;
  }
  
  // 모바일 메뉴 토글
  initMobileMenu();
});

// 현재 페이지 확인 (about.html · about 등 확장자/클린 URL 모두 허용)
function getCurrentPage() {
  const path = window.location.pathname;
  const segments = path.split('/').filter(Boolean);
  let slug = segments.length ? segments[segments.length - 1] : '';
  slug = String(slug).replace(/\.html$/i, '').toLowerCase();

  if (!slug || slug === 'index') {
    return 'index';
  }
  if (slug === 'about') return 'about';
  if (slug === 'products') return 'products';
  if (slug === 'resources') return 'resources';
  if (slug === 'support') return 'support';
  return 'index';
}

// 메뉴 활성화
function setActiveMenu() {
  const page = getCurrentPage();
  const menuItems = document.querySelectorAll('.nav-link');
  
  menuItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('data-page') === page) {
      item.classList.add('active');
    }
  });
}

// 메타 태그 주입
function injectMetaTags() {
  const page = getCurrentPage();
  const pageData = CONTENT.pages && CONTENT.pages[page];
  
  if (pageData) {
    // Title
    if (pageData.title) {
      document.title = pageData.title;
    }
    
    // Meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && pageData.description) {
      metaDesc.setAttribute('content', pageData.description);
    }
    
    // OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && pageData.ogTitle) {
      ogTitle.setAttribute('content', pageData.ogTitle);
    }
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && pageData.ogDescription) {
      ogDesc.setAttribute('content', pageData.ogDescription);
    }
  }
}

// 공통 요소 주입 (헤더, 푸터)
function injectCommonElements() {
  // 회사명 (로고)
  const companyNames = document.querySelectorAll('[data-inject="companyName"]');
  companyNames.forEach(el => {
    // 푸터 내부인지 확인
    const isInFooter = el.closest('.footer') !== null;
    
    if (isInFooter) {
      // 푸터는 항상 텍스트만 표시
      el.textContent = CONTENT.basicInfo?.companyName || '';
    } else {
      // 헤더는 로고 이미지 또는 텍스트 표시
      const logoImage = CONTENT.basicInfo?.logoImageFileName;
      if (logoImage) {
        // 이미지 로고 사용
        const img = document.createElement('img');
        img.src = `assets/logo/${encodeURIComponent(logoImage)}`;
        img.alt = CONTENT.basicInfo?.companyName || '로고';
        img.className = 'logo-image';
        el.innerHTML = '';
        el.appendChild(img);
      } else {
        // 텍스트 로고 사용 (기본값)
        el.textContent = CONTENT.basicInfo?.companyName || '';
      }
    }
  });
  
  // 슬로건
  const slogans = document.querySelectorAll('[data-inject="slogan"]');
  slogans.forEach(el => {
    el.textContent = CONTENT.basicInfo?.slogan || '';
  });
  
  // 푸터 연락처
  const footerPhone = document.querySelector('[data-inject="footerPhone"]');
  if (footerPhone) footerPhone.textContent = CONTENT.contact?.phone || '';
  
  const footerEmail = document.querySelector('[data-inject="footerEmail"]');
  if (footerEmail) {
    footerEmail.textContent = CONTENT.contact?.email || '';
    footerEmail.href = `mailto:${CONTENT.contact?.email || ''}`;
  }
  
  const footerAddress = document.querySelector('[data-inject="footerAddress"]');
  if (footerAddress) footerAddress.textContent = CONTENT.contact?.address || '';
  
  // 푸터 라벨
  const footerContactLabel = document.getElementById('footerContactLabel');
  if (footerContactLabel) footerContactLabel.textContent = CONTENT.ui?.footerContact || '연락처';
  
  const footerAddressLabel = document.getElementById('footerAddressLabel');
  if (footerAddressLabel) footerAddressLabel.textContent = CONTENT.ui?.footerAddress || '주소';
  
  // 푸터 저작권
  const footerCopyright = document.querySelector('[data-inject="footerCopyright"]');
  if (footerCopyright) {
    footerCopyright.innerHTML = CONTENT.ui?.footer?.copyright || '';
  }
  
  // 스킵 링크
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.textContent = CONTENT.ui?.skipLink || '';
  }
}

// 홈페이지 주입
function injectHomePage() {
  const heroTitle = document.getElementById('heroTitle');
  if (heroTitle) heroTitle.textContent = CONTENT.home?.heroTitle || '';
  
  const heroSubtitle = document.getElementById('heroSubtitle');
  if (heroSubtitle) heroSubtitle.textContent = CONTENT.home?.heroSubtitle || '';

  const heroLearnMoreBtn = document.getElementById('heroLearnMoreBtn');
  if (heroLearnMoreBtn) heroLearnMoreBtn.textContent = CONTENT.ui?.buttons?.companyIntroCta || CONTENT.ui?.buttons?.learnMore || '';
  
  // 회사 소개 섹션
  const newsSectionTitle = document.getElementById('newsSectionTitle');
  if (newsSectionTitle) newsSectionTitle.textContent = CONTENT.home?.newsSectionTitle || '';

  const newsSectionSubtitle = document.getElementById('newsSectionSubtitle');
  if (newsSectionSubtitle) newsSectionSubtitle.textContent = CONTENT.home?.newsSectionSubtitle || '';

  const homeNewsList = document.getElementById('homeNewsList');
  if (homeNewsList && Array.isArray(CONTENT.home?.newsItems)) {
    homeNewsList.innerHTML = CONTENT.home.newsItems.map((item) => {
      const href = item.href || '';
      const imageSrc = item.imageFileName
        ? `assets/images/news/${encodeURIComponent(item.imageFileName)}`
        : '';
      const placeholderLabel = CONTENT.ui?.status?.newsImagePlaceholder || '기사 이미지 준비 중';
      const imageHtml = imageSrc
        ? `<img src="${imageSrc}" alt="${item.title || '기사 이미지'}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'news-image-placeholder\\'>${placeholderLabel}</div>'">`
        : `<div class="news-image-placeholder">${placeholderLabel}</div>`;

      return `
        <a class="news-card" href="${href}" target="_blank" rel="noopener noreferrer">
          <div class="news-image">
            ${imageHtml}
          </div>
          <div class="news-content">
            <p class="news-source">${item.source || ''}</p>
            <h3 class="news-title">${item.title || ''}</h3>
            <p class="news-summary">${item.summary || ''}</p>
            <span class="news-link">${CONTENT.ui?.buttons?.viewDetails || '자세히 보기 →'}</span>
          </div>
        </a>
      `;
    }).join('');
    homeNewsList.dataset.rendered = 'true';
    if (!homeNewsList.dataset.rendered) homeNewsList.innerHTML = CONTENT.home.newsItems.map((item) => {
      const href = item.href || '';
      const linkAttrs = href
        ? `class="news-link" href="${href}"`
        : 'class="news-link news-link--disabled" aria-disabled="true" data-disabled="true"';

      return `
        <article class="news-item card">
          <p class="news-meta">${item.category || ''}</p>
          <h3 class="news-title">${item.title || ''}</h3>
          <p class="news-description">${item.description || ''}</p>
          <a ${linkAttrs}>${CONTENT.ui?.buttons?.viewDetails || '자세히 보기 →'}</a>
        </article>
      `;
    }).join('');
  }
  
  // 제품 섹션
  const productsSectionTitle = document.getElementById('productsSectionTitle');
  if (productsSectionTitle) productsSectionTitle.textContent = CONTENT.home?.productsSectionTitle || '';
  
  const productsSectionSubtitle = document.getElementById('productsSectionSubtitle');
  if (productsSectionSubtitle) productsSectionSubtitle.textContent = CONTENT.home?.productsSectionSubtitle || '';
  
  const viewAllProductsBtn = document.getElementById('viewAllProductsBtn');
  if (viewAllProductsBtn) viewAllProductsBtn.textContent = CONTENT.ui?.buttons?.viewAllProducts || '';
  
  // 홈페이지 제품 미리보기 (클릭 시 제품소개 페이지 해당 제품 카드로 이동)
  const homeProductsPreview = document.getElementById('homeProductsPreview');
  if (homeProductsPreview && CONTENT.products) {
    const previewProducts = CONTENT.products.slice(0, 3);
    homeProductsPreview.innerHTML = previewProducts.map((product, index) => {
      const imageSrc = product.imageFileName 
        ? `assets/products/${encodeURIComponent(product.imageFileName)}`
        : null;
      
      return `
        <a href="products.html#product-${index}" class="card product-preview-link">
          <div class="product-preview-image">
            ${imageSrc 
              ? `<img src="${imageSrc}" alt="${product.name}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'placeholder\\'>${CONTENT.ui?.status?.imagePlaceholder || ''}</div>'">`
              : `<div class="placeholder">${CONTENT.ui?.status?.imagePlaceholder || ''}</div>`
            }
          </div>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
        </a>
      `;
    }).join('');
  }

  // Product showcase lab interaction - removable mockup script
  const productShowcaseLabTitle = document.getElementById('productShowcaseLabTitle');
  if (productShowcaseLabTitle) productShowcaseLabTitle.textContent = CONTENT.home?.productShowcaseLabTitle || '';

  const productShowcaseLabSubtitle = document.getElementById('productShowcaseLabSubtitle');
  if (productShowcaseLabSubtitle) productShowcaseLabSubtitle.textContent = CONTENT.home?.productShowcaseLabSubtitle || '';

  const productShowcaseLabRoot = document.getElementById('productShowcaseLabRoot');
  if (productShowcaseLabRoot && Array.isArray(CONTENT.home?.productShowcaseLabItems)) {
    const showcaseImage = CONTENT.home?.productShowcaseLabImageFileName
      ? `assets/images/products/${encodeURIComponent(CONTENT.home.productShowcaseLabImageFileName)}`
      : '';
    const showcasePlaceholder = CONTENT.ui?.status?.productShowcaseLabPlaceholder || '3D 제품 이미지 준비중';
    const showcaseImageHtml = showcaseImage
      ? `<img src="${showcaseImage}" alt="${CONTENT.home?.productShowcaseLabTitle || '주요 제품 목업'}" class="product-showcase-lab-image" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.hidden=false;">`
      : '';

    productShowcaseLabRoot.innerHTML = `
      <!-- Product showcase lab section: removable mockup test area -->
      <div class="product-showcase-lab-stage">
        <div class="product-showcase-lab-image-wrap">
          ${showcaseImageHtml}
          <div class="product-showcase-lab-placeholder" ${showcaseImage ? 'hidden' : ''}>${showcasePlaceholder}</div>
          ${CONTENT.home.productShowcaseLabItems.map((item) => `
            <a href="${item.href || 'products.html'}" class="product-showcase-lab-hotspot ${item.hotspotClassName || ''}" aria-label="${item.name || ''} 자세히 보기"></a>
            <span class="product-showcase-lab-label product-showcase-lab-label--${item.key || ''}">${item.name || ''}</span>
                <em>${CONTENT.ui?.buttons?.viewDetails || '자세히 보기 →'}</em>
              </span>
            </a>
          `).join('')}
        </div>
      </div>
      <div class="product-showcase-lab-mobile-list">
        ${CONTENT.home.productShowcaseLabItems.map((item) => `
          <a href="${item.href || 'products.html'}" class="product-showcase-lab-mobile-item">
            <strong>${item.name || ''}</strong>
            <span>${item.description || ''}</span>
          </a>
        `).join('')}
      </div>
    `;

    const showcaseRenderedImage = productShowcaseLabRoot.querySelector('.product-showcase-lab-image');
    const showcaseRenderedPlaceholder = productShowcaseLabRoot.querySelector('.product-showcase-lab-placeholder');
    if (showcaseRenderedImage && showcaseRenderedPlaceholder) {
      showcaseRenderedImage.hidden = true;
      showcaseRenderedPlaceholder.hidden = false;

      showcaseRenderedImage.addEventListener('load', () => {
        showcaseRenderedImage.hidden = false;
        showcaseRenderedPlaceholder.hidden = true;
      }, { once: true });

      showcaseRenderedImage.addEventListener('error', () => {
        showcaseRenderedImage.remove();
        showcaseRenderedPlaceholder.hidden = false;
      }, { once: true });
    }

    const showcaseImageWrap = productShowcaseLabRoot.querySelector('.product-showcase-lab-image-wrap');
    if (showcaseImageWrap) {
      showcaseImageWrap.querySelectorAll('.product-showcase-lab-hotspot-label, .product-showcase-lab-tooltip, em').forEach((node) => node.remove());
      showcaseImageWrap.querySelectorAll(':scope > span:not(.product-showcase-lab-label):not(.product-showcase-lab-placeholder)').forEach((node) => node.remove());
    }

  }
}

// 회사소개 페이지 주입
function injectAboutPage() {
  // 페이지 헤더
  const pageTitle = document.getElementById('pageTitle');
  if (pageTitle) pageTitle.textContent = CONTENT.pages?.about?.pageTitle || '';
  
  const pageSubtitle = document.getElementById('pageSubtitle');
  if (pageSubtitle) pageSubtitle.textContent = CONTENT.pages?.about?.pageSubtitle || '';
  
  // 대표이사 인삿말
  const ceoGreetingLabel = document.getElementById('ceoGreetingLabel');
  if (ceoGreetingLabel) ceoGreetingLabel.textContent = CONTENT.about?.ceoGreetingLabel || '';
  const ceoGreetingTitle = document.getElementById('ceoGreetingTitle');
  if (ceoGreetingTitle) ceoGreetingTitle.textContent = CONTENT.about?.ceoGreetingTitle || '';
  const ceoGreetingBody = document.getElementById('ceoGreetingBody');
  if (ceoGreetingBody && CONTENT.about?.ceoGreetingBody) {
    const paragraphs = CONTENT.about.ceoGreetingBody.split(/\n\n+/).filter(Boolean);
    ceoGreetingBody.innerHTML = paragraphs.map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
  }
  const ceoGreetingSign = document.getElementById('ceoGreetingSign');
  if (ceoGreetingSign) ceoGreetingSign.textContent = CONTENT.about?.ceoGreetingSign || '';
  
  // 글로벌 네트워크
  const globalTitle = document.getElementById('globalNetworkTitle');
  if (globalTitle) globalTitle.textContent = CONTENT.about?.globalNetworkTitle || '';
  
  const globalDesc = document.getElementById('globalNetworkDescription');
  if (globalDesc) globalDesc.textContent = CONTENT.about?.globalNetworkDescription || '';
  
  // 글로벌 네트워크 지도 이미지 (핀 없음)
  const globalMapWrap = document.getElementById('globalNetworkMapWrap');
  if (globalMapWrap) {
    const mapFileName = CONTENT.about?.globalMapImageFileName;
    if (mapFileName) {
      const img = document.createElement('img');
      img.src = `assets/images/${encodeURIComponent(mapFileName)}`;
      img.alt = "글로벌 네트워크 지도";
      img.className = "global-network-map";
      img.loading = "lazy";
      globalMapWrap.appendChild(img);
    }
  }
  
  // 국가 칩 리스트
  const globalList = document.getElementById('globalCountriesList');
  if (globalList && CONTENT.about?.globalCountries) {
    globalList.innerHTML = CONTENT.about.globalCountries
      .map(country => `<span class="country-tag">${country}</span>`)
      .join('');
  }
  
  // 핵심 가치 (통합 이미지 우선, 없으면 카드)
  const valuesTitle = document.getElementById('coreValuesTitle');
  if (valuesTitle) valuesTitle.textContent = CONTENT.about?.coreValuesTitle || '';
  
  const valuesContainer = document.getElementById('coreValuesContainer');
  if (valuesContainer) {
    const singleFile = CONTENT.about?.coreValuesImageFileName;
    if (singleFile) {
      const altRaw = CONTENT.about?.coreValuesTitle || '핵심 가치';
      const alt = altRaw.replace(/"/g, '&quot;');
      valuesContainer.innerHTML =
        '<img src="assets/core-values/' +
        encodeURIComponent(singleFile) +
        '" alt="' +
        alt +
        '" class="core-values-single-img" loading="lazy">';
    } else if (CONTENT.about?.coreValues && CONTENT.about.coreValues.length > 0) {
      valuesContainer.innerHTML = CONTENT.about.coreValues
        .map((value) => {
          const iconHtml = value.iconImage
            ? `<img src="assets/core-values/${encodeURIComponent(value.iconImage)}" alt="${(value.title || '').replace(/"/g, '&quot;')}" class="value-icon-img" loading="lazy">`
            : (value.icon ? `<span class="value-icon-emoji">${value.icon}</span>` : '');
          return `
        <div class="value-card">
          <div class="value-icon">${iconHtml}</div>
          <h3>${value.title}</h3>
          <p>${value.description}</p>
        </div>
      `;
        })
        .join('');
    } else {
      valuesContainer.innerHTML = '';
    }
  }
  
  // 조직도
  const orgTitle = document.getElementById('organizationTitle');
  if (orgTitle) orgTitle.textContent = CONTENT.about?.organizationTitle || '';
  
  const orgContainer = document.getElementById('organizationContainer');
  if (orgContainer && CONTENT.about?.organization) {
    const org = CONTENT.about.organization;
    const ceoEn = org.ceoEn ? `<div class="org-ceo-en">${org.ceoEn}</div>` : '';
    const deptList = (org.departments || []).map(dept => {
      if (typeof dept === 'object' && dept.ko != null) {
        return `<li><span class="org-dept-ko">${dept.ko}</span><span class="org-dept-en">${dept.en || ''}</span></li>`;
      }
      return `<li><span class="org-dept-ko">${dept}</span></li>`;
    }).join('');
    orgContainer.innerHTML = `
      <div class="org-chart">
        <div class="org-ceo">${org.ceo}</div>${ceoEn}
        <ul class="org-departments">${deptList}</ul>
      </div>
    `;
  }
  
  // 연혁
  const historyTitle = document.getElementById('historyTitle');
  if (historyTitle) historyTitle.textContent = CONTENT.about?.historyTitle || '';
  
  const historyContainer = document.getElementById('historyContainer');
  if (historyContainer) {
    const history = CONTENT.about?.history || [];
    if (history.length > 0) {
      // 1자(직선) 타임라인 렌더링
      renderLinearHistory(historyContainer, history);
    } else {
      historyContainer.innerHTML = '';
    }
  }
  const historyZigzagContainer = document.getElementById('historyZigzagContainer');
  if (historyZigzagContainer) {
    const history = CONTENT.about?.history || [];
    if (history.length > 0) {
      renderZigzagHistory(historyZigzagContainer, history);
    } else {
      historyZigzagContainer.innerHTML = '';
    }
  }
  
  // 오시는 길
  const aboutLocationTitle = document.getElementById('aboutLocationTitle');
  if (aboutLocationTitle) aboutLocationTitle.textContent = CONTENT.about?.locationTitle || '';
  const aboutLocationAddress = document.getElementById('aboutLocationAddress');
  if (aboutLocationAddress) aboutLocationAddress.textContent = CONTENT.contact?.address || '';
  const dir = CONTENT.contact?.locationDirections;
  const aboutLocationAddressLabel = document.getElementById('aboutLocationAddressLabel');
  if (aboutLocationAddressLabel) aboutLocationAddressLabel.textContent = dir?.addressLabel || '주소';
  const aboutBusStopsLabel = document.getElementById('aboutBusStopsLabel');
  if (aboutBusStopsLabel) aboutBusStopsLabel.textContent = dir?.busStopsLabel || '가장 가까운 버스 정류장';
  const aboutBusStops = document.getElementById('aboutBusStops');
  if (aboutBusStops && dir?.busStops?.length) {
    aboutBusStops.innerHTML = dir.busStops.map(function (stop) {
      const buses = (stop.buses || []).join(', ');
      const walkText = stop.walkMinutes ? ' (도보 약 ' + stop.walkMinutes + '분)' : '';
      return '<li><span class="location-stop-name">' + stop.name + walkText + '</span><span class="location-stop-buses">경유 버스: ' + buses + '</span></li>';
    }).join('');
  } else if (aboutBusStops) {
    aboutBusStops.innerHTML = '';
  }
  const aboutPublicTransportLabel = document.getElementById('aboutPublicTransportLabel');
  if (aboutPublicTransportLabel && dir?.publicTransportLabel) aboutPublicTransportLabel.textContent = dir.publicTransportLabel;
  const aboutPrivateCarLabel = document.getElementById('aboutPrivateCarLabel');
  if (aboutPrivateCarLabel && dir?.privateCarLabel) aboutPrivateCarLabel.textContent = dir.privateCarLabel;
  const aboutNavigationInput = document.getElementById('aboutNavigationInput');
  if (aboutNavigationInput) aboutNavigationInput.textContent = dir?.navigationInput || '';
  const aboutParkingInfo = document.getElementById('aboutParkingInfo');
  if (aboutParkingInfo) aboutParkingInfo.textContent = dir?.parkingInfo || '';
  const aboutAlightingLabel = document.getElementById('aboutAlightingLabel');
  if (aboutAlightingLabel) aboutAlightingLabel.textContent = dir?.alightingLabel || '하차 시';
  const aboutAlightingSteps = document.getElementById('aboutAlightingSteps');
  if (aboutAlightingSteps && dir?.alightingSteps?.length) {
    aboutAlightingSteps.innerHTML = dir.alightingSteps.map(function (step) {
      return '<li>' + step + '</li>';
    }).join('');
  } else if (aboutAlightingSteps) {
    aboutAlightingSteps.innerHTML = '';
  }
  const mapEmbedWrap = document.getElementById('aboutMapEmbedWrap');
  if (mapEmbedWrap) {
    // 성일기전 주소 좌표로 고정
    const center = CONTENT.contact?.mapCenter || { lat: 37.4782, lng: 126.8819 };
    const query = CONTENT.contact?.mapEmbedQuery || (CONTENT.contact?.address || '').replace(/\n/g, ' ').trim();
    const kakaoApiKey = (CONTENT.contact?.kakaoMapApiKey || '').trim();
    const useNaverMap = CONTENT.contact?.useNaverMap !== false; // 기본값: true (네이버 지도 사용)
    const naverMapSearch = CONTENT.contact?.naverMapDefaultSearch || CONTENT.basicInfo?.companyName || '성일기전';
    const naverMapPlaceId = CONTENT.contact?.naverMapPlaceId || ''; // 네이버 지도 place ID

    // 네이버 지도 사용 설정이 true이거나 카카오맵 API 키가 없으면 네이버 지도 사용
    if (useNaverMap || !kakaoApiKey) {
      // 네이버 지도 iframe 사용 (API 키 불필요, 기본 검색어: 성일기전)
      if (center && center.lat != null && center.lng != null) {
        useNaverMapIframe();
      } else if (query) {
        useNaverMapIframeWithQuery();
      }
      
      // 네이버 지도 iframe 함수들
      function useNaverMapIframe() {
        // 네이버 지도 iframe 사용 (API 키 불필요)
        // place ID를 사용하여 성일기전을 정확히 중심으로 표시
        var iframeSrc;
        
        // place ID가 있으면 place ID 사용 (가장 정확함)
        if (naverMapPlaceId && naverMapPlaceId.trim() !== '') {
          // 네이버 지도 v5 embed - place ID 사용
          // place ID를 사용하면 해당 장소를 정확히 중심으로 표시
          // 줌 레벨 15: 구/동 단위 (넓은 범위)
          iframeSrc = 'https://map.naver.com/p/embed/place/' + naverMapPlaceId.trim() + 
                      '?c=15.00,0,0,0,dh';
        } else {
          // place ID가 없으면 검색 쿼리 + 좌표 사용
          var searchQuery = naverMapSearch; // 기본 검색어: "성일기전"
          var address = CONTENT.contact?.address || '';
          var fullAddress = address.replace(/\n/g, ' ').trim(); // 주소를 한 줄로 변환
          var searchParam = fullAddress || searchQuery;
          
          // 네이버 지도 v5 embed URL 생성 (검색어 + 좌표)
          // query: 검색창에 기본으로 표시될 검색어 및 자동 검색 실행
          // c: 지도 중심 좌표 및 줌 레벨 (경도,위도,줌레벨,0,0,0,dh)
          // 줌 레벨 15: 구/동 단위 (넓은 범위)
          iframeSrc = 'https://map.naver.com/p/embed/search?query=' + 
                      encodeURIComponent(searchParam) + 
                      '&c=' + center.lng + ',' + center.lat + ',15,0,0,0,dh';
        }
        
        var iframe = document.createElement('iframe');
        iframe.title = '오시는 길 지도';
        iframe.src = ensureHttps(iframeSrc);
        iframe.className = 'location-map-iframe';
        iframe.loading = 'lazy';
        mapEmbedWrap.appendChild(iframe);
      }
      
      function useNaverMapIframeWithQuery() {
        // 좌표가 없을 때는 검색 쿼리만 사용
        var searchQuery = naverMapSearch; // 기본 검색어: "성일기전"
        
        // 검색어가 있으면 사용, 없으면 기본 검색어 사용
        var finalQuery = query || searchQuery;
        
        var iframe = document.createElement('iframe');
        iframe.title = '오시는 길 지도';
        iframe.src = ensureHttps('https://map.naver.com/p/embed/search?query=' + encodeURIComponent(finalQuery));
        iframe.className = 'location-map-iframe';
        iframe.loading = 'lazy';
        mapEmbedWrap.appendChild(iframe);
      }
    } else if (center && center.lat != null && center.lng != null) {
      // 카카오맵 사용 (useNaverMap이 false이고 카카오맵 API 키가 있을 때)
      // 지도 컨테이너 생성
      var mapDiv = document.createElement('div');
      mapDiv.id = 'aboutKakaoMap';
      mapDiv.className = 'location-map-iframe';
      mapEmbedWrap.appendChild(mapDiv);
      
      // 카카오맵 API 키가 있으면 카카오맵 사용, 없으면 iframe 사용
      if (kakaoApiKey && typeof kakao !== 'undefined' && kakao.maps) {
        initKakaoMap();
      } else if (kakaoApiKey) {
        // 카카오맵 API가 아직 로드되지 않았으면 대기
        var checkKakao = setInterval(function() {
          if (typeof kakao !== 'undefined' && kakao.maps) {
            clearInterval(checkKakao);
            initKakaoMap();
          }
        }, 100);
        
        // 5초 후 타임아웃
        setTimeout(function() {
          clearInterval(checkKakao);
          if (typeof kakao === 'undefined' || !kakao.maps) {
            console.error('카카오맵 API가 로드되지 않았습니다. API 키를 확인하세요.');
            // API 키가 없거나 로드 실패 시 iframe 사용
            useIframeFallback();
          }
        }, 5000);
      } else {
        // API 키가 없으면 iframe 사용
        useIframeFallback();
      }
      
      function initKakaoMap() {
        // 카카오맵 초기화 (완전 고정)
        var mapContainer = document.getElementById('aboutKakaoMap');
        var mapOption = {
          center: new kakao.maps.LatLng(center.lat, center.lng),
          level: 3, // 지도의 확대 레벨
          scrollwheel: false,        // 마우스 휠 비활성화
          disableDoubleClick: true,  // 더블클릭 줌 비활성화
          disableDoubleClickZoom: true,
          draggable: false            // 드래그 이동 비활성화
        };
        
        var map = new kakao.maps.Map(mapContainer, mapOption);
        
        // 커스텀 HTML 마커 생성 (성일기전 브랜드 색상 적용)
        var companyName = CONTENT.basicInfo?.companyName || '성일기전';
        var address = CONTENT.contact?.address || '';
        var phone = CONTENT.contact?.phone || '';
        
        // 커스텀 마커 이미지 생성
        var markerPosition = new kakao.maps.LatLng(center.lat, center.lng);
        
        // HTML 마커를 위한 커스텀 오버레이
        var customOverlay = new kakao.maps.CustomOverlay({
          position: markerPosition,
          content: [
            '<div style="',
            'background: linear-gradient(270deg, #16a34a 0%, #1f4aa8 100%);',
            'color: white;',
            'padding: 10px 16px;',
            'border-radius: 24px;',
            'font-weight: 600;',
            'font-size: 0.95rem;',
            'box-shadow: 0 4px 12px rgba(0,0,0,0.25);',
            'white-space: nowrap;',
            'cursor: pointer;',
            '">',
            companyName,
            '</div>'
          ].join(''),
          yAnchor: 1
        });
        
        customOverlay.setMap(map);
        
        // 인포윈도우 생성
        var iwContent = [
          '<div style="padding: 15px; max-width: 280px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans KR", Roboto, sans-serif;">',
          '<h3 style="margin: 0 0 10px 0; color: #1f4aa8; font-size: 1.15rem; font-weight: 700;">' + companyName + '</h3>',
          '<p style="margin: 0 0 8px 0; font-size: 0.9rem; line-height: 1.6; color: #111827;">' + address.replace(/\n/g, '<br>') + '</p>',
          phone ? '<p style="margin: 5px 0 0 0; font-size: 0.85rem; color: #6b7280;">전화: ' + phone + '</p>' : '',
          '</div>'
        ].join('');
        
        var infowindow = new kakao.maps.InfoWindow({
          content: iwContent
        });
        
        // 커스텀 오버레이 클릭 시 인포윈도우 토글
        var overlayElement = customOverlay.getContent();
        if (overlayElement) {
          overlayElement.addEventListener('click', function() {
            if (infowindow.getMap()) {
              infowindow.close();
            } else {
              infowindow.open(map, markerPosition);
            }
          });
        }
        
        // 지도 로드 시 인포윈도우 자동 표시 (선택적)
        // infowindow.open(map, markerPosition);
      }
      
      function useIframeFallback() {
        // 네이버 지도 iframe 사용 (API 키 불필요)
        // 검색 쿼리 + 좌표 조합: 검색창에 "성일기전" 기본 표시, 좌표로 정확한 위치 표시
        var companyName = CONTENT.basicInfo?.companyName || '성일기전';
        var searchQuery = companyName; // 기본 검색어: "성일기전"
        
        // 네이버 지도 v5 embed URL 생성 (검색어 + 좌표)
        // query: 검색창에 기본으로 표시될 검색어
        // c: 지도 중심 좌표 및 줌 레벨 (경도,위도,줌레벨,0,0,0,dh)
        var iframeSrc = 'https://map.naver.com/p/embed/search?query=' + 
                        encodeURIComponent(searchQuery) + 
                        '&c=' + center.lng + ',' + center.lat + ',15,0,0,0,dh';
        
        var iframe = document.createElement('iframe');
        iframe.title = '오시는 길 지도';
        iframe.src = ensureHttps(iframeSrc);
        iframe.className = 'location-map-iframe';
        iframe.loading = 'lazy';
        mapEmbedWrap.appendChild(iframe);
      }
    } else if (query) {
      // 좌표가 없을 때는 검색 쿼리만 사용
      var companyName = CONTENT.basicInfo?.companyName || '성일기전';
      var searchQuery = companyName; // 기본 검색어: "성일기전"
      
      // 검색어가 있으면 사용, 없으면 회사명 사용
      var finalQuery = query || searchQuery;
      
      var iframe = document.createElement('iframe');
      iframe.title = '오시는 길 지도';
      iframe.src = ensureHttps('https://map.naver.com/p/embed/search?query=' + encodeURIComponent(finalQuery));
      iframe.className = 'location-map-iframe';
      iframe.loading = 'lazy';
      mapEmbedWrap.appendChild(iframe);
    }
  }

  function ensureHttps(url) {
    if (!url) return url;
    if (url.startsWith('//')) return 'https:' + url;
    if (url.startsWith('http://')) return 'https://' + url.slice('http://'.length);
    return url;
  }

  // 서브페이지 네비게이션
  const subpageNavList = document.getElementById('aboutSubpageNavList');
  if (subpageNavList && CONTENT.about?.subpageNav?.length) {
    subpageNavList.innerHTML = CONTENT.about.subpageNav
      .map(function (item) {
        return '<li><a href="#' + item.id + '" class="about-subpage-nav__link" data-subpage="' + item.id + '">' + item.label + '</a></li>';
      })
      .join('');
  }
}

// 회사소개 서브페이지 전환 (첫 진입 시 대표이사 인삿말, hash로 이동)
function initAboutSubpages() {
  const validIds = ['greeting', 'location', 'global', 'values', 'organization', 'history'];
  function getSubpageIdFromHash() {
    const hash = (window.location.hash || '').replace(/^#/, '');
    return validIds.indexOf(hash) >= 0 ? hash : 'greeting';
  }
  function showSubpage(id) {
    const panels = document.querySelectorAll('.about-subpage');
    const links = document.querySelectorAll('.about-subpage-nav__link');
    panels.forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-subpage') === id);
    });
    links.forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-subpage') === id);
    });
  }
  function applyHash() {
    const id = getSubpageIdFromHash();
    if (window.location.hash !== '#' + id) {
      window.location.hash = id;
    }
    showSubpage(id);
  }
  if (!window.location.hash || validIds.indexOf(window.location.hash.replace(/^#/, '')) < 0) {
    window.location.hash = 'greeting';
  }
  applyHash();
  window.addEventListener('hashchange', applyHash);
  const nav = document.getElementById('aboutSubpageNav');
  if (nav) {
    nav.addEventListener('click', function (e) {
      const link = e.target.closest('.about-subpage-nav__link');
      if (link) {
        e.preventDefault();
        const id = link.getAttribute('data-subpage');
        if (id) {
          window.location.hash = id;
          showSubpage(id);
        }
      }
    });
  }
}

// 제품소개 페이지 주입
function injectProductsPage() {
  // 페이지 헤더
  const pageTitle = document.getElementById('pageTitle');
  if (pageTitle) pageTitle.textContent = CONTENT.pages?.products?.pageTitle || '';
  
  const pageSubtitle = document.getElementById('pageSubtitle');
  if (pageSubtitle) pageSubtitle.textContent = CONTENT.pages?.products?.pageSubtitle || '';
  
  // 제품 목록
  const productsContainer = document.getElementById('productsContainer');
  if (productsContainer && CONTENT.products) {
    productsContainer.innerHTML = CONTENT.products
      .map((product, index) => {
        const imageSrc = product.imageFileName 
          ? `assets/products/${encodeURIComponent(product.imageFileName)}`
          : null;
        
        return `
          <div class="product-card" id="product-${index}" data-product-index="${index}" style="cursor: pointer;">
            <div class="product-image">
              ${imageSrc 
                ? `<img src="${imageSrc}" alt="${product.name}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'placeholder\\'>${CONTENT.ui?.status?.imagePlaceholder || ''}</div>'">`
                : `<div class="placeholder">${CONTENT.ui?.status?.imagePlaceholder || ''}</div>`
              }
            </div>
            <div class="product-info">
              <h3>${product.name}</h3>
              <p>${product.description}</p>
            </div>
          </div>
        `;
      })
      .join('');
    
    // 제품 카드 클릭 이벤트 등록
    const productCards = productsContainer.querySelectorAll('.product-card');
    productCards.forEach(card => {
      card.addEventListener('click', function() {
        const productIndex = parseInt(this.getAttribute('data-product-index'));
        if (!isNaN(productIndex) && CONTENT.products[productIndex]) {
          showProductSpecModal(CONTENT.products[productIndex]);
        }
      });
    });
  }
  
  // 제품 스펙 모달 생성 (페이지에 한 번만)
  if (!document.getElementById('productSpecModal')) {
    createProductSpecModal();
  }
}

// 제품 스펙 모달 생성
function createProductSpecModal() {
  const modal = document.createElement('div');
  modal.id = 'productSpecModal';
  modal.className = 'product-spec-modal';
  modal.innerHTML = `
    <div class="product-spec-modal__overlay"></div>
    <div class="product-spec-modal__content">
      <button class="product-spec-modal__close" aria-label="닫기">&times;</button>
      <div class="product-spec-modal__header">
        <h2 class="product-spec-modal__title"></h2>
      </div>
      <div class="product-spec-modal__body">
        <div class="product-spec-modal__image"></div>
        <div class="product-spec-modal__description"></div>
        <div class="product-spec-modal__specs"></div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  
  // 모달 닫기 이벤트
  const overlay = modal.querySelector('.product-spec-modal__overlay');
  const closeBtn = modal.querySelector('.product-spec-modal__close');
  
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  overlay.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  
  // ESC 키로 닫기
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

// 제품 스펙 모달 표시
function showProductSpecModal(product) {
  const modal = document.getElementById('productSpecModal');
  if (!modal) return;
  
  const titleEl = modal.querySelector('.product-spec-modal__title');
  const imageEl = modal.querySelector('.product-spec-modal__image');
  const descriptionEl = modal.querySelector('.product-spec-modal__description');
  const specsEl = modal.querySelector('.product-spec-modal__specs');
  
  // 제품명
  if (titleEl) titleEl.textContent = product.name || '';
  
  // 제품 이미지
  if (imageEl) {
    if (product.imageFileName) {
      const imageSrc = `assets/products/${encodeURIComponent(product.imageFileName)}`;
      imageEl.innerHTML = `<img src="${imageSrc}" alt="${product.name}" loading="lazy">`;
    } else {
      imageEl.innerHTML = `<div class="placeholder">${CONTENT.ui?.status?.imagePlaceholder || ''}</div>`;
    }
  }
  
  // 제품 설명
  if (descriptionEl) {
    descriptionEl.textContent = product.description || '';
  }
  
  // 제품 스펙
  if (specsEl && product.specs) {
    const specsHtml = Object.entries(product.specs)
      .map(([key, value]) => `
        <div class="product-spec-item">
          <dt class="product-spec-item__key">${key}</dt>
          <dd class="product-spec-item__value">${value}</dd>
        </div>
      `)
      .join('');
    specsEl.innerHTML = `
      <h3 class="product-spec-modal__specs-title">제품 사양</h3>
      <dl class="product-spec-list">
        ${specsHtml}
      </dl>
    `;
  } else if (specsEl) {
    specsEl.innerHTML = '<p class="product-spec-modal__no-specs">제품 사양 정보가 없습니다.</p>';
  }
  
  // 모달 표시
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// 암페어 → kW 변환기 공통 주입 (자료실 / A/S문의)
function injectAmpWattConverter(containerId, titleId, subtitleId) {
  const converterContainer = document.getElementById(containerId);
  if (!converterContainer) return;
  if (titleId) {
    const titleEl = document.getElementById(titleId);
    if (titleEl) titleEl.textContent = '암페어·kW 변환기';
  }
  if (subtitleId) {
    const subtitleEl = document.getElementById(subtitleId);
    if (subtitleEl) subtitleEl.textContent = CONTENT.pages?.resources?.converterSubtitle || '';
  }
  converterContainer.innerHTML = `
    <div class="converter-card">
      <p class="converter-note">AC 단상 기준</p>
      <div class="converter-voltage-toggle" role="group" aria-label="전압 선택">
        <input type="radio" id="converterVoltage220" name="converterVoltage" value="220" checked>
        <label for="converterVoltage220">220V</label>
        <input type="radio" id="converterVoltage380" name="converterVoltage" value="380">
        <label for="converterVoltage380">380V</label>
      </div>
      <form id="ampToKwForm" class="converter-form" novalidate>
        <label for="converterAmpere">전류 (A)</label>
        <input type="number" id="converterAmpere" name="ampere" min="0" step="any" placeholder="예: 5" inputmode="decimal" aria-describedby="converterResult">
        <button type="submit" class="btn btn-primary">변환</button>
      </form>
      <p id="converterResult" class="converter-result" aria-live="polite"></p>
    </div>
  `;
  const form = document.getElementById('ampToKwForm');
  const inputAmpere = document.getElementById('converterAmpere');
  const resultEl = document.getElementById('converterResult');
  const voltage220 = document.getElementById('converterVoltage220');
  const voltage380 = document.getElementById('converterVoltage380');
  if (form && inputAmpere && resultEl) {
    function getVoltage() {
      if (voltage380 && voltage380.checked) return 380;
      return 220;
    }
    function updateResult() {
      const raw = inputAmpere.value.replace(/,/g, '').trim();
      if (raw === '') {
        resultEl.textContent = '';
        resultEl.className = 'converter-result';
        return;
      }
      const i = parseFloat(raw);
      if (Number.isNaN(i) || i < 0) {
        resultEl.textContent = '전류(A)에 올바른 숫자를 입력하세요.';
        resultEl.className = 'converter-result converter-result--error';
        return;
      }
      const v = getVoltage();
      const pKw = (v * i) / 1000;
      resultEl.textContent = `결과: ${pKw.toFixed(2)} kW (${v}V 기준)`;
      resultEl.className = 'converter-result converter-result--ok';
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      updateResult();
    });
    inputAmpere.addEventListener('input', updateResult);
    inputAmpere.addEventListener('change', updateResult);
    if (voltage220) voltage220.addEventListener('change', updateResult);
    if (voltage380) voltage380.addEventListener('change', updateResult);
  }
}

// 자료실 페이지 주입
function injectResourcesPage() {
  // 페이지 헤더
  const pageTitle = document.getElementById('pageTitle');
  if (pageTitle) pageTitle.textContent = CONTENT.pages?.resources?.pageTitle || '';
  
  const pageSubtitle = document.getElementById('pageSubtitle');
  if (pageSubtitle) pageSubtitle.textContent = CONTENT.pages?.resources?.pageSubtitle || '';
  
  // 자료 목록
  const resourcesContainer = document.getElementById('resourcesContainer');
  if (resourcesContainer && CONTENT.resources) {
    resourcesContainer.innerHTML = CONTENT.resources
      .map(resource => {
        if (resource.fileName) {
          const filePath = `assets/resources/${encodeURIComponent(resource.fileName)}`;
          return `
            <div class="resource-card">
              <div class="resource-icon">📄</div>
              <div class="resource-info">
                <h3>${resource.title}</h3>
                <p>${resource.description}</p>
              </div>
              <a href="${filePath}" class="btn btn-primary" target="_blank" rel="noopener" download>${CONTENT.ui?.buttons?.download || ''}</a>
            </div>
          `;
        } else {
          return `
            <div class="resource-card disabled">
              <div class="resource-icon">📄</div>
              <div class="resource-info">
                <h3>${resource.title}</h3>
                <p>${resource.description}</p>
              </div>
              <span class="badge">${CONTENT.ui?.status?.resourcePending || ''}</span>
            </div>
          `;
        }
      })
      .join('');
  }
}

// A/S 문의 페이지 주입
function injectSupportPage() {
  // 페이지 헤더
  const pageTitle = document.getElementById('pageTitle');
  if (pageTitle) pageTitle.textContent = CONTENT.pages?.support?.pageTitle || '';
  
  const pageSubtitle = document.getElementById('pageSubtitle');
  if (pageSubtitle) pageSubtitle.textContent = CONTENT.pages?.support?.pageSubtitle || '';
  
  // 고객센터 정보
  const contactInfoTitle = document.getElementById('contactInfoTitle');
  if (contactInfoTitle) contactInfoTitle.textContent = CONTENT.support?.contactInfoTitle || '';
  
  const contactPhoneLabel = document.getElementById('contactPhoneLabel');
  if (contactPhoneLabel) contactPhoneLabel.textContent = CONTENT.support?.contactLabels?.phone || '';
  
  const contactPhone = document.getElementById('contactPhone');
  if (contactPhone) {
    contactPhone.textContent = CONTENT.contact?.phone || '';
    contactPhone.href = `tel:${CONTENT.contact?.phone?.replace(/[^0-9]/g, '') || ''}`;
  }
  
  const contactHoursLabel = document.getElementById('contactHoursLabel');
  if (contactHoursLabel) contactHoursLabel.textContent = CONTENT.support?.contactLabels?.hours || '';
  
  const contactHours = document.getElementById('contactHours');
  if (contactHours) contactHours.textContent = CONTENT.contact?.hours || '';
  
  const contactEmailLabel = document.getElementById('contactEmailLabel');
  if (contactEmailLabel) contactEmailLabel.textContent = CONTENT.support?.contactLabels?.email || '';
  
  const contactEmail = document.getElementById('contactEmail');
  if (contactEmail) {
    contactEmail.textContent = CONTENT.contact?.email || '';
    contactEmail.href = `mailto:${CONTENT.contact?.email || ''}`;
  }
  
  const contactAddressLabel = document.getElementById('contactAddressLabel');
  if (contactAddressLabel) contactAddressLabel.textContent = CONTENT.support?.contactLabels?.address || '';
  
  const contactAddress = document.getElementById('contactAddress');
  if (contactAddress) contactAddress.textContent = CONTENT.contact?.address || '';
  
  // 암페어·kW 변환기 (고객센터 바로 아래)
  injectAmpWattConverter('supportAmpWattConverterContainer', 'supportConverterTitle', 'supportConverterSubtitle');
  
  // 문의 방법 섹션은 HTML에서 제거됨
  // showInquiryBox 플래그로 제어 가능하지만 기본값 false
  // 필요시 HTML에 섹션을 추가하고 showInquiryBox를 true로 설정
  
  // A/S 접수 시 필요한 정보
  const requiredInfoTitle = document.getElementById('requiredInfoTitle');
  if (requiredInfoTitle) requiredInfoTitle.textContent = CONTENT.support?.requiredInfoTitle || '';
  
  const requiredInfoList = document.getElementById('requiredInfoList');
  if (requiredInfoList && CONTENT.support?.requiredInfo) {
    requiredInfoList.innerHTML = CONTENT.support.requiredInfo
      .map(info => `<li>${info}</li>`)
      .join('');
  }
}

// 클립보드 복사 성공 처리
function showCopySuccess(template) {
  alert(CONTENT.support?.clipboardSuccessMessage || '복사되었습니다.');
}

// 클립보드 복사 실패 시 대체 UX
function showCopyFallback(template) {
  // 기존 텍스트 영역 제거
  const existingTextarea = document.getElementById('templateTextarea');
  if (existingTextarea) {
    existingTextarea.remove();
  }
  
  // 텍스트 영역 생성
  const textarea = document.createElement('textarea');
  textarea.id = 'templateTextarea';
  textarea.value = template;
  textarea.readOnly = true;
  textarea.style.cssText = 'width: 100%; min-height: 150px; padding: 1rem; margin-top: 1rem; border: 1px solid var(--border-color); border-radius: var(--radius); font-family: inherit; font-size: 0.9rem; resize: vertical;';
  
  // 안내 메시지
  const message = document.createElement('p');
  message.style.cssText = 'margin-top: 0.5rem; color: var(--text-gray); font-size: 0.9rem;';
  message.textContent = CONTENT.support?.clipboardFailMessage || '아래 템플릿을 수동으로 복사해주세요:';
  
  // 버튼 다음에 삽입
  const copyBtn = document.getElementById('copyTemplateBtn');
  if (copyBtn && copyBtn.parentElement) {
    copyBtn.parentElement.appendChild(message);
    copyBtn.parentElement.appendChild(textarea);
    
    // 텍스트 영역 선택
    setTimeout(() => {
      textarea.select();
      textarea.setSelectionRange(0, 99999);
    }, 100);
  } else {
    alert((CONTENT.support?.clipboardFailMessage || '') + '\n\n' + template);
  }
}

// 모바일 메뉴 토글
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
    
    // 메뉴 링크 클릭 시 닫기
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }
}

/**
 * 곡선형 성장 경로 타임라인 초기화
 * S자 곡선 형태의 SVG path와 연도별 노드, 카드를 생성합니다.
 */
function renderLinearHistory(container, historyData) {
  if (!container || !historyData || historyData.length === 0) return;

  const timelineHtml = historyData
    .map(item => {
      const events = Array.isArray(item.events)
        ? item.events
        : (item.event != null ? [item.event] : []);
      const eventsHtml = events
        .map(ev => `<div class="history-event">● ${ev}</div>`)
        .join('');

      return `
        <div class="history-item">
          <div class="history-year">${item.year}</div>
          <div class="history-events">${eventsHtml}</div>
        </div>
      `;
    })
    .join('');

  container.innerHTML = `
    <div class="history-line">
      ${timelineHtml}
    </div>
  `;
}

function renderZigzagHistory(container, historyData) {
  if (!container || !historyData || historyData.length === 0) return;

  const chunkSize = 5;
  const rows = [];
  for (let i = 0; i < historyData.length; i += chunkSize) {
    rows.push(historyData.slice(i, i + chunkSize));
  }

  const rowsHtml = rows
    .map((row, rowIndex) => {
      const cardsHtml = row
        .map(item => {
          const events = Array.isArray(item.events)
            ? item.events
            : (item.event != null ? [item.event] : []);
          const eventsHtml = events
            .map(ev => `<div class="history-zigzag-event">● ${ev}</div>`)
            .join('');
          return `
            <div class="history-zigzag-card">
              <div class="history-zigzag-year">${item.year}</div>
              <div class="history-zigzag-events">${eventsHtml}</div>
            </div>
          `;
        })
        .join('');

      const rowClass = rowIndex % 2 === 1 ? ' history-zigzag-row--reverse' : '';
      return `
        <div class="history-zigzag-row${rowClass}">
          ${cardsHtml}
        </div>
      `;
    })
    .join('');

  container.innerHTML = `
    <div class="history-zigzag">
      ${rowsHtml}
    </div>
  `;
}

/**
 * 타임라인 애니메이션 초기화
 */
