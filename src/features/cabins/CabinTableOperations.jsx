import Filter from '../../ui/Filter'
import TableOperations from '../../ui/TableOperations'
import SortBy from '../../ui/SortBy'
function CabinTableOperations() {
  const optionsFilter = [
    { value: 'all', label: 'All' },
    { value: 'no-discount', label: 'No discount' },
    { value: 'with-discount', label: 'With discount' },
  ]
  const optionsSelect = [
    { value: 'name-asc', label: 'Sort by name (A-Z)' },
    { value: 'name-desc', label: 'Sort by name (Z-A)' },
    { value: 'regularPrice-asc', label: 'Sort by price (low first)' },
    { value: 'regularPrice-desc', label: 'Sort by price (high first)' },
    { value: 'maxCapacity-asc', label: 'Sort by capacity (low first)' },
    { value: 'maxCapacity-desc', label: 'Sort by capacity (high first)' },
  ]
  return (
    <TableOperations>
      <Filter options={optionsFilter} filterField="cabins" />
      <SortBy options={optionsSelect} />
    </TableOperations>
  )
}

export default CabinTableOperations
