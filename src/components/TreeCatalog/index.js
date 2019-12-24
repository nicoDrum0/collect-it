import React, { Fragment } from 'react'
import { Tree, Modal, Form, Input } from 'antd'
import { connect } from 'react-redux'
import emitter from '../../utils/event'
import './index.scss'

const { DirectoryTree } = Tree
const contextMenus = [
    { title: '添加文件夹', type: 0 },
    { title: '添加网址', type: 1 },
    { title: '重命名', type: 2 },
    { title: '删除', type: 3 }
]
const contextMenu = [
    { title: '重命名', type: 2 },
    { title: '删除', type: 3 }
]
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

class TreeCatalog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            renameVisible: false,
            menuList: [],
            menuStyle: null
        }
    }
    componentDidMount() {
        emitter.addListener('setVisible', () => {
            this.setState({
                visible: false
            })
        })
    }
    componentWillUnmount() {
        emitter.removeListener('setVisible', () => {
            this.setState({
                visible: false
            })
        })
    }
    handleRightClick = ({ event, node }) => {
        const { props } = node
        if (!props.children.length) {
            this.setState({
                menuList: contextMenu
            })
        } else {
            this.setState({
                menuList: contextMenus
            })
        }
        const { pageX, pageY } = event
        this.setState({
            menuStyle: {
                left: `${pageX}px`,
                top: `${pageY}px`
            }
        })
        this.setState({
            visible: true
        })
    }
    showRenameModal = () => {
        this.props.form.resetFields()
        this.setState({
            renameVisible: true
        })
    }
    showDelConfirmModal = () => {
        Modal.confirm({
            title: '友情提示',
            content: '确认删除？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                console.log('OK')
            },
            onCancel() {
                console.log('Cancel')
            }
        })
    }
    handleClick = type => {
        console.log(type)
        switch (type) {
            case 2:
                this.showRenameModal()
                break
            case 3:
                this.showDelConfirmModal()
                break
            default:
                return
        }
    }
    handleSelect = (selectedKeys, info) => {
        const { node } = info
        console.log(node.props.children)
    }
    handleRenameOk = () => {
        // console.log(object)
    }
    handleRenameCancel = () => {
        this.setState({
            renameVisible: false
        })
    }
    renderRenameModal = () => {
        if (!this.state.renameVisible) {
            return null
        }

        const { getFieldDecorator } = this.props.form
        return (
            <Modal
                title="修改名称"
                visible={this.state.renameVisible}
                maskClosable={false}
                onOk={this.handleRenameOk}
                onCancel={this.handleRenameCancel}
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
    renderContextMenuTpl = () => {
        if (!this.state.visible) {
            return null
        }

        return (
            <div className="menu_list" style={this.state.menuStyle}>
                {this.state.menuList.map((item, i) => {
                    return (
                        <div
                            key={i}
                            className="menu_item"
                            onClick={() => {
                                this.handleClick(item.type)
                            }}
                        >
                            {item.title}
                        </div>
                    )
                })}
                {this.renderRenameModal()}
            </div>
        )
    }
    render() {
        return (
            <Fragment>
                <DirectoryTree
                    treeData={this.props.data}
                    onSelect={this.handleSelect}
                    onRightClick={this.handleRightClick}
                />
                {this.renderContextMenuTpl()}
            </Fragment>
        )
    }
}

const _TreeCatalog = Form.create({})(TreeCatalog)

export default connect()(_TreeCatalog)
