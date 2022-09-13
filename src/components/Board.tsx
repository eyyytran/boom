import React, { useState } from 'react'
import Canvas from './Canvas'

const Board = () => {
    const [color, setColor] = useState<string>('#000000')
    const [size, setSize] = useState<number>(5)
    return (
        <div className='canvas-container'>
            <h1>Draw on Me</h1>
            <div className='color-picker-container'>
                <input
                    type='color'
                    value={color}
                    onChange={e => setColor(e.target.value)}
                />
            </div>
            <div className='brushsize-container'>
                Select Brush Size : &nbsp;
                <select
                    value={size}
                    onChange={e => setSize(parseInt(e.target.value))}
                >
                    <option> 5 </option>
                    <option> 10 </option>
                    <option> 15 </option>
                    <option> 20 </option>
                    <option> 25 </option>
                    <option> 30 </option>
                </select>
            </div>
            <div className='board-container'>
                <Canvas color={color} size={size} />
            </div>
        </div>
    )
}

export default Board
