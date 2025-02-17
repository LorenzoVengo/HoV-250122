// const buttons = document.querySelectorAll("[data-carousel-button]");

// buttons.forEach((button) => {
//   button.addEventListener("click", () => {
//     const offset = button.dataset.carouselButton === "up" ? 1 : -1;
//     const slides = button
//       .closest("[data-carousel]")
//       .querySelector("[data-slides]");

//     const activeSlide = slides.querySelector("[data-active]");

//     let newIndex = [...slides.children].indexOf(activeSlide) + offset;
//     if (newIndex < 0) newIndex = slides.children.length - 1;
//     if (newIndex >= slides.children.length) newIndex = 0;

//     slides.children[newIndex].dataset.active = true;
//     delete activeSlide.dataset.active;
//   });
// });

//auto slide

const slides = document.querySelectorAll(".slides li");
const resumeLink = document.querySelector("#resumeLink");

let slideIndex = 0;
let intervalId = null;

document.addEventListener("DOMContentLoaded", initializeCarousel);

function initializeCarousel() {
  if (slides.length > 0) {
    // slides[slideIndex].classList.add("displaying");
    intervalId = setInterval(nextSlide, 5000);
  }
}

function showSlide(index) {
  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1;
  }

  slides.forEach((slide) => {
    delete slide.dataset.active;
    // console.log(slide);
  });
  slides[slideIndex].dataset.active = true;
}

function prevSlide() {
  // clearInterval(intervalId);
  slideIndex--;
  showSlide(slideIndex);
}

function nextSlide() {
  slideIndex++;
  showSlide(slideIndex);
}

// show prompt

let password = "";

const invalid = document.querySelector(".invalid");

function showPrompt() {
  document.querySelector(".promptup").classList.remove("hide");
  document.querySelector(".dialogue").classList.remove("hide");

  setTimeout(() => {
    document.querySelector(".promptup").classList.add("active");
    document.querySelector(".dialogue").classList.add("active");
    document.querySelector(".password").focus();
  }, 10);
}

function hidePrompt() {
  document.querySelector(".promptup").classList.remove("active");
  document.querySelector(".dialogue").classList.remove("active");
  document.querySelector(".dialogueMid").reset();
  if (invalid.classList.value == "invalid show") {
    invalid.classList.remove("show");
  }
  setTimeout(() => {
    document.querySelector(".promptup").classList.add("hide");
    document.querySelector(".dialogue").classList.add("hide");
  }, 550);
}

document
  .querySelector(".password")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.querySelector(".okbtn").click();
    }
  });

function ok() {
  if (invalid.classList.value == "invalid show") {
    invalid.classList.remove("show");
  }
  let input = document.querySelector(".password").value;

  if (input === td) {
    // Define the URL of the PDF file
    let pdfUrl = "portfolio files/Resume Lorenzo.pdf";

    fetch(pdfUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a blob URL for the PDF data
        var url = window.URL.createObjectURL(blob);

        // Create a link element to trigger the download
        var a = document.createElement("a");
        a.href = url;
        a.download = "Lorenzo Resume.pdf"; // Set the desired file name
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

    hidePrompt();
  } else {
    invalid.classList.add("show");
    document.querySelector(".dialogueMid").reset();
  }
}

function cancel() {
  hidePrompt();
}

// click away

document.querySelector(".promptup").addEventListener("click", (e) => {
  if (e.target !== e.currentTarget) return;
  blockdiv = document.createElement("div");
  document.body.prepend(blockdiv);
  blockdiv.classList.add("blockdiv");
  hidePrompt();

  setTimeout(() => {
    blockdiv.remove();
  }, 900);
});

const date = new Date();

let td =
  String(date.getFullYear()).slice(-2) +
  String(date.getMonth() + 1).padStart(2, "0") +
  String(date.getDate()).padStart(2, "0");
