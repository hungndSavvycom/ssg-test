import { List, Skeleton } from 'antd';
import React from 'react';

const listData = Array.from({ length: 4 }).map((_) => {
  return { title: 'skeleton' };
});

const SkeletonList: React.FC = () => {
  return (
    <List
      data-testid="loading-table"
      itemLayout="vertical"
      size="large"
      dataSource={listData}
      renderItem={(_, index) => (
        <List.Item key={index}>
          <Skeleton active />
        </List.Item>
      )}
    />
  );
};

export { SkeletonList };
