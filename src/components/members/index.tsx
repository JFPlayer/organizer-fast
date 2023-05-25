import { FunctionComponent } from "react";
import {UserOutlined} from '@ant-design/icons'

import './index.css';
import { User } from "../../model/user";

const Members: FunctionComponent<Props> = ({users}) => {

  return (
    <div className="members-container">
      <h1>Miembros</h1>
      
      <div className="member-list">
        {users.map((user) => (
          <div className="member-item">
            <div className="member-icon-container">
              <UserOutlined className="member-icon"/>
            </div>
            <div className="member-name">{`${user.firstName} ${user.lastName}`}</div>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default Members;

interface Props {
  users: User[];
}
