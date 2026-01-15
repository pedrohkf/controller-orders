type orderItem = {
    orderItemId: number;
    orderId : number;
    productId: number;
    amount: number;
    finalPrice: number;
    finalPriceBV?: number | null;
    cost: number;
    customization: number;
    log: number;
    discount: number;
    productName: string;
}

export default orderItem;
