import React, {useEffect} from 'react'
import {observer} from 'mobx-react'

import {mainStore} from '../../stores'

import {Header} from '../Header'
import {Table} from '../Table'
import {Loader} from '../Loader'

import S from './styles.module.css'
import {api} from '../../api'

export const App: React.FC = observer(() => {
  useEffect(() => {
    mainStore.fetchData('Launches')
    mainStore.fetchData('Rockets')
  }, [])

  const loader = api.errorMessage ? (
    <div className={S.error_message}>
      {api.errorMessage}
    </div>
  ) : (
    <Loader />
  )

  return (
    <div className={S.app}>
      <Header />
      {mainStore.currentData.length === 0 ? (
        loader
      ) : (
        <Table />
      )}
    </div>
  )
})
