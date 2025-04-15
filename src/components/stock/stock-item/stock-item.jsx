import React from "react";
import "./stock-item.css";

const StockItem = ({ stock, onViewDetail, onEdit, onDelete, onToggleFavorite }) => {
  const handleToggleFavorite = (e) => {
    e.preventDefault();
    onToggleFavorite();
  };

  return (
    <div className="stock-item">
      <div className="info">
        <h3>
          {stock.name} <small>({stock.code})</small>
        </h3>
        <p>Sàn: {stock.exchange}</p>
      </div>

      <div
        className={`price ${
          stock.price >= stock.previousPrice ? "positive" : "negative"
        }`}
      >
        $ {stock.price}
      </div>

      <div className="actions">
        <div className="favorite-action">
          <button onClick={handleToggleFavorite} disabled={stock.favorite}>
            {stock.favorite ? "Favorited" : "Add to Favorite"}
          </button>
        </div>
        <div className="other-actions">
          <button onClick={onViewDetail}>Chi tiết</button>
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default StockItem;
