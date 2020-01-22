import React, { useState, useEffect } from 'react'
import { Button, Layout, Modal, Form, Input, message } from 'antd'
import './index.scss'
import { connect } from 'react-redux'
import TreeCatalog from '../../TreeCatalog'
import Scrollbars from 'react-custom-scrollbars'
import { renderThumbVertical } from '../../../utils/utils'
import emitter from '../../../utils/event'
import Axios from 'axios'
import qs from 'qs'
import SiteStore from '../../SiteStore'
import { setFolder } from '../../../redux/actions/user'
import HeaderComponent from '../../HeaderComponent'

const { Header, Sider, Content } = Layout
const HomePage = props => {
    const [visible, setVisible] = useState(false)
    const defaultFolder = JSON.parse(localStorage.getItem('folder'))
    const [folderData, setFolderData] = useState(defaultFolder)
    const showModal = () => {
        props.form.resetFields()
        setVisible(true)
    }
    const handleOk = e => {
        props.form.validateFields((err, values) => {
            if (!err) {
                values.id = props.userId
                Axios.post(
                    'http://localhost:3001/postSite',
                    qs.stringify(values)
                )
                    .then(res => {
                        const data = res.data
                        if (data.code === 0) {
                            message.success(data.message)
                            props.setFolder(data.folder)
                            setVisible(false)
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
    const handleCancel = e => {
        props.form.resetFields()
        setVisible(false)
    }
    const handleContextMenuVisible = () => {
        emitter.emit('setVisible')
    }
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 }
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 }
        }
    }
    useEffect(() => {
        setFolderData(props.folder)
        localStorage.setItem('folder', JSON.stringify(props.folder))
    }, [props.folder])
    useEffect(() => {
        emitter.addListener('logout', () => {
            props.history.push('/login')
        })
        return () => {
            emitter.removeListener('logout', () => {
                props.history.push('/login')
            })
        }
    })
    const { getFieldDecorator } = props.form
    return (
        <div className="home-page">
            <Layout>
                <Sider onClick={handleContextMenuVisible}>
                    <Header>Collect</Header>
                    <Scrollbars
                        autoHide
                        style={{ height: `calc(100% - 64px)` }}
                        renderThumbVertical={renderThumbVertical}
                    >
                        <TreeCatalog data={folderData} />
                        <div className="btn_box">
                            <Button
                                shape="round"
                                type="primary"
                                block
                                onClick={showModal}
                            >
                                添加文件夹
                            </Button>
                            <Modal
                                title="新建文件夹"
                                visible={visible}
                                maskClosable={false}
                                onOk={handleOk}
                                onCancel={handleCancel}
                                okText="确定"
                                cancelText="取消"
                            >
                                <Form
                                    layout="horizontal"
                                    labelAlign="left"
                                    {...formItemLayout}
                                >
                                    <Form.Item label="名称">
                                        {getFieldDecorator('foldername', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message:
                                                        '请输入文件夹名称！'
                                                }
                                            ]
                                        })(
                                            <Input placeholder="请输入文件夹名称" />
                                        )}
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </div>
                    </Scrollbars>
                </Sider>
                <Layout>
                    <Header>
                        <HeaderComponent />
                    </Header>
                    <Content>
                        <Scrollbars
                            autoHide
                            renderThumbVertical={renderThumbVertical}
                        >
                            <SiteStore />
                        </Scrollbars>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

const _HomePage = Form.create({})(HomePage)
const mapStateToProps = ({ user }) => {
    return {
        folder: user.folder,
        userId: user.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setFolder: folder => {
            dispatch(setFolder(folder))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(_HomePage)
