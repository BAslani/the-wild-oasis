import Spinner from '../../ui/Spinner'
import CabinRow from './CabinRow'
import { useCabins } from './useCabins'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'
import { useSearchParams } from 'react-router-dom'
import { CabinType } from '../../types'
import Empty from '../../ui/Empty'

export default function CabinTable() {
  const { cabins, isLoading } = useCabins()
  const [searchParams] = useSearchParams()

  if (isLoading) return <Spinner />
  if (cabins.length === 0) return <Empty resource={'cabins'} />

  const filterValue = searchParams.get('discount') || 'all'

  let filteredCabins
  if (filterValue === 'all') filteredCabins = cabins
  if (filterValue === 'no-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0)
  if (filterValue === 'with-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0)

  const sortBy = searchParams.get('sortBy') || 'startDate-asc'

  const [field, direction] = sortBy.split('-') as [
    keyof CabinType,
    'asc' | 'desc'
  ]
  const modifier = direction === 'asc' ? 1 : -1
  const sortedCabins = filteredCabins?.sort(
    (a, b) => (Number(a[field]) - Number(b[field])) * modifier
  )

  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>price</div>
          <div>discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins || []}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  )
}
