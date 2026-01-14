import styles from "./FormOrder.module.css"

import useOrderContext from '@renderer/hook/useOrders';
import { useEffect, useState } from 'react'
import ProductFieldset from "./FieldSet/ProductFieldset";

const emptyOrderItem = () => ({
  product: "",
  amount: 1,
  price: 0,
  cost: 0,
  customization: 0,
  log: 0,
  discount: 0
});

const FormOrder = ({ item, setItem }) => {
  const [status, setStatus] = useState<string>("pendente");
  const [currentOrderId, setCurrentOrderId] = useState<number | null>(null);
  const [orderItems, setOrderItems] = useState([emptyOrderItem()]);

  const order = useOrderContext();

  const addProduct = () => setOrderItems(prev => [...prev, emptyOrderItem()]);
  const updateOrderItem = (index: number, key: string, value: any) => {
    setOrderItems(prev => {
      const newItems = [...prev];
      newItems[index][key] = value;
      return newItems;
    });
  };
  const removeProduct = (index: number) => setOrderItems(prev => prev.filter((_, i) => i !== index));

  function resetOrderItems() {
    setOrderItems([emptyOrderItem()]);
    setItem(null);
  }

  useEffect(() => {
    const initOrder = async () => {
      const newOrderId = await order.createOrder("TEMP", 0, 0, 0, status);
      setCurrentOrderId(newOrderId);
    }
    initOrder();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!currentOrderId) return;

    await Promise.all(
      orderItems.map((orderItem) =>
        order.createOrderItem(
          Number(currentOrderId),
          orderItem.product,
          orderItem.amount,
          orderItem.price,
          orderItem.price,
          orderItem.cost,
          orderItem.customization,
          orderItem.log,
          orderItem.discount
        )
      )
    )

    resetOrderItems();

    if (item) {
      // order.editOrder(product, reference, amount, price, finalPriceBV, cost, customization, log, discount, totalPrice, totalPriceBV, rentabilidade, status, orderId);
      // resetsInputs()
      // setItem(null);

    } else {

    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Cadastrar Pedido</h2>

      <p className={styles.titleLine}>Produtos</p>

      <div className={styles.products}>
        {orderItems.map((item, index) =>
          <ProductFieldset
            item={item}
            index={index}
            updateOrderItem={updateOrderItem}
            removeProduct={() => removeProduct(index)} />
        )}
      </div>

      <button type="button" onClick={addProduct}>Adicionar Produto</button>

      <p className={styles.titleLine}>TOTAIS E RENTABILIDADE</p>
      {/* <div className={styles.rowTotals}>
        <label htmlFor="ref">Referência<input type="" placeholder="Referência" value={reference} onChange={(e) => setReference(e.target.value)} /></label>
        <label htmlFor="precoTotal">Preço Final BV<input type="number" disabled placeholder="Preço Total" value={finalPriceBV} /></label>
        <label htmlFor="precoTotalSBV">Preço Total S/BV<input type="number" disabled placeholder="Preço Total S/BV" value={totalPrice} /></label>
        <label htmlFor="precoTotalBV">Preço Total S/BV<input type="number" disabled placeholder="Preço Total BV" value={totalPriceBV} /></label>
      </div>

      <div className={styles.rowTotals}>
        <label htmlFor="rentabilidade%">Rentabilidade %<input type="text" disabled placeholder="Rentabilidade %" value={rentabilidadePorcent + " %"} /></label>
        <label htmlFor="rentabilidade">Rentabilidade<input type="number" disabled placeholder="Rentabilidade" value={rentabilidade} /></label>
      </div> */}

      <p className={styles.titleLine}>STATUS</p>
      <div className={styles.rowStatus}>
        <select name="" id="" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="" >Selecione um status</option>
          <option value="pendente" >pendente</option>
          <option value="enviado" >enviado</option>
          <option value="finalizado">finalizado</option>
        </select>
      </div>

      <button type="submit">Enviar</button>
    </form>
  )
}

export default FormOrder
