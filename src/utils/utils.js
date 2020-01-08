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

// 处理url
export const handleUrlSplicing = url => {
    const prefix1 = 'https://'
    const prefix2 = 'http://'
    if (url.indexOf(prefix1) < 0 && url.indexOf(prefix2) < 0) {
        const resUrl = 'https://' + url
        return resUrl
    } else {
        return url
    }
}
