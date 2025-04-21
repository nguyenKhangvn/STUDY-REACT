import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer-reset">
      <footer className="footer-container">
        <div className="footer-content">
          <div className="footer-section company-info">
            <h2>Stock Market Inc.</h2>
            <p>Địa chỉ: 123 Wall Street, New York, NY 10005</p>
            <p>Email: support@stockmarket.com</p>
            <p>Hotline: 1900 1234</p>
          </div>

          <div className="footer-section footer-links">
            <h3>Liên kết</h3>
            <ul>
              <li>
                <a href="/about">Về chúng tôi</a>
              </li>
              <li>
                <a href="/terms">Điều khoản sử dụng</a>
              </li>
              <li>
                <a href="/privacy">Chính sách bảo mật</a>
              </li>
              <li>
                <a href="/contact">Liên hệ</a>
              </li>
            </ul>
          </div>

          <div className="footer-section footer-disclaimer">
            <h3>Thông báo</h3>
            <p>
              Thông tin trên website chỉ mang tính chất tham khảo. Chúng tôi
              không chịu trách nhiệm về các quyết định đầu tư dựa trên nội dung
              tại đây.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Stock Market Inc. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
