import React, { useState } from 'react';

import { Input, Button } from 'antd';
import './index.css'

const Tree = ({ data, onCreateChild, parentName }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {data.map(node => (
        <div style={{ display: "flex", flexDirection: "row", width:"120px", border: '1px solid black', borderRadius: 8 }}>
          {parentName && <div>Parent Node: {parentName}</div>}
          <div>Node Name: {node.name}</div>
          <Input value={node.name} />
          <Button type="primary" onClick={() => onCreateChild(node.key)}>
            Create
          </Button>
          {node.children && (
            <Tree
              data={node.children}
              onCreateChild={onCreateChild}
              parentName={node.name}
            />
          )}
        </div>
      ))}
    </div>
  );
};


const MyTree = () => {
  const root = {
    name: 'Root Node',
    key: '0-0',
    children: [
      {
        name: 'Child Node 1',
        key: '0-0-1',
        children: [],
      },
      {
        name: 'Child Node 2',
        key: '0-0-2',
        children: [],
      },
      // ...
    ],
  };
  const [data, setData] = useState([root]);

  const onCreateChild = selectedKeys => {
    const findNode = (data, key) => {
      if (!data) {
        return null;
      }

      const node = data.find(node => node.key === key);
      if (node) {
        return node;
      }

      for (const child of data) {
        const found = findNode(child.children, key);
        if (found) {
          return found;
        }
      }

      return null;
    };

    const keyValue = `${selectedKeys}-${findNode(data, selectedKeys).children.length}`
    const newNode = {
      name: keyValue,
      key: keyValue,
      children: [],
    };


    setData(prevData => {
      const newData = [...prevData];

      const targetNode = findNode(newData, selectedKeys);
      if (targetNode) {
        // 여기서 targetNode.children을 추가하고 있습니다.
        targetNode.children = [...targetNode.children, newNode];
      }
      return newData;
    });

  };

  return (
    <Tree
      data={data}
      onCreateChild={onCreateChild}
      parentName={null} // 최상위 노드에는 parentName을 전달하지 않음
    />
  );
};

export default MyTree;
