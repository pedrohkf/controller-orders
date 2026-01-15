import useOrderContext from "@renderer/hook/useOrders";
import { useEffect } from "react";
import OrderList from "../OrderList";

import styles from "./PendingOrders.module.css";

const PendingOrders = ({ onSelectId }) => {
    const { loadOrders } = useOrderContext();

    useEffect(() => {
        loadOrders(1, "pendente");
    }, []);

    return (
        <div className={styles.container}>
            <h3>Pedidos Pendentes</h3>
            <OrderList onSelectId={onSelectId}  />
        </div>
    );
};

export default PendingOrders;