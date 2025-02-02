type Props = {
  resource: string
}

function Empty({ resource }: Props) {
  return <p>No {resource} could be found.</p>
}

export default Empty
