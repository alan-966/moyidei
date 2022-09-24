const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 300;

if (popupLinks.length > 0)
{
	for (let index = 0; index < popupLinks.length; index++)
	{
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function (e) {
			const currImgTag = popupLink.querySelector('.gallery_photo');
			let currImg = null;
			if(currImgTag && currImgTag.hasAttribute('src'))
			{
				currImg = currImgTag.getAttribute('src');
			}

			const popupName = popupLink.getAttribute('href').replace('#', '');
			const currentPopup = document.getElementById(popupName);
			popupOpen(currentPopup, currImg);
			e.preventDefault();
		});
	}
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0)
{
	for (let index = 0; index < popupCloseIcon.length; index++)
	{
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(currentPopup, currImg)
{
	if (currentPopup && unlock)
	{
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) popupClose(popupActive, false);
		else bodyLock();

		if (currImg)
		{
			const popupSource = currentPopup.querySelector('source');
			const popupImg = currentPopup.querySelector('.popup__photo');
			// jpg,png,svg,gif,ico
			const dotIndex = currImg.startsWith('http')
				? 0
				: currImg.lastIndexOf('.');
			const refactorImg = dotIndex > 0
				? currImg.slice(0, dotIndex) + '.webp'
				: currImg;

			popupSource.setAttribute('srcset', refactorImg);
			popupImg.setAttribute('src', currImg);
		}
		
		currentPopup.classList.add('open');
		currentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.popup__content'))
				popupClose(e.target.closest('.popup'));
		});
	}
}

function popupClose(popupActive, doUnlock = true)
{
	if (unlock)
	{
		popupActive.classList.remove('open');
		if (doUnlock) bodyUnLock(popupActive);
	}
}

function bodyLock()
{
	const lockPaddingValue = window.innerWidth - body.offsetWidth + 'px';
	for (let index = 0; index < lockPadding.length; index++)
	{
		const el = lockPadding[index];
		el.style.paddingRight = lockPaddingValue;
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock(popupActive)
{
	setTimeout(function () {
		const popupSource = popupActive.querySelector('source');
		const popupPhoto = popupActive.querySelector('.popup__photo');
		if (popupPhoto && popupSource &&
			popupPhoto.hasAttribute('src') &&
			popupSource.hasAttribute('srcset'))
		{
			popupSource.setAttribute('srcset', '');
			popupPhoto.setAttribute('src', '');
		}

		for (let index = 0; index < lockPadding.length; index++)
		{
			const el = lockPadding[index];
			el.style.paddingRight = '0px';
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27)
	{
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

