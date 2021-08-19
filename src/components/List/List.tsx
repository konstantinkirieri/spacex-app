import React, { useEffect, useState } from 'react'
import {categories} from '../../mocks/categories'
import S from './List.module.css'
import {ILaunchesData, IRocketsData} from '../../interfaces'
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@material-ui/core';

export const List: React.FC<{
  data: Array<ILaunchesData | IRocketsData> | null,
  selectedCategory: string,
  onClickItem: (id: string | null) => void,
  favorites: Array<ILaunchesData | IRocketsData> | null,
}> = ({data, selectedCategory, onClickItem, favorites}) => {
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

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSearchCategory(event.target.value as string);
  };

  return (
    <>
      {selectedCategory === 'Favorites' && 
        <div className={S.search}>
        {/* <input
        className={S.search_input}
        type="search"
        placeholder={`Поиск...`}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}/> */}
        <TextField id="standard-basic" 
        label="Search" 
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}/>
        <FormControl className={S.formControl}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="select"
            id="demo-simple-select"
            value={searchCategory}
            onChange={handleChange}
          >
            <MenuItem
                key={'000'}
                value=''
            >
              All
            </MenuItem>
            {categories.map(item => {
            if(item.name !== 'Favorites') return (
              <MenuItem
                  key={item.id}
                  value={item.name}
              >
                {item.name}
              </MenuItem>
            )
          })}
          </Select>
        </FormControl>
        {/* <select
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
        </select> */}
      </div>
      }
      {data ? (
        data
        .filter((item: {dataType: string}) => searchCategory ? item.dataType === searchCategory : true)
        .filter((item: {name: string}) => filterList(item))
        .map((item) => {
          return (
            <div
              key={item.id}
              className={S.item}
              onClick={() => onClickItem(item.id)}>
              <img
                className={S.img}
                src={
                  item.dataType === 'Launches'
                    ? item.links.patch.small
                    : item.flickr_images
                }
                alt={item.name}
              />
              <div className={S.body}>
                <h3 className={S.title}>{item.name}</h3>
                <div className={S.description}>
                  {item.dataType === 'Launches' ? (
                    item.success ? (
                      <span className={S.success}>
                        Success.{' '}
                      </span>
                    ) : (
                      <span className={S.failure}>
                        Failure.{' '}
                      </span>
                    )
                  ) : undefined}
                  {item.dataType === 'Launches'
                    ? item.details
                    : item.description}
                </div>
              </div>
              {favorites?.some((f) => f.id === item.id) && (
                <i className={`${S.like} fas fa-heart`} />
              )}
            </div>
          )
        })
      ) : (
        <p>Not found items</p>
      )}
    </>
  )
}
