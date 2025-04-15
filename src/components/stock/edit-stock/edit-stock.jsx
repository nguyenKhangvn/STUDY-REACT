import React, { useState, useEffect } from "react";
import "./edit-stock.css";

function EditStockForm({ stock, onCancel, onSave }) {
  const [form, setForm] = useState({
    id: "",
    name: "",
    code: "",
    price: "",
    exchange: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (stock) {
      setForm(stock);
    }
  }, [stock]);

  const validate = () => {
    const errs = {};
    if (!form.name || form.name.length < 3)
      errs.name = "Tên phải có ít nhất 3 ký tự.";
    if (!form.code) errs.code = "Mã không được để trống.";
    if (!form.price || form.price <= 0) errs.price = "Giá phải lớn hơn 0.";
    if (!form.exchange) errs.exchange = "Vui lòng chọn sàn giao dịch.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave(form);
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-container">
        <h2>Chỉnh sửa cổ phiếu</h2>
        <div className="form-group">
          <label htmlFor="name">Tên:</label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        {errors.name && <p className="error">{errors.name}</p>}

        <div className="form-group">
          <label htmlFor="code">Mã:</label>
          <input
            name="code"
            type="text"
            value={form.code}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Giá:</label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
          />
        </div>
        {errors.price && <p className="error">{errors.price}</p>}

        <div className="form-group">
          <label htmlFor="exchange">Sàn giao dịch:</label>
          <select name="exchange" value={form.exchange} onChange={handleChange}>
            <option value="">Chọn sàn giao dịch</option>
            <option value="HOSE">HOSE</option>
            <option value="HNX">HNX</option>
            <option value="UPCOM">UPCOM</option>
          </select>
        </div>
        {errors.exchange && <p className="error">{errors.exchange}</p>}

        <div className="dialog-actions">
          <button className="btn btn-secondary" onClick={onCancel}>
            Hủy
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditStockForm;
