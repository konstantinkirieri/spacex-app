import React, {useState} from 'react'
import {observer} from 'mobx-react'

import {mainStore} from '../../stores'

import {Categories} from '../Category'
import {List} from '../List'
import {Description} from '../Description'

import S from './styles.module.css'

const getWidth = (): number => {
  return window.innerWidth
}

export const Table: React.FC<any> = observer(() => {
  const [listStyle, setListStyle] = useState({})
  const [visibleDescription, setVisibleDescription] = useState(false)

  // const handlerClickItem = (id: null | string): void => {
  //   if (getWidth() < 750) {
  //     setListStyle({display: 'none'})
  //   }
  //   setVisibleDescription(true)
  // }

  const handleGoBack = (): void => {
    setListStyle({display: 'flex'})
    setVisibleDescription(false)
  }

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
      <div className={S.list} onScroll={scrollDiv} style={listStyle}>
        <List />
      </div>
      {(getWidth() > 750 || visibleDescription) && (
        <div className={S.description}>
          <Description onGoBack={handleGoBack} />
        </div>
      )}
    </main>
  )
})
