import "./login.css";
import { useState } from "react";
import { Form, Input, Button, Typography, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/user-service";

const { Title } = Typography;

const LoginPage = ({ setUser }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    const { username, password } = values;
    try {
      const data = await loginUser(username, password);
      if (data.length > 0) {
        console.log("Đăng nhập thành công!");
        setError(null);
        setUser(data[0]);
        const user = data[0];
        localStorage.setItem("user", JSON.stringify(user)); // Lưu thông tin người dùng vào localStorage
        navigate("/stock-list");
      } else {
        setError("Sai tài khoản hoặc mật khẩu.");
      }
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <Title level={2} style={{ textAlign: "center", color: "#1890ff" }}>
          Đăng nhập
        </Title>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập!" },
            ]}
          >
            <Input placeholder="Nhập tên đăng nhập" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          {error && (
            <Form.Item>
              <Alert message={error} type="error" showIcon />
            </Form.Item>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ borderRadius: 6 }}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        <p style={{ textAlign: "center", marginTop: 16 }}>
          Chưa có tài khoản?{" "}
          <a href="/register" style={{ color: "#1890ff" }}>
            Đăng ký
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
