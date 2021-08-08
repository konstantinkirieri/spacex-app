import ListItem from '../ListItem/ListItem'

export default function Launches ({onChangeItem, launches}) {
  return (
    launches.map((item, index) => {
      return (<ListItem
        key={item.id}
        title={item.name}
        urlImg={item.links.patch.small}
        description={item.details}
        success={item.success}
        favorite={item.isFavorite}
        onChangeItem={() => onChangeItem(index)}
      />)
    })
  )
}
