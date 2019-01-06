class Accordion {

	/*we set this.element to be the accordion <div>
	then we listen for clicks on the whole thing.*/
	constructor(el){
		this.element = el;
		this.element.addEventListener("click", (e)=> this.onClick(e), false);
	}

	

	/*a click can come from anywhere within the accordion div,
	but we only want to react if the target was an 'accordion-button'*/
	onClick(e){
		if(e.target.classList.contains("accordion-button")){
			e.target.classList.toggle("active");
		}
	}
}