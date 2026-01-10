import styles from "./FormOrder.module.css"

import useOrderContext from '@renderer/hook/useOrders';
import useProductContext from '@renderer/hook/useProduct';
import { useEffect, useState } from 'react'

const FormOrder = ({ item, setItem, orderId }) => {
  const [product, setProduct] = useState<string>("");
  const [reference, setReference] = useState<string>("");
  const [amount, setAmount] = useState<number>();
  const [finalPrice, setFinalPrice] = useState<number>();
  const [cost, setCost] = useState<number>();
  const [customization, setCustomization] = useState<number>();
  const [log, setLog] = useState<number>();
  const [discount, setDiscount] = useState<number>();

  const [totalPrice, setTotalPrice] = useState<number>();
  const [totalPriceBV, setTotalPriceBV] = useState<number>();
  const [profitability, setProfitability] = useState<number>();

  const [status, setStatus] = useState<string>();

  const order = useOrderContext();
  const listProducts = useProductContext();

  //fazer status funcionar
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (item) {
      order.editOrder(product, reference, amount, finalPrice, cost, customization, log, discount, orderId);
      setProduct("")
      setReference("")
      setAmount(0)
      setFinalPrice(0)
      setCost(0)
      setCustomization(0)
      setLog(0)
      setDiscount(0)

      setTotalPrice(0)
      setTotalPriceBV(0)
      setProfitability(0)
      setItem(null);
    } else {
      order.createOrder(product, reference, amount, finalPrice, cost, customization, log, discount);
      setProduct("")
      setReference("")
      setAmount(0)
      setFinalPrice(0)
      setCost(0)
      setCustomization(0)
      setLog(0)
      setDiscount(0)

      setTotalPrice(0)
      setTotalPriceBV(0)
      setProfitability(0)
      setItem(null);
    }
  }

  useEffect(() => {
    if (item) {
      setProduct(item.productId)
      setReference(item.reference)
      setAmount(item.amount)
      setFinalPrice(item.finalPrice)
      setCost(item.cost)
      setCustomization(item.customization)
      setLog(item.log)
      setDiscount(item.discount)
    } else {
      setProduct("")
      setReference("")
      setAmount(0)
      setFinalPrice(0)
      setCost(0)
      setCustomization(0)
      setLog(0)
      setDiscount(0)
      setItem(null);
    }
  }, [item]);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>ORDER : {orderId}</h3>
      <p className={styles.titleLine}>IDENTIFICAÇÃO</p>
      <div className={styles.rowProducts} >
        <label htmlFor="produtos">
          Produtos
          <select value={product} onChange={(e) => setProduct(e.target.value)}>
            <option value="">Selecione um produto</option>
            {listProducts.products.map((prod) => (
              <option key={prod.productId} value={prod.productId}>
                {prod.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className={styles.titleLine}>PREÇO E DETALHES</p>

      <div className={styles.rowRef}>
        <label htmlFor="ref">Referência<input type="" placeholder="Referência" value={reference} onChange={(e) => setReference(e.target.value)} /></label>
      </div>

      <div className={styles.rowPrice}>
        <label htmlFor="quantidade">
          Quantidade
          <input type="number" placeholder="Quantidade" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        </label>
        <label htmlFor="preco">
          Preço
          <input type="number" placeholder="Preço" value={finalPrice} onChange={(e) => setFinalPrice(Number(e.target.value))} />
        </label>
      </div>

      <div className={styles.rowDetails}>

        <label htmlFor="custo">Custo <input type="number" placeholder="Custo" value={cost} onChange={(e) => setCost(Number(e.target.value))} /></label>

        <label htmlFor="cutomização">Customização <input type="number" placeholder="Valor customização" value={customization} onChange={(e) => setCustomization(Number(e.target.value))} /></label>

        <label htmlFor="log">Log<input type="string" placeholder="Log" value={log} onChange={(e) => setLog(Number(e.target.value))} /></label>
      </div>

      <div className={styles.rowDiscount}>
        <label htmlFor="desconto">Desconto<input type="number" placeholder="Desconto" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} /></label>
      </div>

      <p className={styles.titleLine}>TOTAIS E RENTABILIDADE</p>
      <div className={styles.rowTotals}>
        <label htmlFor="precoTotal">Preço Total<input type="number" disabled placeholder="Preço Total" value={totalPrice} onChange={(e) => setTotalPrice(Number(e.target.value))} /></label>
        <label htmlFor="precoTotalBV">Preço Total + BV<input type="number" disabled placeholder="Preço Total BV" value={totalPriceBV} onChange={(e) => setTotalPriceBV(Number(e.target.value))} /></label>
        <label htmlFor="rentabilidade">Rentabilidade<input type="number" disabled placeholder="Rentabilidade" value={profitability} onChange={(e) => setProfitability(Number(e.target.value))} /></label>
      </div>

      <p className={styles.titleLine}>STATUS</p>
      <div className={styles.rowStatus}>
        <select name="" id="">
          <option value="pendente">pendente</option>
          <option value="pendente">enviado</option>
          <option value="pendente">finalizado</option>
        </select>
      </div>

      <button>Enviar</button>
    </form>
  )
}

export default FormOrder
