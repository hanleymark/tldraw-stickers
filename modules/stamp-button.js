export class StampButton {
  constructor(id, stamp, style, canvas) {
    this.id = id;
    this.stamp = stamp;
    this.style = style;
    this.canvas = canvas;
    this.element = document.createElement("button");
  }

  getButtonElement = () => {
    this.element.id = this.id;
    this.element.classList.add(this.style);
    this.element.innerHTML = this.stamp;
    this.element.addEventListener("mousedown", (event) => this.handleClick(event));
    return this.element;
  };

  getStampElement = () => {
    const stampElement = document.createElement("div");
    stampElement.classList.add("stamp__element--moving");
    stampElement.innerHTML = this.stamp;
    window.addEventListener("mousemove", (event) => this.startDrag(event));
    window.addEventListener("mouseup", (event) => this.stopDrag(event));
    return stampElement;
  }

  handleClick = (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const stampElement = this.getStampElement();
    stampElement.style.left = `${mouseX}px`;
    stampElement.style.top = `${mouseY}px`;
    this.canvas.appendChild(stampElement);
  };

  startDrag = (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const stampElement = this.canvas.querySelector(".stamp__element--moving");
    if (stampElement) {
      stampElement.style.left = `${mouseX}px`;
      stampElement.style.top = `${mouseY}px`;
    }
  }

  stopDrag = (event) => {
    const stampElement = this.canvas.querySelector(".stamp__element--moving");
    if (stampElement) {
      stampElement.classList.remove("stamp__element--moving");
    }
  }
}
