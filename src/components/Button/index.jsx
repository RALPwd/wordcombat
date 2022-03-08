import React from 'react'
import "./index.sass"

const Index = ({name,type}) => {

  return (
        <button type={type}>
            {name}
        </button>  
  )
}

export default Index