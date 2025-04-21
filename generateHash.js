// generateHash.js
const bcrypt = require('bcryptjs');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Введите пароль для админ-панели: ', async (password) => {
  const saltRounds = 12; // Количество раундов хеширования
  const hash = await bcrypt.hash(password, saltRounds);
  
  console.log('\nДобавьте эту строку в ваш .env файл:');
  console.log(`ADMIN_PASSWORD="${hash}"`);
  
  readline.close();
});