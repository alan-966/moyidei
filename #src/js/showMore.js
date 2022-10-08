function loadMoreNews(e, page) {
	e.preventDefault();

	const formData = new FormData();
	formData.append('page', page + 1);

	fetch('/news/', {
		method: 'POST',
		body: formData,
	})
	.then(response => response.text())
	.then(text => {
		const btn = document.querySelector('.news-list-content .btn');
		btn.remove();
		const newsList = document.querySelector('.news-list-content');
		newsList.insertAdjacentHTML('beforeend', text);
	})
}

let albumsPage = 2;
function loadMoreAlbums(e, lastPage) {
	e.preventDefault();

	const formData = new FormData();
	formData.append('page', albumsPage);

	fetch('/photogallery/', {
		method: 'POST',
		body: formData,
	})
	.then(response => response.text())
	.then(text => {
		if (lastPage === albumsPage) {
			const btn = document.querySelector('.gallery_categories_container .btn');
			btn.remove();
		}
		albumsPage = albumsPage + 1;
		const albumsList = document.querySelector('.photo_categories');
		albumsList.insertAdjacentHTML('beforeend', text);
	})
}
