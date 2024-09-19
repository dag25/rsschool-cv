import { addZero } from './supScript.js';
export const musicPlayerInit = () => {
  const background = document.querySelector('#background');
  const audio = document.querySelector('.audio');
	const audioImg = document.querySelector('.audio-img');
	const audioHeader = document.querySelector('.audio-header');
	const audioPlayer = document.querySelector('.audio-player');
  const audioNavigation = document.querySelector('.audio-navigation');
	const audioBtnPlay = document.querySelector('.audio-button__play');
	const audioProgress = document.querySelector('.audio-progress');
	const audioProgressTiming = document.querySelector('.audio-progress__timing');
	const audioTimePassed = document.querySelector('.audio-time__passed');
	const audioTimeTotal = document.querySelector('.audio-time__total');

  const playlist = ['Beyonce', 'Dua Lipa'];

  const nameTracks = ["Don't Hurt Yourself", "Don't Start Now"];

  let trackIndex = 0;
  const loadTrack = () => {
    const isPlayed = audioPlayer.paused;
    const track = playlist[trackIndex];
    background.src = `./assets/img/${track}.png`;
    audioImg.src = `./assets/img/${track}.png`;
    audioHeader.textContent = track.toUpperCase();
    audioPlayer.src = `./assets/audio/${track}.mp3`;
    if (isPlayed) {
      audioPlayer.pause();
    }else {
      audioPlayer.play();
    }
  };
  const prevTrack = () => {
    if (trackIndex !== 0) {
			trackIndex--;
		} else {
			trackIndex = playlist.length - 1;
		}
		loadTrack();
  };
  const nextTrack = () => {
    if (trackIndex === playlist.length - 1) {
			trackIndex = 0;
		} else {
			trackIndex++;
		}
		loadTrack();
  };

  audioNavigation.addEventListener('click', ({target}) => {
    if (target.closest('.audio-button__play')) {
			audio.classList.toggle('play');
			audioBtnPlay.classList.toggle('play_btn--toggle');
      if (audioPlayer.paused) {
        audioPlayer.play();
      }else {
        audioPlayer.pause();
      }
      const track = playlist[trackIndex];
      audioHeader.textContent = track.toUpperCase();
		}

    if (target.closest('.audio-button__prev')) {
			prevTrack();
		}
    if (target.closest('.audio-button__next')) {
      nextTrack();
		}
  });
  audioPlayer.addEventListener('ended', () => {
		nextTrack();
		audioPlayer.play();
	});

  audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    const progress = (currentTime / duration) * 100;
    audioProgressTiming.style.width = `${progress}%`;
    const minutesPassed = Math.floor(currentTime / 60) || '0';
    const secondsPassed = Math.floor(currentTime % 60) || '0';
    const minutesTotal = Math.floor(duration / 60) || '0';
    const secondsTotal = Math.floor(duration % 60) || '0';
    audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
    audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(
			secondsTotal)}`;
  });

  audioProgress.addEventListener('click', ({offsetX}) => {

    const allWidth = audioProgress.clientWidth;
    const progress = (offsetX / allWidth) * audioPlayer.duration;
    audioPlayer.currentTime = progress;
  });
};
