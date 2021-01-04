$(function() {
  $("#startBtn").click("click", function() {
    var endingUI = $("#startBtn");
    var bringUI = endingUI.animate({
      opacity: 0,
      height: "toggle"
    }, 1000, function() {
      $(document).click(function(e) {
        var div = $('<div class="image-wrapper">')
          .css({
            "left": getRndm(e.pageX) + 'px',
            "top": getRndm(e.pageY) + 'px'
          })
          .append($('<div class="bubble">'))
          .appendTo(document.body);

        setTimeout(function() {
          div.addClass('fade-out');
          setTimeout(function() {
            div.remove();
          }, fadeDuration);
        }, fadeDelay);
      });
    });
    // bringUI.onfinish = function() {
    //   endingUI.style.visibility = "hidden";
    // };

  });

  let fadeDelay = 3000;
  let fadeDuration = 3000;

});

function getRndm(number) {
  let num = Math.floor(Math.random() * 9) + 1; // this will get a number between 1 and 99;
  num *= Math.round(Math.random()) ? 1 : -1; // this will add minus sign in 50% of cases
  return Math.floor(num + number);
}
