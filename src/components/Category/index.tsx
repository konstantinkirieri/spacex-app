import React from 'react'
import S from './styles.module.css'
import {CategoryItem} from './CategoryItem'
import {categories} from '../../mocks/categories'

export const Categories: React.FC<{
  onChangeCategory: (name: string) => void
}> = ({onChangeCategory}) => {
  return (
    <nav className={S.category_wrapper}>
      {categories.map((item: {name: string; id: number}) => {
        return (
          <CategoryItem
            key={item.id}
            data={item}
            onChangeCategory={onChangeCategory}
          />
        )
      })}
    </nav>
  )
}
