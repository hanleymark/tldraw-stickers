import { StampButton } from "./modules/stamp-button.js";
import { EmojiPicker } from "./modules/emoji-picker.js";

const toolbarContainer = document.querySelector("#toolbar__container");
const canvas = document.querySelector("#canvas");
const bodyElement = document.querySelector("body");

const stampItems = ["🌟", "🔥", "💖", "👍", "👎"];

setUpStampButtons(stampItems);
setUpAddCustomStampButton();

setUpDisplayCircleOnMouseClick();

const emojiPicker = new EmojiPicker();

// Create stamp buttons one for each object in stampItems array
function setUpStampButtons(stampItems) {
  const stampButtons = stampItems.map((stampItem, index) => {
    return new StampButton(
      `stamp-button-${index}`,
      stampItem,
      "toolbar__button",
      canvas
    );
  });

  // Add each stamp button to toolbar
  stampButtons.forEach((button) => {
    toolbarContainer.appendChild(button.getButtonElement());
  });
}

// Display a circle on mouse click
function setUpDisplayCircleOnMouseClick() {
  window.addEventListener("mousedown", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    // Create empty div and set position to mouse position
    // Add 'mouse__circle' class (displays circle around div)
    const mouseCircle = document.createElement("div");
    mouseCircle.style.left = `${mouseX}px`;
    mouseCircle.style.top = `${mouseY}px`;
    mouseCircle.classList.add("mouse__circle");
    document.body.appendChild(mouseCircle);
  });
  // Remove mouseCircle div on mouse up
  window.addEventListener("mouseup", (event) => {
    const mouseCircle = document.querySelector(".mouse__circle");
    if (mouseCircle) {
      mouseCircle.remove();
    }
  });
}

// Add custom stamp button
function setUpAddCustomStampButton() {
  const addCustomStampButton = document.createElement("button");
  addCustomStampButton.id = "add-custom-stamp-button";
  addCustomStampButton.classList.add("toolbar__button--add-custom-stamp");
  addCustomStampButton.innerText = "+";

  addCustomStampButton.addEventListener("mousedown", () => {
    console.log("Add custom stamp button clicked");
    bodyElement.appendChild(emojiPicker.getPickerElement());
  },true);

  toolbarContainer.appendChild(addCustomStampButton);
}
