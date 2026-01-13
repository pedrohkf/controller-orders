import useOrder from "@renderer/hook/useOrders"
import useProduct from "@renderer/hook/useProduct"


import styles from "./TableOrder.module.css"
import { useMemo } from "react";

const TableOrder = ({ onSelect, onSelectId }) => {
    const { orders, orderItems } = useOrder();
    const products = useProduct();

    const productMap = useMemo(() => {
        const map = {};
        products.products.forEach(product => {
            map[product.productId] = product;
        });
        return map;
    }, [products.products]);

    return (
        <div className={styles.container}>
            {orders.map(order => {
                const itemsFromOrder = orderItems.filter(
                    item => Number(item.orderId) === Number(order.orderId)

                );

                return (
                    <div
                        key={order.orderId}
                        className={styles.card}
                        onClick={() => {
                            onSelect(order);
                            onSelectId(order.orderId);
                        }}
                    >
                        <p>Referência: {order.reference}</p>

                        {itemsFromOrder.map(item => (
                            <div key={item.orderItemId}>
                                <p>Produto: {productMap[item.productId]?.name ?? "-"}</p>
                                <p>Qtd: {item.amount}</p>
                                <p>Custo: {item.cost}</p>
                            </div>
                        ))}

                        <p>Total: {order.totalPrice}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default TableOrder;