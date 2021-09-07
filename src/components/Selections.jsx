import { Select } from '@chakra-ui/react'

export const Selections = ({ choices, selectedId, changeSelection, placeholder }) => {
  const onSelect = (e) => {
    const id = e.target.value
    const newOption = choices.find((choice) => choice.id === id)
    changeSelection(newOption)
  }

  return (
    <Select placeholder={placeholder} onChange={onSelect} value={selectedId}>
      {!choices ? (
        <option>please wait...</option>
      ) : (
        choices.map((opt) => {
          return (
            <option style={{ color: 'black' }} key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          )
        })
      )}
    </Select>
  )
}
