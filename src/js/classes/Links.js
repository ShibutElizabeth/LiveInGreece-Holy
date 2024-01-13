import * as colors from '../lib/variables';

export class Links{
    constructor(_cursor){
        this.items = document.querySelectorAll('.js-link-item');
        this.cursor = _cursor;
    }

    onHover = () => {
        this.cursor.changeColor(colors.cta);
    }

    onLeave = () => {
        this.cursor.changeColor(colors.light);
    }

    addListeners = () => {
        this.items.forEach((item) => {
            item.addEventListener('mouseenter', this.onHover.bind(this));
            item.addEventListener('mouseleave', this.onLeave.bind(this));
        });
    }

    removeListeners = () => {
        this.items.forEach((item) => {
            item.removeEventListener('mouseenter', this.onHover.bind(this));
            item.removeEventListener('mouseleave', this.onLeave.bind(this));
        });
    }
}