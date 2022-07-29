handleFixedHeader();
dragableSlider(".products__slider", ".slides", ".slide-item");
dragableSlider(".customers__list", ".customers-wrap", ".customer");

function handleFixedHeader() {
  const navbar = document.querySelector("#header .navbar");
  const menuBtn = document.querySelector(".menu");
  const header = document.querySelector("header");

  let isNumberAuto = false

  const numbers = document.querySelector('.counter__numbers')

  window.onscroll = () => {
    if (document.documentElement.scrollTop > 200) {
      header.classList.add("fixed-header");
    } else {
      header.classList.remove("fixed-header");
    }
    if(isInViewport(numbers)&&!isNumberAuto){
      console.log("Number auto!")
      isNumberAuto = true

      
      
      for(let numberItem of numbers.children){
        // console.log(numberItem.querySelector('h2'))
        counter(numberItem.querySelector('h2'))
      }
    }
  };

  menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("show-navbar");
  });
}

function dragableSlider(classContainer, classWrap, classItem) {
  const container = document.querySelector(classContainer);
  const items = document.querySelector(classWrap);
  const item = document.querySelector(classItem);

  const prev = container.querySelector(".prev");
  const next = container.querySelector(".next");

  if (prev && next) {
    prev.onclick = () => {
      shiftSlide(1, 1);
    };
    next.onclick = () => {
      shiftSlide(-1, 1);
    };
  }

  let itemWidth = item.getBoundingClientRect().width;

  console.log(itemWidth, container.getBoundingClientRect().width);

  const numberOfItemToView = 3;

  items.style.marginLeft = -numberOfItemToView * itemWidth + "px";

  let currentMargin = -numberOfItemToView * itemWidth;
  let isReadyToDrag = false;
  let startX = 0;
  let dragLength = 0;

  let allowShift = true;

  let index = 0;
  let total = items.childElementCount;

  container.onmousedown = (e) => {
    console.log("Down");
    e.preventDefault();
    isReadyToDrag = true;
    startX = e.clientX;

    document.onmousemove = (e) => {
      if (!isReadyToDrag) {
        return;
      }
      console.log("Drag");
      const clientX = e.clientX;

      dragLength = clientX - startX;

      items.style.transition = "unset";
      items.style.marginLeft = currentMargin + dragLength + "px";
      items.style.cursor = "grab";
    };
    document.onmouseup = () => {
      if (!isReadyToDrag) return;
      console.log("Up");
      currentMargin = Number.parseInt(items.style.marginLeft);

      if (Math.abs(dragLength) > 10) {
        let steps = dragLength < 0 ? -1 : 1;
        steps *= Number.parseInt(Math.abs(dragLength) / itemWidth) + 1;
        shiftSlide(steps);
      } else {
        items.style.marginLeft = currentMargin - dragLength + "px";
      }
      isTransition = false;

      currentMargin = Number.parseInt(items.style.marginLeft);
      isReadyToDrag = false;

      document.onmouseup = null;
      document.onmousemove = null;
    };
  };

  items.addEventListener("transitionend", function () {
    if (
      index >= total / numberOfItemToView ||
      index <= -total / numberOfItemToView
    ) {
      items.style.transition = "none";
      items.style.marginLeft = -itemWidth * numberOfItemToView + "px";
      console.log(items.style.marginLeft);
      index = 0;
      currentMargin = -itemWidth * numberOfItemToView;
    }
    allowShift = true;
  });

  function shiftSlide(steps, type) {
    items.style.transition = "all 0.3s ease-in-out";
    if (type) {
      dragLength = 0;
    }
    if (!allowShift) {
      items.style.marginLeft = currentMargin - dragLength + "px";
      return;
    }

    items.style.marginLeft =
      currentMargin - dragLength + steps * itemWidth + "px";
    index -= steps;
    allowShift = false;
  }
}

function counter(numberItem) {
  // const numberItem = document.querySelector(".item__number");
  let counts = setInterval(updated,0);
  console.log(numberItem.innerHTML);
  const max = Number.parseInt(numberItem.innerHTML)
  let count = Math.floor(max / 2) ;

  function updated() {
    numberItem.innerHTML = count++;
    if (count === max+1) {
      clearInterval(counts);
    }
  }
}
// counter();

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
