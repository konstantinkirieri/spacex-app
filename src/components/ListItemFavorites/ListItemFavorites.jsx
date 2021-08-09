import {useEffect, useState} from 'react'
import ListItem from '../ListItem/ListItem'
import S from '../Search/search.module.css'
import {categories} from '../../mocks/categories'

export default function ListItemFavorites({onChangeItem, favorites}) {
  const [keyword, setKeyword] = useState('');
  const [searchCategory, setSearchCategory] = useState('Reset')

  useEffect(() => {
    setKeyword('');
  }, [])

  function filterList(item) {
    if(!keyword) return true;
    const regexp = new RegExp(keyword, 'i');
    return item.name.match(regexp);
  }

  const changeSearchCategory = () => {
    switch(searchCategory) {
      case 'Launches':
        return favorites.filter(item => item.dataType === 'Launches');
      case 'Rockets':
        return favorites.filter(item => item.dataType === 'Rockets');
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
          .map((item) => {
            return (
                <ListItem
                  key={item.id}
                  title={item.name}
                  urlImg={item.dataType === 'Launches' ? item.links['patch'].small : item.flickr_images[0]}
                  description={item.dataType === 'Launches' ? item.details : item.description}
                  success={item.dataType === 'Launches' ? item.success : null}
                  onChangeItem={() => onChangeItem(item.id)}
                />
            )
        })
      }
    </>
  )
}
