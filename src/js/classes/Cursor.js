import gsap from "gsap/all";

export class Cursor{
    constructor(){
        this.instance = document.querySelector('#cursor');
    }

    onMouseMove = (e) => {
        const cursor = this.instance;
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            ease: 'power1.in',
            duration: 0.01,
        });
    }

    changeColor = (color) => {
        const cursor = this.instance;
        gsap.to(cursor, {backgroundColor: color}); 
    }

    addListeners = () => {
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
    }

    removeListeners = () => {
        window.removeEventListener('mousemove', this.onMouseMove.bind(this));
    }
}