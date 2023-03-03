import type {ProColumns} from '@ant-design/pro-components';
import {EditableProTable} from '@ant-design/pro-components';
import React, {useState} from 'react';


export interface MouseEditableTableProps {
  title?: string;
  columns: ProColumns[];
  dataSource: any[];
  setDataSource: (data: any[]) => void
}

const MouseEditTable: React.FC<MouseEditableTableProps> = ({columns, title, dataSource, setDataSource}) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  // @ts-ignore
  return (
    <>
      <EditableProTable
        rowKey="id"
        headerTitle={title}
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
        columns={columns}
        value={dataSource}
        // @ts-ignore
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            // console.log(dataSource)
            // console.log(data, row)
          },
          onChange: setEditableRowKeys,
        }}
      />
    </>
  );
};

export default MouseEditTable;
