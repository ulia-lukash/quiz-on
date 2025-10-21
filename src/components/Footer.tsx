import React from 'react';
import '../styles/footer.css';
export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="p-4 mt-4 d-flex flex-column align-items-center">
  <div className="w-100 text-center">
    <img className="logo-pic" src="/assets/images/new-logo.png" alt="" />
  </div>
  <div className="sm-logos w-100 d-flex align-items-center py-3 border-bottom border-white-50">
    <a 
      href="https://vk.com/quizonmsk" 
      className="w-50 text-center" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <img src="/assets/images/vk-logo.svg" alt="" className="logo" />
    </a>
    <a 
      href="https://t.me/quizonmsk" 
      className="w-50 text-center" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <img src="/assets/images/tg-logo.svg" alt="" className="logo" />
    </a>
  </div>
  <div className="w-100 text-center mt-3 copyright">
    © 2018 - {currentYear} КвизON
  </div>
  <div className="mt-2">
    <a 
      className="link" 
      href="https://bmstu.ru/about/obrabotka-dannyh" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      СОГЛАШЕНИЕ ОБ ОБРАБОТКЕ ПЕРСОНАЛЬНЫХ ДАННЫХ
    </a>
  </div>
</footer>

  );
};