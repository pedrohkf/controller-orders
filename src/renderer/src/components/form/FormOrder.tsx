import styles from "./FormOrder.module.css"

import useOrderContext from '@renderer/hook/useOrders';
import useProductContext from '@renderer/hook/useProduct';
import { useEffect, useState } from 'react'

const FormOrder = ({ item, setItem, orderId }) => {
  const [status, setStatus] = useState<string>("pendente");
  const [currentOrderId, setCurrentOrderId] = useState<number | null>(null);

  const [itemCount, setItemCount] = useState<number>(1);
  const [orderItems, setOrderItems] = useState([
    { product: "", amount: 1, price: 0, cost: 0, customization: 0, log: 0, discount: 0 }
  ]);

  const order = useOrderContext();
  const listProducts = useProductContext();

  const addProduct = (() => {
    setItemCount(itemCount + 1)
  })

  const removeProduct = (() => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
    }
  })

  useEffect(() => {
    setOrderItems(prev => {
      const newItems = [...prev];
      while (newItems.length < itemCount) {
        newItems.push({ product: "", amount: 1, price: 0, cost: 0, customization: 0, log: 0, discount: 0 });
      }
      while (newItems.length > itemCount) {
        newItems.pop();
      }
      return newItems;
    });
  }, [itemCount]);

  useEffect(() => {
    async function initOrder() {
      const newOrderId = await order.createOrder("TEMP", 0, 0, 0, status);
      setCurrentOrderId(newOrderId);
    }

    initOrder();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!currentOrderId) {
      return
    };

    console.log(currentOrderId)

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



  function resetOrderItems() {
    setOrderItems([
      { product: "", amount: 1, price: 0, cost: 0, customization: 0, log: 0, discount: 0 }
    ]); 
    setItemCount(1);
    setItem(null);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>Cadastrar Pedido {currentOrderId}</h3>
      <p className={styles.titleLine}>{itemCount}</p>
      {orderItems.map((item, index) =>
        <div className={styles.productItem}>
          <div className={styles.rowProducts}>
            <label htmlFor="produtos">
              Produtos
              <select value={item.product} onChange={(e) => {
                const newItems = [...orderItems];
                newItems[index].product = e.target.value;
                setOrderItems(newItems);
              }}>
                <option value="">Selecione um produto</option>
                {listProducts.products.map((prod) => (
                  <option key={prod.productId} value={prod.productId}>
                    {prod.name}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="quantidade">
              Quantidade
              <input type="number" placeholder="Quantidade" value={item.amount} onChange={(e) => {
                const newItems = [...orderItems];
                newItems[index].amount = Number(e.target.value);
                setOrderItems(newItems);
              }} />
            </label>
            <label htmlFor="preco">
              Preço
              <input type="number" placeholder="Preço" value={item.price}
                onChange={(e) => {
                  const newItems = [...orderItems];
                  newItems[index].price = Number(e.target.value);
                  setOrderItems(newItems);
                }}
              />
            </label>
            <label htmlFor="">
              <button type="button" onClick={removeProduct}>Excluir</button>
            </label>
          </div>
          <div className={styles.rowPrice}>
          </div>
          <div className={styles.rowDetails}>
            <label htmlFor="custo">Custo <input type="number" placeholder="Custo" value={item.cost} onChange={(e) => {
              const newItems = [...orderItems];
              newItems[index].cost = Number(e.target.value);
              setOrderItems(newItems);
            }} /></label>

            <label htmlFor="cutomização">Personaização <input type="number" placeholder="Valor customização" value={item.customization} onChange={(e) => {
              const newItems = [...orderItems];
              newItems[index].customization = Number(e.target.value);
              setOrderItems(newItems);
            }} /></label>

            <label htmlFor="log">Log<input type="string" placeholder="Log" value={item.log} onChange={(e) => {
              const newItems = [...orderItems];
              newItems[index].log = Number(e.target.value);
              setOrderItems(newItems);
            }} /></label>

            <label htmlFor="desconto">Desconto<input type="number" placeholder="Desconto" value={item.discount} onChange={(e) => {
              const newItems = [...orderItems];
              newItems[index].discount = Number(e.target.value);
              setOrderItems(newItems);
            }} /></label>

          </div>
          <div className={styles.rowDiscount}>
          </div>
        </div>
      )}
      <button type="button" onClick={addProduct}>Adicionar Produto</button>


      {/* <div className={styles.rowRef}>
        <label htmlFor="ref">Referência<input type="" placeholder="Referência" value={reference} onChange={(e) => setReference(e.target.value)} /></label>
      </div> */}

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
