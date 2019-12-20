import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import './index.scss'

const SiteStore = props => {
    const [siteList, setSiteList] = useState([])
    const getSiteList = () => {
        Axios.get('http://localhost:3001/site').then(res => {
            const data = res.data
            if (data.code === 0) {
                setSiteList(data.data)
            }
        })
    }
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
    useEffect(() => {
        getSiteList()
        // eslint-disable-next-line
    }, [])
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
