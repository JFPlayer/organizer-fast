import { FunctionComponent, useState } from "react";

import './index.css';
import Tables from "../tables";
import Members from "../members";
import Table from "../table";
import { DashboardMenu } from "./types";
import { User } from "../../model/user";
import { Activity } from "../table/types";
import { Button } from "antd";

const Dashboard: FunctionComponent<Props> = ({user, users, goBack}) => {
  const [currentMenu, setCurrentMenu] = useState(DashboardMenu.Tables);
  const [currentTable, setCurrentTable] = useState('');

  const [tables, setTables] = useState<string[]>([]);
  const [activities, setActivities] = useState<Record<string, Activity[]>>({});

  const onSelectTable = (table: string) => {
    setCurrentMenu(DashboardMenu.Table);
    setCurrentTable(table);

    setActivities(prev => ({
      ...prev,
      [table]: prev[table] || [],
    }))
  }

  const updateActivities = (list: Activity[]) => {
    setActivities(prev => ({
      ...prev,
      [currentTable]: list,
    }))
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-container--header">
        <h1>{`${user.firstName} ${user.lastName}`}</h1>
        <Button onClick={goBack}>Cerrar sesión</Button>
      </header>

      <main className="dashboard-container--layout-container">
        <div className="dashboard-container--layout-left">
          <div className="dashboard-title">
            OrganizerFast
          </div>
          
          <div className="dashboard-menu">
            <div className={`dashboard-menu-item ${currentMenu === DashboardMenu.Tables || currentMenu === DashboardMenu.Table ? 'selected' : ''}`} onClick={() => setCurrentMenu(DashboardMenu.Tables)}>Tableros</div>
            <div className={`dashboard-menu-item ${currentMenu === DashboardMenu.Members ? 'selected' : ''}`} onClick={() => setCurrentMenu(DashboardMenu.Members)}>Miembros</div>
          </div>
        </div>

        <div className="dashboard-container--layout-right">
          {currentMenu === DashboardMenu.Tables && <Tables onSelect={onSelectTable} tables={tables} onCreateTablet={value => setTables(prev => [...prev, value])} />}
          {currentMenu === DashboardMenu.Members && <Members users={users} />}
          {currentMenu === DashboardMenu.Table && <Table table={currentTable} userList={users} activityList={activities[currentTable]} onUpdateActivities={updateActivities} />}
        </div>
      </main>
    </div>
  )
}

export default Dashboard;

interface Props {
  user: User;
  users: User[];
  goBack: () => void;
}
