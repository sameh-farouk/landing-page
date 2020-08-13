
var sections, isScrolling, isMoving

function setActive(ele) {
    sections.forEach(element => {
        if (ele.id === element.id) {
            /* Add active state to current to section if it near the top of viewport */
            element.classList.add('active');
            /* Add active state to current navigation item */
            let activeNavLink = document.getElementsByClassName(element.id)[0];
            activeNavLink.classList.add('active');
            /* remove active state from the rest of navigation item */
            let unactiveNavLinks = document.querySelectorAll(`#navbar__list a:not(.${element.id})`);
            unactiveNavLinks.forEach(link => {
                link.classList.remove('active');
            })
        } else {
            /* remove active state from other sections */
            element.classList.remove('active');
        }
    })
}

let observer = new IntersectionObserver(entries => {

    if (entries[0].isIntersecting === true) {
        setActive(entries[0].target);
    }
}, { threshold: [0.5], root: document.querySelector('.main__hero') });


document.addEventListener('DOMContentLoaded', () => {
    sections = document.querySelectorAll('section');
    const nav_li = document.querySelector('#navbar__list');
    const nav_menu = document.querySelector('.navbar__menu');
    /* build the nav */
    sections.forEach(element => {
        const title = element.dataset.nav;
        const href = element.id;
        const newNavItem = document.createElement('li');
        newNavItem.innerHTML = `<a class="menu__link ${element.id}" href="#${href}">${title}</a>`;
        nav_li.appendChild(newNavItem);
        /* using new Intersection Observer API to check when section near the header 
        https://usefulangle.com/post/118/javascript-intersection-observer */
        observer.observe(element);

    })
    /* listen for click event for smooth scrolling */
    nav_li.addEventListener('click', ev => {
        ev.preventDefault();
        if (ev.target.tagName === 'A') {
            let link = ev.target.getAttribute('href');
            console.log(link);
            let section = document.querySelector(`${link}`);
            console.log(section);
            /* https://usefulangle.com/post/156/javascript-scroll-to-element */
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });

        }
    })
    /* hide navbar after scrolling ends and if not on top of page */
    window.addEventListener('scroll', function (event) {

        // Clear our timeout throughout the scroll
        window.clearTimeout(isScrolling);
        nav_menu.classList.remove('hide');

        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(() => {

            // Run the callback
            if (window.scrollY !== 0) {
                nav_menu.classList.add('hide');
            }
        }, 1500);

    }, false);

    document.body.addEventListener('mousemove', e => {

        // Clear our timeout throughout the scroll
        window.clearTimeout(isMoving);
        nav_menu.classList.remove('hide');

        // Set a timeout to run after scrolling ends
        isMoving = setTimeout(() => {

            // Run the callback
            nav_menu.classList.add('hide');
        }, 1500);

    }, false)
})
