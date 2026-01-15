import styles from "./FormOrder.module.css"

import useOrderContext from '@renderer/hook/useOrders';
import { useEffect, useState } from 'react'
import ProductFieldset from "./FieldSet/ProductFieldset";

const createEmptyItem = () => ({
  productId: 0,
  amount: 1,
  finalPrice: 0,
  cost: 0,
  customization: 0,
  log: 0,
  discount: 0
});

const FormOrder = ({ selectedOrderId, setSelectedOrderId }) => {
  const { saveOrder, orders, orderItems } = useOrderContext();

  const [reference, setReference] = useState<string>("");
  const [status, setStatus] = useState<string>("pendente");
  const [items, setItems] = useState([createEmptyItem()]);

  useEffect(() => {
    if(selectedOrderId) {
      const orderToEdit = orders.find(o => o.orderId === selectedOrderId);
      const savedItems = orderItems[selectedOrderId];

      if(orderToEdit){
        setReference(orderToEdit.reference);
        setStatus(orderToEdit.status);
      }

      if(savedItems && savedItems.length > 0){
        setItems(savedItems)
      } else {
        resetForm();
      }
    }
  }, [selectedOrderId, orders, orderItems]);

  const resetForm = () => {
    setReference("");
    setStatus("pendente");
    setItems([createEmptyItem()]);
    setSelectedOrderId(null)
  };

  const addProduct = () => setItems(prev => [...prev, createEmptyItem()]);

  const removeProduct = (index: number) => {
    if (items.length > 1) {
      setItems(prev => prev.filter((_, i) => i !== index));
    } else {
      setItems([createEmptyItem()]);
    }
  };

  const updateOrderItem = (index: number, key: string, value: any) => {
    setItems(prev => {
      const newItems = [...prev];
      newItems[index] = { ...newItems[index], [key]: value };
      return newItems;
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!reference.trim()) {
      alert("Por favor, insira uma referência.");
      return;
    }

    const payload = {
      orderId: selectedOrderId || undefined,
      reference,
      status,
      profitability: 0,
      items: items.map(item => ({
        productId: Number(item.productId),
        amount: Number(item.amount),
        finalPrice: Number(item.finalPrice),
        cost: Number(item.cost),
        customization: Number(item.customization),
        log: Number(item.log),
        discount: Number(item.discount),
      }))
    };

    try {
      const result = await saveOrder(payload);
      if (result.success) {
        alert("Pedido salvo");
        setItems([createEmptyItem()]);
        resetForm();
      }
    } catch (error) {
      console.log(error);
      alert("Erro ao salvar");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>{selectedOrderId ? "Editar Pedido" : "Cadastrar Pedido"}</h2>

      <p className={styles.titleLine}>Produtos</p>

      <div className={styles.products}>
        {items.map((item, index) =>
          <ProductFieldset
            item={item}
            index={index}
            updateOrderItem={updateOrderItem}
            removeProduct={() => removeProduct(index)} />
        )}
      </div>

      <button type="button" onClick={addProduct}>Adicionar Produto</button>

      <label htmlFor="ref">Referência<input type="" placeholder="Referência" value={reference} onChange={(e) => setReference(e.target.value)} /></label>

      <p className={styles.titleLine}>TOTAIS E RENTABILIDADE</p>
      
      {/* <div className={styles.rowTotals}>
        <label htmlFor="totalPrice"><input type="number" disabled value={totals.totalPrice.toFixed(2)} /></label>
        <input type="number" disabled value={totals.totalPriceBV.toFixed(2)} />

      </div>

      <div className={styles.rowTotals}>
        <input type="text" disabled value={totals.rentabilidadePorcent.toFixed(2) + " %"} />
        <input type="number" disabled value={totals.rentabilidade.toFixed(2)} />
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
      <button type="button" onClick={resetForm}>Cancelar</button>
    </form>
  )
}

export default FormOrder
