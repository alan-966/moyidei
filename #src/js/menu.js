const linkWithSub = document.getElementsByClassName('has_sub');

for (let i = 0; i < linkWithSub.length; i++)
{
	linkWithSub[i].addEventListener('click', function(e) {
		e.preventDefault();
		e.stopPropagation();

		const currentItem = linkWithSub[i].parentNode;

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
}

const burgerBtn = document.getElementsByClassName('header_burger');
if (burgerBtn.length)
{
	burgerBtn[0].addEventListener('click', function(e) {
		const menu = document.getElementsByClassName('header_menu_wrapper');
		if (menu.length) menu[0].classList.toggle('active');
	})
}