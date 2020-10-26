const name = document.getElementById('name');
const tel = document.getElementById('telephone');
const email = document.getElementById('email');
const msg = document.getElementById('message');
const btn = document.getElementById('submit_btn');


const isNameCorrect = (nameString) => {
    const regex = /[^a-zA-Zа-яА-Я\s]+/g;

    if (nameString === '') {
        name.classList.add('redborder');
        alert('Имя не может быть пустым');
    } else {

        if (regex.test(nameString)) {
            name.classList.add('redborder')
            alert('В поле имя могут быть только буквы')
        } else {
            name.classList.remove('redborder');
            return true;
        }
    }
}
const isPhoneCorrect = (phoneNumber) => {
    const regex = /\+7\(\d{3}\)\d{3}-\d{4}/g

    if (phoneNumber === '') {
        tel.classList.add('redborder');
        alert('Телефон не может быть пустым')
    } else {
        if (regex.test(phoneNumber)) {
            tel.classList.remove('redborder');
            return true;
        } else {
            tel.classList.add('redborder');
            alert('Телефон должен быть введен в формате +7(000)000-0000')
        }

    }
}
const isEmailCorrect = (emailString) => {

    const regex = /\w+[-.]?@\w+\.\w+/g;

    if (emailString === '') {
        email.classList.add('redborder');
        alert('Email не может быть пустым');
    } else {

        if (regex.test(emailString)) {
            email.classList.remove('redborder');
            return true;
        } else {
            email.classList.add('redborder');
            alert('Email должен быть в одном из следующих форматов: \n\nmymail@mail.ru\nmy.mail@mail.ru\nmy-mail@mail.ru')
        }
    }
}
const clearFields = () => {
    name.value = '';
    tel.value = '';
    email.value = '';
    msg.value = '';
}
const clickHandler = () => {

    isNameCorrect(name.value);
    isPhoneCorrect(tel.value);
    isEmailCorrect(email.value);

    if (name.value !== '' && tel.value !== '' && email.value !== '') {
        if (isNameCorrect(name.value) && isPhoneCorrect(tel.value) && isEmailCorrect(email.value)) {
            alert('Ваше сообщение отправлено успешно');
        }
    }

    clearFields();
}

btn.addEventListener('click', clickHandler);