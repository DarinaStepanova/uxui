import styles from './Button.module.css';
interface ButtonProps {
 label: string;
 onClick: () => void;
 color?: 'blue' | 'green';
 size?: 'small' | 'medium' | 'large';
}
export const Button = ({ label, onClick, color, size}: ButtonProps) => {
 return (
 <button style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}
 className={`${styles.btn} ${styles[`btn-${color}`]}
${styles[`btn-${size}`]}`}
 onClick={onClick}
 >
 {label}
 {size !== 'medium' && (
        <img style={{ width: '1.5em' }} src="src/img/arrow-right.svg" alt="" />
    )}
 </button>
 );
};
