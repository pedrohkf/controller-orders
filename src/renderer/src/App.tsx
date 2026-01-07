import { Form } from "./components/Form/Form"
import Users from "./components/Users"

import styles from "./App.module.css"

function App(): React.JSX.Element {
  return (
    <div className={styles.container}>
      <Form />
      <Users />
    </div>
  )
}

export default App
