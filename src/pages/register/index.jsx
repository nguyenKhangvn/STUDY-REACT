import "./register.css";
import { useState } from "react";
import { Form, Input, Button, Typography, Alert, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/user-service"; // import service

const { Title } = Typography;

const RegisterPage = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    const { username, password, role } = values;
    try {
      await registerUser(username, password, role);
      alert("Đăng ký thành công!");
      setError(null);
      navigate("/login");
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <Title level={2} style={{ textAlign: "center", color: "#1890ff" }}>
          Đăng ký
        </Title>

        <Form layout="vertical" onFinish={handleRegister}>
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

          <Form.Item
            label="Vai trò"
            name="role"
            initialValue={2}
            rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
          >
            <Select placeholder="Chọn vai trò">
              <Select.Option value={1}>Admin</Select.Option>
              <Select.Option value={2}>User</Select.Option>
            </Select>
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
              Đăng ký
            </Button>
          </Form.Item>
        </Form>

        <p style={{ textAlign: "center", marginTop: 16 }}>
          Đã có tài khoản?{" "}
          <a href="/login" style={{ color: "#1890ff" }}>
            Đăng nhập
          </a>
        </p>
      </div>
    </div>
  );
};
export default RegisterPage;
