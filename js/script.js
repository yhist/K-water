$(document).ready(function () {

  // 모바일 메뉴
  let mobileMenu = $('.mobile-menu');
  let mobileBt = $('.all-menu');
  mobileBt.click(function (event) {
    event.preventDefault();
    let wW = window.innerWidth;
    if (wW > 1000) {
      return;
    }
    mMainMenu.removeClass('m-mainmenu-active');
    mSubMenu.hide();
    mDepth3.hide();
    mobileMenu.toggleClass('mobile-menu-active');
    // 모바일 메뉴가 펼쳐졌는지 아닌지 판단(true/false)
    let temp = mobileMenu.hasClass('mobile-menu-active');
    if (temp) {
      $('html').css('overflow', 'hidden');
      $(this).find('img').attr('src', 'images/search_close.png');
    } else {
      $('html').css('overflow-y', 'auto');
      $(this).find('img').attr('src', 'images/main_allmenu.png');
    }
  });

  // 모바일 메뉴 depth1
  let mMenu = $('.m-menu');
  let mMenuLi = $('.m-menu > li');
  //주메뉴
  let mMainMenu = $('.m-mainmenu');
  //서브메뉴 depth2
  let mSubMenu = $('.m-submenu');
  //서브메뉴 depth3
  let mDepth3 = $('.m-depth3');
  $.each(mMenuLi, function (index, item) {

    let depth1 = $(this).find('.m-mainmenu');

    depth1.click(function (event) {
      event.preventDefault();
      // 현재 포커스가 있는지?
      let temp = $(this).hasClass('m-mainmenu-active');
      if (temp) {
        // temp는 true 가 나온 상황이 메뉴 오픈된 상태
        // 닫힌 상태로 바꾸어주어야 한다.
        $(this).removeClass('m-mainmenu-active');
        $(this).next().stop().slideUp();

      } else {
        mMainMenu.removeClass('m-mainmenu-active');
        $(this).addClass('m-mainmenu-active');
        mSubMenu.stop().slideUp();
        $(this).next().stop().slideDown();
      }
      mDepth3.stop().slideUp();
    });

  });
  $.each(mSubMenu, function (index, item) {
    let mSubMenuA = $(this).find('> li > a');
    mSubMenuA.click(function (event) {
      // depth3 가 있는지 검사
      let depth3 = $(this).next();
      if (depth3.length) {
        // depth3가 있는경우
        event.preventDefault();
        let tempShow = depth3.css('display')
        if (tempShow == 'none') {
          // 안보이고 있는상태라면 보이게 해준다.
          mDepth3.stop().slideUp();
          depth3.stop().slideDown();
        } else {
          // 보이고 있던상태라면 가려준다.
          depth3.stop().slideUp();
        }

      }
    });
  });

  // 마우스 휠 코드
  let section = $('.wrap > section');
  let footer = $('.footer');
  let sectionSpeed = 500;
  let sectionPos = [];
  let sectionIndex = 0;
  // 연속 휠 막기
  let scrollIng = false;
  // 화면사이즈 체크
  let wheelIng = true;
  let sectionMenu = $('.section-menu');

  function wheelCheckFn() {
    let wW = window.innerWidth;
    if (wW <= 1000) {
      wheelIng = false;
      sectionMenu.hide();
    } else {
      wheelIng = true;
      sectionMenu.show();
      mobileMenu.removeClass('mobile-menu-active');
      mobileBt.find('img').attr('src', 'images/main_allmenu.png');
    }
  }
  wheelCheckFn();
  $(window).resize(function () {
    wheelCheckFn();
  });


  // 위치 파악 (Y 스크롤 이동 px)
  function resetSection() {
    $.each(section, function (index, item) {
      let tempY = $(this).offset().top;
      tempY = Math.ceil(tempY);
      sectionPos[index] = tempY;
    });
    // footer의 위치를 추가 및 변경
    sectionPos[sectionPos.length] = Math.ceil(footer.offset().top);
  }
  // 최초에 새로고침 또는 실행시 위치값 파악
  resetSection();

  let sectionTotal = sectionPos.length;
  $(window).resize(function () {
    resetSection();
    if (wheelIng) {
      // 색상 셋팅
      sectionColor();
      gsap.to($('html'), sectionSpeed / 1000, {
        scrollTo: sectionPos[sectionIndex],
        onComplete: function () {
          scrollIng = false;
        }
      });
    }
  });

  // 스크롤바의 윗쪽 위치값을 파악한다.
  $(window).scroll(function () {

    if (wheelIng) {
      return;
    }

    let tempY = $(window).scrollTop();
    tempY = Math.ceil(tempY);
    for (let i = sectionTotal - 1; i >= 0; i--) {
      let tempMax = sectionPos[i];
      if (tempY >= tempMax) {
        sectionIndex = i;
        break;
      }
    }
  });


  // 마우스 휠 체크
  $(window).bind('mousewheel DOMMouseScroll', function (event) {

    let distance = event.originalEvent.wheelDelta;
    if (distance == null) {
      distance = event.originalEvent.detail * -1;
    }
    // 화면 사이즈에 따른 작동여부
    if (wheelIng != true) {
      return;
    }

    // 연속 휠 막기
    if (scrollIng) {
      return;
    }
    scrollIng = true;
    if (distance < 0) {
      sectionIndex++;
      if (sectionIndex >= sectionTotal) {
        sectionIndex = sectionTotal - 1;
      }
    } else {
      sectionIndex--;
      if (sectionIndex <= 0) {
        sectionIndex = 0;
      }
    }
    // 색상 셋팅
    sectionColor();
    gsap.to($('html'), sectionSpeed / 1000, {
      scrollTo: sectionPos[sectionIndex],
      onComplete: function () {
        scrollIng = false;

      }
    });

  });

  //섹션이동기능
  let sectionLink = $('.section-menu a');
  $.each(sectionLink, function (index, item) {
    $(this).click(function (event) {
      event.preventDefault();
      moveSection(index);
    });
  });

  function moveSection(_index) {
    // 보여질 section 번호를 저장 
    sectionIndex = _index;
    // 색상 셋팅
    sectionColor();
    // 이동모션
    gsap.to($('html'), sectionSpeed / 1000, {
      scrollTo: sectionPos[sectionIndex],
      onComplete: function () {
        scrollIng = false;
      }
    });

  }

  function sectionColor() {
    // 포커스 표현
    sectionLink.removeClass('section-menu-active');
    sectionLink.eq(sectionIndex).addClass('section-menu-active');
    // 색상 표현
    sectionLink.removeClass('section-menu-blue');
    if (sectionIndex != 2 && sectionIndex != 5) {
      sectionLink.addClass('section-menu-blue');
    }
  }
  sectionColor();
  let searchBt = $('.search-bt');
  let searchWrap = $('.search-wrap')
  searchWrap.click(function (event) {
    event.stopPropagation();
  })
  searchBt.click(function (event) {
    event.preventDefault();
    event.stopPropagation();
    searchWrap.stop().fadeToggle(300);

    // 검색 버튼 이미지 교체하기
    let imgName = $(this).find('img').attr('src');

    if (imgName == 'images/main_search.png') {
      $(this).find('img').attr('src', 'images/search_btn_close.png');
      $(this).css('background', '#3d66c4');
    } else {
      $(this).find('img').attr('src', 'images/main_search.png');
      $(this).css('background', '#fff');
    }

  });

  $('body').click(function () {
    searchWrap.stop().fadeOut(300);
    searchBt.find('img').attr('src', 'images/main_search.png');
    searchBt.css('background', '#fff');
  });





  // 링크사이트 펼침기능
  // footersite를저장
  let footerSite = $('.footer-site');
  // site-list를 저장
  let siteList = $('.site-list');
  footerSite.click(function () {
    let temp = $(this).hasClass('footer-site-open');
    if (temp == true) {
      siteList.stop().slideUp(500);
      $(this).removeClass('footer-site-open');
    } else {
      siteList.stop().slideDown(500);
      $(this).addClass('footer-site-open');
    }
  });

  footerSite.mouseleave(function () {
    siteList.stop().slideUp(500);
    $(this).removeClass('footer-site-open');
  });

});



window.onload = function () {
  // 랜덤 캐릭터(0~2)
  let rNum = Math.floor(Math.random() * 3);
  let rClass = 'about-box-char-' + rNum;
  let rTag = $('.about-box-sns');
  rTag.addClass(rClass);

  // 메뉴 기능
  let header = $('.header');
  let gnb = $('.gnb');
  let gnbH = gnb.height();
  gnb.mouseenter(function () {
    header.css('height', gnbH);
  });
  gnb.mouseleave(function () {
    header.css('height', 70)
  });


  // 비주얼 슬라이드
  let swVisualPc = new Swiper('.sw-visual', {
    slidesPerView: 3,
    grid: {
      rows: 2,
    },
    loop: true,
    navigation: {
      prevEl: '.sw-visual-prev',
      nextEl: '.sw-visual-next'
    },
    breakpoints: {
      760: {
        slidesPerView: 4,
        grid: {
          rows: 1,
        },
      },
      800: {
        slidesPerView: 4,
        grid: {
          rows: 1,
        },
      },
      960: {
        slidesPerView: 5,
        grid: {
          rows: 1,
        },
      },
      1080: {
        slidesPerView: 6,
        grid: {
          rows: 1,
        },
      },
      1200: {
        slidesPerView: 7,
        grid: {
          rows: 1,
        },
      },
      1260: {
        slidesPerView: 8,
        grid: {
          rows: 1,
        },
      },
    },
  });


  // visual 슬라이드 mb
  let swVisualMb = new Swiper('.sw-visual-mb', {
    resistance: true,
    resistanceRatio: 0
  });

  // 초기 애니메이션 아이콘 숨기기
  $('.visual-mb').click(function (event) {
    event.stopPropagation();
    $('.visual-mb-ani').fadeOut();
  });

  // about 슬라이드
  let swAbout = new Swiper('.sw-about', {
    loop: true,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    speed: 500,
    pagination: {
      el: '.sw-about-pg',
      type: 'fraction'
    },

    navigation: {
      prevEl: '.sw-about-prev',
      nextEl: '.sw-about-next'
    },
    allowTouchMove: false
  });
  let swAboutBt = $('.sw-about-pause');
  swAboutBt.click(function () {
    //현재 클래스 상태 확인
    let temp = $(this).hasClass('sw-about-play');
    if (temp == true) {
      swAbout.autoplay.start();
      $(this).removeClass('sw-about-play');
    } else {
      // 슬라이드멈춤
      swAbout.autoplay.stop();
      // 아이콘을 play 버튼으로 바꾼다
      // 사용자는 멈춘 슬라이드를 play하려고 할 것이다.
      $(this).addClass('sw-about-play');

    }
  });

  let swSid = new Swiper('.sw-sid', {
    loop: true,
    pagination: {
      el: '.sw-sid-pg',
      type: 'fraction'
    },
    navigation: {
      prevEl: '.sw-sid-prev',
      nextEl: '.sw-sid-next'
    },
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    // display 변경시 처리
    observer: true,
    observeParents: true

  });
  // 자동실행 멈춤
  let swSidPause = $('.sw-sid-pause');
  swSidPause.click(function () {
    // 현재 sw-sid-play 클래스가 있는가?
    let temp = $(this).hasClass('sw-sid-play');
    if (temp == false) {
      $(this).addClass('sw-sid-play');
      // 슬라이드멈추기
      swSid.autoplay.stop();
    } else {
      $(this).removeClass('sw-sid-play');
      // 슬라이드재생
      swSid.autoplay.start();
    }
  });

  // 뉴스 Top 영역 슬라이드
  // 슬라이드 옵션
  let swNewsListOpt = {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 12,
    navigation: {
      nextEl: '.sw-news-list-next',
      prevEl: '.sw-news-list-prev'
    },
    breakpoints: {
      700: {
        slidesPerView: 3
      },
      900: {
        slidesPerView: 4
      }
    }

  };
  // 슬라이드 저장
  let swNewsList;
  // = new Swiper('.sw-news-list', swNewsListOpt);  
  // 화면이 작아질때, 즉, 1000px 보다 작을 때 슬라이드 생성되어야 함.
  // 만약 1000px 보다 크면 슬라이드는 제거가 되어야 한다.
  $(window).resize(function () {
    // JQuery는 scroll 빼고 너비잡는다.
    // javascript
    let wW = window.innerWidth;

    if (wW <= 1000) {
      // 슬라이드 생성
      if (swNewsList == undefined) {
        swNewsList = new Swiper('.sw-news-list', swNewsListOpt);
      }
    } else {
      // 슬라이드 제거
      if (swNewsList != undefined) {
        swNewsList.destroy();
        swNewsList = undefined;
      }
    }
  });

  // 최초 진입 및 새로고침시에도 체크
  let wW = window.innerWidth;
  if (wW <= 1000) {
    // 슬라이드 생성
    if (swNewsList == undefined) {
      swNewsList = new Swiper('.sw-news-list', swNewsListOpt);
    }
  } else {
    // 슬라이드 제거
    if (swNewsList != undefined) {
      swNewsList.destroy();
      swNewsList = undefined;
    }
  }


  // 뉴스 탭메뉴
  // 탭 메뉴 저장
  let newsBottomMenu = $('.news-bottom-menu a');
  // 탭의 내용
  // html의 태그구조의 문제가 생김 
  let newsBottomCont = [
    // $('.news-box-bot').eq(0),
    $('.news-box-bot').eq(1),
    $('.news-box-bot').eq(2),
    $('.news-box-bot').eq(3)
  ];
  // 활성화될 번호 기억
  let newsBottomIdx = 0;

  // newsBottomCont[0].hide();
  // newsBottomCont[1].hide();
  // newsBottomCont[2].hide();
  // newsBottomCont[newsBottomIdx].show();
  // newsBottomMenu.removeClass('news-bottom-menu-active');
  // newsBottomMenu.eq(newsBottomIdx).addClass('news-bottom-menu-active');
  // 탭메뉴 클릭시 내용 보여주기
  $.each(newsBottomMenu, function (index, item) {
    $(this).click(function (event) {
      event.preventDefault();
      newsBottomMenu.removeClass('news-bottom-menu-active');
      $(this).addClass('news-bottom-menu-active');
      newsBottomCont[0].hide();
      newsBottomCont[1].hide();
      newsBottomCont[2].hide();
      newsBottomCont[index].show();
    });
  });
  // 화면 리사이징시 jquery css 제거
  $(window).resize(function () {
    // 화면 너비
    let wW = $(window).width();
    if (wW > 630) {
      newsBottomCont[0].removeAttr('style');
      newsBottomCont[1].removeAttr('style');
      newsBottomCont[2].removeAttr('style');
    } else {
      $.each(newsBottomMenu, function (index, item) {
        // 화면 리사이즈 마다 물어본다.
        let temp = $(this).hasClass('news-bottom-menu-active');
        if (temp) {
          newsBottomCont[0].hide();
          newsBottomCont[1].hide();
          newsBottomCont[2].hide();
          newsBottomCont[index].show();
        }
      });
    };
  });
};