import { StampButton } from "./modules/stamp-button.js";

const toolbarContainer = document.querySelector("#toolbar__container");
const canvas = document.querySelector("#canvas");

const stampItems = ["🌟", "🔥", "💖", "👍", "👎"];

setUpStampButtons(stampItems);

setUpDisplayCircleOnMouseClick();

function setUpStampButtons(stampItems) {
  const stampButtons = stampItems.map((stampItem, index) => {
    return new StampButton(
      `stamp-button-${index}`,
      stampItem,
      "toolbar__button",
      canvas
    );
  });

  stampButtons.forEach((button) => {
    toolbarContainer.appendChild(button.getButtonElement());
  });
}

function setUpDisplayCircleOnMouseClick() {
  window.addEventListener("mousedown", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const mouseCircle = document.createElement("div");
    mouseCircle.style.left = `${mouseX}px`;
    mouseCircle.style.top = `${mouseY}px`;
    mouseCircle.classList.add("mouse__circle");
    document.body.appendChild(mouseCircle);
  });
  window.addEventListener("mouseup", (event) => {
    const mouseCircle = document.querySelector(".mouse__circle");
    if (mouseCircle) {
      mouseCircle.remove();
    }
  });
}