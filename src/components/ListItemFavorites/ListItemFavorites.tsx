import React, {useEffect, useState} from 'react'
import ListItem from '../ListItem/ListItem'
import S from '../Search/search.module.css'
import {categories} from '../../mocks/categories'

interface ListItemFavoritesProps {
  onChangeItem: Function,
  favorites: []
}

interface PassedProps {
  id: number | string, 
  name: string, 
  dataType: string, 
  links: {patch: {small: string}}, 
  flickr_images: string[], 
  details: string, 
  description: string, 
  success: boolean | undefined
}

const ListItemFavorites: React.FC<ListItemFavoritesProps> = ({onChangeItem, favorites}) => {
  const [keyword, setKeyword] = useState('');
  const [searchCategory, setSearchCategory] = useState('Reset')

  useEffect(() => {
    setKeyword('');
  }, [])

  function filterList(item: {name: string}) {
    if(!keyword) return true;
    const regexp = new RegExp(keyword, 'i');
    return item.name.match(regexp);
  }

  const changeSearchCategory = (searchCategory: string) => {
    switch(searchCategory) {
      case 'Launches':
        return favorites.filter((item: {dataType: string}) => item.dataType === 'Launches');
      case 'Rockets':
        return favorites.filter((item: {dataType: string}) => item.dataType === 'Rockets');
      default:
        return favorites;
    }
  };

  let searchData = changeSearchCategory(searchCategory);

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
              value='Reset'
              defaultValue={'Reset'}
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
        searchData
          .filter((item) => filterList(item))
          .map((item: PassedProps) => {
            return (
                <ListItem
                  key={item.id}
                  id={item.id}
                  favorites={favorites}
                  title={item.name}
                  urlImg={item.dataType === 'Launches' ? item.links.patch.small : item.flickr_images[0]}
                  description={item.dataType === 'Launches' ? item.details : item.description}
                  success={item.dataType === 'Launches' ? item.success : undefined}
                  onChangeItem={() => onChangeItem(item.id)}
                />
            )
        })
      }
    </>
  )
}

export default ListItemFavorites