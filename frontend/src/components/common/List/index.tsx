import React, { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Empty, Table } from 'antd';
import classes from './List.module.scss';
import { SkeletonList } from '../../../atomics/SkeletonList';

interface ListComponentProps {
  columns: ColumnsType<any>;
  loading: boolean;
  data?: any[];
}

const ListComponent: React.FC<ListComponentProps> = (props) => {
  const { columns, loading, data } = props;
  const [currentData, setCurrentData] = useState<any[]>([]);


  useEffect(() => {
    if (data) {
      setCurrentData(data);
    } else {
      setCurrentData([]);
    }
  }, [data]);


  if (loading) return <SkeletonList />;

  return (
    <div className={classes.container} data-testid="list-table">
      {!currentData.length ? (
        <Empty data-testid="empty-table" />
      ) : (
        <div className={classes.table}>
          <Table
            pagination={{ pageSize: 10, pageSizeOptions: [], size: 'small' }}
            rowKey={(record) => record.id}
            dataSource={currentData}
            columns={columns}
          />
        </div>
      )}
    </div>
  );
};

export default ListComponent;
