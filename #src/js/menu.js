const mobileMenu = document.querySelector('.mobile_menu_wrapper');
const mobileSubmenus = document.querySelectorAll('.mobile_submenu');
const body = document.querySelector('body');

const linksWithSub = document.querySelectorAll('.has_sub');
for (let i = 0; i < linksWithSub.length; i++)
{
	linksWithSub[i].addEventListener('click', function(e) {
		e.preventDefault();
		e.stopPropagation();

		const currentItem = linksWithSub[i].parentNode;

		const activeItems = document.querySelectorAll('.active_mobile_item');
		for (let j = 0; j < activeItems.length; j++)
		{
			const activeItem = activeItems[j];
			if (activeItem !== currentItem)
				activeItems[j].classList.remove('active_mobile_item');
		}

		currentItem.classList.toggle('active_mobile_item');
	});
}

const mLinksWithSub = document.querySelectorAll('.has_mobile_sub');
for (let i = 0; i < mLinksWithSub.length; i++)
{
	mLinksWithSub[i].addEventListener('click', function(e) {
		e.preventDefault();
		e.stopPropagation();

		const currentItem = mLinksWithSub[i].parentNode;
		currentItem.classList.toggle('active_mobile_item');

		const submenu = currentItem.lastElementChild;
		if (submenu.style.maxHeight)
			submenu.style.maxHeight = null;
		else
			submenu.style.maxHeight = submenu.scrollHeight + "px";
	});
}

window.onclick = function(e) {
	const activeItems = document.querySelectorAll('.active_mobile_item');
	for (let i = 0; i < activeItems.length; i++)
	{
		activeItems[i].classList.remove('active_mobile_item');
	}
	mobileMenu.classList.remove('active');
	body.classList.remove('lock');

	for (let i = 0; i < mobileSubmenus.length; i++)
	{
		mobileSubmenus[i].style.maxHeight = null;
	}
}

const burgerBtns = document.querySelectorAll('.header_burger');
for (let i = 0; i < burgerBtns.length; i++)
{
	burgerBtns[i].addEventListener('click', function(e) {
		e.stopPropagation();
		mobileMenu.classList.toggle('active');
		body.classList.toggle('lock');
		
		for (let i = 0; i < mobileSubmenus.length; i++)
		{
			mobileSubmenus[i].style.maxHeight = null;
		}

		const activeItems = document.querySelectorAll('.active_mobile_item');
		for (let i = 0; i < activeItems.length; i++)
		{
			activeItems[i].classList.remove('active_mobile_item');
		}
	})
}

mobileMenu.addEventListener('click', function(e) {
	e.stopPropagation();
});
