import React, { useState, useEffect } from "react";
// import CreateStock from "./create-stock"; // Tạo component riêng
import "./stock-list-view.css"; // file chứa css bạn đã có
import stockService from "../../../services/stock-service";
import { useNavigate } from "react-router-dom";
import CreateStockDialog from "../create-stock/create-stock";

const StockListView = () => {
  const [user, setUser] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [codeSearch, setCodeSearch] = useState("");
  const [isFav, setIsFav] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("");
  const [selectedStock, setSelectedStock] = useState(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editStock, setEditStock] = useState({
    name: "",
    price: 0,
    previousPrice: 0,
    favorite: false,
  });

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [stocksPerPage] = useState(5);
  const indexOfLastStock = currentPage * stocksPerPage;
  const indexOfFirstStock = indexOfLastStock - stocksPerPage;
  const currentStocks = stocks.slice(indexOfFirstStock, indexOfLastStock);
  const totalPages = Math.ceil(stocks.length / stocksPerPage);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    loadStocks();
  }, []);

  useEffect(() => {
    if (codeSearch.trim() === "") {
      loadStocks();
    } else {
      const filteredStocks = stocks.filter((stock) =>
        stock.code.toLowerCase().includes(codeSearch.toLowerCase())
      );
      setStocks(filteredStocks);
    }
    setCurrentPage(1);
  }, [codeSearch]);

  useEffect(() => {
    const onStockCreated = () => {
      loadStocks();
    };

    window.addEventListener("stockCreated", onStockCreated);

    return () => {
      window.removeEventListener("stockCreated", onStockCreated);
    };
  }, []);

  const loadStocks = async () => {
    try {
      const res = await stockService.getStocks();
      setStocks(res.data);
      setIsFav(false);
    } catch (error) {
      console.error("Lỗi khi load stocks:", error);
    }
  };

  const filterFav = () => {
    const favs = stocks.filter((stock) => stock.favorite);
    setStocks(favs);
    setIsFav(true);
  };

  const toggleFavorite = (stock) => {
    stock.favorite = !stock.favorite;
    const updatedStock = { ...stock };
    stockService.updateStock(updatedStock).then(() => {
      loadStocks();
    });
  };

  const getPageNumbers = () => {
    const maxVisiblePages = 4;
    const pageNumbers = [];

    let startPage = currentPage;
    let endPage = startPage + maxVisiblePages - 1;

    // Điều chỉnh nếu endPage vượt quá tổng số trang
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const openModal = (stock, mode) => {
    setSelectedStock(stock);
    setModalMode(mode);
    if (mode === "edit" && stock) {
      setEditStock({ ...stock });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStock(null);
  };

  const saveStock = () => {
    if (selectedStock) {
      stockService.updateStock(editStock).then(() => {
        alert("Đã cập nhật cổ phiếu.");
        loadStocks();
      });
      closeModal();
    }
  };

  const deleteStock = (stock) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc chắn muốn xóa ${stock.name}?`
    );
    if (confirmDelete) {
      // Call the delete API here if needed
      stockService.deleteStock(stock.id).then(() => {
        alert("Đã xóa cổ phiếu.");
        loadStocks();
      });
    }
  };

  return (
    <div className="stock-list-view-container">
      <h2 className="stock-heading">Danh sách cổ phiếu:</h2>

      <div className="search">
        <input
          placeholder="Nhập mã tìm kiếm"
          type="text"
          value={codeSearch}
          onChange={(e) => {
            setCodeSearch(e.target.value);
          }}
          name="text"
          className="input"
        />
        <button className="btn-add" onClick={() => setShowCreateDialog(true)}>
          + Thêm cổ phiếu
        </button>

        {!isFav ? (
          <button className="filter-fav" onClick={filterFav}>
            Lọc yêu thích
          </button>
        ) : (
          <button className="filter-fav" onClick={loadStocks}>
            Xem toàn bộ
          </button>
        )}
      </div>

      <table className="stock-table">
        <thead>
          <tr>
            <th>Mã CP</th>
            <th>Tên CP</th>
            <th>Giá</th>
            <th>Trước đó</th>
            <th>Yêu thích</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentStocks.map((stock) => (
            <tr key={stock.code}>
              <td>{stock.code}</td>
              <td>{stock.name}</td>
              <td
                className={
                  stock.price > stock.previousPrice
                    ? "positive"
                    : stock.price === stock.previousPrice
                    ? "balance"
                    : "negative"
                }
              >
                {stock.price}
              </td>
              <td>{stock.previousPrice}</td>
              <td>
                <input
                  type="checkbox"
                  checked={stock.favorite}
                  onChange={() => toggleFavorite(stock)}
                />
              </td>
              <td className="actions">
                <button
                  className="btn-detail"
                  onClick={() => navigate(`/stock-detail/${stock.id}`)}
                >
                  Chi tiết
                </button>
                {user && (
                  <>
                    <button
                      className="btn-view"
                      onClick={() => openModal(stock, "view")}
                    >
                      Xem
                    </button>
                    <button
                      className="btn-edit"
                      onClick={() => openModal(stock, "edit")}
                    >
                      Sửa
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => deleteStock(stock)}
                    >
                      Xóa
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {getPageNumbers().map((number) => (
          <button
            key={number}
            className={`pagination-btn ${
              currentPage === number ? "active" : ""
            }`}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </button>
        ))}

        <button
          className="pagination-btn"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>

            {modalMode === "view" && selectedStock && (
              <div>
                <h3>Chi tiết cổ phiếu</h3>
                <p>
                  <strong>Mã:</strong> {selectedStock.code}
                </p>
                <p>
                  <strong>Tên:</strong> {selectedStock.name}
                </p>
                <p>
                  <strong>Giá:</strong> {selectedStock.price}
                </p>
                <p>
                  <strong>Giá trước đó:</strong> {selectedStock.previousPrice}
                </p>
                <p>
                  <strong>Yêu thích:</strong>{" "}
                  {selectedStock.favorite ? "Có" : "Không"}
                </p>
              </div>
            )}

            {modalMode === "edit" && selectedStock && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveStock();
                }}
              >
                <h3>Chỉnh sửa cổ phiếu</h3>
                <label>Tên:</label>
                <input
                  type="text"
                  value={editStock.name}
                  onChange={(e) =>
                    setEditStock({ ...editStock, name: e.target.value })
                  }
                />
                <label>Giá:</label>
                <input
                  type="number"
                  value={editStock.price}
                  onChange={(e) =>
                    setEditStock({ ...editStock, price: +e.target.value })
                  }
                />
                <label>Giá trước đó:</label>
                <input
                  type="number"
                  value={editStock.previousPrice}
                  onChange={(e) =>
                    setEditStock({
                      ...editStock,
                      previousPrice: +e.target.value,
                    })
                  }
                />
                <label>Yêu thích:</label>
                <input
                  type="checkbox"
                  checked={editStock.favorite}
                  onChange={() =>
                    setEditStock({
                      ...editStock,
                      favorite: !editStock.favorite,
                    })
                  }
                />
                <button type="submit">Lưu</button>
              </form>
            )}
          </div>
        </div>
      )}
      {showCreateDialog && (
        <div className="modal-overlay">
          <div className="modal-dialog">
            <CreateStockDialog onClose={() => setShowCreateDialog(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default StockListView;
