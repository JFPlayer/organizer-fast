import { FunctionComponent } from "react";
import { Button, Radio, Form, Input, DatePicker } from 'antd';

import './index.css';

const Register: FunctionComponent<Props> = ({ onSubmit }) => {

  const onSubmitForm = (values: RegisterForm) => {
    onSubmit({...values, birthdayDate: new Date(values.birthdayDate).toISOString()})
  }

  return (
    <div className="login-container">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onSubmitForm}
        autoComplete="off"
      >
        <Form.Item
          label="Nombre"
          name="firstName"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Apellido"
          name="lastName"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          label="Contraseña"
          name="password"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Fecha de nacimiento"
          name="birthdayDate"
        >
          <DatePicker />
        </Form.Item>


        <Form.Item name="sex" label='Sexo' wrapperCol={{ offset: 8, span: 16 }}>
          <Radio.Group>
            <Radio value="male"> Hombre </Radio>
            <Radio value="female"> Mujer </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Registrate
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Register;

interface Props {
  onSubmit: (formFields: RegisterForm) => void;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthdayDate: string;
  sex: 'male' | 'female';
}
