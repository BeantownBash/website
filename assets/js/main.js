let removePreviousButtonCb = () => {};
const scrollButtonPairs = [];

let lastKnownScrollPosition = 0;
let ticking = false;
function scrollHandler(scrollPos) {
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
            top: element.offsetTop - header.offsetHeight + 5,
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

addHeadingAnchor('info-heading');
addHeadingAnchor('sponsors-heading');
addHeadingAnchor('faq-heading');

// starting scroll handler
scrollHandler(0);

const faqGrid = document.querySelector('#faq-grid');
let closeLastFAQCb = () => {};
let existsOpen = false;
document.querySelectorAll('.faq-cell').forEach((cell) => {
    let selfOpen = false;
    let contentBubble = null;

    cell.querySelector('.faq-header').addEventListener('click', (e) => {
        e.stopPropagation();

        const stopProp = (event) => {
            event.stopPropagation();
        };

        const openCell = () => {
            selfOpen = true;
            existsOpen = true;
            closeLastFAQCb();
            cell.classList.add('is-open');
            faqGrid.classList.add('has-opened');

            contentBubble = document.createElement('div');
            contentBubble.id = 'faq-content-bubble';
            contentBubble.innerHTML =
                cell.querySelector('.faq-content').innerHTML;

            contentBubble.style.position = 'absolute';
            contentBubble.style.zIndex = '2';

            contentBubble.style.top =
                cell.offsetTop + cell.offsetHeight - 20 + 'px';

            const computedStyles = window.getComputedStyle(cell);
            contentBubble.style.background = computedStyles.background;
            contentBubble.style.color = computedStyles.color;

            if (cell.offsetLeft === 0) {
                contentBubble.style.borderTopLeftRadius = '0';
            } else {
                contentBubble.style.borderTopRightRadius = '0';
            }
            contentBubble.style.maxHeight = '0';
            contentBubble.style.minHeight = '0';

            contentBubble.addEventListener('click', stopProp);
            cell.querySelector('.faq-content').addEventListener(
                'click',
                stopProp,
            );

            cell.insertAdjacentElement('afterend', contentBubble);

            setTimeout(() => {
                contentBubble.style.maxHeight = '100rem';
                contentBubble.style.minHeight = '';
            }, 0);

            closeLastFAQCb = closeCell;
            document.body.addEventListener('click', closeCell);
        };

        const closeCell = () => {
            selfOpen = false;
            existsOpen = false;
            cell.classList.remove('is-open');
            faqGrid.classList.remove('has-opened');

            contentBubble.remove();
            cell.querySelector('.faq-content').removeEventListener(
                'click',
                stopProp,
            );

            closeLastFAQCb = () => {};
            document.body.removeEventListener('click', closeCell);
        };

        if (existsOpen) {
            closeLastFAQCb();
        } else {
            selfOpen ? closeCell() : openCell();
        }
    });
});

// shuffle headshots
const headshotList = document.querySelector('#team-headshots');
for (let i = headshotList.children.length; i >= 0; i--) {
    headshotList.appendChild(headshotList.children[(Math.random() * i) | 0]);
}
