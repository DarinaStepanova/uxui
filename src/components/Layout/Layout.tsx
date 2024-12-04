import { useMatch } from "react-router-dom";
import styles from './layout.module.css';
const Layout = ({ children }: {children: React.ReactNode}) => {
    const isHome = useMatch('/')
    return (
        <div className={isHome ? styles.Home : styles.Other}>
            
            {children}
        </div>
        );
   };
export default Layout;