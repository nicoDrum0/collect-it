import React, { useState, useEffect, Fragment } from 'react'
import './index.scss'
import { connect } from 'react-redux'
import { handleUrlSplicing } from '../../utils/utils'
import emitter from '../../utils/event'

const SiteStore = props => {
    const [siteList, setSiteList] = useState([])
    const renderItem = item => {
        if (item.address) {
            return (
                <a
                    href={handleUrlSplicing(item.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {item.title}
                </a>
            )
        } else {
            return <div>folder</div>
        }
    }
    const handleClick = () => {
        emitter.emit('setVisible')
    }
    useEffect(() => {
        setSiteList(props.siteStore)
    }, [props.siteStore])
    return (
        <div className="site_box" onClick={handleClick}>
            {siteList ? (
                <Fragment>
                    {siteList.map((item, i) => {
                        return (
                            <div key={i} className="site_box_item">
                                {renderItem(item)}
                            </div>
                        )
                    })}
                </Fragment>
            ) : null}
        </div>
    )
}

const mapStateToProps = ({ site }) => {
    return {
        siteStore: site.siteStore
    }
}

export default connect(mapStateToProps)(SiteStore)
