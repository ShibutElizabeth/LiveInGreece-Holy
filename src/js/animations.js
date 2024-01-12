import gsap from "gsap";
import debounce from './debounce';

export class Animations {
    constructor() {
        this.circles = document.querySelectorAll('.js-circle');
        this.circleCovers = document.querySelectorAll('.js-circle-cover');
        this.cursor = document.querySelector('#cursor');
        this.initCursor();
        this.initCircles();
        // this.initMask();
    }

    initCursor() {
        const cursor = this.cursor;
        const cursorOnMouseMove = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                ease: 'power1.easeInOut'
            });
        }
        window.addEventListener('mousemove', cursorOnMouseMove);
    }

    initCircles() {
        this.circleCovers.forEach((cover) => {
            // gsap.set(cover, {scale: 0});
        })

        this.circles.forEach((circle, i) => {
            // this.setCircleHover(circle, i);
        })
        this.setCircleHover(this.circles[0]);
    }

    initMask(){
        gsap.fromTo("#circleMask", {
            scale:0
        }, {
            scale: 1, 
            repeat: -1, 
            repeatDelay: 1, 
            yoyo:true,
            duration: 4,
        })
    }

    setCircleHover(item, i) {
        const that = this;
        const self = item;
        const cover = '#circleMask'// this.circleCovers[i];
        let hover = false;

        const onHover = (x, y) => {
            gsap.to(cover, {
                scale: 1,
                // transformOrigin: `${x + '% ' + y + '%'}`,
                duration: 0.3,
                ease: 'power1.easeIn'
            });

            gsap.to(that.cursor, {backgroundColor: '#2E3233'});
        };

        const onLeave = (x, y) => {
            gsap.to(cover, {
                scale: 0,
                // transformOrigin: `${x + '% ' + y + '%'}`,
                duration: 0.3,
                ease: 'power1.easeIn'
            });

            gsap.to(that.cursor, {backgroundColor: '#DAE6E6'});
        };

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

            const elPos = {
                x: offset.left + width / 2,
                y: offset.top + height / 2
            };

            // comparaison
            const x = mouse.x - elPos.x;
            const y = mouse.y - elPos.y;

            // dist
            const dist = Math.sqrt(x * x + y * y);

            // mutex hover
            let mutHover = false;

            // anim
            if (dist < width * 0.5) {
                mutHover = true;
                if (!hover) {
                    hover = true;
                }
                debounce(onHover(x + width/2, y + height/2), 100);
            }

            // reset
            if (!mutHover && hover) {
                debounce(onLeave(x + width/2, y + height/2), 100);
                hover = false;
            }
        });
    };

}