import { FunctionComponent, useState } from "react";
import {Button, Modal, Input, Form, DatePicker, Select} from 'antd'
import {PlusOutlined, UserAddOutlined} from '@ant-design/icons'
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

import './index.css';
import { Activity, ActivityProgress } from "./types";
import { User } from "../../model/user";
import ActivityItem from "./activity-item";

const dateFormat = 'YYYY/MM/DD';

const Table: FunctionComponent<Props> = ({table, userList, activityList, onUpdateActivities}) => {
  
  const [currentActivity, setCurrentActivity] = useState<Activity | undefined>();

  const [openAddActivity, setOpenAddActivity] = useState(false);

  const [addActivityForm] = Form.useForm<{description: string, deadLine: Dayjs}>()
  const [activityForm] = Form.useForm<Activity & {deadLine: Dayjs}>()

  const onSelectActivity = (activity: Activity) => {
    activityForm.setFields([
      {
        name: 'description',
        value: activity.description
      },
      {
        name: 'progress',
        value: activity.progress,
      },
      {
        name: 'deadLine',
        value: dayjs(activity.deadLine),
      },
      {
        name: 'assignedUser',
        value: activity.assignedUser,
      },
    ])
    setCurrentActivity(activity);
  }


  const onConfirmAddActivity = () => {
    const formValues = addActivityForm.getFieldsValue();
    
    const newActivity: Activity = {
      id: new Date().getTime(),
      description: formValues.description,
      deadLine: formValues.deadLine.format(dateFormat),
      progress: ActivityProgress.Pending,
    }

    onUpdateActivities([...activityList, newActivity])
    
    setOpenAddActivity(false);
  }

  const onConfirmUpdateActivity = () => {
    const _activityList = [...activityList];
    const formValues = activityForm.getFieldsValue();

    const updatedActivity: Activity = {
      id: currentActivity!.id,
      description: formValues.description,
      deadLine: formValues.deadLine.format(dateFormat),
      progress: formValues.progress,
      assignedUser: formValues.assignedUser,
    }

    const updatedActivityIndex = _activityList.findIndex(activity => activity.id === updatedActivity.id);

    console.log(updatedActivityIndex, updatedActivity)

    if(updatedActivityIndex >= 0) {
      _activityList.splice(updatedActivityIndex, 1, updatedActivity)
      onUpdateActivities(_activityList)
    }

    setCurrentActivity(undefined);
  }

  const getUser = (email?: string): User | undefined => {
    return userList.find(user => user.email === email)
  }

  return (
    <div className="table-container">
      <h1>{table}</h1>

      <div className="table-progress-list">
        
        <div className="table-progress-column">
          <div className="table-progress-title">Pendiente</div>
          <div className="task-list">
            {activityList.filter((activity) => activity.progress === ActivityProgress.Pending).map((activity) => (
              <ActivityItem key={activity.id} user={getUser(activity.assignedUser)} activity={activity} onClick={() => onSelectActivity(activity)} />
            ))}
          </div>
        </div>

        <div className="table-progress-column">
          <div className="table-progress-title">En progreso</div>
          <div className="task-list">
            {activityList.filter((activity) => activity.progress === ActivityProgress.InProgress).map((activity) => (
              <ActivityItem key={activity.id} user={getUser(activity.assignedUser)} activity={activity} onClick={() => onSelectActivity(activity)} />
            ))}
          </div>
        </div>

        <div className="table-progress-column">
          <div className="table-progress-title">Finalizado</div>
          <div className="task-list">
            {activityList.filter((activity) => activity.progress === ActivityProgress.Done).map((activity) => (
              <ActivityItem key={activity.id} user={getUser(activity.assignedUser)} activity={activity} onClick={() => onSelectActivity(activity)} />
            ))}
          </div>
        </div>
      </div>

      <div className="table-footer">
        <Button icon={<PlusOutlined />} onClick={() => setOpenAddActivity(true)}>Añadir actividad</Button>

        <div className="work-space">
          <div className="work-space-member">User 1</div>
          <div className="work-space-member">User 2</div>
          <Button icon={<UserAddOutlined />}>Compartir</Button>
        </div>
      </div>

      <Modal title="Añadir actividad" centered open={openAddActivity} onOk={onConfirmAddActivity} onCancel={() => setOpenAddActivity(false)}>
        <Form form={addActivityForm}>
          <Form.Item label='Description' name='description'>
            <Input/>
          </Form.Item>
          <Form.Item label='Fecha de vencimiento' name='deadLine'>
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>

      {!!currentActivity && (
        <Modal
          title='Actividad'
          centered
          open={!!currentActivity}
          onCancel={() => setCurrentActivity(undefined)}
          footer={[
            <Button key="back" onClick={() => setCurrentActivity(undefined)}>
              Volver
            </Button>,
            <Button key="submit" type="primary" onClick={onConfirmUpdateActivity}>
              Actualizar
            </Button>,
          ]}
        >
          <Form form={activityForm}>
            <Form.Item label='Description' name='description'>
              <Input/>
            </Form.Item>

            <Form.Item name="progress" label="Progreso" >
              <Select options={[
                {
                  label: 'Pendiente',
                  value: ActivityProgress.Pending
                },
                {
                  label: 'En progreso',
                  value: ActivityProgress.InProgress
                },
                {
                  label: 'Finalizado',
                  value: ActivityProgress.Done
                },
              ]} />
            </Form.Item>

            <Form.Item name="assignedUser" label="Persona asignada" >
              <Select showSearch options={userList.map((user) => ({
                label: `${user.firstName} ${user.lastName}`,
                value: user.email,
              }))} />
            </Form.Item>

            <Form.Item label='Fecha de vencimiento' name='deadLine'>
              <DatePicker/>
            </Form.Item>
          </Form>
        </Modal>
      )}

    </div>
  )
}

export default Table;

interface Props {
  table: string;
  userList: User[];
  activityList: Activity[];
  onUpdateActivities: (activity: Activity[]) => void;
}
