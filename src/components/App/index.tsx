import React from "react";

import {Header} from "../Header/Header";
import {Table} from "../Table/Table";

import S from './styles.module.css'

export const App: React.FC = () => {
  return (
    <div className={S.app}>
        <Header />
        <Table />
    </div>
  )
}
