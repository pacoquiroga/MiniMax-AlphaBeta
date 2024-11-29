import React from 'react'
import { useState } from 'react'

const Nodo = ({value, children, onAddChild}) => {
    const [nodeValue, setNodeValue] = useState(value||'');

  return (
    <div className='ml-5'>
        <div className='flex items-center mb-2.5'>
            <input className='mr-2.5'
            type='text'
            value={nodeValue}
            onChange={(e) => setNodeValue(e.target.value)}
            />
            <button className='bg-green-500 text-white px-2.5 py-1 rounded' onClick={onAddChild}>+</button>
        </div>

        <div className='border-l-2 border-solid pl-2.5'>
            {children.map((child,index) => (
                <Nodo key={index} value={child.value} children={child.children} onAddChild={() => onAddChild(index)}/>
            ))}
        </div>

    </div>
  )
}

export default Nodo
