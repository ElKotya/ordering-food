document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.querySelector('#registration-form');
    const authorizationForm = document.querySelector('#authorization-form');
    const registrationNameError = document.querySelector('#registrationNameError');
    const registrationPasswordError = document.querySelector('#registrationPasswordError');
    const authorizationNameError = document.querySelector('#authorizationNameError');
    const authorizationPasswordError = document.querySelector('#authorizationPasswordError');


    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();

        registrationNameError.textContent = '';
        registrationPasswordError.textContent = '';
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
            registrationNameError.textContent = 'Логин должен содержать не менее 4-х символов';
            hasError = true;
        }

        if (user.userPassword.length < 4) {
            registrationPasswordError.textContent = 'Пароль должен содержать не менее 4-х символов';
            hasError = true;
        }

        if (user.userName === '') {
            registrationNameError.textContent = 'Поле не должно быть пустым';
            hasError = true;
        }

        if (user.userPassword === '') {
            registrationPasswordError.textContent = 'Поле не должно быть пустым';
            hasError = true;
        }
        
        if(!hasError) {
            const userFromBD = users.find((item) => item.userName === user.userName);
            if (!userFromBD) {
                user.basket = [];
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));
                toggleToAuth();
            } else {
                registrationNameError.textContent = 'Пользователь уже зарегистрирован';
                hasError = true;
            }
        }
    })


    authorizationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        authorizationNameError.textContent = '';
        authorizationPasswordError.textContent = '';
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
            authorizationNameError.textContent = 'Поле не должно быть пустым';
            hasError = true;
        }

        if (user.userPassword === '') {
            authorizationPasswordError.textContent = 'Поле не должно быть пустым';
            hasError = true;
        }
        
        if (!hasError) {
            const userFromBD = users.find((item) => item.userName === user.userName);
            if (userFromBD && user.userPassword === userFromBD?.userPassword) {
                localStorage.setItem('authorizedUser', JSON.stringify(userFromBD));
                window.location.href = '/';
            } else {
                authorizationNameError.textContent = 'Логин или Пароль не верный';
                authorizationPasswordError.textContent = 'Логин или Пароль не верный';
            }
        }
    })

    const toggleToAuth = () => {
        const authorization = document.querySelector('.authorization');
        const registration = document.querySelector('.registration');
        authorization.style.display = 'block';
        registration.style.display = 'none';
    }

    document.querySelector('.authorization-link a').addEventListener('click', event => {
        event.preventDefault();
        const authorization = document.querySelector('.authorization');
        const registration = document.querySelector('.registration');
        authorization.style.display = 'none';
        registration.style.display = 'block';
    }) 

    document.querySelector('.registration-link a').addEventListener('click', event => {
        event.preventDefault();
        toggleToAuth();
    })
})