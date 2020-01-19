var short = window.localStorage.getItem("shorter") || 1;

var options = document.getElementsByName("shorter");
options.forEach(function(item) {
  if (short == item.value) {
    item.checked = "checked";
  }
  item.addEventListener("change", function(event) {
    console.log(this.value);
    window.localStorage.setItem("shorter", this.value);
  });
});
