import UserContext from '@renderer/context/UserContext';
import { useEffect, useState } from 'react'

type User = {
    name: string;
}

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState<User[]>([])

    const loadUsers = async () => {
        const users = await window.electron.ipcRenderer.invoke("user:list");
        setUsers(users)
    }

     const createUser = async (name: string) => {
        await window.electron.ipcRenderer.invoke("user:create", {
            name
        })

        setUsers(users)
        loadUsers()
    }

    useEffect(() => {
        loadUsers();
    }, [])

    const value = {users, createUser};

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
