const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progressContainer = document.querySelector('.progress-bar');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const playlistEl = document.getElementById('playlist');

const songs = [
  {
    title: "Song One",
    artist: "Artist One",
    src: "songs/song1.mp3"
  },
  {
    title: "Song Two",
    artist: "Artist Two",
    src: "songs/song2.mp3"
  },
  {
    title: "Song Three",
    artist: "Artist Three",
    src: "songs/song3.mp3"
  }
];

let songIndex = 0;

function loadSong(song) {
  title.innerText = song.title;
  artist.innerText = song.artist;
  audio.src = song.src;
}

function playSong() {
  audio.play();
  playBtn.innerText = '⏸️';
}

function pauseSong() {
  audio.pause();
  playBtn.innerText = '▶️';
}

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

prevBtn.addEventListener('click', () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

nextBtn.addEventListener('click', () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

audio.addEventListener('timeupdate', updateProgress);

function updateProgress() {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const mins = Math.floor(audio.currentTime / 60);
    const secs = Math.floor(audio.currentTime % 60);
    currentTimeEl.innerText = `${mins}:${secs < 10 ? '0' + secs : secs}`;

    const durMins = Math.floor(audio.duration / 60);
    const durSecs = Math.floor(audio.duration % 60);
    durationEl.innerText = `${durMins}:${durSecs < 10 ? '0' + durSecs : durSecs}`;
  }
}

progressContainer.addEventListener('click', (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
});

volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

// Load Playlist
songs.forEach((song, index) => {
  const li = document.createElement('li');
  li.innerText = `${song.title} - ${song.artist}`;
  li.addEventListener('click', () => {
    songIndex = index;
    loadSong(song);
    playSong();
  });
  playlistEl.appendChild(li);
});

// Autoplay next song
audio.addEventListener('ended', () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

// Init
loadSong(songs[songIndex]);
volume.value = 0.5;
audio.volume = 0.5;
