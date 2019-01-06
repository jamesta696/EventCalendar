class ModalPop {
    // Pass in modalPopup param in constructor as variable created which selects the modal placeholder container
    constructor(modalPopup) {
        //Lets setup our Modal popup and set it to this.element
        this.element = modalPopup;
        var el = this.getElement();
        // After getting the Modal's HTML Element we add it into our index.html on page load.
        this.element.appendChild(el);
        // On load we add the class to our Modal's container when we make it Active onClick
        this.element.classList.add("ModalPop");
        this.element.addEventListener(
            "activated",
            e => this.onActivated(e),
            false
        );
        // An event listener for when a user clicks the overlay of Modal and closes
        this.element.addEventListener(
            "click",
            e => this.closeIfOverlay(e),
            false
        );
        // Find and query Select our Calender
        this.calendar = document.querySelector(".availability-calendar");
        // An event listener for when a click is detected on TD's represented as days of the month on our Calender Table
        this.calendar.addEventListener(
            "click",
            e => this.onToggleModal(e),
            false
        );
        // Query Select our Modal "X" close button and runs the logic to close
        this.closePopup = document.querySelector(".close");
        this.closePopup.addEventListener(
            "click",
            e => this.onToggleModal(e),
            false
        );
        // Select our Save button on our Modal and before we can save an Event, it must be validated for all content fields
        this.saveBtn = this.element.querySelector("#save");
        this.saveBtn.addEventListener(
            "click",
            e => this.onModalValidation(e),
            false
        );
        // Select our Events container where each event will be saved to and reset the play-data that was provided
        this.eventDatesContainer = document.querySelector(".event-dates");
        this.eventDatesContainer.innerHTML = "";
        // Selects our INPUT fields of our Modal for reference
        this.name = this.element.querySelector("input#name");
        this.date = this.element.querySelector("input#date");
        this.desc = this.element.querySelector("input#desc");
    }

    // Our populate method reads our old eventData and says, If it's in edit mode, set the old data. When new edits are made it checks
    // within our onSaveEvent() and updates our Event Item.
    populate(oldEventItem) {
        this.mode = "edit";
        this.oldEventItem = oldEventItem;
        this.name.value = oldEventItem.name;
        this.date.value = oldEventItem.date;
        this.desc.value = oldEventItem.desc;
    }

    // When modal is activated each time, reset All the INPUT fields
    onActivated(e) {
        var isActive = e.detail.is_active;
        if (isActive) {
            // alert("its visible");
        } else {
            this.name.value = "";
            this.date.value = "";
            this.desc.value = "";
        }
    }

    // we set variable el to this.getElement() which grabs the modal's HTML and returns it to an HTML Element
    getElement() {
        const modalHtml = `
            <div id="myModal">
                <!-- Modal content -->
                    <div class="modal-content">
                        <div class="modal-head">
                            <span class="close"><i class="fas fa-times-circle"></i></span>
                            <h2>Schedule an Event</h2>
                        </div>
                        <div class="modal-body">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroup-sizing-default">Name</span>
                                </div>${" "}
                                <input id="name" placeholder="Name of event" type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" required="required">
                            </div>

                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroup-sizing-default">Date</span>
                                </div>${" "}
                                <input id="date" placeholder="Name of event" type="date" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" required="required">
                            </div>

                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroup-sizing-default">Description</span>
                                </div>${" "}
                                <input id="desc" placeholder="Write a description" type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" required="required">
                            </div>

                            <button id="save" class="btn btn-info btn-block">Save</button>
                        </div>   
                    </div>
            </div>
        `;
        return modalHtml.toHtmlElement();
    }

    // Here's our Modal validation that makes sure we have all fields filled out before saving our Event.
    onModalValidation(e) {
        let modalBody = document.querySelectorAll(".modal-body input");
        let array = Array.from(modalBody);
        for (var i = 0; i < array.length; i++) {
            if (array[0].value.length >= 1 && array[2].value.length >= 1) {
                this.onSaveEvent(e);
            } else {
                alert("Fill out all fields");
            }
            return;
        }
    }

    // Here's our function which creates and modifies our Events
    onSaveEvent(e) {
        var nameField = (this.name = this.element.querySelector("input#name"));
        var dateField = (this.date = this.element.querySelector("input#date"));
        var descField = (this.desc = this.element.querySelector("input#desc"));

        // If it detects it's in edit mode, it updates our Event Item
        if (this.mode == "edit") {
            this.oldEventItem.update({
                name: nameField.value,
                desc: descField.value,
                date: dateField.value
            });
            this.mode = "";
        }
        // If not in edit mode, it creates a whole new event item which is then inserted into our event-dates container
        else {
            var eventData = {
                name: nameField.value,
                date: dateField.value,
                desc: descField.value
            };
            // Our eventItem is created
            var eventItem = new EventItem(eventData);
            document
                .querySelector(".event-dates")
                .appendChild(eventItem.element);
            console.log(eventItem.element.id);
        }
        // Closes the Modal after editing or creating an event
        this.onToggleModal(e);
    }

    // Here's our Modal Toggle function which opens and closes
    onToggleModal(e) {
        if (e.target.classList.contains("close")) {
            // If a click is detected on the X button, we then close the modal and dispatch our event
            this.element.classList.remove("active");
            let event = new CustomEvent("activated", {
                bubbles: true,
                detail: { is_active: false }
            });
            this.element.dispatchEvent(event);
            return;
        }
        if (e.target.classList.contains("day")) {
            // If a click is detected on a day within the current monthx the modal will open and captures the "data-date" attribute of that TD
            // that was clicked. We dispatch our event when it is opened.
            this.element.classList.toggle("active");
            var date = e.target.getAttribute("data-date");
            this.date.value = date;
            var has_active_class = this.element.classList.contains("active");
            let event = new CustomEvent("activated", {
                bubbles: true,
                detail: { is_active: has_active_class }
            });
            this.element.dispatchEvent(event);
        } else {
            this.element.classList.remove("active");
            let event = new CustomEvent("activated", {
                bubbles: true,
                detail: { is_active: false }
            });
            this.element.dispatchEvent(event);
        }
    }

    // Here's the method which closes the Modal if a click is detected off-screen of the modal's container
    closeIfOverlay(e) {
        if (e.target.classList.contains("ModalPop")) {
            this.element.classList.remove("active");
            // A custom event is created and dispatched for when our Application listens for Modal Closed.
            let event = new CustomEvent("modalclosed", {
                bubbles: true,
                detail: { is_active: false }
            });
            this.element.dispatchEvent(event);
            return;
        }
    }

    // When editing this function executes and opens our modal
    toggleEdit(e) {
        this.element.classList.toggle("active");
    }
}
