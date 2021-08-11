import Header from "../Header/Header";
import Table from "../Table/Table";

import S from './styles.module.css'

export default function App() {
  return (
    <div className={S.app}>
        <Header />
        <Table />
    </div>
  )
}
