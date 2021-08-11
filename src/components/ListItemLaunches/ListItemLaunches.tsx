import React from 'react'
import ListItem from '../ListItem/ListItem'

interface ListItemLaunchesProps {
  onChangeItem: Function,
  launches: any[],
  favorites: []
}

interface PassedProps {
  id: string | number, 
  name: string, 
  links: {patch: {small: string}}, 
  details: string, 
  success: boolean,
}

const ListItemLaunches: React.FC<ListItemLaunchesProps> = ({onChangeItem, launches, favorites}) => {
  return <>
    {launches.map(({id, name, links, details, success}: PassedProps) => {
      return (<ListItem
        favorites={favorites}
        key={id}
        id={id}
        title={name}
        urlImg={links.patch.small}
        description={details}
        success={success}
        onChangeItem={() => onChangeItem(id)}
      />)
    })}
  </>
}

export default ListItemLaunches