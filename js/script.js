const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;



function toggleLanguageMenu() {
	document.querySelector(".header__language-content").classList.toggle("header__language-content_open");
}

function burgerMenu(value) {
	let menu = document.querySelector(".header__menu");
	let openClass = "header__menu_open";

	if (value == "open") {
		menu.classList.add(openClass);
	} else {
		menu.classList.remove(openClass);
	}

	if (document.querySelector(".header__language-content_open")) toggleLanguageMenu();
}

function popup(popupClass, action, successPopupName) {
	let popupElem = document.querySelector(popupClass);

	if (successPopupName) {

		// Email validation
		if (successPopupName == "subscribe" && action == "open") {

			let popupSubscribeInput = document.querySelector(".popup-subscribe__input input");

			if (EMAIL_REGEXP.test(popupSubscribeInput.value)) {
				popup('.popup-subscribe', 'close');
				popupSubscribeInput.value = "";
			} else {
				popupSubscribeInput.style.borderColor = "#EE5646";
				popupSubscribeInput.style.color = "#EE5646";
				setTimeout(() => {
					popupSubscribeInput.style.borderColor = "";
					popupSubscribeInput.style.color = "";
				}, 800);
				return;
			}
		}

		let popupContent = document.querySelector(`.popup-success__content_${successPopupName}`);

		if (action == "open") {
			popupContent.style.display = "flex";
		}
	}

	if (action == "open") {
		popupElem.classList.add("open");
	} else {
		popupElem.classList.remove("open");

		if (popupClass == ".popup-success") {
			document.querySelectorAll(".popup-success__content").forEach(elem => {
				elem.style.display = "";
			});
		}
	}	
}

function playVideo() {

	let videoElem = document.querySelector(".video-history__video video");
	let buttonElem = document.querySelector(".video-history__video button");

	buttonElem.style.visibility = "hidden";
	buttonElem.style.opacity = "0";
	videoElem.play();
	videoElem.setAttribute('controls', '');
}

document.querySelector(".footer__form").addEventListener('submit', e => {
	e.preventDefault();
});

function checkFooterForm() {

	let error = false;

	let requiredInputs = [
		document.querySelector(".footer__input:nth-child(1) input"),
		document.querySelector(".footer__input:nth-child(2) input")
	];

	requiredInputs.forEach(input => {
		if (!input.validity.valid) {
			error = true;
			input.style.borderColor = "#EE5646";
			setTimeout(() => {
				input.style.borderColor = "";
			}, 800);
		}
	});

	if (error) return;

	if (EMAIL_REGEXP.test(requiredInputs[1].value)) {
		popup('.popup-success', 'open', 'message');
	} else {
		requiredInputs[1].style.borderColor = "#EE5646";
		setTimeout(() => {
			requiredInputs[1].style.borderColor = "";
		}, 800);
	}
}





// -------------------------- Team Swiper ---------------------------
let swiperTeam = document.querySelector(".team__items");

function swiperStart(value) {

	let swiperTeamWrapper = document.querySelector(".team__items-wrapper");
	let swiperTeamSlides = document.querySelectorAll(".team__item");

	if (value) {
		swiperTeam.classList.add("swiper");
		swiperTeamWrapper.classList.add("swiper-wrapper");
		swiperTeamSlides.forEach(slide => {
			slide.classList.add("swiper-slide");
		});

		const swiper = new Swiper('.team__items', {
			slidesPerView: "auto",
            centeredSlides: true,
            resistanceRatio: 0,
            navigation: {
			    nextEl: '.team__items-btn-next',
			   	prevEl: '.team__items-btn-prev',
			},
		});

	} else {
		swiperTeam.classList.remove("swiper");
		swiperTeamWrapper.classList.remove("swiper-wrapper");
		swiperTeamSlides.forEach(slide => {
			slide.classList.remove("swiper-slide");
			slide.removeAttribute("style");
		});
	}
}

window.addEventListener('resize', () => {
    if (swiperTeam) {
    	swiperStart(window.innerWidth <= 575.5);
    }
});

if (swiperTeam) {
	swiperStart(window.innerWidth <= 575.5);
}
// ------------------------------------------------------------------





// -------------------------- Smooth scroll ---------------------------
const headerMenuLinks = document.querySelectorAll('a[href*="#footer"]');

for (let headerMenuLink of headerMenuLinks) {
  headerMenuLink.addEventListener('click', function (e) {
    e.preventDefault();
    
    const blockID = headerMenuLink.getAttribute('href').substr(1);
    
   	smoothScroll(blockID);
  })
}

function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}

function elmYPosition(eID) {
    var elm = document.getElementById(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    } return y;
}

function getHeaderHeight() {
	if (window.innerWidth < 575.5) {
		burgerMenu('close');
		return 51;
	} else {
		return 99;
	}
}

function smoothScroll(eID) {
    var startY = currentYPosition();
    var stopY = elmYPosition(eID) - getHeaderHeight();
    var distance = stopY > startY ? stopY - startY : startY - stopY;
 	if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for ( var i=startY; i<stopY; i+=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for ( var i=startY; i>stopY; i-=step ) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
}
// ------------------------------------------------------------------