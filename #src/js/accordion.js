const acc = document.getElementsByClassName("accordion_item");
for (let i = 0; i < acc.length; i++)
{
	acc[i].addEventListener("click", function() {
		this.classList.toggle("active");

		const acContent = this.querySelector('.accordion_content');
		
		if (acContent.style.maxHeight)
			acContent.style.maxHeight = null;
		else
			acContent.style.maxHeight = acContent.scrollHeight + "px";
	});
}