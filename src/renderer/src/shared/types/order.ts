type Order = {
    orderId: number;

    productId: string;
    reference: string;

    amount: number;
    finalPrice: number;
    finalPriceBV?: number | null;

    cost: number;
    customization: number;
    log: number;
    discount: number;

    totalPrice?: number | null;
    totalPriceBV?: number | null;
    profitability?: number | null;

    status: "pendente" | "finalizado" | "enviado";
};

export default Order;