export class Quote {
    constructor(text) {
        this.text = text;
        this.usedLetter = [];
    };
    getContent() {
        let content = '';
        for (const element of this.text) {
            if (element === ' ' || this.usedLetter.includes(element.toLowerCase())) {
                content += element;
            }
            else {
                content += '_';
            }
        }
        return content;
    }
    guess(letter) {
        this.usedLetter.push(letter);
        if ((this.text.toLowerCase()).includes(letter)) {
            return true;
        }
        else {
            return false;
        }
    }
};