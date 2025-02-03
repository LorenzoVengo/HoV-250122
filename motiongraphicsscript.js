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
const lightboxVid = document.querySelector(".lightboxVid");
const chrisTitle = document.querySelector(".chrisTitle");
const chrisText = document.querySelector(".chrisText");
const chrisBtndiv = document.querySelector(".chrisBtndiv");
const activeChris = () => {
  lightboxChris.classList.add("chrisActive");
};
const hideChris = () => {
  lightboxChris.classList.remove("chrisActive");
};
// const setActiveImg = (image) => {
//   lightboxImg.src = image.dataset.imagesrc;
// };
// const setActiveVid = (video) => {
//   lightboxVid.src = video.dataset.videosrc;
// };

// const test = document.querySelector("#test");
// console.log(document.getElementById("test").dataset.videosrc);
// console.log(lightboxVid);

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

    if (chosen.tagName === "IMG") {
      // lightboxImg.classList.remove("hide");
      chrisCrop = document.createElement("div");
      chrisCrop.classList.add("chrisCrop");
      chrisContainer.prepend(chrisCrop);
      targetimg = document.createElement("img");
      targetimg.classList.add("lightboxImg");
      targetimg.src = chosen.dataset.imagesrc;
      chrisCrop.prepend(targetimg);
    } else if (chosen.tagName === "VIDEO") {
      targetvid = document.createElement("video");
      targetvid.classList.add("lightboxVid");
      targetvid.setAttribute("oncanplay", "this.muted=true");
      targetvid.setAttribute("autoplay", "");
      targetvid.setAttribute("loop", "");
      targetvid.setAttribute("controls", "");
      targetvid.setAttribute("controlsList", "nodownload");
      targetvid.src = chosen.dataset.videosrc;
      chrisContainer.prepend(targetvid);
      // lightboxVid.classList.remove("hide");
    } else if (chosen.tagName === "IFRAME") {
      targetvid = document.createElement("video");
      targetvid.classList.add("lightboxVid");
      targetvid.setAttribute("oncanplay", "this.muted=true");
      targetvid.setAttribute("autoplay", "");
      targetvid.setAttribute("loop", "");
      targetvid.setAttribute("controls", "");
      targetvid.setAttribute("controlsList", "nodownload");
      targetvid.src = chosen.dataset.videosrc;
      chrisContainer.prepend(targetvid);
      // lightboxVid.classList.remove("hide");
    }

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

//click away

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
    if (chrisContainer.firstChild) {
      chrisContainer.removeChild(chrisContainer.firstChild);
    }
  }, 500);

  if (e.target.querySelector(".chrisBtndiv").querySelector("button") !== null) {
    const targetBtn = e.target
      .querySelector(".chrisBtndiv")
      .querySelector("button");
    setTimeout(() => {
      targetBtn.classList.add("hide");
      targetBtn.classList.add("hideBtn");
      targetBtn.classList.remove("chrisBtn");
    }, 900);
  }
});

const main = document.querySelector("main");

let light = false;

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
