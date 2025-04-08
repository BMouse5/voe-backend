const nodemailer = require('nodemailer');
require('dotenv').config();

const testTransporter = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  }
});

testTransporter.sendMail({
  from: process.env.GMAIL_USER,
  to: process.env.ADMIN_EMAIL,
  subject: 'Тест SMTP',
  text: 'Это тестовое письмо'
})
.then(info => console.log('Успех:', info))
.catch(error => console.error('Ошибка:', error.response || error));