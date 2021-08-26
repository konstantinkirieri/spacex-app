import React from 'react'
import {observer} from 'mobx-react'

import {mainStore} from '../../stores'

import {Categories} from '../Category'
import {List} from '../List'
import {Description} from '../Description'

import S from './styles.module.css'

export const Table: React.FC = observer(() => {
<<<<<<< HEAD
  const handleScrollDiv = (e: any): void => {
=======
  const handleScrollDiv = (e: React.SyntheticEvent<HTMLDivElement>) => {
>>>>>>> hhh
    if (
      e.currentTarget.offsetHeight + e.currentTarget.scrollTop === e.currentTarget.scrollHeight
    ) {
      mainStore.loadMoreLaunches()
    }
  }

  return (
    <main className={S.main}>
      <Categories />
      <div
        className={`${S.list} ${
          mainStore.sidebarIsOpen
            ? S.sidebar_open
            : S.sidebar_close
        }`}
        onScroll={handleScrollDiv}>
        <List />
      </div>
      <Description />
    </main>
  )
})
