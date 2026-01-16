import useOrder from "@renderer/hook/useOrders"

import styles from "./OrderList.module.css"
import OrderRow from "./OrderRow";
import { useEffect, useState } from "react";

import Order from "@renderer/shared/types/order";

import { Pagination, PaginationProps, Space, Table, Tag } from 'antd';
import type { ColumnsType } from "antd/es/table";


const columns: ColumnsType<Order> = [
    { title: 'Referência', dataIndex: 'reference', key: 'reference', },
    { title: 'Preço Total', dataIndex: 'totalPrice', key: 'totalPrice' },
    { title: 'Rentabilidade', dataIndex: 'profitability', key: 'profitability' },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status: string) => {
            let color = status.length > 8 ? 'green' : 'geekblue';
            if (status === 'pendente') {
                color = 'volcano';
            }
            return (
                <Tag color={color} key={status}>
                    {status.toUpperCase()}
                </Tag>
            );
        }
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a onClick={() => record.onClick(record.orderId)}>Edit</a>
            </Space>
        ),
    },
];

const OrderList = ({ onSelectId }) => {
    const [current, setCurrent] = useState<number>(0);
    const { orders, pagination, loadOrders } = useOrder();


    const data: Order[] = orders.map((order) => ({
        ...order,
        key: order.orderId,
        description: {
            name: order.name
        },
        onClick: (item) => onSelectId(item.orderId)
    }));


    useEffect(() => {
        loadOrders(1)
        setCurrent(pagination.currentPage);
    }, []);

    const onChange: PaginationProps['onChange'] = (page) => {
        loadOrders(page)
    }

    return (
        <div className={styles.container}>
            <Table<Order>
                columns={columns}
                dataSource={data}
                pagination={false}
                expandable={{
                    expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description?.name}</p>,
                    rowExpandable: (record) => record.description?.name !== "Not Expandable"
                }}
                
            />

            <div className={styles.pagination}>
                <Pagination
                    defaultCurrent={current}
                    onChange={onChange}
                    total={pagination.totalPages * 10} />
            </div>
        </div>
    );
};

export default OrderList;