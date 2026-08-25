const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");

playBtn.addEventListener("click", function () {

    if (audio.paused) {
        audio.play()
            .then(() => {
                playBtn.innerHTML = "⏸";
            })
            .catch((err) => {
                alert("Unable to play the audio. Check if ganesha.mp3 exists in the songs folder.");
                console.log(err);
            });

    } else {
        audio.pause();
        playBtn.innerHTML = "▶";
    }

});