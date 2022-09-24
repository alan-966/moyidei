const teamBlockContent = document.querySelector('.team_block_content');

if (teamBlockContent) {
	const height = teamBlockContent.scrollHeight;
	const oneChank = height / 10;
	let prevImgIndex = 0;

	const images = document.querySelectorAll('.team_block_img');

	teamBlockContent.addEventListener("mousemove", e => {
		const mousePos = e.pageY - teamBlockContent.offsetTop + 1;
		const imgIndex = Math.floor(mousePos / oneChank);

		if (imgIndex >= 0 && imgIndex < images.length) {
			if (imgIndex !== prevImgIndex) {
				images[prevImgIndex].classList.remove('active_img');
				images[imgIndex].classList.add('active_img');
			}
			prevImgIndex = imgIndex;
		}
	});
};
