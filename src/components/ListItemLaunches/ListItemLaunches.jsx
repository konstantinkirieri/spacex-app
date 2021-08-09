import ListItem from '../ListItem/ListItem'

export default function ListItemLaunches ({onChangeItem, launches, favorites}) {
  return (
    launches.map((item) => {
      return (<ListItem
        favorites={favorites}
        key={item.id}
        id={item.id}
        title={item.name}
        urlImg={item.links.patch.small}
        description={item.details}
        success={item.success}
        favorite={item.isFavorite}
        onChangeItem={() => onChangeItem(item.id)}
      />)
    })
  )
}
