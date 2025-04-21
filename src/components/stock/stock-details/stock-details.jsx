import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import stockService from "../../../services/stock-service";
import "./stock-details.css";

const StockDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stock, setStock] = useState(null);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await stockService.getStockById(id);
        setStock(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy chi tiết stock:", err);
      }
    };
    fetchStock();
  }, [id]);

  if (!stock) return <div>Đang tải...</div>;

  return (
    <div className="stock-detail-container">
      <h2>Chi tiết cổ phiếu</h2>
      <p>
        <strong>Mã:</strong> {stock.id}
      </p>
      <p>
        <strong>Tên:</strong> {stock.name}
      </p>
      <p>
        <strong>Giá:</strong> {stock.price}
      </p>
      <p>
        <strong>Giá trước đó:</strong> {stock.previousPrice}
      </p>
      <p>
        <strong>Yêu thích:</strong> {stock.favorite ? "Có" : "Không"}
      </p>

      <button className="back-button" onClick={() => navigate(-1)}>
        Quay lại
      </button>
    </div>
  );
};

export default StockDetail;
