import useOrder from "@renderer/hook/useOrders"
import useProduct from "@renderer/hook/useProduct"


import styles from "./TableOrder.module.css"
import { useMemo } from "react";

const TableOrder = ({ onSelect, onSelectId }) => {
    const orders = useOrder();
    const products = useProduct();

    const productMap = useMemo(() => {
        const map: Record<string, any> = {};

        products.products.forEach((product) => {
            map[product.productId] = product;
        });

        return map;
    }, [products.products]);


    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.title}>
                        <th>Produto</th>
                        <th>Referência</th>
                        <th>Quantidade</th>
                        <th>Preço Final</th>
                        <th>Preço Final BV</th>
                        <th>Custo</th>
                        <th>Customização</th>
                        <th>Log</th>
                        <th>Desconto</th>
                        <th>Preço Total</th>
                        <th>Preço Total+BV</th>
                        <th>Rentabilidade</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.orders.map(order =>
                        <tr key={order.orderId}
                            onClick={() => {
                                onSelect(order),
                                    onSelectId(order.orderId)
                            }}>

                            <td>
                                {productMap[order.productId]?.name ?? "-"}
                            </td>


                            <td>{order.reference}</td>
                            <td>{order.amount}</td>
                            <td>{order.finalPrice}</td>
                            <td>{order.finalPriceBV}</td>
                            <td>{order.cost}</td>
                            <td>{order.customization}</td>
                            <td>{order.log}</td>
                            <td>{order.discount}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.totalPriceBV}</td>
                            <td>{order.profitability}</td>
                            <td>{order.status}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default TableOrder
