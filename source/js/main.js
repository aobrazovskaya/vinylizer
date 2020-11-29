import {addTrackList} from './track-list';

(function () {
  const TONARM_START_ANGLE = 26;
  const TONARM_END_ANGLE = 43;
  const INSIDE_VINYLIZER_DISTANCE = 85;

  const wrapper = document.querySelector('.page-wrapper');
  const vinylizer = wrapper.querySelector('.vinylizer');
  const vinylizerButton = vinylizer.querySelector('.vinylizer__button');
  const vinylizerRecord = vinylizer.querySelector('.vinylizer__record');
  const vinylizerTonarm = wrapper.querySelector('.vinylizer__tonarm');
  const trackCurrentTime = vinylizer.querySelector('.vinylizer__current-time span');
  const vinylizerRecordSpin = vinylizer.querySelector('.vinylizer__spin');
  const audio = wrapper.querySelector('audio');

  const centreVinylizerPoint = {
    x: vinylizerRecord.offsetWidth / 2,
    y: vinylizerRecord.offsetHeight / 2,
  }

  /**
   * Меняет положение тонарма в зависимости от текущего времени трека
   * @param {Number} currentTime текущее время трека
   * @param {Number} duration длительность трека
   */
  function tonarmPosition(currentTime, duration) {
    let currentPersent = currentTime / duration * 100;
    let currentDeg = (currentPersent * (TONARM_END_ANGLE - TONARM_START_ANGLE) / 100 + TONARM_START_ANGLE).toFixed(1);
    vinylizerTonarm.style.transform = `rotate(${currentDeg}deg)`;
  }

  /**
   * Меняет строку с временем трека при изменении текущего времени трека
   */
  function changeAudioTime() {
    let currentTime = 0;
    let milliseconds = 0;
    let seconds = 0;
    let minutes = 0;

    audio.addEventListener('timeupdate', function () {
      currentTime = audio.currentTime * 1000;
      milliseconds = parseInt((currentTime % 1000));
      seconds = Math.floor((currentTime / 1000) % 60);
      minutes = Math.floor((currentTime / (1000 * 60)) % 60);

      milliseconds = ((milliseconds < 100) ? "0" + milliseconds : (milliseconds < 10) ? "00" + milliseconds : milliseconds);
      seconds = (seconds < 10) ? "0" + seconds : seconds;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      trackCurrentTime.textContent = `${minutes}:${seconds}:${milliseconds}`;

      tonarmPosition(audio.currentTime, audio.duration);
    });
  }

  /**
   * Возвращает растояние между двумя точками
   * @param {Number} x1 положение первой точки по оси x
   * @param {Number} y1 положение первой точки по оси y
   * @param {Number} x2 положение второй точки по оси x
   * @param {Number} y2 положение второй точки по оси y
   * @returns {Number} расстояние между точками
   */
  function getDistance(x1, y1, x2, y2) {
    return Math.floor(Math.hypot(x2 - x1, y2 - y1));
  }

  vinylizerButton.addEventListener('click', function () {
    vinylizerRecordSpin.classList.toggle('playing');

    if (vinylizerRecordSpin.classList.contains('playing')) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  audio.addEventListener('play', function() {
    vinylizerButton.classList.add('vinylizer__button--playing');
    vinylizerRecordSpin.classList.add('playing');
  });

  audio.addEventListener('pause', function() {
    vinylizerButton.classList.remove('vinylizer__button--playing');
  });

  audio.addEventListener('ended', function () {
    vinylizerRecordSpin.classList.toggle('playing');
    vinylizerButton.classList.remove('vinylizer__button--playing');
    vinylizerTonarm.style.transform = `rotate(0deg)`;
    trackCurrentTime.textContent = `00:00:000`;
  });

  vinylizerRecord.addEventListener('click', function (e) {
    const allDistance = getDistance(centreVinylizerPoint.x, centreVinylizerPoint.y, e.offsetX, e.offsetY);

    if (allDistance > INSIDE_VINYLIZER_DISTANCE && allDistance < centreVinylizerPoint.x) {
      audio.currentTime = audio.duration * (1 - ((allDistance - INSIDE_VINYLIZER_DISTANCE) / (centreVinylizerPoint.x - INSIDE_VINYLIZER_DISTANCE)));
      audio.play();
    }
  });

  addTrackList();
  changeAudioTime();
})();
