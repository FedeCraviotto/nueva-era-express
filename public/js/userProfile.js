const logoutBtn = document.querySelector('#logout');

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = `https://estudiocraviotto.com.ar/users/logout`;
});
