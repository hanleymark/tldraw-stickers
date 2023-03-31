export class StampButton {
  constructor(id, stamp, style, canvas) {
    this.id = id;
    this.stamp = stamp;
    this.style = style;
    this.canvas = canvas;
    this.element = document.createElement("button");
  }

  // Create and return a button element with the stamp as its innerHTML.
  // The button element is also assigned an id and a class.
  // The button element is also assigned a click event listener that calls the handleClick method.
  getButtonElement = () => {
    this.element.id = this.id;
    this.element.classList.add(this.style);
    this.element.innerHTML = this.stamp;
    this.element.addEventListener("mousedown", (event) =>
      this.handleClick(event)
    );
    return this.element;
  };

  // Create and return a div element with the stamp as its innerHTML.
  // The div element is also assigned a class to identify it as being dragged
  // A mousemove event listener that calls the startDrag method.
  getStampElement = () => {
    const stampElement = document.createElement("div");
    stampElement.classList.add("stamp__element--moving");
    stampElement.innerHTML = this.stamp;
    window.addEventListener("mousemove", (event) => this.startDrag(event));
    window.addEventListener("mouseup", (event) => this.stopDrag(event));
    return stampElement;
  };

  // Get the stamp element and position it at the mouse click coordinates.
  handleClick = (event) => {
    const stampElement = this.getStampElement();
    const stampX = event.clientX - stampElement.offsetWidth / 2;
    const stampY = event.clientY - stampElement.offsetHeight / 2;
    stampElement.style.left = `${stampX}px`;
    stampElement.style.top = `${stampY}px`;
    this.canvas.appendChild(stampElement);
  };

  // Get the stamp element and position it at the mouse coordinates with an offset of half the stamp element's width and height.
  startDrag = (event) => {
    const stampElement = this.canvas.querySelector(".stamp__element--moving");
    if (stampElement) {
      const stampX = event.clientX - stampElement.offsetWidth / 2;
      const stampY = event.clientY - stampElement.offsetHeight / 2;
      stampElement.style.left = `${stampX}px`;
      stampElement.style.top = `${stampY}px`;
    }
  };

  // Remove the stamp element's moving class and add a dropped class.
  stopDrag = (event) => {
    const stampElement = this.canvas.querySelector(".stamp__element--moving");
    if (stampElement) {
      stampElement.classList.remove("stamp__element--moving");
      stampElement.classList.add("stamp__element--dropped");
    }
  };
}
