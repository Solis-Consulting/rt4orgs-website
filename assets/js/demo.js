(function () {
  var rows = document.querySelectorAll("[data-prospect]");
  var search = document.querySelector("[data-wire-search]");
  var status = document.querySelector("[data-wire-status]");
  function paint() {
    var q = (search.value || "").trim().toLowerCase();
    var filter = status.value;
    rows.forEach(function (row) {
      var text = row.textContent.toLowerCase();
      var rowStatus = row.getAttribute("data-prospect");
      var show = (!q || text.indexOf(q) !== -1) && (filter === "all" || filter === rowStatus);
      row.hidden = !show;
    });
  }
  search.addEventListener("input", paint);
  status.addEventListener("change", paint);
  document.querySelectorAll("[data-mark]").forEach(function (button) {
    button.addEventListener("click", function () {
      var row = button.closest("[data-prospect]");
      row.setAttribute("data-prospect", "messaged");
      row.querySelector("[data-status]").textContent = "Messaged";
      button.classList.add("is-sent");
      button.textContent = "Sent";
      paint();
    });
  });
})();
