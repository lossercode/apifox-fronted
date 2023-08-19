import React, {useState,useMemo} from "react";
import {DeleteOutlined} from "@ant-design/icons";
import type {DataNode} from "antd/es/tree";
import {Input, Popconfirm, Tree} from "antd";
import styles from './index.less'

const { Search } = Input;

const defaultData: DataNode[] = [
    {
        title: '2023年8月18日',
        key: '2023-08-18',
        children: [
            {
                title: 'DELETE 删除订单',
                content: '11111',
                key: '2023-08-18-1',
                children: [], // Add an empty children array
            },
        ],
    },
    {
        title: '2023年8月17日',
        key: '2023-08-17',
        children: [
            {
                title: 'GET 查询用户信息',
                key: '2023-08-17-1',
                children: [], // Add an empty children array
            },
            {
                title: 'PUT 更新用户信息',
                key: '2023-08-17-2',
                children: [], // Add an empty children array
            },
        ],
    },
    {
        title: '2023年8月16日',
        key: '2023-08-16',
        children: [
            {
                title: 'GET 查询宠物详情',
                key: '2023-08-16-1',
                children: [], // Add an empty children array
            },
            {
                title: 'POST 创建新宠物',
                key: '2023-08-16-2',
                children: [], // Add an empty children array
            },
        ],
    },
];

const dataList: { key: React.Key; title: string }[] = [];
const generateList = (data: DataNode[]) => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const { key,title } = node;
        dataList.push({ key, title });
        if (node.children) {
            generateList(node.children);
        }
    }
};
generateList(defaultData);
const getParentKey = (key: React.Key, tree: DataNode[]): React.Key => {
    let parentKey: React.Key;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some((item) => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey!;
};
const LogList: React.FC = () => {
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [treeData, setTreeData] = useState<DataNode[]>(defaultData);

    const onExpand = (newExpandedKeys: React.Key[]) => {
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(false);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const newExpandedKeys = dataList
            .map((item) => {
                if (item.title.indexOf(value) > -1) {
                    return getParentKey(item.key, defaultData);
                }
                return null;
            })
            .filter((item, i, self) => item && self.indexOf(item) === i);
        console.log(dataList,'datalist')
        setExpandedKeys(newExpandedKeys as React.Key[]);
        setSearchValue(value);
        setAutoExpandParent(true);
    };

    const deleteItemByKey = (data: DataNode[], key: React.Key): DataNode[] => {
        const updatedData: DataNode[] = [];

        for (const item of data) {
            if (item.key === key) {
                continue;
            }

            if (item.children) {
                item.children = deleteItemByKey(item.children, key);
            }

            updatedData.push(item);
        }

        return updatedData;
    };

    const handleDeleteItem = (key: React.Key) => {
        const updatedData = deleteItemByKey(treeData, key);
        setTreeData(updatedData);
        console.log(treeData, 'treeData')
    };

    const renderTitle = (title: string, content: string, key: React.Key) => {
        const index = searchValue ? title.indexOf(searchValue) : -1;
        const contentIndex = searchValue ? (content ? content.indexOf(searchValue) : -1) : -1;

        if (index === -1 && contentIndex === -1) {
            return (<div className={styles['title-box']}>
                    <span>{title}</span>
                    <Popconfirm
                        title="确定要删除这条日志吗？"
                        onConfirm={() => handleDeleteItem(key)}
                        okText="删除"
                        cancelText="取消"
                    >
                        <a href="#" className={styles['delete-button']}><DeleteOutlined/></a>
                    </Popconfirm>
                </div>
            );
        }

        const beforeStr = index !== -1 ? title.substring(0, index) : '';
        const contentBeforeStr = contentIndex !== -1 ? content.substring(0, contentIndex) : '';
        const afterStr = index !== -1 ? title.slice(index + searchValue.length) : '';
        const contentAfterStr = contentIndex !== -1 ? content.slice(contentIndex + searchValue.length) : '';

        return (
            <>
                <div className={styles['title-box']}>
                    {beforeStr}
                    {index !== -1 && <span className={styles['site-tree-search-value']}>&nbsp;{searchValue}</span>}
                    {afterStr}
                    {contentBeforeStr}
                    {contentIndex !== -1 && <span className={styles['site-tree-search-value']}>&nbsp;{searchValue}</span>}
                    {contentAfterStr}
                    <Popconfirm
                        title="确定要删除这条日志吗？"
                        onConfirm={() => handleDeleteItem(key)}
                        okText="删除"
                        cancelText="取消"
                    >
                        <a href="#" className={styles['delete-button']}><DeleteOutlined/></a>
                    </Popconfirm>
                </div>
            </>
        );
    };


    const loop = (data: DataNode[]): DataNode[] =>
        data.map((item) => {
            const title = renderTitle(item.title as string, (item.content || '') as string, item.key);
            if (item.children) {
                return {title, key: item.key, children: loop(item.children)};
            }

            return {
                title,
                key: item.key,
            };
        });

    const updatedTreeData = useMemo(() => loop(treeData), [searchValue]);

    return (
        <div>
            <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={onChange} />
            <Tree
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                treeData={updatedTreeData}
            />
        </div>
    );
};

export default LogList;