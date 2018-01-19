chrome.tabs.getSelected(null, function(tab) {
    new QRCode(document.getElementById('qrcode'), tab.url);
    fetchShort(tab.url);
});

function fetchShort(url) {
    if (url.startsWith("http://") || url.startsWith("https://")) {
        $.get("https://u.nu/api.php", {
            action: "shorturl",
            format: "simple",
            url: url
        }, function(data) {
            $("#short").attr("value", data);
        })
    } else {
        $("#short").attr("value", "您输入的域名暂不支持生成短网址，请重新输入");
    }
}