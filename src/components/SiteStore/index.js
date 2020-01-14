import React, { useState, useEffect, Fragment } from 'react'
import './index.scss'
import { Form, Input, Modal, message } from 'antd'
import { connect } from 'react-redux'
import { handleUrlSplicing } from '../../utils/utils'
import emitter from '../../utils/event'
import {
    toggleRenameModal,
    toggleAddSiteModal
} from '../../redux/actions/modal'
import Axios from 'axios'
import qs from 'qs'
import { setFolder } from '../../redux/actions/user'

const SiteStore = props => {
    const [siteList, setSiteList] = useState([])
    const [renameKey, setRenameKey] = useState(null)
    const [addSiteKey, setAddSiteKey] = useState(null)
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 3 }
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 21 }
        }
    }
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
    const handleRenameOk = e => {
        props.form.validateFields((err, values) => {
            if (!err) {
                const res = {
                    id: props.id,
                    eventKey: renameKey,
                    newName: values.rename
                }
                Axios.post('http://localhost:3001/rename', qs.stringify(res))
                    .then(res => {
                        const _data = res.data
                        props.setFolder(_data.folder)
                        message.success(_data.message)
                        props.toggleRenameModal(false)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        })
    }
    const handleAddSiteOk = e => {
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                values.eventKey = addSiteKey
                values.id = props.id
                Axios.post(
                    'http://localhost:3001/addSite',
                    qs.stringify(values)
                )
                    .then(res => {
                        const data = res.data
                        if (data.code === 0) {
                            message.success(data.message)
                            props.setFolder(data.folder)
                            props.toggleAddSiteModal(false)
                        } else {
                            message.warning(data.message)
                        }
                    })
                    .catch(err => {
                        message.warning(err)
                    })
            }
        })
    }
    const handleAddSiteCancel = () => {
        props.toggleAddSiteModal(false)
    }
    const renderAddSiteModal = () => {
        if (props.addVisible === false) {
            return null
        }

        const { getFieldDecorator } = props.form
        return (
            <Modal
                title="添加网址"
                visible={props.addVisible}
                maskClosable={false}
                onOk={handleAddSiteOk}
                onCancel={handleAddSiteCancel}
                okText="确定"
                cancelText="取消"
            >
                <Form {...formItemLayout}>
                    <Form.Item label="名称">
                        {getFieldDecorator('sitename', {
                            rules: [
                                {
                                    required: true,
                                    message: '网站名称不能为空！'
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="网址">
                        {getFieldDecorator('address', {
                            rules: [
                                {
                                    required: true,
                                    message: '网址不能为空！'
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
    const showAddSiteModal = () => {
        props.form.resetFields()
        props.toggleAddSiteModal(true)
    }
    const showRenameModal = () => {
        props.form.resetFields()
        props.toggleRenameModal(true)
    }
    const handleRenameCancel = () => {
        props.toggleRenameModal(false)
    }
    const renderRenameModal = () => {
        if (props.renameVisible === false) {
            return null
        }

        const { getFieldDecorator } = props.form
        return (
            <Modal
                title="修改名称"
                visible={props.renameVisible}
                maskClosable={false}
                onOk={handleRenameOk}
                onCancel={handleRenameCancel}
                okText="确定"
                cancelText="取消"
            >
                <Form {...formItemLayout}>
                    <Form.Item label="名称">
                        {getFieldDecorator('rename', {
                            rules: [
                                {
                                    required: true,
                                    message: '名称不能为空！'
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
    useEffect(() => {
        setSiteList(props.siteStore)
    }, [props.siteStore])
    useEffect(() => {
        emitter.addListener('showRenameModal', key => {
            showRenameModal()
            setRenameKey(key)
        })
        emitter.addListener('showAddSiteModal', key => {
            showAddSiteModal()
            setAddSiteKey(key)
        })
        return () => {
            emitter.removeListener('showRenameModal', key => {
                showRenameModal()
                setRenameKey(key)
            })
            emitter.removeListener('showAddSiteModal', key => {
                showAddSiteModal()
                setAddSiteKey(key)
            })
        }
    })
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
            {renderRenameModal()}
            {renderAddSiteModal()}
        </div>
    )
}

const _SiteStore = Form.create({})(SiteStore)

const mapStateToProps = ({ user, site, modal }) => {
    return {
        id: user.userId,
        siteStore: site.siteStore,
        renameVisible: modal.showRenameModal,
        addVisible: modal.showAddSiteModal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleRenameModal: bool => {
            dispatch(toggleRenameModal(bool))
        },
        toggleAddSiteModal: bool => {
            dispatch(toggleAddSiteModal(bool))
        },
        setFolder: folder => {
            dispatch(setFolder(folder))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(_SiteStore)
