const api = {
    login: 'https://vue3-course-api.hexschool.io/admin/signin',
}
const account = document.querySelector('.account');
const password = document.querySelector('.password');
const login = document.querySelector('.login');
const loginData = {};

login.addEventListener('click', (e) => {
    if( account.value === '' || password.value === '') return;
    e.preventDefault();
    loginData.username = account.value;
    loginData.password = password.value;
    // console.log(loginData);
    axios.post(api.login, loginData)
        .then(res => {
            // console.log(res.data);
            if(!res.data.success) throw res.data.message + ' ' + res.data.error.message;
            localStorage.setItem(loginData.username, JSON.stringify(res.data.token));
            window.location.href = `dashboard.html?user=${loginData.username}`;
        })
        .catch(err => {
            console.log(err);
        })
})