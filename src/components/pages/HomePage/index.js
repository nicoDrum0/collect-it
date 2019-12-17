import React, { useState } from 'react'
import { Button, Layout, Modal } from 'antd'
import './index.scss'
import TreeCatalog from '../../TreeCatalog'
import { treeData } from '../../../utils/data'
import Scrollbars from 'react-custom-scrollbars'
import { renderThumbVertical } from '../../../utils/utils'
import emitter from '../../../utils/event'
import AddModal from '../../AddModal'

const { Header, Sider, Content } = Layout
const HomePage = props => {
    const [visible, setVisible] = useState(false)
    const showModal = () => {
        setVisible(true)
    }
    const handleOk = e => {
        emitter.emit('submit', e)
        setVisible(false)
    }
    const handleCancel = e => {
        setVisible(false)
    }
    return (
        <div className="home-page">
            <Layout>
                <Sider>
                    <Header>Collect</Header>
                    <Scrollbars
                        autoHide
                        style={{ height: `calc(100% - 64px)` }}
                        renderThumbVertical={renderThumbVertical}
                    >
                        <TreeCatalog data={treeData} />
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
                                onOk={handleOk}
                                onCancel={handleCancel}
                                okText="确定"
                                cancelText="取消"
                            >
                                <AddModal />
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
                            Content
                        </Scrollbars>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default HomePage
