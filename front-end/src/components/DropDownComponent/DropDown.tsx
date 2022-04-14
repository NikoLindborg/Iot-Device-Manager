import React, {useState} from 'react'
import './DropDown.css'

interface DropDownProps {
  elements: String[]
  selectedElement: String
  setSelectedElement: React.Dispatch<React.SetStateAction<string>>
}

const DropDown: React.FC<DropDownProps> = ({
  elements,
  selectedElement,
  setSelectedElement,
}) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const [selectedElementIndex, setSelectedElementIndex] = useState(0)

  const handleClick = () => {
    if (isDropDownOpen == false) {
      setIsDropDownOpen(true)
    } else {
      setIsDropDownOpen(false)
    }
  }
  const handleChange = (channel: string, index: number) => {
    setSelectedElement(channel)
    setSelectedElementIndex(index)
    handleClick()
  }

  return (
    <div className="dropdown-wrapper">
      <button className="dropdown-button" onClick={handleClick}>
        <div className="dropdown-button-container">
          <div className="dropdown-button-text">{selectedElement}</div>{' '}
          <div className="arrow-container">
            <i className="arrow"></i>
          </div>
        </div>
      </button>
      <div
        className={
          isDropDownOpen == true
            ? 'dropdown-list-content-active'
            : 'dropdown-list-content'
        }
      >
        {elements.map((e, i) => (
          <button
            className={
              selectedElementIndex == i
                ? 'dropdown-list active'
                : 'dropdown-list'
            }
            key={i}
            onClick={() => {
              handleChange(e.toString(), i)
            }}
          >
            {e}
          </button>
        ))}
      </div>
    </div>
  )
}

export default DropDown
