import CabinRow from './CabinRow'
import Spinner from '../../ui/Spinner'
import { useCabins } from './useCabins'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'
import { useSearchParams } from 'react-router-dom'
import Empty from '../../ui/Empty'

function CabinTable() {
  const { cabins, isLoading } = useCabins()
  const [searchParams] = useSearchParams()

  if (isLoading) return <Spinner />

  //1.Filter
  const filter = searchParams.get('cabins') || 'all'
  let filterCabins
  if (filter === 'all') filterCabins = cabins
  if (filter === 'with-discount') {
    filterCabins = cabins.filter((cabin) => cabin.discount > 0)
  }
  if (filter === 'no-discount') {
    filterCabins = cabins.filter((cabin) => cabin.discount === 0)
  }

  if (!filterCabins.length) return <Empty resource="cabin" />

  //2.Sort
  const sortBy = searchParams.get('sortBy') || 'created_at-asc'
  const [field, direction] = sortBy.split('-')
  const modifier = direction === 'asc' ? 1 : -1
  const sortCabins = filterCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  )
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  )
}
export default CabinTable
