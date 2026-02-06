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

// 현재 페이지 확인
function getCurrentPage() {
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';
  
  if (filename === 'index.html' || filename === '' || path.endsWith('/')) {
    return 'index';
  } else if (filename === 'about.html') {
    return 'about';
  } else if (filename === 'products.html') {
    return 'products';
  } else if (filename === 'resources.html') {
    return 'resources';
  } else if (filename === 'support.html') {
    return 'support';
  }
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
  
  // 회사 소개 섹션
  const aboutSectionTitle = document.getElementById('aboutSectionTitle');
  if (aboutSectionTitle) aboutSectionTitle.textContent = CONTENT.home?.aboutSectionTitle || '';
  
  const aboutSectionText = document.getElementById('aboutSectionText');
  if (aboutSectionText) aboutSectionText.textContent = CONTENT.home?.aboutSectionText || '';
  
  const learnMoreBtn = document.getElementById('learnMoreBtn');
  if (learnMoreBtn) learnMoreBtn.textContent = CONTENT.ui?.buttons?.learnMore || '';
  
  // 제품 섹션
  const productsSectionTitle = document.getElementById('productsSectionTitle');
  if (productsSectionTitle) productsSectionTitle.textContent = CONTENT.home?.productsSectionTitle || '';
  
  const productsSectionSubtitle = document.getElementById('productsSectionSubtitle');
  if (productsSectionSubtitle) productsSectionSubtitle.textContent = CONTENT.home?.productsSectionSubtitle || '';
  
  const viewAllProductsBtn = document.getElementById('viewAllProductsBtn');
  if (viewAllProductsBtn) viewAllProductsBtn.textContent = CONTENT.ui?.buttons?.viewAllProducts || '';
  
  // 홈페이지 제품 미리보기
  const homeProductsPreview = document.getElementById('homeProductsPreview');
  if (homeProductsPreview && CONTENT.products) {
    const previewProducts = CONTENT.products.slice(0, 3);
    homeProductsPreview.innerHTML = previewProducts.map(product => {
      const imageSrc = product.imageFileName 
        ? `assets/products/${encodeURIComponent(product.imageFileName)}`
        : null;
      
      return `
        <div class="card">
          <div class="product-preview-image">
            ${imageSrc 
              ? `<img src="${imageSrc}" alt="${product.name}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'placeholder\\'>${CONTENT.ui?.status?.imagePlaceholder || ''}</div>'">`
              : `<div class="placeholder">${CONTENT.ui?.status?.imagePlaceholder || ''}</div>`
            }
          </div>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
        </div>
      `;
    }).join('');
  }
}

// 회사소개 페이지 주입
function injectAboutPage() {
  // 페이지 헤더
  const pageTitle = document.getElementById('pageTitle');
  if (pageTitle) pageTitle.textContent = CONTENT.pages?.about?.pageTitle || '';
  
  const pageSubtitle = document.getElementById('pageSubtitle');
  if (pageSubtitle) pageSubtitle.textContent = CONTENT.pages?.about?.pageSubtitle || '';
  
  // 본문
  const aboutP1 = document.getElementById('aboutParagraph1');
  if (aboutP1) aboutP1.textContent = CONTENT.about?.paragraph1 || '';
  
  const aboutP2 = document.getElementById('aboutParagraph2');
  if (aboutP2) aboutP2.textContent = CONTENT.about?.paragraph2 || '';
  
  const brandMessage = document.getElementById('brandMessage');
  if (brandMessage) brandMessage.textContent = CONTENT.about?.brandMessage || '';
  
  // 글로벌 네트워크
  const globalTitle = document.getElementById('globalNetworkTitle');
  if (globalTitle) globalTitle.textContent = CONTENT.about?.globalNetworkTitle || '';
  
  const globalDesc = document.getElementById('globalNetworkDescription');
  if (globalDesc) globalDesc.textContent = CONTENT.about?.globalNetworkDescription || '';
  
  // 글로벌 네트워크 지도 이미지
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
  
  // 5대 핵심 가치
  const valuesTitle = document.getElementById('coreValuesTitle');
  if (valuesTitle) valuesTitle.textContent = CONTENT.about?.coreValuesTitle || '';
  
  const valuesContainer = document.getElementById('coreValuesContainer');
  if (valuesContainer && CONTENT.about?.coreValues) {
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
  }
  
  // 조직도
  const orgTitle = document.getElementById('organizationTitle');
  if (orgTitle) orgTitle.textContent = CONTENT.about?.organizationTitle || '';
  
  const orgContainer = document.getElementById('organizationContainer');
  if (orgContainer && CONTENT.about?.organization) {
    const deptList = CONTENT.about.organization.departments
      .map(dept => `<li>${dept}</li>`)
      .join('');
    orgContainer.innerHTML = `
      <div class="org-chart">
        <div class="org-ceo">${CONTENT.about.organization.ceo}</div>
        <ul class="org-departments">${deptList}</ul>
      </div>
    `;
  }
  
  // 연혁
  const historyTitle = document.getElementById('historyTitle');
  if (historyTitle) historyTitle.textContent = CONTENT.about?.historyTitle || '';
  
  const historyContainer = document.getElementById('historyContainer');
  if (historyContainer && CONTENT.about?.history) {
    historyContainer.innerHTML = CONTENT.about.history
      .map(item => `
        <div class="history-item">
          <div class="history-year">${item.year}</div>
          <div class="history-event">${item.event}</div>
        </div>
      `)
      .join('');
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
      .map(product => {
        const imageSrc = product.imageFileName 
          ? `assets/products/${encodeURIComponent(product.imageFileName)}`
          : null;
        
        return `
          <div class="product-card">
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
  }
}

// 자료실 페이지 주입
function injectResourcesPage() {
  // 페이지 헤더
  const pageTitle = document.getElementById('pageTitle');
  if (pageTitle) pageTitle.textContent = CONTENT.pages?.resources?.pageTitle || '';
  
  const pageSubtitle = document.getElementById('pageSubtitle');
  if (pageSubtitle) pageSubtitle.textContent = CONTENT.pages?.resources?.pageSubtitle || '';
  
  // 암페어 → kW 변환기 (AC 단상 220V)
  const converterContainer = document.getElementById('ampWattConverterContainer');
  if (converterContainer) {
    const V_AC = 220;
    converterContainer.innerHTML = `
      <div class="converter-card">
        <p class="converter-note">AC 단상 <strong>220V</strong> 기준</p>
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
    if (form && inputAmpere && resultEl) {
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
        const pKw = (V_AC * i) / 1000;
        resultEl.textContent = `결과: ${pKw.toFixed(2)} kW`;
        resultEl.className = 'converter-result converter-result--ok';
      }
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        updateResult();
      });
      inputAmpere.addEventListener('input', updateResult);
      inputAmpere.addEventListener('change', updateResult);
    }
  }
  
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
  
  // 오시는 길
  const locationTitle = document.getElementById('locationTitle');
  if (locationTitle) locationTitle.textContent = CONTENT.support?.locationTitle || '';
  
  const locationAddress = document.getElementById('locationAddress');
  if (locationAddress) locationAddress.textContent = CONTENT.contact?.address || '';
  
  const mapLink = document.getElementById('mapLink');
  if (mapLink) {
    mapLink.textContent = CONTENT.ui?.buttons?.viewMap || '';
    mapLink.href = CONTENT.contact?.mapLink || '#';
  }
  
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
