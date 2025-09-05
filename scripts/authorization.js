const registrationForm = document.querySelector('#registration-form');

registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    document.querySelector('#registrationNameError').textContent = '';
    document.querySelector('#registrationPasswordError').textContent = '';
    let hasError = false;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = Array.from(event.target.elements)
        .reduce((acc, element) => {
            const { name, value, type, checked } = element;
            if (type === 'submit') {
                return acc;
            }
            acc[name] = value;
            if (name === 'checkbox') {
                acc[name] = checked;
            }
            return acc;
        }, {});

    if (user.userName.length < 4) {
        document.querySelector('#registrationNameError').textContent = 'Логин должен содержать не менее 4-х символов';
        hasError = true;
    }

    if (user.userPassword.length < 4) {
        document.querySelector('#registrationPasswordError').textContent = 'Пароль должен содержать не менее 4-х символов';
        hasError = true;
    }

    if (user.userName === '') {
        document.querySelector('#registrationNameError').textContent = 'Поле не должно быть пустым';
        hasError = true;
    }

    if (user.userPassword === '') {
        document.querySelector('#registrationPasswordError').textContent = 'Поле не должно быть пустым';
        hasError = true;
    }
    
    if(!hasError) {
        const userFromBD = users.find((item) => item.userName === user.userName);
        if (!userFromBD) {
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('isLoginSuccess', JSON.stringify(true));
            window.location.href = '/';
        } else {
            document.querySelector('#registrationNameError').textContent = 'Пользователь уже зарегистрирован';
            hasError = true;
        }
    }
})

const authorizationForm = document.querySelector('#authorization-form');

authorizationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    document.querySelector('#authorizationNameError').textContent = '';
    document.querySelector('#authorizationPasswordError').textContent = '';
    let hasError = false;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = Array.from(event.target.elements)
        .reduce((acc, element) => {
            const { name, value, type } = element;
            if (type === 'submit') {
                return acc;
            }
            acc[name] = value;
            return acc;
        }, {});

    if (user.userName === '') {
        document.querySelector('#authorizationNameError').textContent = 'Поле не должно быть пустым';
        hasError = true;
    }

    if (user.userPassword === '') {
        document.querySelector('#authorizationPasswordError').textContent = 'Поле не должно быть пустым';
        hasError = true;
    }
    
    if (!hasError) {
        const userFromBD = users.find((item) => item.userName === user.userName);
        if (userFromBD && user.userPassword === userFromBD?.userPassword) {
            localStorage.setItem('isLoginSuccess', JSON.stringify(true));
            window.location.href = '/';
        }
    }
})

document.querySelector('.authorization-link a').addEventListener('click', event => {
    event.preventDefault();
    const authorizationForm = document.querySelector('.authorization');
    const registrationForm = document.querySelector('.registration');
    authorizationForm.style.display = 'none';
    registrationForm.style.display = 'block';
}) 

document.querySelector('.registration-link a').addEventListener('click', event => {
    event.preventDefault();
    const authorizationForm = document.querySelector('.authorization');
    const registrationForm = document.querySelector('.registration');
    authorizationForm.style.display = 'block';
    registrationForm.style.display = 'none';
})

