const header = document.querySelector('header');
const headerLogo = document.querySelector('#header-logo');
const headerMenu = document.querySelector('#header-menu');

let removePreviousButtonCb = () => {};
const scrollButtonPairs = [];

let lastKnownScrollPosition = 0;
let ticking = false;
function scrollHandler(scrollPos) {
    if (scrollPos > 150) {
        header.classList.add('is-blurred');
        headerLogo.classList.add('is-shown');
    } else {
        header.classList.remove('is-blurred');
        headerLogo.classList.remove('is-shown');
    }

    for (const { button, element } of scrollButtonPairs) {
        if (
            scrollPos > element.offsetTop - header.offsetHeight &&
            scrollPos <
                element.offsetTop + element.offsetHeight - header.offsetHeight
        ) {
            removePreviousButtonCb();
            button.classList.add('is-active');
            removePreviousButtonCb = () => {
                button.classList.remove('is-active');
            };
            break;
        }
    }
}

document.addEventListener('scroll', (e) => {
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            scrollHandler(lastKnownScrollPosition);
            ticking = false;
        });

        ticking = true;
    }
});

const learnMoreButton = document.querySelector('#hero-learn-more');
const contentArea = document.querySelector('#content');

learnMoreButton.addEventListener('click', () => {
    window.scrollTo({
        top: contentArea.offsetTop - header.offsetHeight,
        behavior: 'smooth',
    });
});

function bindScrollButton(buttonId, elementId, addToList = true) {
    const button = document.getElementById(buttonId);
    const element = document.getElementById(elementId);

    button.addEventListener('click', () => {
        window.scrollTo({
            top: element.offsetTop - header.offsetHeight,
            behavior: 'smooth',
        });
        headerMenu.classList.remove('is-open');
    });

    if (addToList) scrollButtonPairs.push({ button, element });
}

bindScrollButton('header-logo', 'hero', false);
bindScrollButton('home-scroll', 'hero');
bindScrollButton('info-scroll', 'info');
bindScrollButton('sponsors-scroll', 'sponsors');
bindScrollButton('faq-scroll', 'faq');

let closeLastFAQCb = () => {};
document.querySelectorAll('.faq-cell').forEach((cell) => {
    let selfOpen = false;

    cell.querySelector('.faq-header').addEventListener('click', () => {
        if (selfOpen) {
            selfOpen = false;
            cell.classList.remove('is-open');
            closeLastFAQCb = () => {};
        } else {
            selfOpen = true;
            closeLastFAQCb();
            cell.classList.add('is-open');
            closeLastFAQCb = () => {
                selfOpen = false;
                cell.classList.remove('is-open');
            };
        }
    });
});

document.querySelector('#header-menu-open').addEventListener('click', () => {
    headerMenu.classList.add('is-open');
});

document.querySelector('#header-menu-close').addEventListener('click', () => {
    headerMenu.classList.remove('is-open');
});

document
    .querySelector('#header-menu-backdrop')
    .addEventListener('click', () => {
        headerMenu.classList.remove('is-open');
    });

// starting scroll handler
scrollHandler(0);
