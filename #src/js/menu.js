const linkWithSub = document.getElementsByClassName('has_sub');

for (let i = 0; i < linkWithSub.length; i++)
{
	linkWithSub[i].addEventListener('click', function(e) {
		e.preventDefault();

		const activeItems = document.getElementsByClassName('active_mobile_item');
		for (let j = 0; j < activeItems.length; i++)
		{
			activeItems[j].classList.remove('active_mobile_item');
		}

		const currentItem = e.target.parentNode;
		currentItem.classList.toggle('active_mobile_item');
		// console.log(Math.random(100));
	});
}

window.onclick = function(e) {
	if (!e.target.classList.contains('has_sub'))
	{
		const activeItem = document.getElementsByClassName('active_mobile_item')[0];
		activeItem.classList.remove('active_mobile_item');
	}
}