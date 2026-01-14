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

const FormOrder = ({ item, setItem, selectedOrderId }) => {
  const [reference, setReference] = useState<string>("");
  const [status, setStatus] = useState<string>("pendente");
  const [currentOrderId, setCurrentOrderId] = useState<number | null>(null);
  const [orderItems, setOrderItems] = useState([emptyOrderItem()]);

  const [totals, setTotals] = useState({
    totalPrice: 0,
    totalPriceBV: 0,
    finalPriceBV: 0,
    rentabilidadePorcent: 0,
    rentabilidade: 0
  });


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
      const newOrderId = await order.createOrder(reference, 0, 0, 0, status);
      setCurrentOrderId(newOrderId);
    }
    initOrder();
  }, []);

  useEffect(() => {
    const getOrder = await order.loadOrders();
  })


  useEffect(() => {
    const rentabilidadeInfo = 0.30;
    const imposto = 0.13;
    const over = 0.20;
    const bv = 0;
    const commision = 0;

    let totalCost = 0;
    let totalCustomization = 0;
    let totalLog = 0;
    let totalDiscount = 0;
    let totalAmount = 0;
    let totalPriceBase = 0;

    orderItems.forEach(item => {
      totalCost += item.amount * item.cost;
      totalCustomization += item.amount * item.customization;
      totalLog += item.amount * item.log;
      totalDiscount += item.amount * item.discount;
      totalAmount += item.amount;
      totalPriceBase += item.amount * item.price;
    });

    const finalPriceBV = (((totalCost + totalCustomization + totalLog) * (1 + rentabilidadeInfo) * (1 + imposto) * (1 + over)) * (1 - (totalDiscount / 100)) * (1 + bv + commision));
    const totalPrice = totalPriceBase;
    const totalPriceBV = finalPriceBV * totalAmount;
    const rentabilidadePorcent = ((totalPriceBase / ((totalCost + totalCustomization + totalLog) * (1 + imposto) * (1 + over)) - 1) * 100);
    const rentabilidade = (rentabilidadePorcent / 100) * totalPriceBase;

    setTotals({
      totalPrice,
      totalPriceBV,
      finalPriceBV,
      rentabilidadePorcent,
      rentabilidade
    });

  }, [orderItems]);

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

    order.editOrder(
      currentOrderId,
      reference,
      totals.totalPrice,
      totals.totalPriceBV,
      totals.rentabilidade,
      status
    );

    resetOrderItems();

    if (item) {
      // order.editOrder(product, reference, amount, price, finalPriceBV, cost, customization, log, discount, totalPrice, totalPriceBV, rentabilidade, status, orderId);
      // resetsInputs()
      // setItem(null);

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
      <label htmlFor="ref">Referência<input type="" placeholder="Referência" value={reference} onChange={(e) => setReference(e.target.value)} /></label>
      <div className={styles.rowTotals}>
        <label htmlFor="totalPrice"><input type="number" disabled value={totals.totalPrice.toFixed(2)} /></label>
        <input type="number" disabled value={totals.totalPriceBV.toFixed(2)} />

      </div>

      <div className={styles.rowTotals}>
        <input type="text" disabled value={totals.rentabilidadePorcent.toFixed(2) + " %"} />
        <input type="number" disabled value={totals.rentabilidade.toFixed(2)} />
        <input type="number" disabled value={totals.finalPriceBV.toFixed(2)} />
      </div>

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
