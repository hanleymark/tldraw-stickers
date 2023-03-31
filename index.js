import { StampButton } from "./modules/stamp-button.js";

const toolbarContainer = document.querySelector("#toolbar__container");
const canvas = document.querySelector("#canvas");

const stampItems = ["🌟", "🔥", "💖", "👍", "👎"];

setUpStampButtons(stampItems);

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
