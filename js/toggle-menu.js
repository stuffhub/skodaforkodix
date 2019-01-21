'use strict';

(function () {
    const hideTopMenu = function (className) {
        const element = document.querySelector(className);
        const elementHeight = element.offsetHeight;
       element.style.marginTop = -(elementHeight) + 'px';
    };

    hideTopMenu('.mobile-nav');

    const onHamburgerClick = function (e) {
        const target = e.currentTarget;
        const mobileMenu = document.querySelector('.mobile-nav');
        const header = document.querySelector('header');
        if (!mobileMenu.classList.contains('open')) {
            mobileMenu.classList.add('open');
            target.classList.add('opened');
            header.style.borderBottom = '1px solid #e2e2e2';
            if (!mobileMenu.classList.contains('after-open')) {
                mobileMenu.classList.add('after-open');
            }
        } else {
            mobileMenu.classList.remove('open');
            target.classList.remove('opened');
            header.style.borderBottom = 'none';
        }
    };

    const hamburgerButton = document.querySelector('.hamburger');
    hamburgerButton.addEventListener('click', onHamburgerClick)
})();