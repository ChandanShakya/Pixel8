(function () {
	"use strict";

	var header = document.querySelector(".site-header");
	if (!header) return;

	var toggle = header.querySelector(".nav-toggle");
	var nav = header.querySelector(".site-nav");
	if (!toggle || !nav) return;

	var mobileQuery = window.matchMedia("(max-width: 768px)");

	function setOpen(open) {
		header.classList.toggle("is-nav-open", open);
		toggle.setAttribute("aria-expanded", open ? "true" : "false");
		toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
		nav.setAttribute("aria-hidden", mobileQuery.matches && !open ? "true" : "false");

		if (mobileQuery.matches) {
			nav.inert = !open;
		} else {
			nav.inert = false;
			nav.setAttribute("aria-hidden", "false");
		}
	}

	function syncMode() {
		if (mobileQuery.matches) {
			setOpen(header.classList.contains("is-nav-open"));
		} else {
			header.classList.remove("is-nav-open");
			toggle.setAttribute("aria-expanded", "false");
			toggle.setAttribute("aria-label", "Open menu");
			nav.inert = false;
			nav.setAttribute("aria-hidden", "false");
		}
	}

	toggle.addEventListener("click", function () {
		setOpen(!header.classList.contains("is-nav-open"));
	});

	nav.addEventListener("click", function (event) {
		if (event.target.closest && event.target.closest("a")) {
			if (mobileQuery.matches) setOpen(false);
		}
	});

	document.addEventListener("keydown", function (event) {
		if (event.key === "Escape" && header.classList.contains("is-nav-open")) {
			setOpen(false);
			toggle.focus();
		}
	});

	document.addEventListener("click", function (event) {
		if (!mobileQuery.matches) return;
		if (!header.classList.contains("is-nav-open")) return;
		if (header.contains(event.target)) return;
		setOpen(false);
	});

	if (typeof mobileQuery.addEventListener === "function") {
		mobileQuery.addEventListener("change", syncMode);
	} else if (typeof mobileQuery.addListener === "function") {
		mobileQuery.addListener(syncMode);
	}

	syncMode();
})();
