const trackList = [
  {
    artist: "Zaz",
    name: "Je veux",
    path: "Zaz_-_Je_veux.mp3",
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

const addTrackList = () => {
  const wrapper = document.querySelector('.page-wrapper');
  const vinylizerRecordSpin = wrapper.querySelector('.vinylizer__spin');
  const audio = wrapper.querySelector('audio');
  const playlist = wrapper.querySelector('.playlist ul');
  const trackTemplate = document.getElementById('trackTemplate');

  /**
   * Возвращает название трека в виде строки 'Исполнитель - название трека'
   * @param {Object} track
   * @returns {String}
   */
  function setTrackName (track) {
    return `${track.artist} - ${track.name}`;
  }

  const fragment = document.createDocumentFragment();

  trackList.forEach(trackItem => {
    const track = trackTemplate.content.cloneNode(true);
    track.querySelector('p').textContent = setTrackName(trackItem);

    track.querySelector('li').addEventListener('click', function () {
      audio.setAttribute('src', `audio/${trackItem.path}`);
      audio.setAttribute('type', `audio/${trackItem.type}`);

      vinylizerRecordSpin.querySelector('svg textPath').textContent = setTrackName(trackItem);
      audio.play();
    });

    fragment.appendChild(track);
  });

  playlist.appendChild(fragment);

  audio.src = `audio/${trackList[0].path}`;
  vinylizerRecordSpin.querySelector('svg textPath').textContent = setTrackName(trackList[0]);;
};

export {addTrackList};
