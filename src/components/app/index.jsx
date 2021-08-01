import Header from "../header/header";

import S from './styles.module.css'

export default function App() {
  return (
    <div className={S.app}>
        <Header />
        <main className={S.main}>
            <div className={S.categories}>Categories</div>
            <div className={S.table}>Table</div>
        </main>
    </div>
  )
}
