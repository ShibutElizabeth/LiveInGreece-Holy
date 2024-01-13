import { Cursor } from "./classes/Cursor";
import { Circles } from "./classes/Circles";
import { Links } from "./classes/Links";
import { Menu } from "./classes/Menu";

export class Animations {
    constructor() {
        this.cursor = new Cursor();
        this.circles = new Circles(this.cursor);
        this.links = new Links(this.cursor);
        this.menu = new Menu();
        this.isMobile = false;
        this.turned = false;
        this.windowOnResize();
    }

    windowOnResize() {
        const isMobileDevice = () => {
            this.isMobile = window.innerWidth <= 599;
            if(!this.isMobile && !this.turned){
                this.addAnimations();
            } else if(this.isMobile && this.turned) {
                this.removeAnimations();
            }
        }
        isMobileDevice();
        window.addEventListener('resize', isMobileDevice);
    }

    addAnimations(){
        this.turned = true;
        this.cursor.addListeners();
        this.circles.addListeners();
        this.links.addListeners();
    }

    removeAnimations(){
        this.turned = false;
        this.cursor.removeListeners();
        this.circles.removeListeners();
        this.links.removeListeners();
    }
    
}