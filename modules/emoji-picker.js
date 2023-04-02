import { emojis } from "./emoji-collection.js";

export class EmojiPicker {
  constructor() {
    // Get array of emoji objects from emoji-collection.js and sort them by category
    this.allEmojis = emojis.sort((a, b) => {
      return a.category > b.category ? 1 : -1;
    });
    // Use Set constructor to create a new array of unique categories
    this.categories = [
      ...new Set(this.allEmojis.map((emoji, index) => emoji.category)),
    ];

    console.log(this.categories);
  }
}
