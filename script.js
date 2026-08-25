const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

const tracks = [
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
];

let currentTrackIndex = 0;

function formatTime(seconds) {
  if (Number.isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

function setTrack(index) {
  currentTrackIndex = (index + tracks.length) % tracks.length;
  audio.src = tracks[currentTrackIndex];
  audio.load();
  if (!audio.paused) {
    audio.play();
  }
}

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

prevBtn.addEventListener('click', () => setTrack(currentTrackIndex - 1));
nextBtn.addEventListener('click', () => setTrack(currentTrackIndex + 1));

audio.addEventListener('play', () => {
  playBtn.textContent = '⏸';
});

audio.addEventListener('pause', () => {
  playBtn.textContent = '▶';
});

audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  const value = (audio.currentTime / audio.duration) * 100;
  progressBar.value = value || 0;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

progressBar.addEventListener('input', () => {
  if (audio.duration) {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
  }
});

audio.addEventListener('ended', () => {
  setTrack(currentTrackIndex + 1);
});
