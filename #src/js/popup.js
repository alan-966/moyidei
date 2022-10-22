const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 300;

if (popupLinks.length > 0)
{
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const currentPopup = document.getElementById(popupName);
			popupOpen(currentPopup);
			e.preventDefault();
		});
	}
}

const popupCloseIcon = document.querySelectorAll('.popup__close');
if (popupCloseIcon.length > 0)
{
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(currentPopup)
{
	if (currentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) popupClose(popupActive, false);
		else bodyLock();
		
		currentPopup.classList.add('open');
		currentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.popup__content'))
				popupClose(e.target.closest('.popup'));
		});
	}
}

function popupClose(popupActive, doUnlock = true)
{
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) bodyUnLock(popupActive);
	}
}

function bodyLock()
{
	const lockPaddingValue = window.innerWidth - body.offsetWidth + 'px';
	for (let index = 0; index < lockPadding.length; index++) {
		const el = lockPadding[index];
		el.style.paddingRight = lockPaddingValue;
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('body_lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock(popupActive)
{
	setTimeout(function () {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = '0px';
		}
		body.style.paddingRight = '0px';
		body.classList.remove('body_lock');
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

const inputs = document.querySelectorAll('form input,textarea');
if (inputs.length > 0) {
	for (let index = 0; index < inputs.length; index++) {
		const input = inputs[index];
		input.addEventListener('input', function (e) {
			e.target.classList.remove('error');
			const errorEl = e.target.nextElementSibling;
			if (errorEl.tagName === 'SPAN') {
				errorEl.remove();
			}
		});
	}
}

function sendFeedback(e) {
	e.preventDefault();
	const formElement = document.querySelector('.feedback_form');
	const formData = new FormData(formElement);

	fetch('/feedback/', {
		method: 'POST',
		body: formData,
	})
	.then(response => response.json())
	.then(json => {
		formElement.querySelectorAll('span.error').forEach(el => el.remove());

		if (json.success) {
			window.location.reload();
			return;
		}

		for (key in json) {
			formElement[key].classList.add('error');
			if (json[key].length) {
				const errorSpan = document.createElement('span');
				errorSpan.className = 'error';
				errorSpan.innerHTML = json[key][0].message;
				formElement[key].insertAdjacentElement('afterEnd', errorSpan);
			}
		}
	});
}
