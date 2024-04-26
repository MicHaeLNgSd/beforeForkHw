import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../../contexts/userContext';

// Замінник Route для маршрутів на фронті
// які мають бути доступні тількі авторизованим користувачам
const PublicOnlyRoute = (props) => {
  const [{ user, isLoading }] = useContext(UserContext);

  // якщо  дані користувача магаються отримати то можна про це споівстити користувача
  if (isLoading) {
    return <div>LOADING ...</div>;
  }

  // якщо користувача нема то ми перекидаємо його на сторінку на яку він йшов
  if (!user) {
    return <Route {...props} />;
  }

  // якщо даних користувача немає і ми не вантажимо їх то можна переенаправити гостя на головну
  return <Redirect to='/' />;
};
/*
  Опціональне ДЗ:
    Створити компонент PublicOnlyRoute який не дозволяє авторизовани користувачам
    переходити на певні сторінки на фронті (реєстрації, логін)
*/

export default PublicOnlyRoute;
