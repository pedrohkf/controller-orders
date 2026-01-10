import OrderContext, { OrderContextType } from "@renderer/context/OrderContext";
import { useContext } from "react";

export default function useOrderContext(): OrderContextType {
    const context = useContext(OrderContext);

    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider")
    }

    return context;

}
