import type { ReactNode } from 'react';
import styles from './LogoSlot.module.css';

type LogoSlotProps = {
  children?: ReactNode;
  label?: string;
};

const LogoSlot = ({ children, label = 'Логотип' }: LogoSlotProps) => {
  return (
    <div aria-label={label} className={styles.root} role="img">
      {children ?? <span className={styles.placeholder}>{label}</span>}
    </div>
  );
};

export default LogoSlot;
