import styles from "./Menu.module.css"

import BarCode from "@renderer/assets/icons/BarCode"
import BoxIcon from "@renderer/assets/icons/BoxIcon"
import OrderPendingIcon from "@renderer/assets/icons/OrderPending"

const Menu = ({setActiveForm}) => {
  return (
    <nav className={styles.menu}>
        <ul>
            <li onClick={() => setActiveForm("orderPending")}>
                <OrderPendingIcon />
            </li>
            <li onClick={() => setActiveForm("product")}>
                <BarCode />
            </li>
            <li onClick={() => setActiveForm("order")}>
                <BoxIcon />
            </li>
        </ul>
    </nav>
  )
}

export default Menu
