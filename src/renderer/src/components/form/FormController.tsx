import styles from "./FormController.module.css";

import FormProduct from "./FormProduct";
import FormClient from "./FormClient";
import FormOrder from "./FormOrder";

export const Form = ({ activeForm, selectedProduct, setSelectedProduct, productId, setSelectedOrderId,selectedOrderId }) => {
    return (
        <div className={styles.content}>
            <div className={styles.forms}>
                {activeForm == "clientPending" && <FormClient />}
                {activeForm == "product" && <FormProduct item={selectedProduct} setItem={setSelectedProduct} productId={productId} />}
                {activeForm == "order" && <FormOrder setSelectedOrderId={setSelectedOrderId} selectedOrderId={selectedOrderId} />}
            </div>
        </div>
    )
}

