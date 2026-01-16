type Order = {
    orderId: number;
    reference: string;
    totalPrice?: number | null;
    totalPriceBV?: number | null;
    profitability?: number | null;
    description?: {
        name: string;
    };
    onClick: (item: number) => void;
    status: "pendente" | "finalizado" | "enviado";
};

export default Order;