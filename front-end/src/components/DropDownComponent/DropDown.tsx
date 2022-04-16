import React, {useEffect, useRef, useState} from 'react'
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
  const dropDownRef = useRef<HTMLDivElement>(null)
  const [dropDownContentWidth, setDropDownContentWidth] = useState(0)

  const handleClick = () => {
    setIsDropDownOpen(!isDropDownOpen)
  }

  const handleChange = (element: string, index: number) => {
    setSelectedElement(element)
    setSelectedElementIndex(index)
    handleClick()
  }

  useEffect(() => {
    setDropDownContentWidth(dropDownRef.current?.offsetWidth as number)
    window.addEventListener('resize', handleResize)
  }, [])

  const handleResize = () => {
    setDropDownContentWidth(dropDownRef.current?.offsetWidth as number)
  }

  return (
    <div ref={dropDownRef} className="dropdown-wrapper">
      <button
        className={isDropDownOpen ? 'dropdown-button open' : 'dropdown-button'}
        onClick={handleClick}
      >
        <div className="dropdown-button-container">
          <div className="dropdown-button-text">{selectedElement}</div>{' '}
          <div className="arrow-container">
            <i className="arrow"></i>
          </div>
        </div>
      </button>
      <div
        className={
          isDropDownOpen
            ? 'dropdown-list-content-active'
            : 'dropdown-list-content'
        }
        style={{width: dropDownContentWidth}}
      >
        {elements.map((e, i) => (
          <button
            className={
              selectedElementIndex == i
                ? 'dropdown-list-element active'
                : 'dropdown-list-element'
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
