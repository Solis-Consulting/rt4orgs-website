(function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var stage = document.querySelector("#product-stage");
  var pilot = stage && stage.querySelector("iframe");

  function fitPilot() {
    if (!stage || !pilot) return;
    var design = stage.clientWidth < 520 ? 760 : 1280;
    pilot.style.width = design + "px";
    pilot.style.height = Math.ceil(stage.clientHeight / (stage.clientWidth / design)) + "px";
    pilot.style.transform = "scale(" + (stage.clientWidth / design) + ")";
  }

  if (stage && pilot) {
    fitPilot();
    window.addEventListener("resize", fitPilot);
  }

  var slides = Array.prototype.slice.call(document.querySelectorAll(".hero-carousel-slide"));
  var dots = Array.prototype.slice.call(document.querySelectorAll(".hero-carousel-dots button"));
  var active = 0;
  var timer;

  var caption = document.querySelector("#product-caption");

  function show(index) {
    active = index;
    slides.forEach(function (slide, i) {
      var on = i === index;
      slide.classList.toggle("is-active", on);
      slide.setAttribute("aria-hidden", on ? "false" : "true");
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle("is-active", i === index);
      if (i === index) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
    if (caption && slides[index]) caption.textContent = slides[index].getAttribute("data-caption") || "";
  }

  function start() {
    window.clearInterval(timer);
    timer = window.setInterval(function () {
      show((active + 1) % slides.length);
    }, 4500);
  }

  if (slides.length && dots.length) {
    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        show(i);
        start();
      });
    });
    show(0);
    start();
  }

  var form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var name = String(data.get("name") || "").trim();
      var org = String(data.get("org") || "").trim();
      var email = String(data.get("email") || "").trim();
      var message = String(data.get("message") || "").trim();
      var body = [
        "Name: " + name,
        "Organization: " + org,
        "Email: " + email,
        "",
        message
      ].join("\n");
      var href =
        "mailto:contact@solisconsultinggroup.com" +
        "?subject=" + encodeURIComponent("RT4Orgs — " + (org || "new list")) +
        "&body=" + encodeURIComponent(body);
      var note = form.querySelector(".form-note");
      if (note) note.textContent = "Opening your email app with this note.";
      window.location.href = href;
    });
  }

  var nodes = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    nodes.forEach(function (node) { node.classList.add("visible"); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  nodes.forEach(function (node) { observer.observe(node); });
})();
