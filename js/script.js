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
			const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

			function isEmailValid(value) {
			 	return EMAIL_REGEXP.test(value);
			}

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