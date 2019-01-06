/*So Application will represent the whole page. In here
we listen for a special event called 'DOMContentLoaded'. This
means the page is loaded. This is the HTML5 way, not the old-schoold
'onload' that we ad to the <body>*/
class Application {

	/*we set this.element to be the <body>
	immediately after, we listen for when the DOM is loaded
	and ready.*/
	constructor(el){
		this.element = el;
		document.addEventListener("DOMContentLoaded", (e) => this.onLoad(e), false);
	}


	/*onLoad will fire when DOM is loaded (see above listener). 
	Here we will create new instances of components on our page. 
	If you had multiple components on the page, just create a 
	new instance for each.*/
	onLoad(e){
		var modalPopup =  document.querySelector("#modalPopup"); //Select the Modal placeholder container
		this.modal = new ModalPop(modalPopup); // Our new Modal Popup - See Modal.js
		
		// this.element.addEventListener("activated", (e) => this.onModalActivated(e), false);

		// An event listener for when it detects our custom "modalclosed" event and fire's our function to do something
		this.element.addEventListener("modalclosed", (e) => this.onModalClosed(e), false);
		this.eventDatesContainer = document.querySelector(".event-dates");
		// An event listener detect our custom event of "eventremoved" and executes a function to confirm deletion of an event
		this.eventDatesContainer.addEventListener("eventremoved", (e) => this.onConfirmDelete(e), false);
		// An event listener for when a user wants to edit an event, it listens for our custom signal "editevent" and executes onModifyEvent()
		this.eventDatesContainer.addEventListener("editevent", (e) => this.onModifyEvent(e), false);
	}

	// Here's our function which executes when an event is to be edited. It toggles the modal to be opened and then executes another
	// function populate() which is passed our old eventData/content from when the event was filled out with (name, date, description).
	onModifyEvent(e){
		this.modal.toggleEdit();
		this.modal.populate(e.detail.eventItem);
	}

	// onModalActivated(e){
	// 	 alert("sending tracking data here because modal was hidden/shown");
	// }
	onModalClosed(e){
		// alert("closed modal");
		console.log(e);
	}

	// Here's our function which is displayed to the user when an event is to be removed, it asks the user if 
	// they're sure they want to remove the event and removes the entire HTML eventData Block from the event-dates container
	onConfirmDelete(e){
        const result = confirm("Are you sure you want to remove this event?");
        if(result){
            e.target.remove();
            console.log(e.detail);
        }else{
            return;
        }
    }
}



