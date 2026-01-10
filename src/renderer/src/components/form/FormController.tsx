import styles from "./FormController.module.css";

import FormProduct from "./FormProduct";
import FormClient from "./FormClient";
import FormOrder from "./FormOrder";
import UserIcon from "@renderer/assets/icons/UserIcon";
import BarCode from "@renderer/assets/icons/BarCode";
import BoxIcon from "@renderer/assets/icons/BoxIcon";

export const Form = ({ activeForm, setActiveForm, selectedProduct, setSelectedProduct, productId, setSelectedOrder, selectedOrder, orderId }) => {
    return (
        <div className={styles.content}>
            <div className={styles.menuForm}>
                <button onClick={() => void setActiveForm("cliente")}><UserIcon /></button>
                <button onClick={() => void setActiveForm("produto")}><BarCode /></button>
                <button onClick={() => void setActiveForm("pedido")}><BoxIcon /></button>
            </div>
            <div className={styles.forms}>
                {activeForm == "cliente" && <FormClient />}
                {activeForm == "produto" && <FormProduct item={selectedProduct} setItem={setSelectedProduct} productId={productId} />}
                {activeForm == "pedido" && <FormOrder item={selectedOrder} setItem={setSelectedOrder} orderId={orderId} />}
            </div>
        </div>
    )
}

