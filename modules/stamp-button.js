export class StampButton {
  constructor(id, stamp, style, canvas) {
    this.id = id;
    this.stamp = stamp;
    this.style = style;
    this.canvas = canvas;
    this.element = document.createElement("button");
  }

  // Create and return a button element with the stamp as its innerHTML.
  // The button element is also assigned a click event listener that calls the handleClick method.
  getButtonElement = () => {
    this.element.id = this.id;
    this.element.classList.add(this.style);
    this.element.innerHTML = this.stamp;
    this.element.addEventListener("mousedown", (event) =>
      this.stampButtonClick(event)
    );
    return this.element;
  };

  // Create and return a div element with the stamp as its innerHTML.
  // The div element is also assigned a class to identify it as being dragged
  // A mousemove event listener is added to DOM Window that calls the startDrag method.
  getStampElement = () => {
    const stampElement = document.createElement("div");
    stampElement.classList.add("stamp__element--moving");
    stampElement.innerHTML = this.stamp;
    // Add mousemove event listener to canvas element to start dragging
      window.addEventListener("mousemove", this.startDrag);
    // Add mouseup event listener to canvas element to stop dragging
      this.canvas.addEventListener("mousedown", this.stopDrag);
    return stampElement;
  };

  // Get the stamp element and position it at the mouse click coordinates.
  stampButtonClick = (event) => {
    // Get reference to any existing dragging stamp element and remove it
    const oldStampElement = this.canvas.querySelector(
      ".stamp__element--moving"
    );
    if (oldStampElement) {
      oldStampElement.remove();
    }

    // Create new draggable stamp element and position it at mouse click coordinates
    // with an offset of half the stamp element's width and height.
    const stampDragElement = this.getStampElement();
    const stampPosition = this.getStampPosition(event, stampDragElement);
    stampDragElement.style.left = `${stampPosition.x}px`;
    stampDragElement.style.top = `${stampPosition.y}px`;
    this.canvas.appendChild(stampDragElement);
  };

  // Get the stamp element and position it at the mouse coordinates
  // with an offset of half the stamp element's width and height.
  startDrag = (event) => {
    const stampElement = this.canvas.querySelector(".stamp__element--moving");
    if (stampElement) {
      // Get stamp x and y relative to mouse position and width/height of stamp element
      // Pass in 'event' object st that the clientX and clientY mouse coordinates can be read
      const stampPosition = this.getStampPosition(event, stampElement);
      stampElement.style.left = `${stampPosition.x}px`;
      stampElement.style.top = `${stampPosition.y}px`;
    }
  };

  // Remove the stamp element's 'moving' class and add a 'dropped' class.
  stopDrag = (event) => {
    const stampElement = this.canvas.querySelector(".stamp__element--moving");
    if (stampElement) {
      const droppedStamp = stampElement.cloneNode(true);
      droppedStamp.classList.remove("stamp__element--moving");
      droppedStamp.classList.add("stamp__element--dropped");
      this.canvas.appendChild(droppedStamp);
      event.stopImmediatePropagation();
    }
  };

  // Get stamp x and y relative to mouse position and width/height of stamp element
  getStampPosition = (mouseEvent, stampElement) => {
    const stampX = mouseEvent.clientX - stampElement.offsetWidth / 2;
    const stampY = mouseEvent.clientY - stampElement.offsetHeight / 2;

    // Return object with x and y properties of stamp element
    return {
      x: stampX,
      y: stampY,
    };
  };
}
