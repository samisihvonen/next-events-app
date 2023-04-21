import React from 'react'
import Link from 'next/link';
import styles from '@/styles/Footer.module.css';

export default function Footer() {
  const d: Date = new Date();
  return (
    <footer className={styles.footer}>
    <p>Copyright &copy; DJ Events  {d.getFullYear()}</p>
      <Link href='/about'>About This Project</Link>
    </footer>
  )
}
