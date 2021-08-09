import ListItem from '../ListItem/ListItem'

export default function ListItemLaunches ({onChangeItem, launches}) {
  return (
    launches.map((item) => {
      return (<ListItem
        key={item.id}
        id={item.id}
        title={item.name}
        urlImg={item.links.patch.small}
        description={item.details}
        favorite={item.isFavorite}
        onChangeItem={() => onChangeItem(item.id)}
      />)
    })
  )
}
