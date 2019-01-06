class EventItem {
    constructor(data){
        // the data param in constructor is represented as our event data when we save a new Event.
        // This is inserted from our onSaveEvent() method in Modal.js

        // Set the eventData as data
        this.eventData = data;
        // this.element is set to this.getElement(this.eventData) method which handles our data when it's saved
        this.element = this.getElement(this.eventData);
        // Here is where we can generate random ID's using Math.uuid.js framework - Found in utils/randomId.js
        this.id = Math.uuid();
        // Set the element and create an ID attribute and pass it the ID with the one we generated
        this.element.setAttribute("id", this.id); 
        // An event listener for when a Event is clicked, it will collapse big and back to small depending on how long
        // the description may be including all it's content.
        this.element.addEventListener("click", (e) => this.onClick(e), false);
        this.element.classList.add("EventItem");
        // Selects the Trash icon and when clicked, it will handle the Delete Event
        this.deleteBtn = this.element.querySelector('.lnr-trash');   
        this.deleteBtn.addEventListener("click", (e) => this.onDeleteEvent(e), false);
        // Selects the Pen icon for when a user wants to edit an Event that was created and executes our onEditEvent()
        this.editBtn = this.element.querySelector(".lnr-highlight");
        this.editBtn.addEventListener("click", (e) => this.onEditEvent(e), false);
        // Setting the Input fields to our eventData 
        this.name = data.name;
        this.date = data.date;
        this.desc = data.desc;
        
    }

    // Here's our function which executes when a user wants to edit an event, it creates a custom event and is then
    // dispatched and bubbled up to our Parent, Application.js which dectects this "editevent" signal
    onEditEvent(e){
        let event = new CustomEvent("editevent", {
            bubbles: true,
            detail: {
                editing: true,
                eventItem: this
            }
        });
        this.element.dispatchEvent(event);
    }
    // When updating, this function reads our new values for the INPUT fields and sets the new innerHTML 
    update(eventData){
        this.name = eventData.name;
        this.date = eventData.date;
        this.desc = eventData.desc;

        this.element.querySelector(".date").innerHTML = this.date;
        this.element.querySelector(".name").innerHTML = this.name;
        this.element.querySelector(".desc").innerHTML = this.desc;
    }

    // When an event is to be removed, it creates a custom event which is then dispatched and bubbled up to the parent, Application.js
    onDeleteEvent(e){    
        let event = new CustomEvent('eventremoved', {
            bubbles: true, 
            detail: {
                deleted:true, 
                id: this.element.id
        }});
        this.element.dispatchEvent(event); 
    }

    // When an event Item is clicked, it's expanded or collapsed depending if the description was too long to read
    onClick(e){
        this.element.classList.toggle('active');
    }

    // This method grabs all the necessary data from our name, date, description fields and stores it as a HTML block within our event-dates container
    getElement(data){
        var html = 
        `<div class="single-event d-flex flex-row">
                <p class="col date">
                    ${data.date}
                </p>
                <p class="col-8 name">
                    ${data.name}
                </p>
                <p class="col-8 desc">
                    ${data.desc}
                </p>
                <p class="col text-right">
                    <span class="lnr lnr-highlight"></span>
                    <span class="lnr lnr-trash"></span>
                </p>
        </div>`;
        return html.toHtmlElement();
    }

}