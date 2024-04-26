import axios from 'axios';
import { checkToken } from '../utils/jwtUtils';
import CONSTANTS from '../constants';

const httpClient = axios.create({
  baseURL: CONSTANTS.SERVER_URL,
});

let accessTokenInMemory = null;

// Додати перехоплювач запиту
httpClient.interceptors.request.use(
  async function (config) {
    // Зробіть що-небудь перед надсиланням запиту

    // код нижче виконувати тільки на маршрутах не пов'язаних з отриаманням токенів
    if(config.url.includes('/auth')) return config;

    const refreshTokenInLS = window.localStorage.getItem(CONSTANTS.REFRESH_TOKEN);

    const isAccessValid = checkToken(accessTokenInMemory);
    const isRefreshValid = checkToken(refreshTokenInLS);

    if(isAccessValid) {
      config.headers.Authorization = `Bearer ${accessTokenInMemory}`;
    } else if (isRefreshValid) {
      const {
        data: {
          data: { tokenPair },
        },
      } = await axios.post(`${CONSTANTS.SERVER_URL}/auth/refresh`, {
        token: refreshTokenInLS,
      });

      accessTokenInMemory = tokenPair.accessToken;
      window.localStorage.setItem(CONSTANTS.REFRESH_TOKEN, tokenPair.refreshToken);

      config.headers.Authorization = `Bearer ${accessTokenInMemory}`;
    } else {
      accessTokenInMemory = null;
      window.localStorage.removeItem(CONSTANTS.REFRESH_TOKEN);
    }
    
    return config;
  },
  function (error) {
    // Зробіть щось із помилкою запиту
    return Promise.reject(error);
  }
);

// Додайте перехоплювач відповідей
httpClient.interceptors.response.use(
  function (response) {
    // Будь-який код стану, що знаходиться в межах 2хх, викликає спрацьовування цієї функції
    // Зробіть щось із даними відповіді

    // дивимось чи є у відповіді токени
    if (response.data?.data?.tokenPair) {
      const {
        data: {
          data: {
            tokenPair: { accessToken, refreshToken },
          },
        },
      } = response;

      // зберігаємо токени
      window.localStorage.setItem(CONSTANTS.REFRESH_TOKEN, refreshToken);
      accessTokenInMemory = accessToken;
    }

    return response;
  },
  function (error) {
    // Будь-які коди стану, які виходять за межі діапазону 2xx, викликають спрацьовування цієї функції
    // Зробіть щось із помилкою запиту
    return Promise.reject(error);
  }
);

// функція яка робить POST запит на сервер
export async function registration(userData) {
  const response = await httpClient.post('/auth/registration', userData);

  return response;
}

export const login = async (loginData) =>
  httpClient.post('/auth/login', loginData);

export const refresh = async (token) =>
  httpClient.post('/auth/refresh', { token });

export const logout = () => {
  window.localStorage.removeItem('token');
};

export async function getUser(userId) {
  const response = await httpClient.get(`/users/${userId}`);

  return response;
}

export async function getUsers() {
  const response = await httpClient.get('/users');

  return response;
}

export async function updateUser(userId, userData) {
  const response = await httpClient.put(`/users/${userId}`, userData);

  return response;
}

export async function deleteUser(userId) {
  const response = await axios.delete(`/users/${userId}`);

  return response;
}
