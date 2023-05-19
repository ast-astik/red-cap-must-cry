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

function popup(popupClass, action) {
	let popup = document.querySelector(popupClass);

	if (action == "open") {
		popup.classList.add("open");
	} else {
		popup.classList.remove("open");
	}
}