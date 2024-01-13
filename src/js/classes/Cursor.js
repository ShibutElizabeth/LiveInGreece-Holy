import gsap from "gsap";

export class Cursor{
    constructor(){
        this.instance = document.querySelector('#cursor');
    }

    cursorOnMouseMove = (e) => {
        const cursor = this.instance;
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            ease: 'power1.in',
            duration: 0.01,
        });
    }

    addListeners = () => {
        window.addEventListener('mousemove', this.cursorOnMouseMove.bind(this));
    }

    removeListeners = () => {
        window.removeEventListener('mousemove', this.cursorOnMouseMove.bind(this));
    }
}