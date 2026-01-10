import { useState } from "react";
import { Form } from "../form/FormController";

import styles from "./PageController.module.css"
import TableOrder from "../table/TableOrder";
import TableProduct from "../table/TableProduct";

type ActiveForm = "cliente" | "produto" | "pedido";

const PageController = () => {
  const [activeForm, setActiveForm] = useState<ActiveForm>("cliente");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  return (
    <div className={styles.content}>
      <Form
        activeForm={activeForm}
        setActiveForm={setActiveForm}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        productId={selectedProductId}
        selectedOrder={selectedOrder} 
        setSelectedOrder={setSelectedOrder} 
        orderId={selectedOrderId}
      />

      <div className={styles.tables}>
        {activeForm == "pedido" && <TableOrder onSelect={setSelectedOrder} onSelectId={setSelectedOrderId} />}
        {activeForm == "produto" && <TableProduct onSelect={setSelectedProduct} onSelectId={setSelectedProductId} />}
      </div>
    </div>
  )
}

export default PageController
