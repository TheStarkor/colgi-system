import React, { useState } from 'react';

const TreeNode = ({ name, children, onClick, color, parent, setNodeName }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div
        style={{ width: 100, height: 100, border: '1px solid black', background: color }}
        onClick={() => onClick({ name, children })}
      >
        <input value={name} onChange={(event) => setNodeName(event.target.value)} />
        {parent && <p>Parent: {parent}</p>}
      </div>
      {children && (
        <ul>
          {children.map((child, index) => (
            <li key={index}>
              <div
                style={{
                  position: 'relative',
                  height: 100,
                  width: 100,
                }}
              >
                <TreeNode
                  {...child}
                  onClick={onClick}
                  color={color === 'white' ? 'lightblue' : 'white'}
                  parent={name}
                  setNodeName={setNodeName}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const TreePrompt = () => {
  const [tree, setTree] = useState({
    name: 'Root Node',
    children: [
      {
        name: 'Child Node 1',
        children: [],
      },
      {
        name: 'Child Node 2',
        children: [],
      },
    ],
  });

  const handleClick = (node) => {
    setTree((tree) => {
      if (tree.name === node.name) {
        return {
          ...tree,
          children: [
            ...tree.children,
            {
              name: 'New Child Node',
              children: [],
            },
          ],
        };
      } else if (tree.children) {
        return {
          ...tree,
          children: tree.children.map((child) =>
            child.name === node.name
              ? {
                  ...child,
                  children: [
                    ...child.children,
                    {
                      name: 'New Child Node',
                      children: [],
                    },
                  ],
                }
              : child
          ),
        };
      }

      return tree;
    });
  };

  const setNodeName = (nodeName) => {
    setTree((tree) => {
      if (tree.name === nodeName) {
        return {
          ...tree,
          name: nodeName,
        };
      } else if (tree.children) {
        return {
          ...tree,
          children: tree.children.map((child) =>
            child.name === nodeName
              ? {
                  ...child,
                  name: nodeName,
                }
              : child
          ),
        };
      }

      return tree;
    });
  };

  return (
    <div>
      <TreeNode
        name={tree.name}
        children={tree.children}
        onClick={handleClick}
        color="white"
        parent={null}
        setNodeName={setNodeName}
      />
    </div>
  );
};

export default TreePrompt;
