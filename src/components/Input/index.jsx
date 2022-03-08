import React from 'react';
import './index.scss';

const Index = ({label, type, placeholder, id}) => {
  return (
    <div className='input-container'>
        <label>{ label }</label>
        <input type={ type } placeholder={ placeholder } id={ id }/>
    </div>
  )
}

export default Index