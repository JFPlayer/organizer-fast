import { FunctionComponent } from "react";
import { User } from "../../../model/user";
import { Activity } from "../types";

import './index.css';

const ActivityItem: FunctionComponent<Props> = ({activity, user, onClick}) => {
  return (
    <div className={`activity-item-container ${activity.progress}`} onClick={onClick}>
      <div className="activity-item-description" >
        {activity.description}
      </div>
      {!!user && (
        <div className="activity-item-user-info">
          {`${user.firstName} ${user.lastName}`}
        </div>
      )}
    </div>
  )
}

interface Props {
  user?: User;
  activity: Activity;
  onClick: () => void;
}

export default ActivityItem;
