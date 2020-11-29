const addTrackList = () => {
  let trackList = [
    {
      artist: "Zaz",
      name: "Je veux",
      path: "Zaz_-_Je_veux.mp3",
      type: 'mp3'
    },
    {
      artist: "Океан Ельзи",
      name: "Відпусти",
      path: "Океан_Ельзи_-_Відпусти.mp3",
      type: 'mp3'
    },
    {
      artist: "Red Hot Chili Peppers",
      name: "Can't stop",
      path: "Red_Hot_Chili_Peppers_-_Can't_stop.mp3",
      type: 'mp3'
    },
    {
      artist: "Ava Max",
      name: "Kings & Queens",
      path: "Ava_Max_-_Kings_&_Queens.mp3",
      type: 'mp3'
    },
    {
      artist: "Chris De Burgh",
      name: "Lady in red",
      path: "Chris_De_Burgh_-_LADY_IN_RED.mp3",
      type: 'mp3'
    },
    {
      artist: "Reamonn",
      name: "Tonight",
      path: "Reamonn_-_Tonight.mp3",
      type: 'mp3'
    },
    {
      artist: "Tanita Tikaram",
      name: "Twist In My Sobriety",
      path: "Tanita_Tikaram_-_Twist_In_My_Sobriety.mp3",
      type: 'mp3'
    },
  ];

  const playlist = document.querySelector('.playlist ul');
  const trackTemplate = document.getElementById('trackTemplate');

  /**
   * Возвращает название трека в виде строки 'Исполнитель - название трека'
   * @param {Object} track
   * @returns {String}
   */
  function setTrackName (track) {
    return `${track.artist} - ${track.name}`;
  }

  let track;

  trackList.forEach(trackItem => {
    track = trackTemplate.content.cloneNode(true);
    track.querySelector('p').textContent = setTrackName(trackItem);

    track.querySelector('li').addEventListener('click', function () {
      window.audio.setAttribute('src', `../audio/${trackItem.path}`);
      window.audio.setAttribute('type', `audio/${trackItem.type}`);

      window.vinylizerRecordSpin.querySelector('svg textPath').textContent = setTrackName(trackItem);
      window.audio.play();
    });

    playlist.appendChild(track);
  });

  window.audio.src = `../audio/${trackList[0].path}`;
  window.vinylizerRecordSpin.querySelector('svg textPath').textContent = setTrackName(trackList[0]);;
};

export {addTrackList};
