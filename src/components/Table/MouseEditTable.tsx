import type {ProColumns} from '@ant-design/pro-components';
import {EditableProTable} from '@ant-design/pro-components';
import React, {useState} from 'react';



export interface MouseEditableTableProps {
  columns: ProColumns[];
  dataSource: any[];
  setDataSource: (data: any[]) => void
}

const MouseEditTable: React.FC<MouseEditableTableProps> = ({columns, dataSource, setDataSource}) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  // const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);

  // @ts-ignore
  return (
    <>
      <EditableProTable
        rowKey="id"
        headerTitle="Query Params"
        maxLength={5}
        recordCreatorProps={
          {
            position: 'bottom',
            record: () => ({
              id: (Math.random() * 1000000).toFixed(0),
              key: '',
              value: ''
            }),
          }
        }
        loading={false}
        // toolBarRender={() => [
        //   <ProFormRadio.Group
        //     key="render"
        //     fieldProps={{
        //       value: position,
        //       onChange: (e) => setPosition(e.target.value),
        //     }}
        //   />,
        // ]}
        columns={columns}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(dataSource)
            console.log(data, row)
          },
          onChange: setEditableRowKeys,
        }}
      />
    </>
  );
};

export default MouseEditTable;
