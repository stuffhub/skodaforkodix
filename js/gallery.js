"use strict";

(function () {
    const initTrigger = function (typeEvent, elem) {
        const event = new Event(typeEvent);
        elem.dispatchEvent(event);
    };
    const addClass = function (target, classToRemove) {
        const elementsToRemove = document.querySelectorAll("." + classToRemove);
        if (!target.classList.contains("active")) {
            for (let i = 0; i < elementsToRemove.length; i++) {
                elementsToRemove[i].classList.remove("active");
            }
            target.classList.add("active");
        }
    };

    const makeHtmlElement = function (tag, className) {
        const element = document.createElement(tag);
        element.className = className;
        return element;
    };

    const makeDotsContainer = function () {
        const dotsBlock = makeHtmlElement("div", "dots-block");
        const dot = makeHtmlElement("button", "dot");
        dotsBlock.appendChild(dot);
        return dotsBlock;
    };

    const gallery = document.querySelector(".gallery"),
        gallerySlider = gallery.querySelector(".gallery-slider"),
        galleryDotsWrapper = gallery.querySelector(".dots-wrapper"),
        galleryArrows = gallery.querySelectorAll(".gallery-arrow"),
        gallerySlides = gallerySlider.children,
        gallerySlidesLength = gallerySlider.children.length,
        galleryWrapperWidth = gallery.querySelector(".gallery-wrapper").offsetWidth,
        gallerySlideShowButton = gallery.querySelector(".gallery-play");

    let sumWidthOfSlides = 0,
        slidePosition = 0;

    const galleryDotsFragment = document.createDocumentFragment();

    for (let i = 0; i < gallerySlides.length; i++) {
        gallerySlides[i].style.width = galleryWrapperWidth + "px";
        sumWidthOfSlides += gallerySlides[i].offsetWidth;
        galleryDotsFragment.appendChild(makeDotsContainer());
    }

    galleryDotsWrapper.appendChild(galleryDotsFragment);
    gallerySlider.style.width = sumWidthOfSlides + "px";
    const dots = galleryDotsWrapper.querySelectorAll(".dot");
    dots[0].classList.add("active");

    const moveSlide = function (value) {
        gallerySlider.style.transform = "translateX(-" + value + "px)";
    };

    const onDotClick = function (e) {
        const target = e.currentTarget;
        const targetIndex = Array.from(dots).indexOf(target);
        moveSlide(gallerySlides[targetIndex].offsetLeft);
        slidePosition = targetIndex;
        addClass(target, target.classList[0]);
    };

    const nextSlide = function () {
        if (slidePosition !== gallerySlidesLength - 1) {
            slidePosition++;
            moveSlide(gallerySlides[slidePosition].offsetLeft);
        } else if (slidePosition === gallerySlidesLength - 1) {
            slidePosition = 0;
            moveSlide(gallerySlides[slidePosition].offsetLeft);
        }
    };

    const prevSlide = function () {
        if (slidePosition !== 0) {
            slidePosition--;
            moveSlide(gallerySlides[slidePosition].offsetLeft);
        } else if (slidePosition === 0) {
            slidePosition = gallerySlidesLength -1;
            moveSlide(gallerySlides[slidePosition].offsetLeft);
        }
    };

    const onSliderArrowClick = function (e) {
        const target = e.currentTarget;
        if (target.classList.contains("prev")) {
            prevSlide();
            initTrigger("click", dots[slidePosition]);
        }
        if (target.classList.contains("next")) {
            nextSlide();
            initTrigger("click", dots[slidePosition]);
        }
    };

    const onButtonPlayClick = function (e) {
        e.preventDefault();
        const target = e.currentTarget;
        target.style.display = 'none';
        const slideShowInterval = setInterval(function(){
            nextSlide();
            initTrigger("click", dots[slidePosition]);
        }, 3000);
    };

    for (let i = 0; i < galleryArrows.length; i++) {
        galleryArrows[i].addEventListener("click", onSliderArrowClick);
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", onDotClick);
    }

    gallerySlideShowButton.addEventListener('click', onButtonPlayClick);
})();
