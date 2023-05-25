import { useState } from 'react'
import './index.css'
import 'antd/dist/reset.css';
import Login from './components/login';
import { Screen } from './types';
import Register from './components/register';
import Dashboard from './components/dashboard';
import { Button } from 'antd';
import { RegisteredUser, User } from './model/user';


function App() {
  const [screen, setScreen] = useState(Screen.Main);
  const [loggedUser, setLoggedUser] = useState<User | undefined>();
  const [userList, setUserList] = useState<RegisteredUser[]>([]);

  const onSubmitLogin = (user: User) => {
    setLoggedUser(user);
    setScreen(Screen.Dashboard);
  }

  const onSubmitRegister = (formFields: RegisteredUser) => {
    setUserList(prev => [...prev, formFields]);
    
    setScreen(Screen.Main);
  }

  console.log(loggedUser)

  return (
    <div className="app-container">
      {screen === Screen.Main && (
        <div className="main-container">
          <Button onClick={() => setScreen(Screen.Login)}>Login</Button>
          <Button onClick={() => setScreen(Screen.Register)}>Register</Button>
        </div>
      )}
      {screen === Screen.Login && <Login onSubmit={onSubmitLogin} users={userList} />}
      {screen === Screen.Register && <Register onSubmit={onSubmitRegister}/>}
      {screen === Screen.Dashboard && !!loggedUser && <Dashboard user={loggedUser} users={userList} goBack={() => setScreen(Screen.Main)} />}
    </div>
  )
}

export default App
