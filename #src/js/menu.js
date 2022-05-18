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
	const activeItem = document.getElementsByClassName('active_mobile_item')[0];
	activeItem.classList.remove('active_mobile_item');
}