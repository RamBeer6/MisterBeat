import React, { useState } from 'react';

export function ColorPicker({ onChangeBcgColor }) {
    const colors = ['#9253a1', '#f063a4', '#2dc5f4', '#1db954', '#f16164']
    const [bcgColor, setBcgColor] = useState('')

    return (
        <section className="color-picker">
            <div style={{background: bcgColor}} className="colors-container">
            {colors.map((color,idx) => {
                return <div key={idx} className="color-item">
                <div style={{
                    background: color,
                    filter: "brightness(85%)",
                    boxShadow: color === bcgColor ? "0 0 5px #000" : ""
                }} className="color-box" onClick={() => {
                    setBcgColor(color)
                    onChangeBcgColor(color)
                }}>
                </div>
                </div>
            })}
            </div>
        </section>
    )
}