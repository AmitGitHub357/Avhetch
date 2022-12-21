import React from 'react'
import Select from "react-select";


const ConsultantSelect = ({consultantArray}) => {
  return (
    <div> <Select options={consultantArray} theme={theme => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary25: '#61DAFB',
          primary: '#61DAFB',
        }
      })}  isMulti /></div>
  )
}

export default ConsultantSelect