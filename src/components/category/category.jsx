import React from 'react'
import S from './categories.module.css'
import fav from '../../img/heart.svg'
import { CategoryItem } from './CategoryItem';


export function Categories() {

   const categories = [
      { id: 1, name: "Capsules", endpoint: "./capsules" },
      { id: 2, name: "Rockets", endpoint: "./rockets" },
      { id: 3, name: "Ships", endpoint: "./ships" },
      { id: 4, name: "Launches", endpoint: "./launches" },
   ]


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