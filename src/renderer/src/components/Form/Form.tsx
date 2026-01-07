import { useState } from "react"
import styles from "./Form.module.css";
import useUser from "@renderer/hook/useUsers";

export const Form = () => {
    const [name, setName] = useState<string>();

    const user = useUser();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        user.createUser(name);

        setName("");
    }

    return (
        <form onSubmit={handleSubmit}  className={styles.form}>
            <input type="text" placeholder="Digite seu nome" value={name} onChange={(e) => setName(e.target.value)} />
            <button>Enviar</button>
        </form>
    )
}

