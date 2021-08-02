import Header from "../header/header";
import Table from "../table/table";

import S from './styles.module.css'

export default function App() {
  return (
    <div className={S.app}>
        <Header />
        <Table />
    </div>
  )
}
