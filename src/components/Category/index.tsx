import React from 'react'
import S from './styles.module.css'
import {categories} from './categories'
import {favoritesStore, mainStore} from '../../stores'
import {observer} from 'mobx-react'

export const Categories: React.FC = observer(() => {
  return (
    <nav className={S.category_wrapper}>
      {categories.map(
        (item: {name: string; id: number}) => {
          return (
            <div
              key={item.id}
              className={`${S.item} ${
                mainStore.currentCategory === item.name &&
                S.item_active
              }`}
              onClick={() => {
                mainStore.changeCategory = item.name
                mainStore.toggleSidebar(true)
              }}>
              {item.name}{' '}
              {item.name === 'Favorites' && (
                <span className={S.favorites_count}>
                  {favoritesStore.favoritesDataStore.length}
                </span>
              )}
            </div>
          )
        }
      )}
    </nav>
  )
})
