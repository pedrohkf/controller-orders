import styles from "./FormController.module.css";

import FormProduct from "./FormProduct";
import FormOrder from "./FormOrder";

import { ActiveForm } from "@renderer/shared/enums/Globals";

export const Form = ({ activeForm, selectedProduct, setSelectedProduct, productId, setSelectedOrderId,selectedOrderId }) => {
    return (
        <div className={activeForm == ActiveForm.PENDING ? styles.displayNone : styles.content}>
            <div className={styles.forms}>
                {activeForm == ActiveForm.PRODUCT && <FormProduct item={selectedProduct} setItem={setSelectedProduct} productId={productId} />}
                {activeForm == ActiveForm.ORDER && <FormOrder setSelectedOrderId={setSelectedOrderId} selectedOrderId={selectedOrderId} />}
            </div>
        </div>
    )
}

