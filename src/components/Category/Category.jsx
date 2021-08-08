import React from 'react'
import S from './Category.module.css'
import { CategoryItem } from './CategoryItem';
import { categories } from '../../mocks/categories';


export function Categories({onChangeCategory}) {

  const handlerChangeCategory = (name) => {
        onChangeCategory(name);
  }

  const allCategories = categories.map((item, i) => {
      return <CategoryItem
                key={item.id}
                data={item}
                index={i + 1}
                onChangeCategory={handlerChangeCategory}
      />
  })

  return (
      <nav className={S.category_wrapper}>
         {allCategories}
      </nav>
  )
}
