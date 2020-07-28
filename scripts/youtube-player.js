const videoIDs = [
  'IyjRgJ7L5vc'
];

const iframeApi = document.createElement('script');
iframeApi.id = 'iframe-api';
iframeApi.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(iframeApi, firstScriptTag);

function onYouTubeIframeAPIReady() {
  videoIDs.map(videoId => {
    const player = new YT.Player(`${videoId}`, { // replaces the element with this ID
      playerVars: {
        'iv_load_policy': 3
      },
      videoId: videoId,
      events: {
        'onReady': onPlayerReady
      }
    });

    const { f: elementInfo } = player;
    const { style } = elementInfo;
    style.display = 'none';
  });
}

function onPlayerReady({ target }) {
  const { f: elementInfo } = target;
  const { style } = elementInfo;
  const videoWrapperId = `${elementInfo.id}-wrapper`;

  document.getElementById(videoWrapperId).onclick = function () {
    style.display = 'block';
    style['z-index'] = 99;
    target.playVideo();
  };
}