//
// let toggleButton;
let bigWrapper;
let hambugerMenu;
let side;
let bar;
let overlay;
// let lightboxOverlay;
const lightboxAvailables = document.querySelectorAll(".hoverfade");
const chrisContainer = document.querySelector(".chrisContainer");
const lightboxChris = document.querySelector(".lightboxChris");
const lightboxImg = document.querySelector(".lightboxImg");
const chrisTitle = document.querySelector(".chrisTitle");
const chrisText = document.querySelector(".chrisText");
const chrisBtndiv = document.querySelector(".chrisBtndiv");
const activeChris = () => {
  lightboxChris.classList.add("chrisActive");
};
const hideChris = () => {
  lightboxChris.classList.remove("chrisActive");
};
const setActiveImg = (image) => {
  lightboxImg.src = image.dataset.imagesrc;
};

function declare() {
  // toggleButton = document.querySelector(".toggleButton");
  bigWrapper = document.querySelector(".bigWrapper");
  hambugerMenu = document.querySelector(".hamburgerMenu");
  side = document.querySelector(".side");
  bar = document.querySelector(".bar");
  overlay = document.querySelector(".overlay");

  // lightbox.id = "lightbox";
  // document.body.appendChild(lightbox);
  // lightboxOverlay = document.createElement("div");
  // lightboxOverlay.classList.add("lightboxOverlay");
  // lightbox.appendChild(lightboxOverlay);
}

declare();

//light box Chris

lightboxAvailables.forEach((element) => {
  element.addEventListener("click", (e) => {
    chrisTitle.innerHTML = null;
    chrisText.innerHTML = null;
    chrisBtndiv.innerHTML = null;
    chrisText.style.pointerEvents = "auto";
    chrisTitle.style.pointerEvents = "auto";
    activeChris();

    chosen = element.closest(".gamma").querySelector(".jslightbox");
    setActiveImg(chosen);

    // console.log(e.target.closest(".gamma").querySelector(".imgTitle").innerText);
    // console.log(chrisTitle.innerText);

    if (e.target.closest(".gamma").querySelector(".imgTitle") !== null) {
      chrisTitle.innerHTML = e.target
        .closest(".gamma")
        .querySelector(".imgTitle").innerHTML;
    }

    if (e.target.closest(".gamma").querySelector(".imgText") !== null) {
      chrisText.innerHTML = e.target
        .closest(".gamma")
        .querySelector(".imgText").innerHTML;
    }

    const targetBtn = e.target.closest(".gamma").querySelector(".imgBtndiv");
    if (targetBtn !== null) {
      chrisBtndiv.innerHTML = e.target
        .closest(".gamma")
        .querySelector(".imgBtndiv").innerHTML;

      const showbtn = chrisBtndiv.querySelectorAll("button");
      showbtn.forEach((btn) => btn.classList.remove("hide"));
      showbtn.forEach((btn) => btn.classList.remove("hideBtn"));
      showbtn.forEach((btn) => btn.classList.add("chrisBtn"));
    }
  });
});

// click away

chrisContainer.addEventListener("click", (e) => {
  if (e.target !== e.currentTarget) return;
  blockdiv = document.createElement("div");
  document.body.prepend(blockdiv);
  blockdiv.classList.add("blockdiv");
  hideChris();

  chrisText.style.pointerEvents = "none";
  chrisTitle.style.pointerEvents = "none";

  setTimeout(() => {
    blockdiv.remove();
    lightboxImg.src = " ";
  }, 505);

  const targetBtn = e.target.querySelector(".chrisBtndiv");
  if (targetBtn !== null) {
    setTimeout(() => {
      const showbtn = targetBtn.querySelectorAll("button");
      showbtn.forEach((btn) => btn.classList.add("hide"));
      showbtn.forEach((btn) => btn.classList.add("hideBtn"));
      showbtn.forEach((btn) => btn.classList.remove("chrisBtn"));
    }, 500);
  }
});

//light box Chris end

//the lightbox click
//the lightbox 1

// const images = document.querySelectorAll(".beta.mid .gamma img");
// images.forEach((image) => {
//   image.addEventListener("click", (e) => {
//     lightbox.classList.add("lightboxactive");

//     const img = document.createElement("img");
//     img.src = image.src;
//     img.classList.add("lightboximg");

//     while (lightbox.firstChild) {
//       lightbox.removeChild(lightbox.firstChild);
//     }

//     const boxTitle = document.createElement("div");
//     boxTitle.classList.add("boxTitle");

//     const boxText = document.createElement("div");
//     boxText.classList.add("boxText");

//     const boxBtn = document.createElement("button");
//     boxBtn.classList.add("boxBtn");

//     const lightContainer = document.createElement("div");
//     lightContainer.classList.add("lightContainer");

//     const lightContainerBeta = document.createElement("div");
//     lightContainerBeta.classList.add("lightContainerBeta");

//     const crop = document.createElement("div");
//     crop.classList.add("crop");

//     lightbox.appendChild(lightContainer);

//     lightContainer.appendChild(crop);
//     crop.appendChild(img);

//     lightContainer.appendChild(lightContainerBeta);
//     lightContainerBeta.appendChild(boxText);
//     lightContainerBeta.appendChild(boxBtn);
//   });
// });

// lightboxOverlay.addEventListener("click", (e) => {
//   if (e.target !== e.currentTarget) return;
//   lightbox.classList.remove("lightboxactive");
// });

//the lightbox 1

// console.log(images);
// images.forEach((img) => {
//   console.log(img.alt);
// });
// images.forEach((img) => {
//   console.log(img.closest(".gamma").querySelector("button"));
// });

const main = document.querySelector("main");

let light = false;

// function toggleAnimation() {
//   light = !light;

//   //clone the body
//   let clone = bigWrapper.cloneNode(true);
//   //set ture in the parameter will clone all the descendants as well. otherwise the default is only cloning the next layer
//   let bgdiv = clone.querySelector(".bgdiv");
//   let alpha = clone.querySelector(".alpha");

//   if (light === true) {
//     alpha.classList.remove("darkTheme");
//     alpha.classList.add("lightTheme");

//     // document.getElementsByClassName("jslightbg").style.zIndex = "-7";
//   } else {
//     alpha.classList.remove("lightTheme");
//     alpha.classList.add("darkTheme");
//   }
//   clone.classList.add("copy");
//   // console.log(img);
//   main.appendChild(clone);

//   // document.body.classList.add("noScrolling");

//   //this is bg change
//   // if (light === true) {
//   //   bgdiv.getElementsByTagName("img")[0].src = "/images/web bg_bg light.jpg";
//   // } else {
//   //   bgdiv.getElementsByTagName("img")[0].src = "/images/web bg_bg dark.jpg";
//   // }

//   clone.addEventListener("animationend", () => {
//     // document.body.classList.remove("noScrolling");
//     bigWrapper.remove();
//     clone.classList.remove("copy");

//     //reset variables
//     declare();
//     events();
//   });
// }

function events() {
  // toggleButton.addEventListener("click", toggleAnimation);
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
