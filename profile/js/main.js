$(function(){
   /*=================================================
    ナビメニュークリック時動作（全頁共通）
    ===================================================*/
    $(".hamburger").on("click",function(){
      //ハンバーガーメニューを閉じるボタンに変更
      $(".hamburger").toggleClass("active");
      //ナビを表示
      $(".nav").toggleClass("active");
      return false;
    });
    /*=================================================
    ロード時コメント表示（経歴詳細ページ）
    ===================================================*/
    $(window).on("load",function(){
      dispCommnt();
    }),

    /*=================================================
    スクロール時コメント表示（経歴詳細ページ）
    ===================================================*/

    $(window).on('scroll', function (){
      var timeoutId = null;
      clearTimeout(timeoutId);
      var tgtEl = $("[class^='comment-']");
      //falseなら処理終了
      if(!exitFlg()) return;
      //処理実行
      timeoutId = setTimeout( function(){
        dispCommnt();
      },800);

      //コメントが全て表示済みか確認
      function exitFlg(){
        //表示されてないコメントがあれば処理継続
        if(tgtEl.filter('.disp').length !== tgtEl.length){
          return true;
        }
      };

    })

  });

  /*=================================================
  コメント表示機能（経歴詳細ページ）
  ===================================================*/
  function dispCommnt(){
    var tgtEl = $("[class^='comment-']");
    tgtEl.not('.disp').each(function () {

      var elemOffset = $(this).offset().top;
      var scrollPos = $(window).scrollTop();
      var wh = $(window).height();

      if(scrollPos > elemOffset - wh + (wh / 5)){
        $(this).addClass("disp");
      }
    });
  }
  