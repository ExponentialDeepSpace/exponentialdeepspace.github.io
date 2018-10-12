var SOURCES = window.TEXT_VARIABLES.sources;
var PAHTS = window.TEXT_VARIABLES.paths;
window.Lazyload.js([SOURCES.jquery, PAHTS.search_js], function() {
  var searchData = window.TEXT_SEARCH_DATA ? initData(window.TEXT_SEARCH_DATA) : {};

  function memorize(f) {
    var cache = {};
    return function () {
      var key = Array.prototype.join.call(arguments, ',');
      if (key in cache) return cache[key];
      else return cache[key] = f.apply(this, arguments);
    };
  }

  function initData(data) {
    var _data = [], i, j, key, keys, cur;
    keys = Object.keys(data);
    for (i = 0; i < keys.length; i++) {
      key = keys[i], _data[key] = [];
      for (j = 0; j < data[key].length; j++) {
        cur = data[key][j];
        cur.title = window.decodeUrl(cur.title);
        cur.url = window.decodeUrl(cur.url);
        _data[key].push(cur);
      }
    }
    return _data;
  }

  /// search
  function searchByQuery(query) {
    var i, j, key, keys, cur, _title, result = {};
    keys = Object.keys(searchData);
    for (i = 0; i < keys.length; i++) {
      key = keys[i];
      for (j = 0; j < searchData[key].length; j++) {
        cur = searchData[key][j], _title = cur.title;
        if ((result[key] === undefined || result[key] && result[key].length < 4 )
          && _title.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
          if (result[key] === undefined) {
            result[key] = [];
          }
          result[key].push(cur);
        }
      }
    }
    return result;
  }

  var renderHeader = memorize(function(header) {
    return $('<p class="search-result__header">' + header + '</p>');
  });

  var renderItem = function(index, title, url) {
    return $('<li class="search-result__item" data-index="' + index + '"><a class="button" href="' + url + '">' + title + '</a></li>');
  };

  function render(data) {
    if (!data) {
      return null;
    }
    var $root = $('<ul></ul>'), i, j, key, keys, cur, itemIndex = 0;
    keys = Object.keys(data);
    for (i = 0; i < keys.length; i++) {
      key = keys[i];
      $root.append(renderHeader(key));
      for (j = 0; j < data[key].length; j++) {
        cur = data[key][j];
        $root.append(renderItem(itemIndex++, cur.title, cur.url));
      }
    }
    return $root;
  }

  // search box
  var $searchBox = $('.js-search-box');
  var $searchInput = $searchBox.children('input');
  var $searchClear = $searchBox.children('.js-icon-clear');
  var $result = $('.js-search-result'), $resultItems;
  var lastActiveIndex, activeIndex;

  function searchBoxEmpty() {
    $searchBox.removeClass('not-empty'); $result.html(null);
    $resultItems = $('.search-result__item'); activeIndex = 0;
  }

  $searchInput.on('input', window.throttle(function() {
    var val = $(this).val();
    if (val === '' || typeof val !== 'string') {
      searchBoxEmpty();
    } else {
      $searchBox.addClass('not-empty'); $result.html(render(searchByQuery(val)));
      $resultItems = $('.search-result__item'); activeIndex = 0;
      $resultItems.eq(0).addClass('active');
    }
  }, 400));
  $searchInput.on('focus', function() {
    $(this).addClass('focus');
  });
  $searchInput.on('blur', function() {
    $(this).removeClass('focus');
  });
  $searchClear.on('click', function() {
    $searchInput.val(''); searchBoxEmpty();
  });

  // search panel
  var $pageRoot = $('.js-page-root');
  var $pageMain = $('.js-page-main');
  var $searchToggle = $('.js-search-toggle');
  var showSearch = false;
  var scrollTop;

  function openSearchPanel() {
    scrollTop = $(window).scrollTop() || $pageMain.scrollTop();
    $pageRoot.addClass('show-search-panel');
    $pageMain.scrollTop(scrollTop);
    $searchInput[0].focus();
  }

  function closeSearchPanel() {
    $pageRoot.removeClass('show-search-panel');
    $(window).scrollTop(scrollTop);
    $searchInput[0].blur();
    setTimeout(function() {
      $searchInput.val(''); searchBoxEmpty();
      window.pageAsideAffix && window.pageAsideAffix.refresh();
    }, 400);
  }

  // Char Code: 13  Enter, 27  ESC, 37  ⬅, 38  ⬆, 39  ➡, 40  ⬇, 83  S, 191 /
  function isFormElement(e) {
    var tagName = e.target.tagName || e.srcElement.tagName;
    return tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA';
  }
  function charCodeFilter(e) {
    return e.target === $searchInput[0] && (e.which === 13 || e.which === 27 || e.which === 38 || e.which === 40);
  }

  function updateResultItems() {
    lastActiveIndex >= 0 && $resultItems.eq(lastActiveIndex).removeClass('active');
    activeIndex >= 0 && $resultItems.eq(activeIndex).addClass('active');
  }

  function moveActiveIndex(direction) {
    var itemsCount = $resultItems ? $resultItems.length : 0;
    if (itemsCount > 1) {
      lastActiveIndex = activeIndex;
      if (direction === 'up') {
        activeIndex = (activeIndex - 1 + itemsCount) % itemsCount;
      } else if (direction === 'down') {
        activeIndex = (activeIndex + 1 + itemsCount) % itemsCount;
      }
      updateResultItems();
    }
  }

  $(document).on('keyup', function(e) {
    if (!isFormElement(e) || charCodeFilter(e)) {
      if (e.which === 83 || e.which === 191) {
        showSearch || (showSearch = true, openSearchPanel());
      } else if (e.which ===  27) {
        showSearch && (showSearch = false, closeSearchPanel());
      } else if (e.which === 38) {
        showSearch && moveActiveIndex('up');
      } else if (e.which === 40) {
        showSearch && moveActiveIndex('down');
      } else if (e.which === 13) {
        showSearch && $resultItems && activeIndex >= 0 && $resultItems.eq(activeIndex).children('a')[0].click();
      }
    }
  });

  $result.on('mouseover', '.search-result__item > a', function() {
    var itemIndex = $(this).parent().data('index');
    itemIndex >= 0 && (lastActiveIndex = activeIndex, activeIndex = itemIndex, updateResultItems());
  });

  $searchToggle.on('click', function() {
    showSearch = !showSearch;
    showSearch ? openSearchPanel() : closeSearchPanel();
  });
});