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
