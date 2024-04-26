/*
   аналог promisify з нодівських модулів
*/
function myPromisify(funcWithAsyncCallback) {
  // повертаємо функцію яка повертає проміс і приймає аргументи початкової функції
  return function promisifiedFunc (...args) {

    return new Promise((resolve, reject) => {
      // запускаємо початкову функцію та передаємо їй аргументи, після чого окремо передємо коллбек
      funcWithAsyncCallback(...args, (err, data) => {
        if(err) {
          // якщо є помилка то проміс відхиляємо з нею
          reject(err);
        } else {
          // якщо немає помилки то проміс приймаємо з даними
          resolve(data);
        }
      });
    });
  }
}
