//< " ПОДКЛЮЧЕНИЕ JS КОМПОНЕНТОВ " >=============================================================================================================>//
function dynamicAdaptive() {
	function DynamicAdapt(type) {
		this.type = type;
	}

	DynamicAdapt.prototype.init = function () {
		const _this = this;
		this.оbjects = [];
		this.daClassname = "_dynamic_adapt_";
		this.nodes = document.querySelectorAll("[data-da]");

		for (let i = 0; i < this.nodes.length; i++) {
			const node = this.nodes[i];
			const data = node.dataset.da.trim();
			const dataArray = data.split(",");
			const оbject = {};
			оbject.element = node;
			оbject.parent = node.parentNode;
			оbject.destination = document.querySelector(dataArray[0].trim());
			оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
			оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.оbjects.push(оbject);
		}

		this.arraySort(this.оbjects);

		this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
			return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
		}, this);
		this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
			return Array.prototype.indexOf.call(self, item) === index;
		});

		for (let i = 0; i < this.mediaQueries.length; i++) {
			const media = this.mediaQueries[i];
			const mediaSplit = String.prototype.split.call(media, ',');
			const matchMedia = window.matchMedia(mediaSplit[0]);
			const mediaBreakpoint = mediaSplit[1];

			const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
				return item.breakpoint === mediaBreakpoint;
			});
			matchMedia.addListener(function () {
				_this.mediaHandler(matchMedia, оbjectsFilter);
			});
			this.mediaHandler(matchMedia, оbjectsFilter);
		}
	};

	DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
		if (matchMedia.matches) {
			for (let i = 0; i < оbjects.length; i++) {
				const оbject = оbjects[i];
				оbject.index = this.indexInParent(оbject.parent, оbject.element);
				this.moveTo(оbject.place, оbject.element, оbject.destination);
			}
		} else {
			for (let i = 0; i < оbjects.length; i++) {
				const оbject = оbjects[i];
				if (оbject.element.classList.contains(this.daClassname)) {
					this.moveBack(оbject.parent, оbject.element, оbject.index);
				}
			}
		}
	};

	DynamicAdapt.prototype.moveTo = function (place, element, destination) {
		element.classList.add(this.daClassname);
		if (place === 'last' || place >= destination.children.length) {
			destination.insertAdjacentElement('beforeend', element);
			return;
		}
		if (place === 'first') {
			destination.insertAdjacentElement('afterbegin', element);
			return;
		}
		destination.children[place].insertAdjacentElement('beforebegin', element);
	}

	DynamicAdapt.prototype.moveBack = function (parent, element, index) {
		element.classList.remove(this.daClassname);
		if (parent.children[index] !== undefined) {
			parent.children[index].insertAdjacentElement('beforebegin', element);
		} else {
			parent.insertAdjacentElement('beforeend', element);
		}
	}

	DynamicAdapt.prototype.indexInParent = function (parent, element) {
		const array = Array.prototype.slice.call(parent.children);
		return Array.prototype.indexOf.call(array, element);
	};

	DynamicAdapt.prototype.arraySort = function (arr) {
		if (this.type === "min") {
			Array.prototype.sort.call(arr, function (a, b) {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}

					if (a.place === "first" || b.place === "last") {
						return -1;
					}

					if (a.place === "last" || b.place === "first") {
						return 1;
					}

					return a.place - b.place;
				}

				return a.breakpoint - b.breakpoint;
			});
		} else {
			Array.prototype.sort.call(arr, function (a, b) {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}

					if (a.place === "first" || b.place === "last") {
						return 1;
					}

					if (a.place === "last" || b.place === "first") {
						return -1;
					}

					return b.place - a.place;
				}

				return b.breakpoint - a.breakpoint;
			});
			return;
		}
	};

	const da = new DynamicAdapt("max");
	da.init();

}
dynamicAdaptive(); // ДИНАМИЧЕСКИЙ АДАПТИВ

function scrollHeader() {
	const header = document.querySelector('.header');

	const callback = function (entries, observer) {
		if (entries[0].isIntersecting) {
			header.classList.remove('_scroll');
		} else {
			header.classList.add('_scroll');
		}
	};

	const headerObserver = new IntersectionObserver(callback);
	headerObserver.observe(header);
}
scrollHeader(); // ДОБАВЛЕНИЕ ХЕДЕРУ КЛАСС ПРИ СКРОЛЛЕ

if (document.querySelector(".main-slider")) {
	new Swiper(".main-slider", {
		slidesPerView: 1,
		spaceBetween: 30,
		grabCursor: true,
		speed: 1000,
		loop: true,
		centeredSlides: true,

		autoplay: {
			delay: 5000,
		},

		navigation: {
			nextEl: ".main-slider__arrow_next.swiper-button-next",
			prevEl: ".main-slider__arrow_prev.swiper-button-prev",
		},

		pagination: {
			el: '.main-slider__pagination.swiper-pagination',
			clickable: true,
		},

		breakpoints: {
			768.2: {
				slidesPerView: 1.58,
				speed: 1500,
			},
		}
	});
}

if (document.querySelector(".products-slider")) {
	new Swiper(".products-slider", {
		slidesPerView: 1,
		spaceBetween: 30,
		grabCursor: true,
		// loop: true,
		speed: 500,

		// autoplay: {
		// 	delay: 5000,
		// },

		navigation: {
			nextEl: ".products-slider__arrow_next.swiper-button-next",
			prevEl: ".products-slider__arrow_prev.swiper-button-prev",
		},

		breakpoints: {
			992.2: {
				slidesPerView: 3,
			},
			600.2: {
				slidesPerView: 2,
			},
		}
	});
}

if (document.querySelector(".reviews-slider")) {
	new Swiper(".reviews-slider", {
		slidesPerView: 1,
		spaceBetween: 30,
		grabCursor: true,
		speed: 500,

		navigation: {
			nextEl: ".reviews-slider__arrow_next.swiper-button-next",
			prevEl: ".reviews-slider__arrow_prev.swiper-button-prev",
		},

		breakpoints: {
			768.2: {
				slidesPerView: 2,
			},
		}
	});
}

if (document.querySelector(".partners-slider")) {
	new Swiper(".partners-slider", {
		slidesPerView: 1,
		spaceBetween: 30,
		grabCursor: true,
		speed: 500,

		navigation: {
			nextEl: ".partners-slider__arrow_next.swiper-button-next",
			prevEl: ".partners-slider__arrow_prev.swiper-button-prev",
		},

		breakpoints: {
			425.2: {
				slidesPerView: 2,
			},
		}
	});
}

if (document.querySelector(".blogs-slider")) {
	new Swiper(".blogs-slider", {
		slidesPerView: 1,
		spaceBetween: 15,
		grabCursor: true,
		// loop: true,
		speed: 500,

		navigation: {
			nextEl: ".blogs-slider__arrow_next.swiper-button-next",
			prevEl: ".blogs-slider__arrow_prev.swiper-button-prev",
		},

		breakpoints: {
			768.2: {
				spaceBetween: 30,
				slidesPerView: 3,
			},
			425.2: {
				slidesPerView: 2,
			},
		}
	});
}

if (document.querySelector(".product-slider")) {
	new Swiper(".product-slider", {
		slidesPerView: 1,
		grabCursor: true,
		speed: 500,

		navigation: {
			nextEl: ".product-slider__arrow_next.swiper-button-next",
			prevEl: ".product-slider__arrow_prev.swiper-button-prev",
		},

		pagination: {
			el: '.product-slider__pagination.swiper-pagination',
			clickable: true,
		},
	});
}; // НАСТРОЙКИ СЛАЙДЕРА

/* function quantity() {

	let minValue = 1; // Минимальное значение
	let maxValue = 99; // Максимальное значение

	const counters = document.querySelectorAll('[data-quantity]');

	if (counters.length > 0) {
		counters.forEach(counter => {

			counter.addEventListener("click", function (e) {
				const elementTarget = e.target;

				if (elementTarget.closest('.counter__btn')) {

					let value = parseInt(elementTarget.closest(".counter").querySelector('.counter__input').value);

					if (elementTarget.classList.contains("counter__btn_plus")) {
						value++;
					} else {
						--value;
					}

					if (value <= minValue) {
						value = minValue;
						elementTarget.closest(".counter").querySelector(".counter__btn_minus").classList.add("_disabled");
					} else {
						elementTarget.closest(".counter").querySelector(".counter__btn_minus").classList.remove("_disabled");
					}

					if (value >= maxValue) {
						value = maxValue;
						elementTarget.closest(".counter").querySelector(".counter__btn_plus").classList.add("_disabled");
					} else {
						elementTarget.closest(".counter").querySelector(".counter__btn_plus").classList.remove("_disabled");
					}

					elementTarget.closest(".counter").querySelector(".counter__input").value = value;
				}
			});
		});
	}

};
quantity(); // СЧЁТЧИКИ */

const spollersArray = document.querySelectorAll('[data-spollers]');

if (spollersArray.length > 0) {
	// Получение обычных спойлеров
	const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
		return !item.dataset.spollers.split(",")[0];
	});
	// Инициализация обычных спойлеров
	if (spollersRegular.length > 0) {
		initSpollers(spollersRegular);
	}

	// Получение спойлеров с медиа запросами
	const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
		return item.dataset.spollers.split(",")[0];
	});

	// Инициализация спойлеров с медиа запросами
	if (spollersMedia.length > 0) {
		const breakpointsArray = [];
		spollersMedia.forEach(item => {
			const params = item.dataset.spollers;
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});

		// Получаем уникальные брейкпоинты
		let mediaQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});

		// Работаем с каждым брейкпоинтом
		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(",");
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			// Объекты с нужными условиями
			const spollersArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			});
			// Событие
			matchMedia.addListener(function () {
				initSpollers(spollersArray, matchMedia);
			});
			initSpollers(spollersArray, matchMedia);
		});
	}
	// Инициализация
	function initSpollers(spollersArray, matchMedia = false) {
		spollersArray.forEach(spollersBlock => {
			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
			if (matchMedia.matches || !matchMedia) {
				spollersBlock.classList.add('_init');
				initSpollerBody(spollersBlock);
				spollersBlock.addEventListener("click", setSpollerAction);
			} else {
				spollersBlock.classList.remove('_init');
				initSpollerBody(spollersBlock, false);
				spollersBlock.removeEventListener("click", setSpollerAction);
			}
		});
	}
	// Работа с контентом
	function initSpollerBody(spollersBlock, hideSpollerBody = true) {
		const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
		if (spollerTitles.length > 0) {
			spollerTitles.forEach(spollerTitle => {
				if (hideSpollerBody) {
					spollerTitle.removeAttribute('tabindex');
					if (!spollerTitle.classList.contains('_active')) {
						spollerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spollerTitle.setAttribute('tabindex', '-1');
					spollerTitle.nextElementSibling.hidden = false;
				}
			});
		}
	}
	function setSpollerAction(e) {
		const el = e.target;
		if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
			const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
			const spollersBlock = spollerTitle.closest('[data-spollers]');
			const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
			if (!spollersBlock.querySelectorAll('._slide').length) {
				if (oneSpoller && !spollerTitle.classList.contains('_active')) {
					hideSpollersBody(spollersBlock);
				}
				spollerTitle.classList.toggle('_active');
				_slideToggle(spollerTitle.nextElementSibling, 500);
			}
			e.preventDefault();
		}
	}
	function hideSpollersBody(spollersBlock) {
		const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
		if (spollerActiveTitle) {
			spollerActiveTitle.classList.remove('_active');
			_slideUp(spollerActiveTitle.nextElementSibling, 500);
		}
	}
}

let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (target.hidden) {
			target.hidden = false;
		}
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}; // СПОЙЛЕРЫ

const myPopup = function () {
	const openBtns = document.querySelectorAll(".popup-open");
	const wrappers = document.querySelectorAll(".popup-item");
	let popupData;

	const video = document.querySelector(".popup-video__item");

	if (openBtns.length > 0) {
		openBtns.forEach(open => {
			open.addEventListener("click", function () {
				popupData = this.getAttribute("data-popup");

				function selectPopup(popupData) {
					wrappers.forEach(wrap => {
						if (wrap.classList.contains(popupData)) {
							wrap.classList.add("_active");
							document.body.classList.add("_lock-scroll");
							video.setAttribute("src", "https://www.youtube.com/embed/lbHCAog0rvs");
						}
					});
				}
				selectPopup(popupData)
			});
		});

		function closePopup() {
			const closeBtns = document.querySelectorAll(".popup-close");
			const wrapper = document.querySelectorAll(".popup-item");

			closeBtns.forEach(closeBtn => {
				closeBtn.addEventListener("click", function () {
					wrapper.forEach(wrap => {
						wrap.classList.remove("_active");
						document.body.classList.remove("_lock-scroll");
						video.setAttribute("src", "");
					});
				});
			});

			wrapper.forEach(wrap => {
				wrap.addEventListener("click", function (e) {
					const elementTarget = e.target;

					if (!elementTarget.closest(".popup-item__body")) {
						wrap.classList.remove("_active");
						document.body.classList.remove("_lock-scroll");
						video.setAttribute("src", "");
					}
				});
			});
		}
		closePopup()
	}
}
myPopup(); // ПОПАПЫ

//< " СКРИПТЫ " >=============================================================================================================>//

let isMobile = {
	Android: function () { return navigator.userAgent.match(/Android/i); },
	BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
	iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
	Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
	Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
	any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};

if (isMobile.any()) {
	document.body.classList.add("_touch");
} else {
	document.body.classList.add("_pc");
}

//< " СКРИПТЫ " >=============================================================================================================>//

function actionsHeader() {

	function menuBurger() {
		const burgerOpen = document.getElementById("menu-open");
		const burgerBody = document.getElementById("menu-body");
		const burgerWrap = document.getElementById("menu-wrapper");

		if (burgerOpen && burgerBody && burgerWrap) {
			burgerOpen.addEventListener("click", function () {
				burgerBody.classList.add("_active");
				burgerWrap.classList.add("_active");
				document.body.classList.add("_lock-scroll");
			});

			const burgerClose = document.getElementById("menu-close");

			document.addEventListener("click", function (e) {
				const elementTarget = e.target;

				if (elementTarget === burgerClose || elementTarget === burgerWrap) {
					burgerBody.classList.remove("_active");
					burgerWrap.classList.remove("_active");
					document.body.classList.remove("_lock-scroll");
				}
			});
		}
	}
	menuBurger()

	function mainSearch() {
		const searchBtn = document.getElementById("search-btn");
		const searchInpt = document.getElementById("search-input");
		const search = document.getElementById("search-main");

		if (searchBtn && searchInpt) {
			searchBtn.addEventListener("click", function () {
				searchInpt.classList.add("_active");
				searchInpt.style.visibility = "visible";
				search.style.width = "100%";

				if (window.innerWidth < 768.2) {
					document.querySelector(".header-main__menu").style.display = "none";
					document.querySelector(".header-top__logo").style.display = "none";
				}
			});

			document.addEventListener("click", function (e) {
				const elementTarget = e.target;

				if (!elementTarget.closest(".header-main__search")) {
					searchInpt.classList.remove("_active");

					if (window.innerWidth < 768.2) {
						document.querySelector(".header-menu").style.display = "flex";
						document.querySelector(".header-top__logo").style.display = "flex";
						search.style.width = "auto";
						searchInpt.style.visibility = "hidden";
					} else {
						setTimeout(() => {
							search.style.width = "auto";
							searchInpt.style.visibility = "hidden";
						}, 260);
					}
				}
			});
		}
	}
	mainSearch()

	function catalogShow() {
		const catalogBtn = document.getElementById("catalog-btn");

		if (catalogBtn) {
			catalogBtn.addEventListener("click", function () {
				catalogBtn.parentElement.classList.toggle("_active");
			});

			document.addEventListener("click", function (e) {
				const elementTarget = e.target;

				if (!elementTarget.closest(".header-main__catalog")) {
					catalogBtn.parentElement.classList.remove("_active");
				}
			})
		}
	}
	catalogShow()

}
actionsHeader()

function footerGoTop() {
	const btn = document.getElementById("footer-go-top");

	if (btn) {
		btn.addEventListener("click", function () {
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		});
	}
}
footerGoTop()

function imageComparisons() {
	var x, i;
	/* Find all elements with an "overlay" class: */
	x = document.getElementsByClassName("comparison__image_overlay");
	for (i = 0; i < x.length; i++) {
		/* Once for each "overlay" element:
		pass the "overlay" element as a parameter when executing the compareImages function: */
		compareImages(x[i]);
	}
	function compareImages(img) {
		var slider, img, clicked = 0, w, h;
		/* Get the width and height of the img element */
		w = img.offsetWidth;
		h = img.offsetHeight;
		/* Set the width of the img element to 50%: */
		img.style.width = (w / 2) + "px";
		/* Create slider: */
		slider = document.createElement("DIV");
		slider.setAttribute("class", "comparison__btn");
		/* Insert slider */
		img.parentElement.insertBefore(slider, img);
		/* Position the slider in the middle: */
		slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
		slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
		/* Execute a function when the mouse button is pressed: */
		slider.addEventListener("mousedown", slideReady);
		/* And another function when the mouse button is released: */
		window.addEventListener("mouseup", slideFinish);
		/* Or touched (for touch screens: */
		slider.addEventListener("touchstart", slideReady);
		/* And released (for touch screens: */
		window.addEventListener("touchend", slideFinish);
		function slideReady(e) {
			/* Prevent any other actions that may occur when moving over the image: */
			e.preventDefault();
			/* The slider is now clicked and ready to move: */
			clicked = 1;
			/* Execute a function when the slider is moved: */
			window.addEventListener("mousemove", slideMove);
			window.addEventListener("touchmove", slideMove);
		}
		function slideFinish() {
			/* The slider is no longer clicked: */
			clicked = 0;
		}
		function slideMove(e) {
			var pos;
			/* If the slider is no longer clicked, exit this function: */
			if (clicked == 0) return false;
			/* Get the cursor's x position: */
			pos = getCursorPos(e)
			/* Prevent the slider from being positioned outside the image: */
			if (pos < 0) pos = 0;
			if (pos > w) pos = w;
			/* Execute a function that will resize the overlay image according to the cursor: */
			slide(pos);
		}
		function getCursorPos(e) {
			var a, x = 0;
			e = (e.changedTouches) ? e.changedTouches[0] : e;
			/* Get the x positions of the image: */
			a = img.getBoundingClientRect();
			/* Calculate the cursor's x coordinate, relative to the image: */
			x = e.pageX - a.left;
			/* Consider any page scrolling: */
			x = x - window.pageXOffset;
			return x;
		}
		function slide(x) {
			/* Resize the image: */
			img.style.width = x + "px";
			/* Position the slider: */
			slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
		}
	}
}
imageComparisons()

function comparisonsAdaptive() {
	const elements = document.querySelectorAll('.comparison__image img'),
		elementsOverlay = document.querySelectorAll('.comparison__image_overlay'),
		btns = document.querySelectorAll('.comparison__btn');

	elements.forEach(element => {
		window.addEventListener("resize", function () {
			if (window.innerWidth < 1230.2) {
				const width = this.innerWidth - 30;
				element.style.width = `${width}px`;
				element.setAttribute("width", `${width}px`);

				elementsOverlay.forEach(overlay => {
					overlay.style.width = `${width / 2}px`;
				});

				btns.forEach(btn => {
					btn.style.left = `${width / 2}px`;
				});
			}
		});

		window.addEventListener("DOMContentLoaded", function () {
			if (window.innerWidth < 1230.2) {
				const width = this.innerWidth - 30;
				element.style.width = `${width}px`;
				element.setAttribute("width", `${width}px`);

				elementsOverlay.forEach(overlay => {
					overlay.style.width = `${width / 2}px`;
				});

				btns.forEach(btn => {
					btn.style.left = `${width / 2}px`;
				});
			}
		});
	});
}
comparisonsAdaptive()
