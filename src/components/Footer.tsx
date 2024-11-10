import React from 'react';
import '../styles/footer.css';
export default function Footer() {
  return (
    <footer className="bg-primary p-4 mt-10 justify-center">
      <div className="w-full">
        <img className="logo-pic" src="/assets/images/new-logo.png" alt="" />
      </div>
      <div className="sm-logos w-full flex items-center py-10 border-b border-b-2 border-#ffffff50">
        <a href="https://vk.com/quizonmsk" className="left-side w-1/2" target="_blank" rel="noopener noreferrer">
          <img
            src="/assets/images/vk-logo.svg"
            alt=""
            className='logo'
          />
        </a>
        <a href="https://t.me/quizonmsk" className="left-side w-1/2" target="_blank" rel="noopener noreferrer">
          <img src="/assets/images/tg-logo.svg" alt="" className='logo' />
        </a>
      </div>
      <div className="w-full copyright">© 2024 КвизON</div>
      <div>
        <a className="link" href="https://bmstu.ru/about/obrabotka-dannyh" target="_blank" rel="noopener noreferrer">СОГЛАШЕНИЕ ОБ ОБРАБОТКЕ ПЕРСОНАЛЬНЫХ ДАННЫХ</a>
      </div>
    </footer>
  );
};