function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function backingScale() {
  return ('devicePixelRatio' in window) && (window.devicePixelRatio > 1)
    ? window.devicePixelRatio
    : 1;
}

function setupCanvas(canvas) {
  var logicalWidth = parseInt(canvas.dataset.logicalWidth);
  var logicalHeight = parseInt(canvas.dataset.logicalHeight);

  canvas.width = logicalWidth * backingScale();
  canvas.height = logicalHeight * backingScale();
}

function getQueryStringValue(key) {
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}