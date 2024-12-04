import { useNavigate, useLocation } from 'react-router-dom';
import styles from './header.module.css';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const renderHeaderContent = () => {
    switch (location.pathname) {
      case '/':
        return (
          <>
            <nav>
              <ul className={styles.navList}>
                <li className={styles.navItem}>
                  <button onClick={() => navigate('/paint')}>Рисовать</button>
                </li>
                <li className={styles.navItem}>
                  <button onClick={() => navigate('/about')}>О нас</button>
                </li>
              </ul>
            </nav>
          </>
        );
      case '/about':
        return (
          <>
            <nav>
              <ul className={styles.navList_other}>
                <li className={styles.navItem}>
                  <button onClick={() => navigate('/')} style={{color: 'black' }}>Главная</button>
                </li>
                <h1>Neuropic.О нас</h1>
                <li className={styles.navItem}>
                  <button onClick={() => navigate('/paint')} style={{color: 'black' }} >Рисовать</button>
                </li>
              </ul>
            </nav>
          </>
        );
      case '/paint':
        return (
          <>
            <nav>
              <ul className={styles.navList_other}>
                <li className={styles.navItem}>
                  <button onClick={() => navigate('/')} style={{color: 'black' }}>Главная</button>
                </li>
                <h1 style={{backgroundImage: 'linear-gradient(to right, #4d00ff,  #36eeb1)'}}>Neuropic.Paint</h1>
                <li className={styles.navItem}>
                  <button onClick={() => navigate('/about')} style={{color: 'black' }} >О нас</button>
                </li>
              </ul>
            </nav>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <header className={styles.header}>
      {renderHeaderContent()}
    </header>
  );
};
// import { useNavigate } from 'react-router-dom';
// import styles from './header.module.css';
// export const Header = () => {
//  const navigate = useNavigate();
//  return (
//  <header className={styles.header}>
//  <nav>
//  <ul className={styles.navList}>
//  <li className={styles.navItem}>
//  <button onClick={() => navigate('/blog')}>Блог</button>
//  </li>
//  <li className={styles.navItem}>
//  <button onClick={() => navigate('/about')}>О нас
// </button>
//  </li>
//  </ul>
//  </nav>
//  </header>
//  );
// };
