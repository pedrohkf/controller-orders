import UserContext, { UserContextType } from "@renderer/context/UserContext";
import { useContext } from "react";

export default function useUserContext(): UserContextType {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider")
    }

    return context;

}
