import React, { useState } from "react";
import "./create-stock.css";

const initialForm = {
  name: "",
  code: "",
  price: "",
  exchange: "",
  confirm: false,
};

const CreateStockDialog = ({ onClose }) => {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name || form.name.length < 3)
      errs.name = "Tên phải có ít nhất 3 ký tự.";
    if (!form.code || !/^[A-Z0-9]+$/.test(form.code))
      errs.code = "Mã chỉ được chứa chữ hoa và số.";
    if (!form.price || form.price <= 0) errs.price = "Giá phải lớn hơn 0.";
    if (!form.exchange) errs.exchange = "Vui lòng chọn sàn giao dịch.";
    if (!form.confirm) errs.confirm = "Bạn cần xác nhận thông tin.";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      const newStock = {
        id: Date.now(),
        name: form.name,
        code: form.code,
        price: parseFloat(form.price),
        previousPrice: parseFloat(form.price),
        exchange: form.exchange,
        favorite: false,
      };

      try {
        const response = await fetch("http://localhost:3000/stocks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newStock),
        });
        const data = await response.json();
        console.log("Cổ phiếu đã được tạo:", data);
        setForm(initialForm);
        setErrors({});
        setSubmitted(false);
        onClose(); // Đóng dialog sau khi tạo
      } catch (err) {
        console.error("Lỗi khi tạo cổ phiếu:", err);
      }
    }
  };

  const loadStockFromServer = () => {
    const stockFromServer = {
      name: "loadStockFromServer Worked",
      code: "VNM",
      price: 80000,
      exchange: "HOSE",
    };
    setForm({ ...stockFromServer, confirm: false });
  };

  return (
    <div className="overlay">
      <div className="wrapper">
        <div className="title">Tạo cổ phiếu mới</div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
            />
            <label>Tên cổ phiếu</label>
          </div>
          {submitted && errors.name && <p className="error">{errors.name}</p>}

          <div className="field">
            <input
              name="code"
              type="text"
              value={form.code}
              onChange={handleChange}
              required
            />
            <label>Mã cổ phiếu</label>
          </div>
          {submitted && errors.code && <p className="error">{errors.code}</p>}

          <div className="field">
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              required
            />
            <label>Giá cổ phiếu</label>
          </div>
          {submitted && errors.price && <p className="error">{errors.price}</p>}

          <div className="field">
            <select
              name="exchange"
              value={form.exchange}
              onChange={handleChange}
              required
            >
              <option value="">--Chọn sàn--</option>
              <option value="HOSE">HOSE</option>
              <option value="HNX">HNX</option>
              <option value="UPCOM">UPCOM</option>
            </select>
            <label>Sàn giao dịch</label>
          </div>
          {submitted && errors.exchange && (
            <p className="error">{errors.exchange}</p>
          )}

          <div className="checkbox-field">
            <input
              type="checkbox"
              name="confirm"
              checked={form.confirm}
              onChange={handleChange}
            />
            <label>Xác nhận thông tin trên là chính xác</label>
          </div>
          {submitted && errors.confirm && (
            <p className="error">{errors.confirm}</p>
          )}

          <div className="field">
            <input type="submit" value="Create" />
          </div>
          <div className="field">
            <button type="button" onClick={loadStockFromServer}>
              Load Stock From Server
            </button>
          </div>
          <div className="field">
            <button type="button" onClick={() => setForm(initialForm)}>
              Reset Form
            </button>
          </div>
          <div className="field">
            <button type="button" onClick={onClose}>
              Đóng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStockDialog;
