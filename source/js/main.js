import {addTrackList} from './modules/track-list';

(function () {

  const wrapper = document.querySelector('.page-wrapper');
  const vinylizer = wrapper.querySelector('.vinylizer');
  const vinylizerButton = vinylizer.querySelector('.vinylizer__button');
  const vinylizerRecord = vinylizer.querySelector('.vinylizer__record');
  const vinylizerTonarm = wrapper.querySelector('.vinylizer__tonarm');
  const TONARM_START_ANGLE = 26;
  const TONARM_END_ANGLE = 43;
  const trackCurrentTime = vinylizer.querySelector('.vinylizer__current-time span');

  window.vinylizerRecordSpin = vinylizer.querySelector('.vinylizer__spin');
  window.audio = wrapper.querySelector('audio');

  vinylizerButton.addEventListener('click', function () {
    vinylizerRecordSpin.classList.toggle('playing');

    if (vinylizerRecordSpin.classList.contains('playing')) {
      vinylizerButton.style.transform = `rotate(180deg)`;
      audio.play();
    } else {
      vinylizerButton.style.transform = `rotate(0deg)`;
      audio.pause();
    }
  });

  audio.addEventListener('play', function() {
    vinylizerRecordSpin.classList.add('playing');
  });

  audio.addEventListener('ended', function () {
    vinylizerRecordSpin.classList.toggle('playing');
    vinylizerTonarm.style.transform = `rotate(0deg)`;
    trackCurrentTime.textContent = `00:00:000`;
  });

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

  vinylizerRecord.addEventListener('click', function (e) {
    const currentPointX = e.offsetX;
    const currentPointY = e.offsetY;
    const insideDistance = 85;
    const outsideDistance = e.currentTarget.offsetWidth / 2;

    let centrePoint = {
      x: e.currentTarget.offsetWidth / 2,
      y: e.currentTarget.offsetHeight / 2,
    }

    const allDistance = getDistance(centrePoint.x, centrePoint.y, currentPointX, currentPointY);

    if (allDistance > insideDistance && allDistance < outsideDistance) {
      audio.currentTime = audio.duration * (1 - ((allDistance - insideDistance) / (outsideDistance - insideDistance)));
      audio.play();
    }
  });

  addTrackList();
  changeAudioTime();

})();
