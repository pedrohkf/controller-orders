import styles from "./App.module.css"
import Routes from "./components/routes/Routes"

function App(): React.JSX.Element {
  return (
    <div className={styles.container}>
      <Routes />
    </div>
  )
}

export default App
