import { useState } from "react";
import { Form, Input, Button, Typography, Alert, Select } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

const RegisterPage = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    const { username, password, role } = values;
    try {
      await axios.post("http://localhost:3005/users", {
        username,
        password,
        role,
      });
      alert("Đăng ký thành công!");
      setError(null);
      navigate("/login");
    } catch (err) {
      setError("Lỗi khi gọi API.");
      console.error(err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          padding: 32,
          backgroundColor: "white",
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: 400,
        }}
      >
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
              <Option value={1}>Admin</Option>
              <Option value={2}>User</Option>
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
