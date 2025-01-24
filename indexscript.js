//
let toggleButton;
let bigWrapper;
let hambugerMenu;
let side;
let bar;
let overlay;

function declare() {
  toggleButton = document.querySelector(".toggleButton");
  bigWrapper = document.querySelector(".bigWrapper");
  hambugerMenu = document.querySelector(".hamburgerMenu");
  side = document.querySelector(".side");
  bar = document.querySelector(".bar");
  overlay = document.querySelector(".overlay");
}

declare();

const main = document.querySelector("main");

let light = false;

function toggleAnimation() {
  light = !light;

  //clone the body
  let clone = bigWrapper.cloneNode(true);
  //set ture in the parameter will clone all the descendants as well. otherwise the default is only cloning the next layer
  let bgdiv = clone.querySelector(".bgdiv");
  let alpha = clone.querySelector(".alpha");

  if (light === true) {
    alpha.classList.remove("darkTheme");
    alpha.classList.add("lightTheme");

    // document.getElementsByClassName("jslightbg").style.zIndex = "-7";
  } else {
    alpha.classList.remove("lightTheme");
    alpha.classList.add("darkTheme");
  }
  clone.classList.add("copy");
  // console.log(img);
  main.appendChild(clone);

  // document.body.classList.add("noScrolling");

  if (light === true) {
    bgdiv.getElementsByTagName("img")[0].src = "/images/web bg_bg light.jpg";
  } else {
    bgdiv.getElementsByTagName("img")[0].src = "/images/web bg_bg dark.jpg";
  }

  clone.addEventListener("animationend", () => {
    // document.body.classList.remove("noScrolling");
    bigWrapper.remove();
    clone.classList.remove("copy");

    //reset variables
    declare();
    events();
  });
}

function events() {
  toggleButton.addEventListener("click", toggleAnimation);
  hambugerMenu.addEventListener("click", () => {
    bigWrapper.classList.add("active");
    side.classList.add("active");
  });
  hambugerMenu.addEventListener("mouseover", () => {
    hambugerMenu.classList.add("hovering");
  });
  hambugerMenu.addEventListener("mouseleave", () => {
    hambugerMenu.classList.remove("hovering");
  });

  overlay.addEventListener("click", () => {
    bigWrapper.classList.remove("active");
    side.classList.remove("active");
  });
}

events();

// console.log(toggleButton, bigWrapper, main);
