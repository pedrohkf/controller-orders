import Trash from "@renderer/assets/icons/Trash";
import styles from "./ProductFieldset.module.css"
import useProductContext from "@renderer/hook/useProduct";

import type { InputNumberProps } from "antd";
import { Card, InputNumber, Select } from "antd";

const formatter: InputNumberProps<number>['formatter'] = (value) => {
    const [start, end] = `${value}`.split('.') || [];
    const v = `${start}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `R$ ${end ? `${v}.${end}` : `${v}`}`;
};


const ProductFieldset = ({ item, index, updateOrderItem, removeProduct }) => {
    const listProducts = useProductContext();

    const products = listProducts?.products || [];

    const handleProductChange = (value: number) => {
        updateOrderItem(index, "productId", value)
    };

    return (
        <Card title={"Produto " + (index + 1)} extra={<button type="button" id={styles.trash} onClick={() => removeProduct(index)}><Trash /></button>} className={styles.productItem}>
            <div className={styles.rowProducts}>
                <label>
                    Produto
                    <Select
                        showSearch={{
                            filterOption: (input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
                        }}
                        onChange={handleProductChange}
                        placeholder="Selecione o produto"
                        options={products.map(prod => ({
                            value: prod.productId,
                            label: prod.name
                        }))}
                    />
                </label>

                <label>
                    Quantidade
                    <input type="number" value={item.amount} onChange={e => updateOrderItem(index, "amount", Number(e.target.value))} />
                </label>

                <label>
                    Preço
                    <div>
                        <InputNumber<number>
                            value={item.finalPrice}
                            formatter={formatter}
                            parser={(value) => value?.replace(/R\$\s?|(\.*)/g, '').replace(',', '.') as unknown as number}
                            onChange={(value) => updateOrderItem(index, "finalPrice", value)}
                        />
                    </div>
                </label>
            </div>

            <div className={styles.rowDetails}>
                <label>
                    Custo
                    <div>
                        <InputNumber<number>
                            value={item.cost}
                            formatter={formatter}
                            parser={(value) => value?.replace(/R\$\s?|(\.*)/g, '').replace(',', '.') as unknown as number}
                            onChange={(value) => updateOrderItem(index, "cost", value)} />
                    </div>
                </label>

                <label>Customização
                    <div>
                        <InputNumber<number>
                            value={item.customization}
                            formatter={formatter}
                            parser={(value) => value?.replace(/R\$\s?|(\.*)/g, '').replace(',', '.') as unknown as number}
                            onChange={(value) => updateOrderItem(index, "customization", value)} />
                    </div>
                </label>

                <label>
                    Log
                    <div>
                        <InputNumber<number>
                            value={item.log}
                            formatter={formatter}
                            parser={(value) => value?.replace(/R\$\s?|(\.*)/g, '').replace(',', '.') as unknown as number}
                            onChange={(value) => updateOrderItem(index, "log", value)} />
                    </div>
                </label>

                <label>
                    Desconto
                    <div>
                        <InputNumber<number>
                            value={item.discount}
                            formatter={(value) => `${value}%`}
                            parser={(value) => value?.replace('%', '') as unknown as number}
                            onChange={(value) => updateOrderItem(index, "discount", value)} />

                    </div>
                </label>
            </div>
        </Card>
    )

};

export default ProductFieldset;