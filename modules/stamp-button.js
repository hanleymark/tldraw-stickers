export class StampButton {
  constructor(id, stamp, style) {
    this.id = id;
    this.stamp = stamp;
    this.style = style;
    this.element = document.createElement("button");
  }
  getElement = () => {
    this.element.id = this.id;
    this.element.classList.add(this.style);
    this.element.innerHTML = this.stamp;
    this.element.addEventListener("click", this.handleClick);
    return this.element;
  }
    handleClick = () => {
      console.log(`Stamp button ${this.id} clicked!`);
    }
}