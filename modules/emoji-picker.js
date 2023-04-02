import { emojis } from './emoji-collection.js';

export class EmojiPicker {
  constructor() {
    // Get array of emoji objects from emoji-collection.js and sort them by category
    this.allEmojis = emojis.sort((a, b) => {
        return a.category > b.category ? 1 : -1;
      });;
  }
}
