import { useMemo } from 'react';
import { useQueryListEmployee } from '../../hooks/employee';
import classes from './HomePage.module.scss';
import { ColumnsType } from 'antd/es/table';
import ListComponent from '../common/List';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import RowActions from './components/RowActions';

const HomeComponent = () => {
  const {data, loading, refetch} = useQueryListEmployee()
  const {getAllEmployees: currentData} = data || {}
  const navigate = useNavigate();
  const onRefetch = () => {
    refetch()
  }
  const columns: ColumnsType<any> = useMemo(() => {
    return [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => {
          return (a.id || 0) - (b.id || 0);
        },
      },
      {
        title: 'Employee name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: 'Employee position',
        dataIndex: 'position',
        key: 'position',
      },
      {
        title: 'Employee Salary',
        dataIndex: 'salary',
        key: 'salary',
      },
      {
        title: 'Actions',
        key: 'action',
        render: (_, item) => {
          return <RowActions id={item.id} onRefetchList={onRefetch} />
        },
      },
    ];
  }, []);
  const onOpenCreateEmployee = () => {
    navigate('/employee/create')
  }
  return (
    <div className={classes.container}>
        <Button onClick={onOpenCreateEmployee} className={classes.btnCreate} type="primary">Create Employee</Button>
        <ListComponent data={currentData} loading={loading} columns={columns} />
    </div>
  );
};

export default HomeComponent;
