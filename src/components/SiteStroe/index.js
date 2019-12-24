import React, { useState } from 'react'
import './index.scss'

const SiteStore = props => {
    const [siteList, setSiteList] = useState([])
    const getSiteList = () => {}
    const handleUrl = url => {
        const prefix1 = 'https://'
        const prefix2 = 'http://'
        if (url.indexOf(prefix1) < 0 && url.indexOf(prefix2) < 0) {
            const resUrl = 'https://' + url
            return resUrl
        } else {
            return url
        }
    }
    return (
        <div className="site_box">
            {siteList.map((item, i) => {
                return (
                    <div key={i} className="site_box_item">
                        <a
                            href={handleUrl(item.address)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {item.sitename}
                        </a>
                    </div>
                )
            })}
        </div>
    )
}

export default SiteStore
