import React from 'react'
import {observer} from 'mobx-react'

import {Header} from '../Header'
import {Table} from '../Table'

import S from './styles.module.css'

export const App: React.FC = observer(() => {
  return (
    <div className={S.app}>
      <Header />
      <Table />
    </div>
  )
})
