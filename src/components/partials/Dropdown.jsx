import React from 'react'

function Dropdown({title,options,func}) {
  return (
    <div className='select'>
        <select onChange={func} defaultValue="0" name='format' id='format'>
            <option value="0" disabled>{title}</option>
            {
                options.map((opt,index) => (
                    <option key={index} value={opt}>{opt.toUpperCase()}</option>
                ))
            }
        </select>
    </div>
  )
}

export default Dropdown