import { Animations } from "./animations";

const sayHello = () => {
  console.log("HELLO");
}


window.onload(() => {
  sayHello();
  const animations = new Animations();
})

