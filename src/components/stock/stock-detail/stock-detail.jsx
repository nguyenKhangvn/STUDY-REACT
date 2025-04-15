import React from "react";
import "./stock-detail.css";

function StockDetailDialog({ stock, onClose }) {
  if (!stock) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-container">
        <h2 className="dialog-title">Chi tiết cổ phiếu</h2>
        <div className="dialog-content">
          <p><strong>Tên:</strong> {stock.name}</p>
          <p><strong>Mã:</strong> {stock.code}</p>
          <p><strong>Giá hiện tại:</strong> {stock.price}</p>
          <p><strong>Giá trước đó:</strong> {stock.previousPrice}</p>
          <p><strong>Yêu thích:</strong> {stock.favorite ? 'Có' : 'Không'}</p>
          <p><strong>Sàn giao dịch:</strong> {stock.exchange}</p>
        </div>
        <div className="dialog-actions">
          <button onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
}

export default StockDetailDialog;
