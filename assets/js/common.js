const header = document.querySelector('header');
const headerLogo = document.querySelector('#header-logo');
const headerMenu = document.querySelector('#header-menu');

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

let headerTicking = false;
function headerScrollHandler(scrollPos) {
    if (scrollPos > 100) {
        header.classList.add('is-blurred');
        headerLogo.classList.add('is-shown');
    } else {
        header.classList.remove('is-blurred');
        headerLogo.classList.remove('is-shown');
    }
}

document.addEventListener('scroll', (e) => {
    if (!headerTicking) {
        window.requestAnimationFrame(() => {
            headerScrollHandler(window.scrollY);
            headerTicking = false;
        });

        headerTicking = true;
    }
});

function addHeadingAnchor(id) {
    const heading = document.getElementById(id);
    if (heading) {
        const headingContent = heading.innerHTML;
        const anchorHtml = `<a aria-hidden="true" tabindex="-1" href="#${id}"><span class="icon icon-link"></span></a>`;
        heading.innerHTML = `${anchorHtml}${headingContent}`;
        heading.classList.add('has-anchor');
    }
}
