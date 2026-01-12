import styles from "./FormOrder.module.css"

import useOrderContext from '@renderer/hook/useOrders';
import useProductContext from '@renderer/hook/useProduct';
import { useEffect, useState } from 'react'

const FormOrder = ({ item, setItem, orderId }) => {
  const [product, setProduct] = useState<string>("");
  const [reference, setReference] = useState<string>("");
  const [amount, setAmount] = useState<number>();
  const [price, setPrice] = useState<number>();
  const [cost, setCost] = useState<number>();
  const [customization, setCustomization] = useState<number>();
  const [log, setLog] = useState<number>();
  const [discount, setDiscount] = useState<number>();

  const [status, setStatus] = useState<string>();

  const order = useOrderContext();
  const listProducts = useProductContext();

  const rentabilidadeInfo = 0.30;
  const imposto = 0.13;
  const over = 0.20;
  const bv = 0;
  const commision = 0;

  const finalPriceBV = (((cost + customization + log) * (1 + rentabilidadeInfo) * (1 + imposto) * (1 + over)) * (1 - (discount / 100)) * (1 + bv + commision)).toFixed(2);
  const totalPrice = (amount * price).toFixed(2);
  const totalPriceBV = (finalPriceBV * amount).toFixed(2);
  const rentabilidadePorcent = (((price / ((cost + customization + log) * (1 + imposto) * (1 + over))) - 1) * 100).toFixed(2);
  const rentabilidade = ((rentabilidadePorcent / 100) * price * amount).toFixed(2);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (item) {
      order.editOrder(product, reference, amount, price, finalPriceBV, cost, customization, log, discount, totalPrice, totalPriceBV, rentabilidade, status, orderId);
      setProduct("")
      setReference("")
      setAmount(0)
      setPrice(0)
      setCost(0)
      setCustomization(0)
      setLog(0)
      setDiscount(0)
      setItem(null);
    } else {
      order.createOrder(product, reference, amount, price, finalPriceBV, cost, customization, log, discount, totalPrice, totalPriceBV, rentabilidade, status);
      setProduct("")
      setReference("")
      setAmount(0)
      setPrice(0)
      setCost(0)
      setCustomization(0)
      setLog(0)
      setDiscount(0)
      setItem(null);
    }
  }

  const handleClick = ((e: any) => {
    const allowedTags = ["INPUT", "LABEL", "H3", "BUTTON", "SELECT"]


    const tag = e.target.tagName;
    console.log(tag)

    if (!allowedTags.includes(tag)) {
      console.log(tag)
      setProduct("")
      setReference("")
      setAmount(0)
      setPrice(0)
      setCost(0)
      setCustomization(0)
      setLog(0)
      setDiscount(0)
      setStatus("")
      setItem(null);
    }


  })

  useEffect(() => {
    if (item) {
      setProduct(item.productId)
      setReference(item.reference)
      setAmount(item.amount)
      setPrice(item.finalPrice)
      setCost(item.cost)
      setCustomization(item.customization)
      setLog(item.log)
      setDiscount(item.discount)
      setStatus(item.status)
    } else {
      setProduct("")
      setReference("")
      setAmount(0)
      setPrice(0)
      setCost(0)
      setCustomization(0)
      setLog(0)
      setDiscount(0);
      setStatus("")
      setItem(null);
    }
  }, [item]);

  return (
    <form onSubmit={handleSubmit} className={styles.form} onClick={handleClick}>
      <h3>Cadastrar Pedido</h3>
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
          <input type="number" placeholder="Preço" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
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
        <label htmlFor="precoTotal">Preço Final BV<input type="number" disabled placeholder="Preço Total" value={finalPriceBV} /></label>
        <label htmlFor="precoTotalSBV">Preço Total S/BV<input type="number" disabled placeholder="Preço Total S/BV" value={totalPrice} /></label>
        <label htmlFor="precoTotalBV">Preço Total S/BV<input type="number" disabled placeholder="Preço Total BV" value={totalPriceBV} /></label>
      </div>

      <div className={styles.rowTotals}>
        <label htmlFor="rentabilidade%">Rentabilidade %<input type="text" disabled placeholder="Rentabilidade %" value={rentabilidadePorcent + " %"} /></label>
        <label htmlFor="rentabilidade">Rentabilidade<input type="number" disabled placeholder="Rentabilidade" value={rentabilidade} /></label>
      </div>

      <p className={styles.titleLine}>STATUS</p>
      <div className={styles.rowStatus}>
        <select name="" id="" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="" >Selecione um produto</option>
          <option value="pendente" >pendente</option>
          <option value="enviado" >enviado</option>
          <option value="finalizado">finalizado</option>
        </select>
      </div>

      <button>Enviar</button>
    </form>
  )
}

export default FormOrder
