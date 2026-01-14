import { useState } from "react";
import { Form } from "../form/FormController";

import styles from "./PageController.module.css"
import TableOrder from "../table/TableOrder";
import TableProduct from "../table/TableProduct";
import Menu from "../menu/Menu";

type ActiveForm = "orderPendidng" | "product" | "order";

const PageController = () => {
  const [activeForm, setActiveForm] = useState<ActiveForm>("orderPendidng");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  return (
    <div className={styles.container}>
      <Menu setActiveForm={setActiveForm} />
      <div className={styles.content}>
        <Form
          activeForm={activeForm}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          productId={selectedProductId}
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          selectedOrderId={selectedOrderId}
        />
        <div className={styles.tables}>
          {activeForm == "order" && <TableOrder onSelect={setSelectedOrder} onSelectId={setSelectedOrderId} />}
          {activeForm == "product" && <TableProduct onSelect={setSelectedProduct} onSelectId={setSelectedProductId} />}
        </div>
            </div>
      </div>
  )
}

export default PageController
