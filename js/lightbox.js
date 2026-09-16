(function () {
	"use strict";

	var galleryItems = Array.prototype.slice.call(
		document.querySelectorAll(".media-grid figure")
	);
	var attrCards = Array.prototype.slice.call(
		document.querySelectorAll(".attr-card")
	);

	if (!galleryItems.length && !attrCards.length) return;

	var activeList = [];
	var currentIndex = 0;
	var lastFocus = null;

	var overlay = document.createElement("div");
	overlay.className = "lightbox";
	overlay.setAttribute("role", "dialog");
	overlay.setAttribute("aria-modal", "true");
	overlay.setAttribute("aria-label", "Media preview");
	overlay.hidden = true;

	overlay.innerHTML =
		'<div class="lightbox-dialog">' +
		'  <button type="button" class="lightbox-close" aria-label="Close preview">&times;</button>' +
		'  <button type="button" class="lightbox-nav lightbox-prev" aria-label="Previous item">&#10094;</button>' +
		'  <button type="button" class="lightbox-nav lightbox-next" aria-label="Next item">&#10095;</button>' +
		'  <div class="lightbox-stage"></div>' +
		'  <p class="lightbox-caption"></p>' +
		'  <p class="lightbox-counter" aria-live="polite"></p>' +
		"</div>";

	document.body.appendChild(overlay);

	var stage = overlay.querySelector(".lightbox-stage");
	var caption = overlay.querySelector(".lightbox-caption");
	var counter = overlay.querySelector(".lightbox-counter");
	var closeBtn = overlay.querySelector(".lightbox-close");
	var prevBtn = overlay.querySelector(".lightbox-prev");
	var nextBtn = overlay.querySelector(".lightbox-next");

	function isVideo(media) {
		return media && media.tagName === "VIDEO";
	}

	function getGalleryLabel(figure, media) {
		var figcaption = figure.querySelector("figcaption");
		return String(
			figure.getAttribute("data-caption") ||
				(figcaption && figcaption.textContent) ||
				(media && media.getAttribute("alt")) ||
				"Media"
		).trim();
	}

	function getAttrLabel(card, media) {
		var title = card.querySelector(".attr-card-title");
		var titleText = title ? title.textContent.replace(/^\s*\d+\.\s*/, "").trim() : "";
		if (titleText) return titleText;
		if (media) {
			var alt = media.getAttribute("alt") || media.getAttribute("title") || "";
			if (alt) return alt.replace(/^Preview of\s*/i, "").trim();
			var src = media.getAttribute("src") || "";
			var parts = src.split("/");
			return parts[parts.length - 1] || "Media";
		}
		return "Media";
	}

	function getItemMedia(item) {
		if (!item) return null;
		if (item.classList && item.classList.contains("attr-card")) {
			return item.querySelector(".attr-thumb, video, img");
		}
		return item.querySelector("img, video");
	}

	function getItemLabel(item, media) {
		if (item.classList && item.classList.contains("attr-card")) {
			return getAttrLabel(item, media);
		}
		return getGalleryLabel(item, media);
	}

	function groupLabel(item) {
		if (!item || !item.closest) return "";
		var grid = item.closest(".media-grid");
		if (!grid) return "";
		var head = grid.previousElementSibling;
		while (head && !/^H[1-6]$/.test(head.tagName)) head = head.previousElementSibling;
		return head ? head.textContent.trim() : "";
	}

	function groupFor(item) {
		if (!item || !item.closest) return galleryItems;
		var grid = item.closest(".media-grid");
		if (!grid) return galleryItems;
		return Array.prototype.slice.call(grid.querySelectorAll("figure"));
	}

	function clearStage() {
		stage.innerHTML = "";
	}

	function renderAt(index) {
		var list = activeList;
		if (!list.length) return;

		currentIndex = ((index % list.length) + list.length) % list.length;
		var item = list[currentIndex];
		var media = getItemMedia(item);
		if (!media) return;

		var src = media.getAttribute("src") || "";
		if (!src) return;

		var label = getItemLabel(item, media);
		clearStage();

		if (isVideo(media)) {
			var video = document.createElement("video");
			video.className = "lightbox-media";
			video.src = src;
			video.controls = true;
			video.autoplay = true;
			video.playsInline = true;
			video.setAttribute("playsinline", "");
			video.setAttribute("controlsList", "nodownload");
			stage.appendChild(video);
		} else {
			var img = document.createElement("img");
			img.className = "lightbox-media";
			img.src = src;
			img.alt = label;
			stage.appendChild(img);
		}

		caption.textContent = /^\d+$/.test(label) ? "" : label;
		var group = groupLabel(item).toLowerCase();
		var kind = /video|motion/.test(group) ? "Motion" : "Photo";
		counter.innerHTML = "";
		var kindEl = document.createElement("span");
		kindEl.className = "lb-kind";
		kindEl.textContent = kind;
		var countEl = document.createElement("span");
		countEl.className = "lb-count";
		countEl.textContent = (currentIndex + 1) + " / " + list.length;
		counter.appendChild(kindEl);
		counter.appendChild(countEl);

		var multi = list.length > 1;
		prevBtn.hidden = !multi;
		nextBtn.hidden = !multi;
	}

	function openFromItem(item, list) {
		if (!item) return;
		activeList = list && list.length ? list : [item];

		var index = activeList.indexOf(item);
		if (index < 0) index = 0;

		lastFocus = document.activeElement;
		overlay.hidden = false;
		void overlay.offsetWidth;
		overlay.classList.add("is-open");
		document.body.classList.add("lightbox-open");
		renderAt(index);
		closeBtn.focus();
	}

	function showNext() {
		if (!overlay.classList.contains("is-open")) return;
		renderAt(currentIndex + 1);
	}

	function showPrev() {
		if (!overlay.classList.contains("is-open")) return;
		renderAt(currentIndex - 1);
	}

	function closeLightbox() {
		if (!overlay.classList.contains("is-open")) return;

		overlay.classList.remove("is-open");
		document.body.classList.remove("lightbox-open");

		var openVideo = stage.querySelector("video");
		if (openVideo) openVideo.pause();

		window.setTimeout(function () {
			if (!overlay.classList.contains("is-open")) {
				overlay.hidden = true;
				clearStage();
				caption.textContent = "";
				counter.textContent = "";
			}
		}, 200);

		if (lastFocus && lastFocus.focus) {
			lastFocus.focus();
		}
	}

	function isInteractiveCreditTarget(target) {
		return !!(target.closest && target.closest(".media-credit, .attr-used-link, .attr-path a, .attr-repo"));
	}

	// Gallery tiles
	galleryItems.forEach(function (figure) {
		figure.setAttribute("tabindex", "0");
		figure.setAttribute("role", "button");
		var mediaEl = figure.querySelector("img, video");
		figure.setAttribute("aria-label", "Open " + getGalleryLabel(figure, mediaEl));

		var inlineVideo = figure.querySelector("video");
		if (inlineVideo) {
			inlineVideo.removeAttribute("controls");
			inlineVideo.muted = true;
			inlineVideo.setAttribute("muted", "");
			inlineVideo.setAttribute("playsinline", "");
			inlineVideo.preload = "metadata";
		}

		figure.addEventListener("click", function (event) {
			if (isInteractiveCreditTarget(event.target)) return;
			openFromItem(figure, groupFor(figure));
		});

		figure.addEventListener("keydown", function (event) {
			if (event.target.classList && event.target.classList.contains("media-credit")) {
				return;
			}
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				openFromItem(figure, groupFor(figure));
			}
		});
	});

	// Attribution cards (credits page)
	attrCards.forEach(function (card) {
		var mediaBox = card.querySelector(".attr-card-media");
		var media = getItemMedia(card);
		if (!mediaBox || !media) return;

		mediaBox.classList.add("is-lightbox-trigger");
		mediaBox.setAttribute("tabindex", "0");
		mediaBox.setAttribute("role", "button");
		mediaBox.setAttribute("aria-label", "Open preview: " + getItemLabel(card, media));

		// Inline video thumb: poster-style only; play in lightbox
		if (isVideo(media)) {
			media.removeAttribute("controls");
			media.muted = true;
			media.setAttribute("muted", "");
			media.setAttribute("playsinline", "");
			media.preload = "metadata";
		}

		var group = card.closest(".attr-cards");
		var list = group
			? Array.prototype.slice.call(group.querySelectorAll(".attr-card"))
			: attrCards;

		mediaBox.addEventListener("click", function (event) {
			if (isInteractiveCreditTarget(event.target)) return;
			event.preventDefault();
			openFromItem(card, list);
		});

		mediaBox.addEventListener("keydown", function (event) {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				openFromItem(card, list);
			}
		});
	});

	closeBtn.addEventListener("click", closeLightbox);
	prevBtn.addEventListener("click", function (event) {
		event.stopPropagation();
		showPrev();
	});
	nextBtn.addEventListener("click", function (event) {
		event.stopPropagation();
		showNext();
	});

	overlay.addEventListener("click", function (event) {
		if (event.target === overlay) closeLightbox();
	});

	document.addEventListener("keydown", function (event) {
		if (!overlay.classList.contains("is-open")) return;

		if (event.key === "Escape") {
			closeLightbox();
		} else if (event.key === "ArrowRight" || event.key === " ") {
			event.preventDefault();
			showNext();
		} else if (event.key === "ArrowLeft") {
			event.preventDefault();
			showPrev();
		}
	});
})();
