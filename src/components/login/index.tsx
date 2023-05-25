import { FunctionComponent } from "react";
import { Button, Checkbox, Form, Input } from 'antd';

import './index.css';
import { RegisteredUser, User } from "../../model/user";

const Login: FunctionComponent<Props> = ({ onSubmit, users }) => {

  const onClickSubmit = (formFields: LoginForm) => {
    const {email, password} = formFields;

    const foundUser = users.find(user => user.email === email);

    console.log(users, foundUser, formFields)
    if(foundUser?.password === password) {
      return onSubmit(foundUser);
    }

    console.log('CONTRASEÑA INVALIDA');
  }


  return (
    <div className="login-container">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onClickSubmit}
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
  onSubmit: (user: User) => void;
  users: RegisteredUser[];
}

export interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}
