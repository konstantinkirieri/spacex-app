import React, {useEffect, useState} from 'react'
import {categories} from '../../mocks/categories'
import {ILaunchesData, IRocketsData} from '../../interfaces'

import S from '../ListItemFavorites/Favorites.module.css'

interface ListItemFavoritesProps {
  onClickItem: (id: string | null) => void,
  favorites: [ILaunchesData | IRocketsData]
}

const ListItemFavorites: React.FC<ListItemFavoritesProps> = ({favorites}) => {
  const [keyword, setKeyword] = useState<string>('');
  const [searchCategory, setSearchCategory] = useState<string>('')

  useEffect(() => {
    setKeyword('');
  }, [])

  function filterList(item: {name: string}) {
    if(!keyword) return true;
    const regexp = new RegExp(keyword, 'i');
    return item.name.match(regexp);
  }

  return (
    <>
      <div className={S.search_wrapper}>
        <input
          className={S.search_input}
          type="search"
          placeholder={`Поиск...`}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}/>
        <select
          id='select'
          className={S.search_select}
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        >
          <option
              value=''
              defaultValue={''}
          >
            Reset filter
          </option>;
          {categories.map(item => {
            if(item.name !== 'Favorites') return (
              <option
                  key={item.id}
                  value={item.name}
              >
                {item.name}
              </option>
            )
          })}
        </select>
      </div>
      {
        favorites
          .filter((item: {dataType: string}) => searchCategory ? item.dataType === searchCategory : true)
          .filter((item: {name: string}) => filterList(item))
          .map(() => {
            return (
                <>List component</>
            )
        })
      }
    </>
  )
}

export default ListItemFavorites
