import gsap from "gsap";
import debounce from './debounce';
import * as colors from './variables';

export class Animations {
    constructor() {
        console.log(colors);
        this.circles = document.querySelectorAll('.js-circle');
        this.circleCovers = document.querySelectorAll('.js-circle-mask');
        this.circleArrows = document.querySelectorAll('.js-circle-arrow');
        this.oppItems = document.querySelectorAll('.js-opp-item');
        this.cursor = document.querySelector('#cursor');
        this.initCursor();
        this.initCircles();
        this.initOppItems();
    }

    initCursor() {
        const cursor = this.cursor;
        const cursorOnMouseMove = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                ease: 'power1.in',
                duration: 0.01,
            });
        }

        window.addEventListener('mousemove', cursorOnMouseMove);
    }

    initCircles() {
        const onHover = (i) => {
            const cover = this.circleCovers[i];
            gsap.to(cover, {
                scale: 1,
                duration: 0.3,
                ease: 'power1.easeIn'
            });

            gsap.to(this.cursor, {backgroundColor: colors.darker}); 
        };

        const onLeave = (i) => {
            const cover = this.circleCovers[i];
            gsap.to(cover, {
                scale: 0,
                duration: 0.3,
                ease: 'power1.easeIn'
            });

            gsap.to(this.cursor, {backgroundColor: colors.light});
        };

        const rotateOnMouseMove = (i, x, y) => {
            const arrow = this.circleArrows[i];
            const cover = this.circleCovers[i];
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

        this.circleCovers.forEach((cover) => {
            gsap.set(cover, {scale: 0});
        });

        this.circles.forEach((circle, i) => {
            this.setCircleHover(circle, i, onHover, onLeave, rotateOnMouseMove);
        });
    }

    initOppItems(){
        const onHover = () => {
            gsap.to(this.cursor, {backgroundColor: colors.cta});
        };

        const onLeave = () => {
            gsap.to(this.cursor, {backgroundColor: colors.light});
        };

        this.oppItems.forEach((item, i) => {
            item.addEventListener('mouseenter', onHover);
            item.addEventListener('mouseleave', onLeave);
        });
    }

    setCircleHover(item, i, onHover, onLeave, onMouseMove) {
        const that = this;
        const self = item;
        let hover = false;

        window.addEventListener("mousemove", (e) => {
            // cursor
            const mouse = {
                x: e.clientX,
                y: e.clientY
            };

            const offset = self.getBoundingClientRect();
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
            if(onMouseMove) onMouseMove(i, x, y);

            // anim
            if (dist < width * 0.51) {
                mutHover = true;
                if (!hover) {
                    hover = true;
                }
                debounce(onHover(i), 100);
            }

            // reset
            if (!mutHover && hover) {
                debounce(onLeave(i), 100);
                hover = false;
            }
        });
    };

    
}