import axios from "axios";

const API_URL = "http://localhost:3005/stocks";

const stockService = {
  getStocks: () => axios.get(API_URL),
  getStockById: (id) => axios.get(`${API_URL}/${id}`),
  addStock: (stock) => axios.post(API_URL, stock),
  deleteStock: (id) => axios.delete(`${API_URL}/${id}`),
  updateStock: (stock) => axios.put(`${API_URL}/${stock.id}`, stock),
  searchStocks: (keyword) =>
    axios
      .get(API_URL)
      .then((res) =>
        res.data.filter(
          (stock) =>
            stock.name.toLowerCase().includes(keyword.toLowerCase()) ||
            stock.code.toLowerCase().includes(keyword.toLowerCase())
        )
      ),
};

export default stockService;
