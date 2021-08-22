import React, {useState} from 'react'
import {observer} from 'mobx-react'

import {launchesStore, rocketsStore} from '../../stores'

import {Categories} from '../Category'
import {List} from '../List'
import {Description} from '../Description'

import {CircularProgress} from '@material-ui/core'
import S from './styles.module.css'

const getWidth = (): number => {
  return window.innerWidth
}

export const Table: React.FC<any> = observer(() => {

  const [listStyle, setListStyle] = useState({})
  const [visibleDescription, setVisibleDescription] = useState(false)

  // const handlerClickItem = (id: null | string): void => {
  //   setSelectedItemId(id)
  //   getCurrentData()
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
    if (e.target.offsetHeight + e.target.scrollTop === e.target.scrollHeight) {
      launchesStore.loadLaunches()
    }
  }

  return (
    <main className={S.main}>
      <Categories />
      <div className={S.list} onScroll={scrollDiv} style={listStyle}>
        {launchesStore.launchesDataStore.length === 0 ||
        rocketsStore.rocketsDataStore.length === 0 ? (
          <CircularProgress />
        ) : (
          <List />
        )}
      </div>
      {(getWidth() > 750 || visibleDescription) && (
        <div className={S.description}>
          {launchesStore.launchesDataStore.length === 0 ?
            (<CircularProgress key={0} />) :
            (<Description onGoBack={handleGoBack} />)
          }
        </div>
      )}
    </main>
  )
})
