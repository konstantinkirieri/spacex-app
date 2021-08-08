import ListItem from '../ListItem/ListItem'

export default function Rockets ({onChangeItem, rockets}) {
  return (
    rockets.map((item, index) => {
      return (<ListItem
        key={item.id}
        title={item.name}
        urlImg={item.flickr_images[0]}
        description={item.description}
        favorite={item.isFavorite}
        onChangeItem={() => onChangeItem(index)}
      />)
    })
  )
}
