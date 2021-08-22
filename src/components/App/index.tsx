import React, {useEffect} from 'react'

import {Header} from '../Header'
import {Table} from '../Table'

import S from './styles.module.css'
import {mainStore} from '../../stores'
import {CircularProgress} from '@material-ui/core'
import {observer} from 'mobx-react'

export const App: React.FC = observer(() => {
  useEffect(() => {
    mainStore.fetchData('Launches')
    mainStore.fetchData('Rockets')
  }, [])

  return (
    <div className={S.app}>
      <Header />
      {mainStore.launchesItems.length === 0 || mainStore.rocketsItems.length === 0 ?
        (<CircularProgress />) :
        (<Table />)
      }
    </div>
  )
})
