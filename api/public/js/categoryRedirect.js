const allCateogoryBoxes = document.querySelectorAll('.categories__item');
allCateogoryBoxes.forEach(box => {
    box.addEventListener('click', (e) => {
        location.href = `/search?keywords=${e.target.dataset.category}`;
    });
});