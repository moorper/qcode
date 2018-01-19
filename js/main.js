chrome.tabs.getSelected(null, function(tab) {
    new QRCode(document.getElementById('qrcode'), tab.url);
    fetchShort(tab.url);
});

function fetchShort(url) {
    $.post("http://dwz.cn/create.php", {
        url: url,
        access_type: "web"
    }, function(data) {
        var data = JSON.parse(data);
        if (data.err_msg) {
            $("#short").attr("value", data.err_msg)
        } else {
            $("#short").attr("value", data.tinyurl)
        }
    })
}