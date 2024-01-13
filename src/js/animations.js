import { Cursor } from "./classes/Cursor";
import { Circles } from "./classes/Circles";
import { Links } from "./classes/Links";

export class Animations {
    constructor() {
        this.cursor = new Cursor();
        this.circles = new Circles(this.cursor);
        this.links = new Links(this.cursor);
        this.isMobile = false;
        this.turned = false;
        this.windowOnResize();
    }

    windowOnResize() {
        const isMobileDevice = () => {
            this.isMobile = window.innerWidth <= 599;
            console.log('isMobile: ' + this.isMobile);
            if(!this.isMobile && !this.turned){
                console.log('turned: ' + this.turned);
                this.addAnimations();
            } else if(this.isMobile && this.turned) {
                console.log('turned remove: ' + this.turned);
                this.removeAnimations();
            }
        }
        isMobileDevice();
        window.addEventListener('resize', isMobileDevice);
    }

    addAnimations(){
        console.log('add');
        this.turned = true;
        this.cursor.addListeners();
        this.circles.addListeners();
        this.links.addListeners();
    }

    removeAnimations(){
        console.log('remove');
        this.turned = false;
        this.cursor.removeListeners();
        this.circles.removeListeners();
        this.links.removeListeners();
    }
    
}