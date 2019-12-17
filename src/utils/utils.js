import React from 'react'

// 滚动条
export const renderThumbVertical = ({ style, ...props }) => {
    const thumbStyle = {
        backgroundColor: 'rgb(144,147,153)',
        opacity: 0.3,
        borderRadius: '6px'
    }
    return <div style={{ ...style, ...thumbStyle }} {...props} />
}
