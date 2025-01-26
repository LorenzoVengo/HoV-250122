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
      targetBtn.querySelector("button").classList.remove("hide");
      targetBtn.querySelector("button").classList.remove("hideBtn");
      targetBtn.querySelector("button").classList.add("chrisBtn");

      chrisBtndiv.innerHTML = e.target
        .closest(".gamma")
        .querySelector(".imgBtndiv").innerHTML;
    }
  });
});

chrisContainer.addEventListener("click", (e) => {
  if (e.target !== e.currentTarget) return;
  hideChris();

  chrisText.style.pointerEvents = "none";
  chrisTitle.style.pointerEvents = "none";

  const targetBtn = e.target
    .querySelector(".chrisBtndiv")
    .querySelector("button");
  if (targetBtn !== null) {
    setTimeout(() => {
      targetBtn.classList.add("hide");
      targetBtn.classList.add("hideBtn");
      targetBtn.classList.remove("chrisBtn");
    }, 900);
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

//download
function downloadWhitepaper2023() {
  // Define the URL of the PDF file
  let pdfUrl =
    "portfolio files/graphics/On the road to Net Zero InfoLink White Paper 2023.pdf";

  fetch(pdfUrl)
    .then((response) => response.blob())
    .then((blob) => {
      // Create a blob URL for the PDF data
      var url = window.URL.createObjectURL(blob);

      // Create a link element to trigger the download
      var a = document.createElement("a");
      a.href = url;
      a.download = "On the road to Net Zero InfoLink White Paper 2023.pdf"; // Set the desired file name
      document.body.appendChild(a);

      // Trigger a click event on the link element to initiate the download
      a.click();

      // Clean up by revoking the blob URL and removing the link element
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    })
    .catch((error) => {
      console.error("Failed to download the PDF file: ", error);
    });
}
