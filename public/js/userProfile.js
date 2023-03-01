const logoutBtn = document.querySelector('#logout');

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = `https://nueva-era-express-fnc.onrender.com/users/logout`;
});
