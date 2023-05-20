import { FunctionComponent, useState } from "react";
import { Button, Modal, Input, Form } from 'antd';
import {PlusOutlined} from '@ant-design/icons'

import './index.css';

const Tables: FunctionComponent<Props> = ({onSelect}) => {
  const [openAddTable, setOpenAddTable] = useState(false);
  const [newTableName, setNewTableName] = useState('');
  const [tables, setTables] = useState<string[]>([]);
  
  const onConfirmAddTable = () => {
    setTables(prev => [...prev, newTableName])
    setOpenAddTable(false);
  }

  return (
    <div className="tables-container">
      <h1>Tableros</h1>
      
      <div className="tables-list">
        {tables.map((tableName) => (
          <div key={tableName} className="table-item" onClick={() => onSelect(tableName)}>{tableName}</div>
        ))}
      </div>

      <div className="tables-footer">
        <Button icon={<PlusOutlined />} onClick={() => setOpenAddTable(true)}>Añadir tablero</Button>
      </div>

      <Modal title="Agregar tablero" open={openAddTable} onOk={onConfirmAddTable} onCancel={() => setOpenAddTable(false)}>
        <Form.Item label='Nombre de tablero'>
          <Input onChange={(e) => setNewTableName(e.target.value)} value={newTableName}/>
        </Form.Item>
      </Modal>
    </div>
  )
}

export default Tables;

interface Props {
  onSelect: (table: string) => void;
}
