import React from 'react'
import S from './styles.module.css'
import {mainStore} from '../../stores'
import {observer} from 'mobx-react'
import {api} from '../../api'

export const Header: React.FC = observer(() => {
  return (
    <header className={S.header}>
      <button
        className={S.button_burger}
        onClick={() => {
          mainStore.sidebarIsOpen
            ? mainStore.toggleSidebar(false)
            : mainStore.toggleSidebar(true)
        }}>
        {mainStore.sidebarIsOpen ? (
          <i className="fas fa-times" />
        ) : (
          <i className="fas fa-bars" />
        )}
      </button>
      <h1 className={S.headerTitle}>
        <i className="fas fa-space-shuttle" />
        SpaceX App
      </h1>
      <div className={S.launches_stats}>
        <p>Launches: {api.totalLaunches}</p>
        <p>Rockets: {api.totalRockets}</p>
      </div>
    </header>
  )
})
