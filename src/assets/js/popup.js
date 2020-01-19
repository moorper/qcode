var qrcode = new QRCode(document.getElementById("qrcode"), {
  width: 300,
  height: 300,
});
document.getElementById("short").addEventListener("input", function(event) {
  renderQRCode(document.getElementById("short").value);
});

chrome.tabs.getSelected(null, function(tab) {
  var short = window.localStorage.getItem("shorter");
  switch (short) {
    case "1":
      fetchYourls("https://u.nu", tab.url);
      break;
    case "2":
      fetchYourls("https://biu.run", tab.url);
      break;
    default:
      fetchYourls("https://u.nu", tab.url);
      break;
  }

  renderQRCode(tab.url);
});

function renderQRCode(url) {
  qrcode.clear();
  qrcode.makeCode(url);
}

function fetchYourls(shorter, url) {
  if (!validateUrl(url)) {
    return;
  }
  var xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.addEventListener("load", function() {
    setShorterValue(this.responseText);
  });
  xmlHttpRequest.open("get", shorter + "/api.php?action=shorturl&format=simple&url=" + url);
  xmlHttpRequest.send();
}

function validateUrl(url) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return true;
  } else {
    setShorterValue("您输入的域名暂不支持生成短网址，请重新输入");
    return false;
  }
}
function setShorterValue(text) {
  document.getElementById("short").value = text;
}
