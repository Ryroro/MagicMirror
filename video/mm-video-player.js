Module.register("mm-video-player", {
  defaults: {
    startingVolume: 20,
    startingProgress: 0
  },
  getScripts: function() {
    return ["modules/mm-video-player/ks/jquery.js", "modules/mm-video-player/js/jquery-ui-min.js"];

  },
  getStyles: function() {

  },
  start: function() {
    Log.info("Starting module: " + this.name);
  },
  getDom: function() {
    var videos = [];
    var wrapper = document.createElement("div");
    var videoElement = document.createElement("video");
    var videoWrapper = document.createElement("div");
    var controlButton = document.createElement("div");
    var playButton = document.createElement("div");
    var pauseButton = document.createElement("div");
    var backButton = document.createElement("div");
    var nextButton = document.createElement("div");
    var volume = document.createElement("div");
    var volumeBar = document.createElement("div");
    var duration = document.createElement("div");
    var progressBar = document.createElement("div");
    var timeBar = document.createElement("div");
    var currentPlaying = document.createElement("div");
    var progressTime = document.createElement("div");
    var current = document.createElement("div");
    var duration = document.createElement("div");
    var progressBar = document.createElement("div");
    var timeBar = document.createElement("div");


    videoWrapper.className = "video";

    controlButton.className = "controlButton";
    controlButton.innerHTML = '<i class="va va-controlButton" aria-hidden="true"></i>';

    playButton.className = "playButton";
    playButton.innerHTML = '<i class="va va-controlButton" aria-hidden="true"></i>';

    pauseButton.className = "pauseButton";
    pauseButton.className = '<i class="va va-pauseButton" aria-hidden="true"></i>';

    backButton.className = "back";
    backButton.innerHTML = '<i class="va va-step-backward" aria-hidden="true"></i>';

    nextButton.className = "next";
    nextButton.innerHTML = '<i class="va va-step-forward" aria-hidden="true"></i>';

    volume.className = "videoVolume";
    volume.innerHTML = '<i class="va va-volume-down" aria-hidden="true"></i>';

    volumeBar.className = "volumeBar";
    currentlyPlaying.className = "Vplaying";

    progressTime.className = "progressTime";
    progressTime.innerHTML = '<i class="va va-progressTime" aria-hidden="true"></i>';

    duration.className = "duration";
    duration.innerHTML = '<i class="va va-duration-down" aria-hidden="true"></i>';

    current.className = "current";
    current.innerHTML = '<i class ="va va-current" aria-hidden="true"></i>';

    progressBar.className = "progressBar";
    timeBar.className = "timeBar";




    wrapper.appendChild(videoElement);
    wrapper.appendChild(videoWrapper);
    videoWrapper.appendChild(controlButton);
    controlButton.appendChild(playButton);
    controlButton.appendChild(pauseButton);
    controlButton.appendChild(pauseButton);
    controlButton.appendChild(backButton);
    controlButton.appendChild(nextButton);
    videoWrapper.appendChild(volume);
    videoWrapper.appendChild(volumeBar);
    videoWrapper.appendChild(currentlyPlaying);
    videoWrapper.appendChild(duration);
    videoWrapper.appendChild(progessBar);
    progressBar.appendChild(timeBar);
    progressTime.appendChild(current);
    progressTime.appendChild(duration);

    var startingVolume = this.config.startingVolume;
    var fadeDuration = this.config.fadeDuration;
    var startingProgess = this.config.startingProgress;



    function getVideos(callback){
      $.ajax({
        url:"/video",
        type: "GET",
        success: callback
      });
    }

    getVideos(function(result) {
      videos = result;
      length = videos.length;
      currentIndex = 0;
      function next(){
        currentIndex++;
        index = currentIndex % length;

      //get video time duration
      videos[index].on('loadedmetadata', function() {
        $('.duration').text(videos[index].duration);
      });
      //update video current play time
      videos[index].on('timeupdate', function() {
        $('.current').text(videos[index].currentTime);
        var currentPos = videos[index].currentTime;//Get current time
        var maxduration = videos[index].duration;//get video duration
        var percentage = 100 * currentPos / maxduration;
        $('.timeBar').css('width',percentage+'%');
      });

      var timeDrage = false; //Drag status
      $('.progressBar').mousedown(function(e) {
        timeDrag = true;
        updatebar(e.pageX);
      });

      $(document).mousemove(function(e) {
        if(timeDrag) {
          updatebar(e.pageX);
        }
      });

      var updatebar = function(x) {
        var progress = $('.progressBar');
        var maxduration = videos[index].duration; // video duration
        var position = x - progress.offset().left; //Click position
        var percentage = 100 * position / progress.width();

        if (percentage > 100) {
          percentage = 100;
        }
        if (percentage < 0) {
          percentage = 0;
        }

        $('.timeBar').css('width, percentage+'%);
        videos[index].currentTime = maxduration * percentage / 100;
      }



        $(currentlyPlaying).hide();
        $(currentlyPlaying).html(videos[index].fadeIn(fadeDuration);
        $(videoElement).attr('src', 'modules/mm-video-player/video/' + videos[index]);
        $(videoElement).trigger('play');
      }

      funtion back()
      {
        if(currentIndex <= 0) {
          currentIndex = 0;
        } else {
          currentIndex--;
        }
        index = currentIndex % length;

        if (index <= 0) {
          index = 0;
        }

        $(currentlyPlaying).hide();
        $(currentlyPlaying).html(videos[index]).fadeIn(fadeDuration);
        $(videoElement).attr('src', 'modules/mm-video-player/video/' + videos[Math.abs(index)]);
        $(videoElement).trigger('play');
      }
      $(videoElement).trigger('load');
      $(videoElement).attr('src', 'modules/mm-video-player/video/video/' + videos[0]);
      $(videoElement).prop('volume', (startingVolume/100));
      $(currentlyPlaying).html(videos[current].fadeIn(fadeDuration);

      $(videoElement).bind("ended", function() {
        next();
      });
     //function for play button control
      $(playButton).on("click", function() {
        $(videoElement).trigger('play');
        $(currentPlaying).html(videos[currentIndex]).fadeIn(fadeDuration);
      });
    //function for pause button control
      $(pauseButton).on("click", function() {
        $(videoElement).trigger('pause');
        $(currentlyPlaying).fadeOut(fadeDuration);
      });
    //function for next button control
      $(nextButton).on("click", function() {
        next();
      });
    //function for back button control
      $(backButton).on("click", function() {
        back();
      });

      $(function() {
        var vslider = $('.volumeBar');
        var vslider.slider({
          orientation:"vertical",
          range:"min",
          min:0,
          value: startingVolume,

          start: function(event, ui) {

          },

          slide: function(event, ui) {
            var value  = vslider.slider('value');
            volume = $('.volume');

            $(videoElement).prop('volume', (value/100));

            if(value <= 10) {
              volume.html('<i class="va va-volume-off" aria-hidden="true"></i>');

              if(value <= 1){
                $(videoElement).prop('volume', (0));
              }
            }
            else if (value <= 60) {
              volume.html('<i class="va va-volume-down" aria-hidden="true"></i>');

            }
            else if (value <= 90) {
              volume.html('<i class="va va-volume-up" aria-hidden="true"></i>');
            }
          }
        });
      });

    });
    return wrapper;
  }
});
