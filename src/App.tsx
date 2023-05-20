import { useState } from 'react'
import './index.css'
import 'antd/dist/reset.css';
import Login, { LoginForm } from './components/login';
import { Screen } from './types';
import Register, { RegisterForm } from './components/register';
import Dashboard from './components/dashboard';

function App() {
  const [screen, setScreen] = useState(Screen.Dashboard)

  const onSubmitLogin = (formFields: LoginForm) => {
    console.log(formFields)
  }

  const onSubmitRegister = (formFields: RegisterForm) => {
    console.log(formFields)
    
    setScreen(Screen.Login)
  }

  return (
    <div className="app-container">
      {screen === Screen.Login && <Login onSubmit={onSubmitLogin}/>}
      {screen === Screen.Register && <Register onSubmit={onSubmitRegister}/>}
      {screen === Screen.Dashboard && <Dashboard />}
    </div>
  )
}

export default App
