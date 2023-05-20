import { FunctionComponent } from "react";
import { Button, Checkbox, Form, Input } from 'antd';

import './index.css';

const Login: FunctionComponent<Props> = ({ onSubmit }) => {

  return (
    <div className="login-container">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Recuerda este dispositivo</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Iniciar sesion
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login;

interface Props {
  onSubmit: (formFields: LoginForm) => void;
}

export interface LoginForm {
  email: string;
  password: string;
  remeber: boolean;
}
