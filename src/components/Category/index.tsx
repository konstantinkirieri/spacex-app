import React from 'react'
import S from './styles.module.css'
import {categories} from './categories'
import {mainStore} from '../../stores'
import {observer} from 'mobx-react'

export const Categories: React.FC = observer(() => {
  return (
    <nav className={S.category_wrapper}>
      {categories.map((item: {name: string; id: number}) => {
        return (
          <div
            key={item.id}
            className={`${S.item} ${
              mainStore.currentCategory === item.name && S.item_active
            }`}
            onClick={() => (mainStore.changeCategory = item.name)}>
            {item.name}
          </div>
        )
      })}
    </nav>
  )
})
