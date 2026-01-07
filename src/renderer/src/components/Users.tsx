import styles from "./User.module.css"
import useUser from '@renderer/hook/useUsers';

const Users = () => {
    const users = useUser();

    return (
        <div className={styles.content}>
            {users.users.map(user =>
                <p key={user.name}>{user.name}</p>
            )}
        </div>
    )
}

export default Users
