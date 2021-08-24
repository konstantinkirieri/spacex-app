import React from 'react'
import {observer} from 'mobx-react'

import {searchStore} from '../../../stores'
import {categories} from '../../Category/categories'
import S from '../styles.module.css'

export const Search = observer(() => {
  return (
    <div className={S.search}>
      <input
        type="text"
        value={
          !searchStore.keyword ? '' : searchStore.keyword
        }
        onChange={(e) =>
          searchStore.addKeyword(e.target.value)
        }
      />

      <select
        value={searchStore.filterCategory}
        onChange={(e: React.ChangeEvent<{value: string}>) =>
          searchStore.changeFilterCategory(
            e.target.value as string
          )
        }>
        <option key={'000'} value="">
          All
        </option>
        {categories.map((item) => {
          return (
            item.name !== 'Favorites' && (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            )
          )
        })}
      </select>
    </div>
  )
})
