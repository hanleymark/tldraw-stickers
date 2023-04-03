import { StampButton } from "./modules/stamp-button.js";
import { EmojiPicker } from "./modules/emoji-picker.js";

const toolbarContainer = document.querySelector("#toolbar__container");
const canvas = document.querySelector("#canvas");
const bodyElement = document.querySelector("body");

const stampItems = ["🌟", "🔥", "💖", "👍", "👎"];

setUpStampButtons(stampItems);

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
  // Clear toolbar container if already populated
  toolbarContainer.innerHTML = "";
  // Add each stamp button to toolbar
  stampButtons.forEach((button) => {
    window.removeEventListener("mousemove", button.startDrag);
    canvas.removeEventListener("mousedown", button.stopDrag);
    toolbarContainer.appendChild(button.getButtonElement());
  });
  // Add custom stamp button to end of buttons
  setUpAddCustomStampButton();
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
  // Set up add custom stamp button
  const addCustomStampButton = document.createElement("button");
  addCustomStampButton.id = "add-custom-stamp-button";
  addCustomStampButton.classList.add("toolbar__button--add-custom-stamp");
  addCustomStampButton.innerText = "+";

  // Add mousedown event listener to add custom stamp button
  addCustomStampButton.addEventListener("mousedown", () => {
    // If stamp being dragged exists, remove it
    if(document.querySelector(".stamp__element--moving")) {
      document.querySelector(".stamp__element--moving").remove();
    }
    // If circle on click exists, remove it
    if (document.querySelector(".mouse__circle")) {
      document.querySelector(".mouse__circle").remove();
    }
    // Get emoji picker element and append to body
    bodyElement.appendChild(emojiPicker.getPickerElement(stampItems, setUpStampButtons));
  },true);
  // Add custom emoji button to toolbar
  toolbarContainer.appendChild(addCustomStampButton);
}
