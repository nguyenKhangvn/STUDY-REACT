import React, { useEffect, useState } from "react";
import stockService from "../../../service/stock-service";
import StockItem from "../stock-item/stock-item";
import EditStockForm from "../edit-stock/edit-stock";
import StockDetailDialog from "../stock-detail/stock-detail";
import "./stock-list.css";

function StockList() {
  const [stocks, setStocks] = useState([]);
  const [editingStock, setEditingStock] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadStocks();
  }, []);

  const loadStocks = () => {
    stockService.getStocks().then((res) => setStocks(res.data));
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xoá cổ phiếu này?");
    if (confirmed) {
      stockService.deleteStock(id).then(() => {
        alert("Đã xoá cổ phiếu.");
        loadStocks();
      });
    }
  };

  const handleEdit = (stock) => {
    setEditingStock(stock);
  };

  const handleSaveEdit = (updatedStock) => {
    stockService.updateStock(updatedStock).then(() => {
      setEditingStock(null);
      loadStocks();
    });
  };

  const handleViewDetail = (stock) => {
    setSelectedStock(stock);
  };

  const handleCloseDetail = () => {
    setSelectedStock(null);
  };

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearchTerm(keyword);

    if (!keyword) {
      loadStocks();
    } else {
      stockService.searchStocks(keyword).then((res) => setStocks(res.data));
    }
  };

  return (
    <div className="container">
      <div className="stock-search">
        <input
          type="text"
          placeholder="Search stock..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="stock-list">
        {stocks.map((stock) => (
          <StockItem
            key={stock.id}
            stock={stock}
            onEdit={() => handleEdit(stock)}
            onDelete={() => handleDelete(stock.id)}
            onToggleFavorite={() => {
              const updatedStock = { ...stock, favorite: !stock.favorite };
              handleSaveEdit(updatedStock);
            }}
            onViewDetail={() => handleViewDetail(stock)}
          />
        ))}
      </div>

      {editingStock && (
        <EditStockForm
          stock={editingStock}
          onCancel={() => setEditingStock(null)}
          onSave={handleSaveEdit}
        />
      )}

      {selectedStock && (
        <StockDetailDialog stock={selectedStock} onClose={handleCloseDetail} />
      )}
    </div>
  );
}

export default StockList;
