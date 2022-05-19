const mobileMenu = document.querySelector('.mobile_menu_wrapper');
const body = document.querySelector('body');

const linksWithSub = document.getElementsByClassName('has_sub');
for (let i = 0; i < linksWithSub.length; i++)
{
	linksWithSub[i].addEventListener('click', function(e) {
		e.preventDefault();
		e.stopPropagation();

		const currentItem = linksWithSub[i].parentNode;

		const activeItems = document.getElementsByClassName('active_mobile_item');
		for (let j = 0; j < activeItems.length; j++)
		{
			const activeItem = activeItems[j];
			if (activeItem !== currentItem)
				activeItems[j].classList.remove('active_mobile_item');
		}

		currentItem.classList.toggle('active_mobile_item');
	});
}

window.onclick = function(e) {
	const activeItems = document.getElementsByClassName('active_mobile_item');
	for (let i = 0; i < activeItems.length; i++)
	{
		activeItems[i].classList.remove('active_mobile_item');
	}
	mobileMenu.classList.remove('active');
	body.classList.remove('lock');
}

const burgerBtns = document.getElementsByClassName('header_burger');
for (let i = 0; i < burgerBtns.length; i++)
{
	burgerBtns[i].addEventListener('click', function(e) {
		e.stopPropagation();
		mobileMenu.classList.toggle('active');
		body.classList.toggle('lock');
	})
}

mobileMenu.addEventListener('click', function(e) {
	e.stopPropagation();
});
