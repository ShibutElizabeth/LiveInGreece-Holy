import gsap from "gsap";
import debounce from '../debounce';
import * as colors from '../variables';

export class Circles {
    constructor(_cursor) {
        this.items = document.querySelectorAll('.js-circle');
        this.covers = document.querySelectorAll('.js-circle-mask');
        this.arrows = document.querySelectorAll('.js-circle-arrow');
        this.cursor = _cursor;
        this.covers.forEach((cover) => {
            gsap.set(cover, {scale: 0});
        });
    }

    onHover = (module) => {
        const { cover, cursor } = module;
        gsap.to(cover, {
            scale: 1,
            duration: 0.3,
            ease: 'power1.easeIn'
        });

        gsap.to(cursor, {backgroundColor: colors.darker}); 
    };

    onLeave = (module) => {
        const { cover, cursor } = module;
        gsap.to(cover, {
            scale: 0,
            duration: 0.3,
            ease: 'power1.easeIn'
        });

        gsap.to(cursor, {backgroundColor: colors.light});
    };

    rotateOnMouseMove = (module, x, y) => {
        const { arrow, cover } = module;
        const circle = document.querySelector('.js-circle-yellow');
        const angle = 180 + Math.atan2(y, x) * (180 / Math.PI);
        arrow.style.transform = `scale(0.2) rotate(${angle}deg)`;
        circle.style.transform = `rotate(${angle}deg)`;

        gsap.to(cover, {
            x: x * 0.15,
            y: y * 0.15,
            duration: 0.1,
        });
    }

    addListeners() {
        this.items.forEach((item, i) => {
            const module = {
                item: item,
                cover: this.covers[i],
                arrow: this.arrows[i],
                cursor: this.cursor
            }
            this.setCircleHover(module, this.onHover, this.onLeave, this.rotateOnMouseMove);
        });
    }

    setCircleHover(module, onHover, onLeave, onMouseMove) {
        const { item } = module;
        let hover = false;

        const windowOnMouseMove = (e) => {
            // cursor
            const mouse = {
                x: e.clientX,
                y: e.clientY
            };

            const offset = item.getBoundingClientRect();
            // size
            const {width} = offset;
            const {height} = offset;

            const wHalf = width / 2;
            const hHalf = height / 2;
            
            const elPos = {
                x: offset.left + wHalf,
                y: offset.top + hHalf
            };

            // comparaison
            const x = mouse.x - elPos.x;
            const y = mouse.y - elPos.y;

            // dist
            const dist = Math.sqrt(x * x + y * y);

            // mutex hover
            let mutHover = false;

            // arrow rotation
            if(onMouseMove) onMouseMove(module, x, y);

            // anim
            if (dist < width * 0.51) {
                mutHover = true;
                if (!hover) {
                    hover = true;
                }
                debounce(onHover(module), 100);
            }

            // reset
            if (!mutHover && hover) {
                debounce(onLeave(module), 100);
                hover = false;
            }
        }

        window.addEventListener("mousemove", windowOnMouseMove);
    };
}