import React from 'react'
import {observer} from 'mobx-react'

import {mainStore} from '../../stores'

import {Categories} from '../Category'
import {List} from '../List'
import {Description} from '../Description'

import S from './styles.module.css'

export const Table: React.FC<any> = observer(() => {
  function scrollDiv(e: any) {
    if (
      Math.floor(e.target.offsetHeight + e.target.scrollTop) ===
      e.target.scrollHeight
    ) {
      mainStore.loadMoreLaunches()
    }
  }

  return (
    <main className={S.main}>
      <Categories />
      <div
        className={`${S.list} ${
          mainStore.sidebarIsOpen ? S.sidebar_open : S.sidebar_close
        }`}
        onScroll={scrollDiv}>
        <List />
      </div>
      <Description />
    </main>
  )
})
