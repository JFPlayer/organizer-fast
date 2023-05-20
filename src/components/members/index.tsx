import { FunctionComponent } from "react";
import { UserOutlined } from '@ant-design/icons'

import './index.css';

const Members: FunctionComponent = () => {

  return (
    <div className="members-container">
      <h1>Miembros</h1>
      
      <div className="member-list">
        
        <div className="member-item">
          <div className="member-icon-container">
            <UserOutlined className="member-icon"/>
          </div>
          <div className="member-name">Miembro 1</div>
        </div>

        <div className="member-item">
          <div className="member-icon-container">
            <UserOutlined className="member-icon"/>
          </div>
          <div className="member-name">Miembro 2</div>
        </div>

        <div className="member-item">
          <div className="member-icon-container">
            <UserOutlined className="member-icon"/>
          </div>
          <div className="member-name">Miembro 3</div>
        </div>

        <div className="member-item">
          <div className="member-icon-container">
            <UserOutlined className="member-icon"/>
          </div>
          <div className="member-name">Miembro 4</div>
        </div>
      </div>
    </div>
  )
}

export default Members;

// interface Props {
//   onSubmit: (formFields: RegisterForm) => void;
// }
