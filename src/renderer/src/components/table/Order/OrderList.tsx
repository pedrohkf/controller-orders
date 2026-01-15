import useOrder from "@renderer/hook/useOrders"

import styles from "./OrderList.module.css"
import OrderRow from "./OrderRow";
import { useEffect } from "react";

const OrderList = ({ onSelectId }) => {
    const { orders, pagination, loadOrders } = useOrder();

    useEffect(() => {
        loadOrders(1);
    }, []);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            loadOrders(newPage);
        }
    };

    const handleSelect = async (order) => {
        onSelectId(order.orderId);
    }

    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Referência</th>
                        <th>Total (R$)</th>
                        <th>Rentabilidade</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <OrderRow key={order.orderId} order={order} handleSelect={handleSelect} />
                    ))}
                </tbody>
            </table>

            <div className={styles.pagination}>
                <button
                    disabled={pagination.currentPage === 1}
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                >
                    Anterior
                </button>

                <span>Página {pagination.currentPage} de {pagination.totalPages}</span>

                <button
                    disabled={pagination.currentPage === pagination.totalPages}
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                >
                    Próxima
                </button>
            </div>
        </div>
    );
};

export default OrderList;