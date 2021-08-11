import ListItem from '../ListItem/ListItem'

interface ListItemRocketsProps {
  onChangeItem: Function,
  rockets: any[],
  favorites: []
}

interface PassedProps {
  id: string | number, 
  name: string, 
  flickr_images: string[], 
  description: string,
}

const ListItemRockets: React.FC<ListItemRocketsProps> = ({
   onChangeItem,
   rockets,
   favorites
}) => {
  return <>
    {rockets.map(({id, name, flickr_images, description}: PassedProps): JSX.Element => {
      return (<ListItem
        favorites={favorites}
        key={id}
        id={id}
        title={name}
        urlImg={flickr_images[0]}
        description={description}
        onChangeItem={() => onChangeItem(id)}
      />)
    })}
  </>
}

export default ListItemRockets