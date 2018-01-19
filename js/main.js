var qrcode = new QRCode(document.getElementById("qrcode"), {
    width: 300,
    height: 300,
});
$("#short").on("input", function() {
    renderQRCode($("#short").val());
})

chrome.tabs.getSelected(null, function(tab) {
    fetchShort(tab.url);
    renderQRCode(tab.url);
});

function renderQRCode(url) {
    qrcode.clear();
    qrcode.makeCode(url);
}

function fetchShort(url) {
    if (url.startsWith("http://") || url.startsWith("https://")) {
        $.get("https://u.nu/api.php", {
            action: "shorturl",
            format: "simple",
            url: url
        }, function(data) {
            $("#short").val(data);
        })
    } else {
        $("#short").val("您输入的域名暂不支持生成短网址，请重新输入");
    }
}