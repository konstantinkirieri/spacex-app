import React, {useEffect} from 'react'

import {Header} from '../Header'
import {Table} from '../Table'

import S from './styles.module.css'
import {main} from '../../stores'
import {CircularProgress} from '@material-ui/core'
import {observer} from 'mobx-react'

export const App: React.FC = observer(() => {
  useEffect(() => {
    main.fetchData('Launches')
    main.fetchData('Rockets')
  }, [])

  return (
    <div className={S.app}>
      <Header />
      {main.launchesItems.length === 0 || main.rocketsItems.length === 0 ?
        (<CircularProgress />) :
        (<Table />)
      }
    </div>
  )
})
