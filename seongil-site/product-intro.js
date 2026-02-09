/**
 * 제품 소개 (Product Intro) - 재원표 기반 상세 규격
 * 표시 가능 컬럼만 사용 (제품_재원표.xlsx 시트/컬럼과 동일)
 * A) SLB_Motor_Specs: 모델, 최대RPM, 입력전압(V), 전류(A), 소비전력(W), 풍속(m/s), 풍량@0Pa(CMH), 풍량@30Pa, 풍량@50Pa, 풍량@100Pa
 * B) SLB960_Dim: 모델, 높이(mm), 지름(mm)
 * C) SLF_1P_220V_60Hz: 형식, 날개직경(mm), 회전수(RPM), 전류(A), 소비전력(W/HP), 콘덴서, 풍량(CFM), 풍량(CMH), 중량(kg)
 * D) SLF_3P_220_380V_60Hz: 형식, 날개직경(mm), 회전수(RPM), 전류(220V), 전류(380V), 풍량(CFM), 풍량(CMH), 중량(kg)
 * E) SLF_A_Dimensions: TYPE, A, B, C(타공), D, E
 * F) SLF_D_Dimensions: TYPE, 날개직경(mm), A, B, C
 * G) Controllers: 모델, 정격허용전류, 전선굵기(SQ), 1채널 팬속도(수동), 3채널 팬속도, 릴레이3채널, 릴레이6채널, 타이머(10~990초), 타이머(시/분/초), 온도보정, 제품안전, 최저/최고온도기억, 온도편차설정, 경보기능
 * H) Hood_Sizes: TYPE, A, B, C, D, E, F(타공)
 * I) Shutter_Sizes: TYPE, B, A, T
 * J) Inlet_Summary: 항목, 값(mm), 비고
 */
(function () {
  'use strict';

  var SPECS_URL = 'assets/data/specs.json';
  var DIM_IMG_BASE = 'assets/images/dimensions/';
  var data = null; /* 내장 dict 사용 시 window.SPEC_DATA, 없으면 fetch로 로드 */
  var currentTab = 'motor';
  var compareMode = false;
  var comparePrev = null;
  var compareCurrent = null;

  /** 치수 도면 이미지 1개 표시/숨김. 이미지 있으면 2단 배치, 없으면 이미지 공간 없이 내용만 나열 */
  function setDimImage(wrapId, imgId, show, src) {
    var wrap = document.getElementById(wrapId);
    var img = imgId ? document.getElementById(imgId) : null;
    if (!wrap) return;
    if (show && img && src) {
      img.src = src;
      img.style.display = '';
      wrap.hidden = false;
      toggleTwoColLayout(wrap, true);
    } else {
      if (img) {
        img.src = '';
        img.style.display = 'none';
      }
      wrap.hidden = true;
      toggleTwoColLayout(wrap, false);
    }
  }

  /** 이미지 영역 표시 시에만 2단 그리드 적용, 없으면 내용만 전체 폭 */
  function toggleTwoColLayout(imageWrap, hasImage) {
    var parent = imageWrap && imageWrap.parentElement;
    if (!parent || !parent.classList.contains('product-intro-two-col')) return;
    if (hasImage) {
      parent.classList.add('product-intro-has-dim-image');
    } else {
      parent.classList.remove('product-intro-has-dim-image');
    }
  }

  /** 환기팬: A/D 두 이미지 각각 표시 후 wrap은 둘 중 하나라도 있으면 표시 */
  function setFanDimImages(showA, showD) {
    var wrap = document.getElementById('fanDimImageWrap');
    var imgA = document.getElementById('fanDimImgA');
    var imgD = document.getElementById('fanDimImgD');
    if (!wrap) return;
    if (imgA) {
      if (showA) {
        imgA.src = DIM_IMG_BASE + 'SLF_A_Size.png';
        imgA.style.display = '';
      } else {
        imgA.src = '';
        imgA.style.display = 'none';
      }
    }
    if (imgD) {
      if (showD) {
        imgD.src = DIM_IMG_BASE + 'SLF_D_Size.png';
        imgD.style.display = '';
      } else {
        imgD.src = '';
        imgD.style.display = 'none';
      }
    }
    wrap.hidden = !(showA || showD);
    toggleTwoColLayout(wrap, showA || showD);
  }

  function getUnitFromKey(key) {
    var m = key.match(/\(([^)]+)\)$/);
    return m ? m[1] : '';
  }

  function getLabelFromKey(key) {
    return key.replace(/\s*\([^)]+\)\s*$/, '').trim();
  }

  function formatVal(v) {
    if (v === undefined || v === null || String(v).trim() === '' || String(v).trim() === '-') return '－';
    return String(v).trim();
  }

  function renderSpecCard(label, value, unit) {
    var v = formatVal(value);
    var unitHtml = unit ? '<span class="product-intro-card-unit">' + escapeHtml(unit) + '</span>' : '';
    return (
      '<div class="product-intro-card">' +
      '<div class="product-intro-card-label">' + escapeHtml(label) + '</div>' +
      '<div class="product-intro-card-value">' + escapeHtml(v) + unitHtml + '</div>' +
      '</div>'
    );
  }

  function escapeHtml(s) {
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function renderSpecCardsFromRow(row, keysToShow) {
    var html = '';
    keysToShow.forEach(function (key) {
      if (!row.hasOwnProperty(key)) return;
      var label = getLabelFromKey(key);
      var unit = getUnitFromKey(key);
      html += renderSpecCard(label, row[key], unit ? unit : null);
    });
    return html;
  }

  function fillSelect(selectId, options, valueKey, labelKey) {
    var sel = document.getElementById(selectId);
    if (!sel) return;
    sel.innerHTML = '';
    options.forEach(function (opt, i) {
      var val = opt[valueKey] || opt[labelKey] || '';
      var lab = opt[labelKey] || opt[valueKey] || '';
      var o = document.createElement('option');
      o.value = String(val);
      o.textContent = String(lab);
      if (i === 0) o.selected = true;
      sel.appendChild(o);
    });
  }

  function getSelectedMotor() {
    var sel = document.getElementById('selectMotor');
    return sel ? sel.value : '';
  }

  function getSelectedFan() {
    var sel = document.getElementById('selectFan');
    return sel ? sel.value : '';
  }

  function getSelectedController() {
    var sel = document.getElementById('selectController');
    return sel ? sel.value : '';
  }

  function getSelectedHood() {
    var sel = document.getElementById('selectHood');
    return sel ? sel.value : '';
  }

  function getSelectedShutter() {
    var sel = document.getElementById('selectShutter');
    return sel ? sel.value : '';
  }

  function getFanPhase() {
    var r = document.querySelector('input[name="fanPhase"]:checked');
    return r ? r.value : '1p';
  }

  function getMotorSpecKeys() {
    return ['최대RPM', '입력전압(V)', '전류(A)', '소비전력(W)', '풍속(m/s)', '풍량@0Pa(CMH)', '풍량@30Pa', '풍량@50Pa', '풍량@100Pa'];
  }

  function getSlb960DimKeys() {
    return ['높이(mm)', '지름(mm)'];
  }

  function getSlf1PKeys() {
    return ['날개직경(mm)', '회전수(RPM)', '전류(A)', '소비전력(W/HP)', '콘덴서', '풍량(CFM)', '풍량(CMH)', '중량(kg)'];
  }

  function getSlf3PKeys() {
    return ['날개직경(mm)', '회전수(RPM)', '전류(220V)', '전류(380V)', '풍량(CFM)', '풍량(CMH)', '중량(kg)'];
  }

  function getControllerKeys() {
    return ['정격허용전류', '전선굵기(SQ)', '1채널 팬속도(수동)', '3채널 팬속도', '릴레이3채널', '릴레이6채널', '타이머(10~990초)', '타이머(시/분/초)', '온도보정', '제품안전', '최저/최고온도기억', '온도편차설정', '경보기능'];
  }

  function getHoodKeys() {
    return ['A', 'B', 'C', 'D', 'E', 'F(타공)'];
  }

  function getShutterKeys() {
    return ['B', 'A', 'T'];
  }

  function deriveSlfBaseType(form) {
    if (!form) return '';
    var m = form.match(/^(SLF-\d+(?:A|D))/);
    return m ? m[1] : '';
  }

  function updateMotorPanel() {
    if (!data || !data.slbMotorSpecs) return;
    var model = getSelectedMotor();
    var row = data.slbMotorSpecs.find(function (r) { return r['모델'] === model; });
    var container = document.getElementById('motorSpecCards');
    var dimContainer = document.getElementById('motorDimCards');
    if (!container) return;

    if (!row) {
      container.innerHTML = '<p class="product-intro-no-data">모델을 선택하세요.</p>';
      if (dimContainer) dimContainer.innerHTML = '';
      return;
    }

    var keys = getMotorSpecKeys();
    container.innerHTML = renderSpecCardsFromRow(row, keys);

    var dimRow = null;
    if (data.slb960Dim) {
      dimRow = data.slb960Dim.find(function (r) { return r['모델'] === model; });
    }
    if (dimContainer) {
      if (dimRow) {
        dimContainer.innerHTML = '<h3 class="product-intro-dim-title">치수</h3>' + renderSpecCardsFromRow(dimRow, getSlb960DimKeys());
        dimContainer.style.display = '';
      } else {
        dimContainer.innerHTML = '';
        dimContainer.style.display = 'none';
      }
    }
    if (compareMode && (comparePrev || compareCurrent)) showComparePanel();
  }

  function updateFanPanel() {
    if (!data) return;
    var phase = getFanPhase();
    var form = getSelectedFan();
    var list = phase === '1p' ? data.slf1P220V60Hz : data.slf3P220380V60Hz;
    var keys = phase === '1p' ? getSlf1PKeys() : getSlf3PKeys();
    var container = document.getElementById('fanSpecCards');
    var dimContainer = document.getElementById('fanDimCards');
    if (!container) return;

    if (!list || !form) {
      container.innerHTML = '<p class="product-intro-no-data">형식을 선택하세요.</p>';
      if (dimContainer) dimContainer.innerHTML = '';
      return;
    }

    var row = list.find(function (r) { return r['형식'] === form; });
    if (!row) {
      container.innerHTML = '<p class="product-intro-no-data">해당 형식이 없습니다.</p>';
      if (dimContainer) dimContainer.innerHTML = '';
      return;
    }

    container.innerHTML = renderSpecCardsFromRow(row, keys);

    var baseType = deriveSlfBaseType(form);
    var dimHtml = '';
    if (baseType && data.slfADimensions) {
      var aRow = data.slfADimensions.find(function (r) { return r['TYPE'] === baseType; });
      if (aRow) {
        dimHtml += '<h3 class="product-intro-dim-title">치수 (A)</h3>' + renderSpecCardsFromRow(aRow, ['A', 'B', 'C(타공)', 'D', 'E']);
      }
    }
    if (baseType && data.slfDDimensions) {
      var dRow = data.slfDDimensions.find(function (r) { return r['TYPE'] === baseType; });
      if (dRow) {
        dimHtml += '<h3 class="product-intro-dim-title">치수 (D)</h3>' + renderSpecCardsFromRow(dRow, ['날개직경(mm)', 'A', 'B', 'C']);
      }
    }
    if (dimContainer) {
      dimContainer.innerHTML = dimHtml || '';
      dimContainer.style.display = dimHtml ? '' : 'none';
    }
    var hasA = !!(baseType && data.slfADimensions && data.slfADimensions.some(function (r) { return r['TYPE'] === baseType; }));
    var hasD = !!(baseType && data.slfDDimensions && data.slfDDimensions.some(function (r) { return r['TYPE'] === baseType; }));
    setFanDimImages(hasA, hasD);
    if (compareMode && (comparePrev || compareCurrent)) showComparePanel();
  }

  function updateControllerPanel() {
    if (!data || !data.controllers) return;
    var model = getSelectedController();
    var row = data.controllers.find(function (r) { return r['모델'] === model; });
    var container = document.getElementById('controllerSpecCards');
    if (!container) return;

    if (!row) {
      container.innerHTML = '<p class="product-intro-no-data">모델을 선택하세요.</p>';
      return;
    }
    container.innerHTML = renderSpecCardsFromRow(row, getControllerKeys());
    if (compareMode && (comparePrev || compareCurrent)) showComparePanel();
  }

  function updateHoodPanel() {
    if (!data || !data.hoodSizes) return;
    var type = getSelectedHood();
    var row = data.hoodSizes.find(function (r) { return r['TYPE'] === type; });
    var container = document.getElementById('hoodSpecCards');
    if (!container) return;

    if (!row) {
      container.innerHTML = '<p class="product-intro-no-data">TYPE을 선택하세요.</p>';
      setDimImage('hoodDimImageWrap', 'hoodDimImg', false);
      return;
    }
    container.innerHTML = renderSpecCardsFromRow(row, getHoodKeys());
    setDimImage('hoodDimImageWrap', 'hoodDimImg', true, DIM_IMG_BASE + 'SLH_Size.png');
    if (compareMode && (comparePrev || compareCurrent)) showComparePanel();
  }

  function updateShutterPanel() {
    if (!data || !data.shutterSizes) return;
    var type = getSelectedShutter();
    var row = data.shutterSizes.find(function (r) { return r['TYPE'] === type; });
    var container = document.getElementById('shutterSpecCards');
    if (!container) return;

    if (!row) {
      container.innerHTML = '<p class="product-intro-no-data">TYPE을 선택하세요.</p>';
      setDimImage('shutterDimImageWrap', 'shutterDimImg', false);
      return;
    }
    container.innerHTML = renderSpecCardsFromRow(row, getShutterKeys());
    setDimImage('shutterDimImageWrap', 'shutterDimImg', true, DIM_IMG_BASE + 'SLS_Size.png');
    if (compareMode && (comparePrev || compareCurrent)) showComparePanel();
  }

  function updateInletPanel() {
    if (!data || !data.inletSummary) return;
    var container = document.getElementById('inletSpecCards');
    if (!container) return;
    var html = '';
    data.inletSummary.forEach(function (row) {
      var item = row['항목'] || '';
      var val = row['값(mm)'] || '';
      var note = row['비고'] || '';
      var sub = note ? ' <span class="product-intro-card-unit">' + escapeHtml(note) + '</span>' : '';
      html += '<div class="product-intro-card">' +
        '<div class="product-intro-card-label">' + escapeHtml(item) + '</div>' +
        '<div class="product-intro-card-value">' + escapeHtml(formatVal(val)) + ' <span class="product-intro-card-unit">mm</span>' + sub + '</div>' +
        '</div>';
    });
    container.innerHTML = html || '<p class="product-intro-no-data">데이터가 없습니다.</p>';
    setDimImage('inletDimImageWrap', 'inletDimImg', !!(data && data.inletSummary && data.inletSummary.length), DIM_IMG_BASE + 'INLET_Size.png');
  }

  function showComparePanel() {
    var panel = document.getElementById('productIntroComparePanel');
    var colA = document.getElementById('compareCardsA');
    var colB = document.getElementById('compareCardsB');
    var titleA = document.getElementById('compareTitleA');
    var titleB = document.getElementById('compareTitleB');
    if (!panel || !colA || !colB) return;
    panel.hidden = false;
    if (titleA) titleA.textContent = comparePrev ? comparePrev : '이전 선택';
    if (titleB) titleB.textContent = compareCurrent ? compareCurrent : '현재 선택';
    var tab = currentTab;
    if (tab === 'motor') {
      if (comparePrev) {
        var rPrev = data.slbMotorSpecs.find(function (r) { return r['모델'] === comparePrev; });
        colA.innerHTML = rPrev ? renderSpecCardsFromRow(rPrev, getMotorSpecKeys()) : '';
      }
      if (compareCurrent) {
        var rCur = data.slbMotorSpecs.find(function (r) { return r['모델'] === compareCurrent; });
        colB.innerHTML = rCur ? renderSpecCardsFromRow(rCur, getMotorSpecKeys()) : '';
      }
    } else if (tab === 'fan') {
      var phase = getFanPhase();
      var list = phase === '1p' ? data.slf1P220V60Hz : data.slf3P220380V60Hz;
      var keys = phase === '1p' ? getSlf1PKeys() : getSlf3PKeys();
      if (comparePrev && list) {
        var rPrev = list.find(function (r) { return r['형식'] === comparePrev; });
        colA.innerHTML = rPrev ? renderSpecCardsFromRow(rPrev, keys) : '';
      }
      if (compareCurrent && list) {
        var rCur = list.find(function (r) { return r['형식'] === compareCurrent; });
        colB.innerHTML = rCur ? renderSpecCardsFromRow(rCur, keys) : '';
      }
    } else if (tab === 'controllers' && data.controllers) {
      if (comparePrev) {
        var rPrev = data.controllers.find(function (r) { return r['모델'] === comparePrev; });
        colA.innerHTML = rPrev ? renderSpecCardsFromRow(rPrev, getControllerKeys()) : '';
      }
      if (compareCurrent) {
        var rCur = data.controllers.find(function (r) { return r['모델'] === compareCurrent; });
        colB.innerHTML = rCur ? renderSpecCardsFromRow(rCur, getControllerKeys()) : '';
      }
    } else if (tab === 'hood' && data.hoodSizes) {
      if (comparePrev) {
        var rPrev = data.hoodSizes.find(function (r) { return r['TYPE'] === comparePrev; });
        colA.innerHTML = rPrev ? renderSpecCardsFromRow(rPrev, getHoodKeys()) : '';
      }
      if (compareCurrent) {
        var rCur = data.hoodSizes.find(function (r) { return r['TYPE'] === compareCurrent; });
        colB.innerHTML = rCur ? renderSpecCardsFromRow(rCur, getHoodKeys()) : '';
      }
    } else if (tab === 'shutter' && data.shutterSizes) {
      if (comparePrev) {
        var rPrev = data.shutterSizes.find(function (r) { return r['TYPE'] === comparePrev; });
        colA.innerHTML = rPrev ? renderSpecCardsFromRow(rPrev, getShutterKeys()) : '';
      }
      if (compareCurrent) {
        var rCur = data.shutterSizes.find(function (r) { return r['TYPE'] === compareCurrent; });
        colB.innerHTML = rCur ? renderSpecCardsFromRow(rCur, getShutterKeys()) : '';
      }
    }
  }

  function hideComparePanel() {
    var panel = document.getElementById('productIntroComparePanel');
    if (panel) panel.hidden = true;
  }

  function onCompareModeChange() {
    var cb = document.getElementById('productIntroCompareMode');
    compareMode = cb ? cb.checked : false;
    if (!compareMode) {
      comparePrev = null;
      compareCurrent = null;
      hideComparePanel();
      refreshCurrentTab();
      return;
    }
    compareCurrent = getCurrentSelectionValue();
    comparePrev = null;
    refreshCurrentTab();
  }

  function getCurrentSelectionValue() {
    switch (currentTab) {
      case 'motor': return getSelectedMotor();
      case 'fan': return getSelectedFan();
      case 'controllers': return getSelectedController();
      case 'hood': return getSelectedHood();
      case 'shutter': return getSelectedShutter();
      default: return null;
    }
  }

  function onSelectionChange() {
    var v = getCurrentSelectionValue();
    if (compareMode) {
      comparePrev = compareCurrent;
      compareCurrent = v;
      refreshCurrentTab();
      return;
    }
    refreshCurrentTab();
  }

  function refreshCurrentTab() {
    switch (currentTab) {
      case 'motor': updateMotorPanel(); break;
      case 'fan': updateFanPanel(); break;
      case 'controllers': updateControllerPanel(); break;
      case 'hood': updateHoodPanel(); break;
      case 'shutter': updateShutterPanel(); break;
      case 'inlet': updateInletPanel(); break;
    }
  }

  function switchTab(tabId) {
    currentTab = tabId;
    var tabs = document.querySelectorAll('.product-intro-tab');
    var panels = document.querySelectorAll('.product-intro-panel');
    tabs.forEach(function (t) {
      t.classList.toggle('active', t.getAttribute('data-tab') === tabId);
    });
    panels.forEach(function (p) {
      p.classList.toggle('active', p.id === 'panel-' + tabId);
    });
    if (tabId !== 'inlet') {
      comparePrev = null;
      compareCurrent = getCurrentSelectionValue();
    } else {
      comparePrev = null;
      compareCurrent = null;
      hideComparePanel();
    }
    refreshCurrentTab();
    if (!compareMode) hideComparePanel();
  }

  function initSelects() {
    if (!data) return;
    if (data.slbMotorSpecs) {
      fillSelect('selectMotor', data.slbMotorSpecs, '모델', '모델');
    }
    if (data.slf1P220V60Hz) {
      fillSelect('selectFan', data.slf1P220V60Hz, '형식', '형식');
    }
    if (data.controllers) {
      fillSelect('selectController', data.controllers, '모델', '모델');
    }
    if (data.hoodSizes) {
      fillSelect('selectHood', data.hoodSizes, 'TYPE', 'TYPE');
    }
    if (data.shutterSizes) {
      fillSelect('selectShutter', data.shutterSizes, 'TYPE', 'TYPE');
    }
  }

  function onFanPhaseChange() {
    var phase = getFanPhase();
    var list = phase === '1p' ? data.slf1P220V60Hz : data.slf3P220380V60Hz;
    var sel = document.getElementById('selectFan');
    if (sel && list) {
      sel.innerHTML = '';
      list.forEach(function (opt, i) {
        var o = document.createElement('option');
        o.value = opt['형식'];
        o.textContent = opt['형식'];
        if (i === 0) o.selected = true;
        sel.appendChild(o);
      });
    }
    updateFanPanel();
  }

  function init() {
    var section = document.getElementById('productIntroSection');
    if (!section) return;

    if (typeof window.SPEC_DATA !== 'undefined' && window.SPEC_DATA) {
      data = window.SPEC_DATA;
      onSpecDataReady();
      return;
    }
    fetch(SPECS_URL)
      .then(function (res) { return res.json(); })
      .then(function (json) {
        data = json;
        onSpecDataReady();
      })
      .catch(function () {
        section.innerHTML = '<p class="product-intro-no-data">제품 스펙 데이터를 불러올 수 없습니다.</p>';
      });
  }

  function onSpecDataReady() {
        initSelects();
        updateMotorPanel();
        updateFanPanel();
        updateControllerPanel();
        updateHoodPanel();
        updateShutterPanel();
        updateInletPanel();

        document.querySelectorAll('.product-intro-tab').forEach(function (btn) {
          btn.addEventListener('click', function () {
            switchTab(btn.getAttribute('data-tab'));
          });
        });

        ['selectMotor', 'selectFan', 'selectController', 'selectHood', 'selectShutter'].forEach(function (id) {
          var el = document.getElementById(id);
          if (el) el.addEventListener('change', onSelectionChange);
        });

        document.querySelectorAll('input[name="fanPhase"]').forEach(function (r) {
          r.addEventListener('change', onFanPhaseChange);
        });

        var compareCb = document.getElementById('productIntroCompareMode');
        if (compareCb) compareCb.addEventListener('change', onCompareModeChange);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
