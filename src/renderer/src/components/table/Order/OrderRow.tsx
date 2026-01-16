import { useState } from 'react';
import useOrderContext from '@renderer/hook/useOrders';
import styles from './OrderRow.module.css';

const OrderRow = ({ order, handleSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { orderItems } = useOrderContext();

  const items = orderItems[order.orderId] || [];

  return (
    <>
      <tr onClick={() => setIsExpanded(!isExpanded)} className={styles.mainRow}>
        <td>{order.orderId}</td>
        <td>{order.reference}</td>
        <td>{order.totalPrice.toFixed(2)}</td>
        <td>{(order.profitability * 100).toFixed(2)}%</td>
        <td data-status={order.status} className={styles.statusCell}>{order.status}</td>
        <td><button onClick={(e) => {
          e.stopPropagation();
          handleSelect(order);
        }}>
          Editar
        </button></td>
      </tr>

      {isExpanded && (
        <tr className={styles.detailRow}>
          <td colSpan={6}>
            <div className={styles.itemsContainer}>
              <h4>Itens do Pedido</h4>
              <ul>
                {items.length > 0 ? (
                  items.map(item => (
                    <li key={item.orderItemId}>
                      Produto ID: {item.productId} | Qtd: {item.amount} | Preço Unidade: R$ {item.finalPrice} | Preço Unidade + BV: R$ {(item.finalPriceBV).toFixed(2)} | Desconto: {(item.discount).toFixed(0)} %
                    </li>
                  ))
                ) : (
                  <li>Nenhum item encontrado.</li>
                )}
              </ul>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default OrderRow;