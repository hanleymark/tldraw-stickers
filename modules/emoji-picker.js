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
    // Create element for emoji picker
    this.element;
  }
  getPickerElement() {
    if (this.element) return this.element;

    this.element = document.createElement("div");
    this.element.classList.add("emoji-picker");
    
    const emojiPickerHeader = document.createElement("div");
    emojiPickerHeader.classList.add("emoji-picker__header");
    this.element.appendChild(emojiPickerHeader);

    const emojiPickerHeaderTitle = document.createElement("h2");
    emojiPickerHeaderTitle.classList.add("emoji-picker__header-title");
    emojiPickerHeaderTitle.innerText = "Emoji Picker";
    emojiPickerHeader.appendChild(emojiPickerHeaderTitle);

    // const emojiPickerHeaderCloseButton = document.createElement("button");
    // emojiPickerHeaderCloseButton.classList.add("emoji-picker__header-close-button");
    // emojiPickerHeaderCloseButton.innerText = "X";
    // emojiPickerHeader.appendChild(emojiPickerHeaderCloseButton);

    const emojiPickerBody = document.createElement("div");
    emojiPickerBody.classList.add("emoji-picker__body");

    for (let category in this.categories) {
        const emojiPickerBodyCategory = document.createElement("section");
        const emojiPickerBodyCategoryTitle = document.createElement("h3");
        emojiPickerBodyCategoryTitle.classList.add("emoji-picker__body--category-title");
        emojiPickerBodyCategoryTitle.innerText = this.categories[category];
        emojiPickerBodyCategory.appendChild(emojiPickerBodyCategoryTitle);

        emojiPickerBodyCategory.classList.add("emoji-picker__body--category");

        for (let emojiObject of this.allEmojis.filter(emoji => emoji.category === this.categories[category])) {
            const emojiPickerButton = document.createElement("button");
            emojiPickerButton.classList.add("emoji-picker__body--button");
            emojiPickerButton.innerHTML = emojiObject.emoji;
            emojiPickerBodyCategory.appendChild(emojiPickerButton);
        }
        emojiPickerBody.appendChild(emojiPickerBodyCategory);
    }

    this.element.appendChild(emojiPickerBody);

    return this.element;
  }
}
