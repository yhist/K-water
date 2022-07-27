$(document).ready(function () {

  // 검색 필드 기능
  // 검색 필드를 보여주는 버튼
  let searchBt = $('.search-bt');
  // 검색 필드
  let searchWrap = $('.search-wrap');


  // 검색필드 보여주는 버튼 클릭
  // 클릭할때 서서히 보이고 숨기기 토글
  // fadeToggle();

  searchWrap.click(function (event) {
    event.stopPropagation();
  });

  searchBt.click(function (event) {
    event.preventDefault();
    // 클릭된 것이 body로 못가게 막는다.
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


  // 링크 사이트 펼침 기능
  // footer-site를 지정
  let footerSite = $('.footer-site');
  // site-list 를 저장
  let siteList = $('.site-list');

  footerSite.click(function () {

    let temp = $(this).hasClass('footer-site-open');
    if (temp == true) {
      siteList.stop().slideUp(700);
      $(this).removeClass('footer-site-open');
    } else {
      siteList.stop().slideDown(600);
      $(this).addClass('footer-site-open');
    }
  });

  footerSite.mouseleave(function () {
    siteList.stop().slideUp(500);
    $(this).removeClass('footer-site-open');
  });

});


//   // footerSite 클릭하면 siteList 를 
//   // slideToggle()진행
//   footerSite.click(function(event){
//     event.preventDefault();
//     siteList.stop().slideToggle(500);
//     footerSite.toggleClass('footer-site-open');
//   })
//   footerSite.mouseleave(function(){
//     siteList.slideUp(700);
//     footerSite.removeClass('footer-site-open');

//   })
// });


window.onload = function () {

  // 랜덤 천사 기능(0~2)
  let rNum = Math.trunc(Math.random() * 3);
  let rClass = 'about-box-char-' + rNum;
  let rTag = $('.about-box-sns');
  rTag.addClass(rClass);


  // 메뉴기능
  let header = $('.header');
  let gnb = $('.gnb');
  let gnbH = gnb.height();
  console.log(gnbH);
  gnb.mouseenter(function () {
    header.css('height', gnbH);
  });
  gnb.mouseleave(function () {
    header.css('height', 70)
  });

  // 비주얼 슬라이드
  new Swiper('.sw-visual', {
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


  // about 슬라이드
  let swAbout = new Swiper('.sw-about', {
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    speed: 500,
    pagination: {
      el: '.sw-about-pg',
      type: 'fraction'
    },
    navigation: {
      nextEl: '.sw-about-next',
      prevEl: '.sw-about-prev'
    },
    // 커서로 슬라이더 이동 막기
    allowTouchMove: false
  });

  let swAboutBt = $('.sw-about-pause');
  swAboutBt.click(function () {
    // 현재 클래스 상태 체그
    let temp = $(this).hasClass('sw-about-play');
    if (temp == true) {
      // 슬라이드 자동 실해
      swAbout.autoplay.start();
      // 아이콘을 pause 버튼으로 바꾼다.
      // 사용자는 멈추기 위해서 클릭을 하도록 안내한다.
      $(this).removeClass('sw-about-play');
    } else {
      // 슬라이드 멈춘다.
      swAbout.autoplay.stop();
      // 아이콘을 play 버튼으로 바꾼다.
      // 사용자는 멈춘 슬라이드를 play 하려고 할 것 이다.
      $(this).addClass('sw-about-play');
    }
  })

  // news 슬라이드
  let swSid = new Swiper('.sw-sid', {
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.sw-sid-pg',
      type: 'fraction'
    },
    navigation: {
      nextEl: '.sw-sid-next',
      prevEl: '.sw-sid-prev'
    }
  });


  // 자동 실행 멈춤/재생
  let swSidPause = $('.sw-sid-pause');
  swSidPause.click(function () {

    // 현재 sw-sid-play 클래스 적용중?
    // true, false
    let temp = $(this).hasClass('sw-sid-play');
    if (temp == false) {

      $(this).addClass('sw-sid-play');
      // 슬라이드 멈추기
      swSid.autoplay.stop();

    } else {

      $(this).removeClass('sw-sid-play');
      // 슬라이드 재생
      swSid.autoplay.start();

    }

  });
};