import styles from './styles/Watermark.module.css';

export default function Watermark() {
  return (
    <footer className={styles.footer}>
      <p>Feedback Collector App | Created by Om Bhayde</p>
      <p>Submitted for Fallon Studio</p>
    </footer>
  );
}