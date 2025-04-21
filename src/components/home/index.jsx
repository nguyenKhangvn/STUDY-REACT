import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Chào mừng đến với Stock Market</h1>
        <p>Nền tảng theo dõi và phân tích thị trường chứng khoán chuyên nghiệp.</p>
      </section>

      <section className="market-summary">
        <h2>Tóm tắt thị trường</h2>
        <div className="market-cards">
          <div className="market-card">
            <h3>VN-Index</h3>
            <p>1,225.36</p>
            <span className="up">+8.12 (+0.67%)</span>
          </div>
          <div className="market-card">
            <h3>HNX-Index</h3>
            <p>287.45</p>
            <span className="down">-2.34 (-0.81%)</span>
          </div>
          <div className="market-card">
            <h3>UPCOM</h3>
            <p>89.12</p>
            <span className="up">+0.56 (+0.63%)</span>
          </div>
        </div>
      </section>

      <section className="popular-stocks">
        <h2>Cổ phiếu phổ biến</h2>
        <table>
          <thead>
            <tr>
              <th>Mã</th>
              <th>Giá</th>
              <th>Thay đổi</th>
              <th>Khối lượng</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>FPT</td>
              <td>95.600</td>
              <td className="up">+1.200</td>
              <td>2.5M</td>
            </tr>
            <tr>
              <td>VNM</td>
              <td>72.400</td>
              <td className="down">-600</td>
              <td>1.3M</td>
            </tr>
            <tr>
              <td>MWG</td>
              <td>45.100</td>
              <td className="up">+800</td>
              <td>1.8M</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="news-section">
        <h2>Tin tức mới nhất</h2>
        <ul>
          <li>
            <a href="#">Chứng khoán tăng trưởng mạnh nhờ nhóm ngân hàng</a>
          </li>
          <li>
            <a href="#">Nhà đầu tư nước ngoài mua ròng hơn 500 tỷ</a>
          </li>
          <li>
            <a href="#">Cổ phiếu FPT thiết lập đỉnh mới trong tháng 4</a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
