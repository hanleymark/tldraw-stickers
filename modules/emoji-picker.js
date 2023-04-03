import { emojis } from "./emoji-collection.js";

export class EmojiPicker {
  constructor() {
    // Get array of emoji objects from emoji-collection.js and sort them by category
    this.allEmojis = emojis.sort((a, b) => {
      return a.category > b.category ? 1 : -1;
    });
    // Use Set constructor to create a new array of unique categories
    this.categories = [
      ...new Set(this.allEmojis.map((emoji) => emoji.category)),
    ];
    // Create element reference for emoji picker
    this.element;
  }
  // Create (if not already created) and return emoji picker element
  getPickerElement(stampItemsArray, displayStampButtonsCallback) {
    if (this.element) return this.element;

    // Create emoji picker element if not already created
    this.element = document.createElement("div");
    this.element.classList.add("emoji-picker");

    // Create emoji picker header element and add to emoji picker element
    const emojiPickerHeader = document.createElement("div");
    emojiPickerHeader.classList.add("emoji-picker__header");
    this.element.appendChild(emojiPickerHeader);

    // Create emoji picker header title element, add a heading and add to emoji picker header element
    const emojiPickerHeaderTitle = document.createElement("h2");
    emojiPickerHeaderTitle.classList.add("emoji-picker__header-title");
    emojiPickerHeaderTitle.innerText = "Add custom emoji";
    emojiPickerHeader.appendChild(emojiPickerHeaderTitle);

    // Create emoji picker header close button element, add a button and add to emoji picker header element
    const emojiPickerHeaderCloseButton = document.createElement("button");
    emojiPickerHeaderCloseButton.classList.add(
      "emoji-picker__header-close-button"
    );
    emojiPickerHeaderCloseButton.innerHTML = "&#x2715"; // 'x' character
    // Add event listener to close button to remove emoji picker element from DOM when close button is clicked
    emojiPickerHeaderCloseButton.addEventListener("mousedown", () => {
      this.element.remove();
    });
    emojiPickerHeader.appendChild(emojiPickerHeaderCloseButton);

    // Create emoji picker body element
    const emojiPickerBody = document.createElement("div");
    emojiPickerBody.classList.add("emoji-picker__body");

    // Iterate through emoji categories
    for (let category in this.categories) {
      // Create a section element for the current category
      const emojiPickerBodyCategory = document.createElement("section");
      // Create a heading element for the current category and set its text to the current category
      const emojiPickerBodyCategoryTitle = document.createElement("h3");
      emojiPickerBodyCategoryTitle.classList.add(
        "emoji-picker__body--category-title"
      );
      emojiPickerBodyCategoryTitle.innerText = this.categories[category];
      // Append the heading element to the category section element
      emojiPickerBodyCategory.appendChild(emojiPickerBodyCategoryTitle);
      emojiPickerBodyCategory.classList.add("emoji-picker__body--category");

      // Iterate through all emojis in the current category then create and add a button for each
      for (let emojiObject of this.allEmojis.filter(
        (emoji) => emoji.category === this.categories[category]
      )) {
        // Create a button element for the current emoji and style it
        const emojiPickerButton = document.createElement("button");
        emojiPickerButton.classList.add("emoji-picker__body--button");
        emojiPickerButton.innerHTML = emojiObject.emoji;
        // Add the emoji description as a data attribute to the button element
        emojiPickerButton.setAttribute(
          "data-emoji-description",
          emojiObject.description
        );
        emojiPickerButton.addEventListener(
          "mouseover",
          handleEmojiButtonMouseOver
        );
        emojiPickerButton.addEventListener(
          "mouseout",
          () => (emojiPickerFooter.innerHTML = "")
        );
        emojiPickerButton.addEventListener("mousedown", (event) => {
          handleEmojiButtonMouseDown(event);
          this.element.remove();
        });
        emojiPickerBodyCategory.appendChild(emojiPickerButton);
      }

      emojiPickerBody.appendChild(emojiPickerBodyCategory);
    }
    // Append the emoji picker body element to the emoji picker element
    this.element.appendChild(emojiPickerBody);

    const emojiPickerFooter = document.createElement("div");
    emojiPickerFooter.classList.add("emoji-picker__footer");
    this.element.appendChild(emojiPickerFooter);
    return this.element;

    // If user mouses over an emoji button, display the emoji and its description in the footer
    function handleEmojiButtonMouseOver(event) {
      const selectedEmojiText = `Click to add: ${
        event.target.innerHTML
      } ${event.target.getAttribute("data-emoji-description")}`;
      emojiPickerFooter.innerHTML = selectedEmojiText;
    }
    // If user clicks an emoji button, add the emoji to the stampItemsArray and call the displayStampButtonsCallback function
    function handleEmojiButtonMouseDown(event) {
      stampItemsArray.push(event.target.innerHTML);
      displayStampButtonsCallback(stampItemsArray);
    }
  }
}
