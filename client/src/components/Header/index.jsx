import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import UserContext from '../../contexts/userContext';
import { logout } from '../../api';

const Header = (props) => {
  const [{ user }, dispatch] = useContext(UserContext);

  const handleLogout = () => {
    // видаляємо токен з локалСтораджу
    logout();

    // видаляємо користувача зі стейту
    dispatch({type: 'logout'});
  };

  return (
    <header className={styles.container}>
      <ul className={styles.navList}>
        <li>
          <NavLink
            exact
            to='/'
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Home
          </NavLink>
        </li>
        {user && (
          <li>
            <NavLink
              exact
              to='/profile'
              className={styles.link}
              activeClassName={styles.activeLink}
            >
              Profile
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            exact
            to='/users'
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Active users
          </NavLink>
        </li>
        {user ? (
          <li>
            <button className={styles.link} onClick={handleLogout}>
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <NavLink
                exact
                to='/login'
                className={styles.link}
                activeClassName={styles.activeLink}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to='/registration'
                className={styles.link}
                activeClassName={styles.activeLink}
              >
                Registration
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
