import React from 'react'
import S from './categories.module.css'
import fav from '../../img/heart.svg'
import { CategoryItem } from './CategoryItem';
import { categories } from '../../mocks/categories';


export function Categories() {

   const allCategories = categories.map((item, i) => {
      return <CategoryItem key={item.id} data={item} index={i + 1} />
   })

   return (
      <div className={S.category_wrapper}>
         <div className={S.favourites}>
            <img className={S.fav_img} src={fav} alt="избранное" />
            <p className={S.favTitle}>Избранное</p>
         </div>
         <hr className={S.horLine} />
         <div className={S.fav}>
            {allCategories}
         </div>
      </div>
   )
}