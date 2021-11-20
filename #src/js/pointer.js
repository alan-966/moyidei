const images = [
	'/img/pointer/1.png',
	'/img/pointer/2.png',
	'/img/pointer/3.png',
	'/img/pointer/4.png',
	'/img/pointer/5.png',
	'/img/pointer/6.png',
	'/img/pointer/7.png',
	'/img/pointer/8.png',
	'/img/pointer/9.png',
	'/img/pointer/10.png',
];

const teamBlockImg = document.querySelector('.team_block_img');
const source = teamBlockImg.querySelector('source');
const image = teamBlockImg.querySelector('img');

const teamBlockContent = document.querySelector('.team_block_content');
const height = teamBlockContent.scrollHeight;
const oneChank = height / 10;

teamBlockContent.addEventListener("mousemove", (e) => {
	const mousePos = e.pageY - teamBlockContent.offsetTop + 1;
	const imgIndex = Math.floor(mousePos / oneChank);
	if (imgIndex >= 0 && imgIndex < images.length)
	{
		source.setAttribute('srcset', images[imgIndex]);
		image.setAttribute('src', images[imgIndex]);
	}
});
