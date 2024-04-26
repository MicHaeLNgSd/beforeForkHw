import { useEffect, useReducer } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';
import RegistrationPage from './pages/Registration';
import UserContext from './contexts/userContext';
import UsersPage from './pages/Users';
import LoginPage from './pages/Login';
import { refresh } from './api';
import CONSTANTS from './constants';
import PrivateRoute from './components/PrivateRoute';
import PublicOnlyRoute from './components/PublicOnlyRoute';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

function userReducer(state, action) {
  // тут сидить логіка зміну стану
  // з редюсеру завжди повертається стан

  switch (action.type) {
    case 'userRequest': {
      const newState = {
        ...state,
        isLoading: true,
        error: null,
      };

      return newState;
    }
    case 'userSuccess': {
      const newState = {
        ...state,
        isLoading: false,
        user: action.user,
      };

      return newState;
    }
    case 'userError': {
      const newState = {
        ...state,
        isLoading: false,
        error: action.error,
      };

      return newState;
    }
    case 'logout': {
      const newState = {
        ...initialState,
      };

      return newState;
    }
    default:
      return state;
  }
}

function App() {
  const [userState, dispatch] = useReducer(userReducer, initialState);

  // спроба виконання рефреш - запиту
  useEffect(() => {
    const token = window.localStorage.getItem(CONSTANTS.REFRESH_TOKEN);

    // якщо токен існує то робимо запит на рефреш даних користувача
    if (token) {
      dispatch({ type: 'userRequest' });

      refresh(token)
        .then((response) => {
          // отриманого користувача зберігаємо у стейт
          const userFromServer = response.data.data.user;

          dispatch({ type: 'userSuccess', user: userFromServer });
        })
        .catch((error) => {
          dispatch({ type: 'userError', error });
        });
    }
  }, []);

  return (
    <UserContext.Provider value={[userState, dispatch]}>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <PrivateRoute path='/profile' component={ProfilePage} />
        <PublicOnlyRoute path='/registration' component={RegistrationPage} />
        <PublicOnlyRoute path='/login' component={LoginPage} />
        <Route path='/users' component={UsersPage} />
      </Switch>
    </UserContext.Provider>
  );
}

export default App;
