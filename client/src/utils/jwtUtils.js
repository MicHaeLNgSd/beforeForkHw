import { jwtDecode } from 'jwt-decode';

export function checkToken (token) {

  if(!token) return false;

    // якщо токен валідний то надіслати його у заголовку Authorization
    //  exp - час протухання токену у секундах
  const { exp } = jwtDecode(token);

  const currentTime = Date.now();

  return currentTime < exp * 1000;
}