import { useState } from "react";
import { Form } from "../form/FormController";

import styles from "./PageController.module.css"
import TableProduct from "../table/TableProduct";
import Menu from "../menu/Menu";
import OrderList from "../table/Order/OrderList";
import PendingOrders from "../table/Order/Pending/PendingOrders";

import { ActiveForm } from "@renderer/shared/enums/Globals";

const PageController = () => {
  const [activeForm, setActiveForm] = useState<ActiveForm>(ActiveForm.PENDING);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState<number>();

  return (
    <div className={styles.container}>
      <Menu setActiveForm={setActiveForm} />
      <div className={styles.content}>
        <Form
          activeForm={activeForm}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          productId={selectedProductId}
          setSelectedOrderId={setSelectedOrderId}
          selectedOrderId={selectedOrderId}
        />

        {activeForm == ActiveForm.PENDING && <PendingOrders onSelectId={setSelectedOrderId} />}
        <div className={ activeForm == ActiveForm.PENDING ? styles.displayNone : styles.tables}>
          {activeForm == ActiveForm.ORDER && <OrderList onSelectId={setSelectedOrderId} />}
          {activeForm == ActiveForm.PRODUCT && <TableProduct onSelect={setSelectedProduct} onSelectId={setSelectedProductId} />}
        </div>
      </div>
    </div>
  )
}

export default PageController
