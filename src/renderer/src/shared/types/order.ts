type Order = {
    orderId: number;
    reference: string;
    totalPrice?: number | null;
    totalPriceBV?: number | null;
    profitability?: number | null;
    status: "pendente" | "finalizado" | "enviado";
};

export default Order;