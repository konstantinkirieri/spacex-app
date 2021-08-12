import React from 'react'
import S from './Category.module.css'
import { CategoryItem } from './CategoryItem';
import { categories } from '../../mocks/categories';


export const Categories: React.FC<{onChangeCategory: (name: string) => void}> = ({onChangeCategory}) => {
  const allCategories = categories.map((item) => {
      return <CategoryItem
                key={item.id}
                data={item}
                onChangeCategory={onChangeCategory}
             />
  })

  return (
      <nav className={S.category_wrapper}>
         {allCategories}
      </nav>
  )
}
