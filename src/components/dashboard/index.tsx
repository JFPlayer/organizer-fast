import { FunctionComponent, useState } from "react";

import './index.css';
import Tables from "../tables";
import Members from "../members";
import Table from "../table";
import { DashboardMenu } from "./types";

const Dashboard: FunctionComponent = () => {
  const [currentMenu, setCurrentMenu] = useState(DashboardMenu.Tables);
  const [currentTable, setCurrentTable] = useState('');

  const onSelectTable = (table: string) => {
    setCurrentMenu(DashboardMenu.Table);
    setCurrentTable(table);
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-container--header">
        <h1>Nombre del usuario</h1>
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
          {currentMenu === DashboardMenu.Tables && <Tables onSelect={onSelectTable} />}
          {currentMenu === DashboardMenu.Members && <Members />}
          {currentMenu === DashboardMenu.Table && <Table table={currentTable} userList={[]} />}
        </div>
      </main>
    </div>
  )
}

export default Dashboard;

// interface Props {
//   onSubmit: (formFields: RegisterForm) => void;
// }
