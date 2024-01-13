import gsap from "gsap/all";

export class Menu{
    constructor(){
        this.burger = document.querySelector('.js-burger');
        this.menu = document.querySelector('.js-menu');
        this.items = document.querySelectorAll('.js-menu-item');
        this.isOpen = false;
        this.addListeners();
    }

    onClick = () => {
        const burger = this.burger;
        const menu = this.menu;
        const items = this.items;
        const lines = burger.querySelectorAll('div');

        const lineAnimation = (el, i, reversed) => gsap.timeline()
            .fromTo(el, {
                transform: 'none',
            },{
                transform: (i + 1) % 2 === 0 ? 'rotate(45deg) translate(-2px, -6px)' : 'rotate(-45deg) translate(-1px, 4px)',
                duration: 0.3,
                reversed: reversed,
            });

        const menuAnimationOpen = () => gsap.timeline()
            .fromTo(menu, {
                y: '-100%',
            }, {
                y: '0%',
                duration: 0.8,
                ease: 'power1.inOut'
            })
            .fromTo(items, {
                opacity: 0,
            }, {
                opacity: 1,
                stagger: 0.3,
                duration: 0.5,
                delay: 0.3,
                ease: 'power1.inOut'
            });
        
        const menuAnimationClose = () => gsap.timeline()
            .fromTo(items, {
                opacity: 1,
            }, {
                opacity: 0,
                duration: 0.3,
                ease: 'power1.inOut'
            })
            .fromTo(menu, {
                y: '0%',
            }, {
                y: '-100%',
                duration: 0.8,
                ease: 'power1.inOut'
            });
        if(!this.isOpen){
            this.isOpen = true;
            document.body.classList.add('no-scroll');
            lines.forEach((line, i) => {
                lineAnimation(line, i, false)
            });
            menuAnimationOpen();
        } else {
            document.body.classList.remove('no-scroll');
            this.isOpen = false;
            lines.forEach((line, i) => {
                lineAnimation(line, i, true);
            });
            menuAnimationClose();
        }
        
    }

    addListeners(){
        this.burger.addEventListener('click', this.onClick.bind(this))
    }
}