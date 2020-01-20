var qrcode = new QRCode(document.getElementById("qrcode"), {
  width: 300,
  height: 300,
});
document.getElementById("short").addEventListener("input", function(event) {
  renderQRCode(document.getElementById("short").value);
});

chrome.tabs.getSelected(null, function(tab) {
  renderQRCode(tab.url);
  chrome.storage.sync.get("shorter", function(object) {
    var shorter = object.shorter || 1;
    switch (shorter) {
      case "1":
        fetchYourls("https://u.nu", tab.url);
        break;
      case "2":
        fetchYourls("https://biu.run", tab.url);
        break;
      case "3":
        fetchTinyURL(tab.url);
        break;
      default:
        fetchYourls("https://u.nu", tab.url);
        break;
    }
  });
});

function renderQRCode(url) {
  qrcode.clear();
  qrcode.makeCode(url);
}

/**
 * 基于 yourls 类型的服务商处理
 * @param shorter yourls 服务提供商
 * @param longUrl 原始长链接
 */
function fetchYourls(shorter, longUrl) {
  if (!validateUrl(longUrl)) {
    return;
  }
  var xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.addEventListener("load", function() {
    setShorterValue(this.responseText);
  });
  var url = new URL("api.php", shorter);
  url.searchParams.append("action", "shorturl");
  url.searchParams.append("format", "simple");
  url.searchParams.append("url", longUrl);
  xmlHttpRequest.open("get", url.toString());
  xmlHttpRequest.send();
}

/**
 * 基于 https://tinyurl.com
 * @param longUrl 原始长链接
 */
function fetchTinyURL(longUrl) {
  if (!validateUrl(longUrl)) {
    return;
  }
  var xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.addEventListener("load", function() {
    setShorterValue(this.responseText);
  });
  var url = new URL("api-create.php", "https://tinyurl.com");
  url.searchParams.append("url", longUrl);
  xmlHttpRequest.open("get", url.toString());
  xmlHttpRequest.send();
}

function validateUrl(url) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return true;
  } else {
    setShorterValue(chrome.i18n.getMessage("invalidUrl"));
    return false;
  }
}
function setShorterValue(text) {
  document.getElementById("short").value = text;
}
