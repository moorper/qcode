var options = document.getElementsByName("shorter");

options.forEach(function(item) {
  item.addEventListener("change", function(event) {
    chrome.storage.sync.set({ shorter: this.value });
  });
});

chrome.storage.sync.get("shorter", function(object) {
  var shorter = object.shorter || 1;
  options.forEach(function(item) {
    if (shorter == item.value) {
      item.checked = "checked";
    }
  });
});
