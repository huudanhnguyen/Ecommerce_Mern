// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 1. Import Provider từ react-redux
import { Provider } from 'react-redux';
// 2. Import store mà bạn đã tạo
import { store } from './store/redux'; // <-- Đảm bảo đường dẫn này đúng

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 3. Dùng Provider để bọc toàn bộ App */}
    {/*    Truyền store của bạn vào prop `store` */}
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);