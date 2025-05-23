const nodemailer = require('nodemailer');
const Consultation = require('../models/consultationModel');

// Настройка транспорта для Gmail
const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER, // bushkovBM@yandex.ru
      pass: process.env.GMAIL_PASSWORD // qjfqfgocwpihrmgl
    }
});

// Функция отправки email
// ConsultationController.js
const sendConsultationEmail = async (consultation) => {
    try {
      // Формируем HTML для списка товаров
      let cartItemsHTML = '';
      if (consultation.cartItems && consultation.cartItems.length > 0) {
        cartItemsHTML = `
          <div class="field">
              <span class="field-label">Товары в корзине:</span>
          </div>
          <div class="message-box">
              <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                      <tr style="background-color: #f2f2f2;">
                          <th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Название</th>
                          <th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Количество</th>
                      </tr>
                  </thead>
                  <tbody>
                      ${consultation.cartItems.map(item => `
                          <tr>
                              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
                              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
                          </tr>
                      `).join('')}
                  </tbody>
              </table>
              <p style="margin-top: 10px; font-weight: bold;">Всего товаров: ${consultation.cartItems.reduce((total, item) => total + item.quantity, 0)}</p>
          </div>
        `;
      } else {
        cartItemsHTML = '<div class="field"></div>';
      }

      const mailOptions = {
        from: `"Форма заявок" <${process.env.GMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `✅ Новая заявка от ${consultation.name}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
              <meta charset="UTF-8">
              <style>
                  body {
                      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                      line-height: 1.6;
                      color: #333;
                      max-width: 600px;
                      margin: 0 auto;
                      padding: 20px;
                  }
                  .header {
                      background-color: #BE6105;
                      color: white;
                      padding: 20px;
                      text-align: center;
                      border-radius: 5px 5px 0 0;
                  }
                  .content {
                      border: 1px solid #ddd;
                      border-top: none;
                      padding: 20px;
                      border-radius: 0 0 5px 5px;
                  }
                  .field {
                      margin-bottom: 15px;
                  }
                  .field-label {
                      font-weight: bold;
                      color: #BE6105;
                      display: inline-block;
                      width: 120px;
                  }
                  .footer {
                      margin-top: 20px;
                      padding-top: 10px;
                      border-top: 1px solid #eee;
                      font-size: 12px;
                      color: #777;
                      text-align: center;
                  }
                  .message-box {
                      background-color: #f9f9f9;
                      padding: 15px;
                      border-left: 4px solid #BE6105;
                      margin: 10px 0;
                  }
                  table {
                      width: 100%;
                      margin-top: 10px;
                  }
              </style>
          </head>
          <body>
              <div class="header">
                  <h1>Новая заявка на консультацию</h1>
              </div>
              <div class="content">
                  <div class="field">
                      <span class="field-label">Имя:</span>
                      ${consultation.name}
                  </div>
                  <div class="field">
                      <span class="field-label">Email:</span>
                      <a href="mailto:${consultation.email}">${consultation.email}</a>
                  </div>
                  <div class="field">
                      <span class="field-label">Телефон:</span>
                      ${consultation.phone || 'не указан'}
                  </div>
                  <div class="field">
                      <span class="field-label">Сообщение:</span>
                  </div>
                  <div class="message-box">
                      ${consultation.message}
                  </div>
                  ${cartItemsHTML}
                  <div class="field">
                      <span class="field-label">Дата:</span>
                      ${new Date().toLocaleString('ru-RU')}
                  </div>
              </div>
              <div class="footer">
                  <p>Это письмо было отправлено автоматически. Пожалуйста, не отвечайте на него.</p>
                  <p>© ${new Date().getFullYear()} Ваша компания</p>
              </div>
          </body>
          </html>
        `
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);
      return true;
    } catch (error) {
      console.error('Full email error:', {
        message: error.message,
        stack: error.stack,
        response: error.response
      });
      return false;
    }
  };

// Контроллер создания заявки
const createConsultation = async (req, res) => {
  const { name, email, phone, message, cartItems } = req.body; // Добавляем cartItems

  // Валидация
  if (!name || !email || !message) {
    return res.status(400).json({ 
      error: 'Пожалуйста, заполните все обязательные поля' 
    });
  }

  try {
    // Сохраняем в БД (только основные данные)
    const newConsultation = await Consultation.createConsultation(
      name, email, phone, message
    );
    
    // Создаем объект с данными для email (включая cartItems)
    const emailData = {
      ...newConsultation,
      cartItems: cartItems || [] // Добавляем товары из корзины
    };
    
    // Отправляем email с полными данными
    const emailSent = await sendConsultationEmail(emailData);
    
    if (!emailSent) {
      console.warn('Письмо не отправлено, но заявка сохранена');
    }

    res.status(201).json({
      success: true,
      data: newConsultation,
      message: 'Заявка успешно отправлена'
    });
    
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'Произошла ошибка при отправке формы' 
    });
  }
};
const getAllConsultations = async (req, res) => {
  try {
      const consultations = await Consultation.getAllConsultations();
      res.status(200).json({
          success: true,
          data: consultations
      });
  } catch (error) {
      console.error('Error getting consultations:', error);
      res.status(500).json({ 
          error: 'Произошла ошибка при получении заявок' 
      });
  }
};

// Обновление статуса заявки
const updateStatus = async (req, res) => {
  try {
      const { id } = req.params;
      const { status_id } = req.body;

      if (!status_id) {
          return res.status(400).json({ 
              error: 'Не указан новый статус' 
          });
      }

      const updatedConsultation = await Consultation.updateConsultationStatus(id, status_id);
      
      res.status(200).json({
          success: true,
          data: updatedConsultation,
          message: 'Статус заявки успешно обновлен'
      });
  } catch (error) {
      console.error('Error updating status:', error);
      res.status(500).json({ 
          error: 'Произошла ошибка при обновлении статуса' 
      });
  }
};

// Удаление заявки
const deleteConsultation = async (req, res) => {
  try {
      const { id } = req.params;
      const deletedConsultation = await Consultation.deleteConsultation(id);
      
      res.status(200).json({
          success: true,
          data: deletedConsultation,
          message: 'Заявка успешно удалена'
      });
  } catch (error) {
      console.error('Error deleting consultation:', error);
      res.status(500).json({ 
          error: 'Произошла ошибка при удалении заявки' 
      });
  }
};

module.exports = { createConsultation, getAllConsultations, updateStatus, deleteConsultation };