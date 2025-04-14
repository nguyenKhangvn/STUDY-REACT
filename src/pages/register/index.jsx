import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:3000/users", {
              username,
              password,
          });
            alert("Đăng ký thành công!");
            navigate("/login");      
        } catch (err) {
          setError("Lỗi khi gọi API.");
          console.error(err);
        }
      };
      
    return (
        <div style={{ maxWidth: 300, margin: "auto", padding: 20 }}>
        <h2>Đăng ký</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Tên đăng nhập:</label><br />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Mật khẩu:</label><br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Đăng nhập</button>
        </form>
        <p>{error}</p>
      </div>
    );
};

export default RegisterPage;