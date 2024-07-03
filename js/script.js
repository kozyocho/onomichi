//トップに戻るボタン処理
$(function () {
  const pageTop = $("#js-pageTop-button");
  pageTop.hide();
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 300) {
      pageTop.fadeIn(300);
    } else {
      pageTop.fadeOut();
    }
  });

  pageTop.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
    return false;
  });
});

//スワイパー処理
// const about_swiper = new Swiper(".about__swiper", {
//   // Optional parameters
//   //direction: 'vertical',
//   loop: true,
//   spaceBetween: 10,
//   slidesPerView: "auto",
//   allowTouchMove: false, // スワイプ無効
//   speed: 6000,
//   autoplay: {
//     delay: 0, // 途切れなくループ
//   },

//   // // If we need pagination
//   // pagination: {
//   //   el: ".swiper-pagination",
//   // },

//   // // Navigation arrows
//   // navigation: {
//   //   nextEl: ".swiper-button-next",
//   //   prevEl: ".swiper-button-prev",
//   // },

//   // // And if we need scrollbar
//   // scrollbar: {
//   //   el: ".swiper-scrollbar",
//   // },
// });

let aboutSwiper;
let spotSwiper;
let swiperStatus;

window.addEventListener("load", () => {
  if (window.innerWidth > 887) {
    aboutSwiperCreate(20); // spaceBetweenを20に設定
    spotSwiperCreate(32);
    swiperStatus = true;
  } else {
    aboutSwiperCreate(10); // spaceBetweenを16に設定
    spotSwiperCreate(16);
    swiperStatus = true;
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth <= 887 && swiperStatus) {
    aboutSwiper.destroy(true, true);
    spotSwiper.destroy(true, true);
    aboutSwiperCreate(10); // spaceBetweenを16に設定
    spotSwiperCreate(16);
    swiperStatus = true;
  } else if (window.innerWidth > 887 && swiperStatus) {
    aboutSwiper.destroy(true, true);
    spotSwiper.destroy(true, true);
    aboutSwiperCreate(20); // spaceBetweenを20に設定
    spotSwiperCreate(32);
    swiperStatus = true;
  }
});

const aboutSwiperCreate = (spaceBetweenAbout) => {
  aboutSwiper = new Swiper(".about__swiper", {
    loop: true,
    spaceBetween: spaceBetweenAbout,
    slidesPerView: "auto",
    allowTouchMove: false, // スワイプ無効
    speed: 6000,
    autoplay: {
      delay: 0, // 途切れなくループ
    },
  });
};

const spotSwiperCreate = (spaceBetweenSpot) => {
  spotSwiper = new Swiper(".spot__swiper", {
    loop: true,
    loopAdditionalSlides: 3,
    spaceBetween: spaceBetweenSpot,
    slidesPerView: "auto",
    allowTouchMove: false, // スワイプ無効
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
};

// const spot_swiper = new Swiper(".spot__swiper", {
//   // Optional parameters
//   loop: true,
//   loopAdditionalSlides: 3,
//   spaceBetween: 16,
//   slidesPerView: "auto",
//   allowTouchMove: false, // スワイプ無効

//   // Navigation arrows
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
// });

//qaアコーディオン処理
$(function () {
  $(".qa__answer-box").hide();
  const firstQBox = $(".qa__question-box").first();
  firstQBox.addClass("qa__question-box--is-open");
  if (firstQBox.hasClass("qa__question-box--is-open")) {
    firstQBox.next().show(); // slideToggleではなくshowを使用して初期表示
  }
  $(".js-accordion").on("click", function (e) {
    e.preventDefault();

    $(this).toggleClass("qa__question-box--is-open");
    $(this).next().slideToggle();
  });
});

//ハンバーガーメニュー処理
$(function () {
  $("#js-drawer-icon").on("click", function (e) {
    e.preventDefault();

    // ドロワーメニューの表示処理
    $(".drawer-contents").slideToggle(function () {
      // スライドが完了した後にクラスをトグル
      $(this).toggleClass("is-open");

      // 背景スクロール禁止
      if ($(".drawer-contents").hasClass("is-open")) {
        $("body").css("overflow", "hidden");
      } else {
        $("body").css("overflow", "");
      }
    });

    // ドロワーアイコンの切り替え処理
    $(".drawer-icon").toggleClass("is-clicked");
  });
});

$('.drawer-contents__menu a[href^="#"]').on("click", function (e) {
  $(".drawer-contents").removeClass("is-open").slideUp();
  $(".drawer-icon").removeClass("is-clicked");
  $("body").css("overflow", "");
});

//スムーススクロール
//href属性の値が "#" で始まるすべての <a> 要素を選択
$('a[href^="#"]').on("click", function (e) {
  //クリックされた <a> 要素の href 属性の値を取得
  const id = $(this).attr("href");

  //取得した href 属性の値に基づいて、スクロール先の要素を特定する。id が空文字列の場合はページ上部("html")にスクロールするようにし、それ以外の場合は対応する要素を取得
  const target = $("#" == id ? "html" : id);
  //スクロール先の要素(target)のページ上部からの距離（位置）を取得
  const position = $(target).offset().top;
  const speed = 1000;

  $("html, body").animate(
    {
      //positionに移動
      scrollTop: position,
    },
    speed,
    "swing"
  );
});

//モーダル処理
$(function () {
  const dialogOpenButtons = document.querySelectorAll(".js-modal");
  const dialogCloseButtons = document.querySelectorAll(".js-close-button");

  dialogOpenButtons.forEach((button) => {
    const dialog = document.querySelector(button.dataset.dialog);

    button.addEventListener("click", () => {
      dialog.showModal();
      //背景をスクロール不可にする
      $("html, body").css("overflow", "hidden");
    });
  });

  dialogCloseButtons.forEach((button) => {
    const dialog = button.closest("dialog");

    button.addEventListener("click", () => {
      dialog.close();
      //背景をスクロール可能にする
      $("html, body").css("overflow", "visible");
    });
  });
});

//スワイパーオート再生処理
// swiper.autoplay.stop();
// window.addEventListener("scroll", function () {
//   var Swiper = document.querySelector(".swiper");
//   var position = Swiper.offsetTop - window.innerHeight + 100;
//   var scrollTop = window.scrollY;
//   if (scrollTop > position) {
//     swiper.autoplay.start();
//   } else {
//     swiper.autoplay.stop();
//   }
// });

//送信ボタン処理
$(document).ready(function () {
  const formElements = $("input, select, textarea");

  // フォーム送信時の処理
  $("#js-contact-send").on("click", function (e) {
    e.preventDefault();
    let isFormValid = true;

    formElements.each(function () {
      const isValid = this.checkValidity();
      if (!isValid) {
        isFormValid = false;
        $(this).addClass("is-empty");
      } else {
        $(this).removeClass("is-empty");
      }
    });

    if (isFormValid) {
      // 送信処理をここに記述
      alert("送信完了");
      // フォームの送信などを行う
      // $("form").submit(); // 実際の送信処理
    } else {
      console.log("入力内容にエラーがあります。");
    }
  });

  // 入力欄の変更をリアルタイムで監視する処理
  formElements.on("keyup", function () {
    const isValid = this.checkValidity();
    if (!isValid) {
      $(this).addClass("is-empty");
    } else {
      $(this).removeClass("is-empty");
    }
  });
});
