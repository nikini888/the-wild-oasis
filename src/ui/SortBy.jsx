import Select from './Select'
import { useSearchParams } from 'react-router-dom'

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const sortBy = searchParams.get('sortBy') || ''

  function handleOnChange(e) {
    searchParams.set('sortBy', e.target.value)
    setSearchParams(searchParams)
  }
  return (
    <Select
      options={options}
      onChange={handleOnChange}
      type="white"
      value={sortBy}
    />
  )
}

export default SortBy
