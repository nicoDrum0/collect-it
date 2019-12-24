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
import SiteStore from '../../SiteStroe'

const { Header, Sider, Content } = Layout
const HomePage = props => {
    const [visible, setVisible] = useState(false)
    const showModal = () => {
        props.form.resetFields()
        setVisible(true)
    }
    const handleOk = e => {
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                Axios.post(
                    'http://localhost:3001/postSite',
                    qs.stringify(values)
                ).then(res => {
                    const data = res.data
                    if (data.code === 0) {
                        message.success(data.message)
                        setVisible(false)
                    } else {
                        message.warning(data.message)
                    }
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
                        <TreeCatalog data={props.folder} />
                        <div className="btn_box">
                            <Button
                                shape="round"
                                type="primary"
                                block
                                onClick={showModal}
                            >
                                添加
                            </Button>
                            <Modal
                                title="添加网址"
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
                                    <Form.Item label="网站名称">
                                        {getFieldDecorator('sitename', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入网站名称！'
                                                }
                                            ]
                                        })(
                                            <Input placeholder="请输入网站名称" />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="网址">
                                        {getFieldDecorator('address', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入网址！'
                                                }
                                            ]
                                        })(<Input placeholder="请输入网址" />)}
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </div>
                    </Scrollbars>
                </Sider>
                <Layout>
                    <Header></Header>
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
        folder: user.folder
    }
}

export default connect(mapStateToProps)(_HomePage)
