const nav = document.querySelector('.nav');

const menuBtn = document.querySelector('.search-bar__icon');

menuBtn.addEventListener('click', () => {
    if (nav.style.display == 'none') {
        nav.style.display = 'block';
    } else {
        nav.style.display = 'none';
    }
});
