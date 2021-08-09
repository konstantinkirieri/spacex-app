import ListItem from '../ListItem/ListItem'

export default function ListItemRockets ({onChangeItem, rockets}) {
  return (
    rockets.map((item) => {
      return (<ListItem
        key={item.id}
        id={item.id}
        title={item.name}
        urlImg={item.flickr_images[0]}
        description={item.description}
        favorite={item.isFavorite}
        onChangeItem={() => onChangeItem(item.id)}
      />)
    })
  )
}
