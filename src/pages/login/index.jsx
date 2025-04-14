import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.get("http://localhost:3001/users", {
            params: {
              username,
              password,
            },
          });
      
          if (response.data.length > 0) {
            console.log("Đăng nhập thành công!");
            setError(null);  
            navigate("/");

          } else {
            setError("Sai tài khoản hoặc mật khẩu.");
          }
        } catch (err) {
          setError("Lỗi khi gọi API.");
          console.error(err);
        }
      };
      
    return (
        <div style={{ maxWidth: 300, margin: "auto", padding: 20 }}>
        <h2>Đăng nhập</h2>
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

export default LoginPage;