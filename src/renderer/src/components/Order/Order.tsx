import styles from "./Order.module.css"
import useOrder from '@renderer/hook/useOrders';

const Orders = () => {
    const orders = useOrder();

    return (
        <div className={styles.content}>
            {orders.orders.map(order =>
                <p key={order.orderId}>{order.log}</p>
            )}
        </div>
    )
}

export default Orders
