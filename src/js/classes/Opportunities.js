import gsap from "gsap";
import * as colors from '../variables';

export class Opportunities{
    constructor(_cursor){
        this.items = document.querySelectorAll('.js-opp-item');
        this.cursor = _cursor;
    }

    onHover = () => {
        gsap.to(this.cursor, {backgroundColor: colors.cta});
    }

    onLeave = () => {
        gsap.to(this.cursor, {backgroundColor: colors.light});
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