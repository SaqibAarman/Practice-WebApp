// This Is Video Constrains
const constrains = {
  audio: false,
  video: {
    mandatory: {
      minWidth: 853,
      minHeight: 400,
      maxWidth: 853,
      maxHeight: 400,
    },
  },
};

function handleSuccess(videoEl, stream) {
  // Capture Video Source While Success
  videoEl.src = window.URL.createObjectURL(stream);
}

function handleError(error) {
  console.log("Camera Error : ", error);
}

exports.init = (nav, videoEl) => {
  nav.getUserMedia = nav.webkitGetUserMedia;

  // To Access Web-Cam Videos --> API
  nav.getUserMedia(
    constrains,
    (stream) => handleSuccess(videoEl, stream),
    handleError
  );
};

exports.captureBytes = (videoEl, ctx, canvasEl) => {
    // To Draw Current Video Frame On Canvas
  ctx.drawImage(videoEl, 0, 0);
  // Return/ Export Image in PNG
  return canvasEl.toDataURL("image/png");
};
