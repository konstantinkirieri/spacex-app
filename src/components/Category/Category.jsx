import React from 'react'
import S from './styles.module.css'
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
         <div
               className={S.item}
               onClick={() => onChangeCategory(null)}
         >
            Favorites <div className={S.like}><i className="fas fa-heart"></i></div>
         </div>
         {allCategories}
      </nav>
   )
}