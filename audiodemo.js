$(function() {
  $("#startBtn").click("click", function() {
    var endingUI = $("#startBtn");
    var bringUI = endingUI.animate({
      opacity: 0,
      height: "toggle"
    }, 1000, function() {

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContext();

      function playSweep() {
           let osc = audioCtx.createOscillator();
           osc.type = 'square';
           osc.frequency.value = 220;
           osc.connect(audioCtx.destination);
           osc.start();
           osc.stop(audioCtx.currentTime + 0.1);
      }


      $(document).click(function(e) {
        //playSweep();
        const u = Math.floor(Math.random() * 3 + 1);
        for (let i = 0; i < u; i++) {
          var div = $('<div class="image-wrapper">')
            .css({
              "left": getRndm(e.pageX) + 'px',
              "top": getRndm(e.pageY) + 'px'
            })
            .append($('<div class="bubble blob' + getRndm2().toString() + '">'))
            .appendTo(document.body);

          setTimeout(function() {
            div.addClass('fade-out');
            setTimeout(function() {
              div.remove();
            }, fadeDuration);
          }, fadeDelay);
        }
      });
    });
    // bringUI.onfinish = function() {
    //   endingUI.style.visibility = "hidden";
    // };

  });

  let fadeDelay = 3000;
  let fadeDuration = 3000;

});

const times = x => f => {
  if (x > 0) {
    f()
    times(x - 1)(f)
  }
}

// use it


function getRndm(number) {
  let num = Math.floor(Math.random() * 15) + 1;
  num *= Math.round(Math.random()) ? 1 : -1;
  return Math.floor(num + number);
}

function getRndm2() {
  return Math.floor(Math.random() * 3) + 1;
}
