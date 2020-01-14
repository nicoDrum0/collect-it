import React, { Fragment } from 'react'
import { Tree, Modal, Form, message } from 'antd'
import { connect } from 'react-redux'
import emitter from '../../utils/event'
import './index.scss'
import { handleUrlSplicing } from '../../utils/utils'
import { setSiteStore } from '../../redux/actions/site'
import Axios from 'axios'
import qs from 'qs'
import { setFolder } from '../../redux/actions/user'
import { toggleRenameModal } from '../../redux/actions/modal'

const { DirectoryTree, TreeNode } = Tree
const contextMenus = [
    { title: '添加网址', type: 0 },
    { title: '重命名', type: 1 },
    { title: '删除', type: 2 }
]
const contextMenu = [
    { title: '重命名', type: 1 },
    { title: '删除', type: 2 }
]

class TreeCatalog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            addVisible: false,
            menuList: [],
            menuStyle: null,
            eventKey: null
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
        console.log(props.eventKey)
        this.setState({
            eventKey: props.eventKey
        })
        if (!props.children) {
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
        const key = this.state.eventKey
        emitter.emit('showRenameModal', key)
    }
    showDelConfirmModal = () => {
        const _this = this
        Modal.confirm({
            title: '友情提示',
            content: '确认删除？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                const eventKey = _this.state.eventKey
                Axios.post(
                    'http://localhost:3001/del',
                    qs.stringify({
                        eventKey,
                        id: _this.props.userId
                    })
                )
                    .then(res => {
                        const data = res.data
                        if (data.code === 0) {
                            _this.props.setFolder(data.folder)
                            message.success(data.message)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            onCancel() {
                console.log('Cancel')
            }
        })
    }
    showAddSiteModal = () => {
        const key = this.state.eventKey
        emitter.emit('showAddSiteModal', key)
    }
    handleClick = type => {
        switch (type) {
            case 0:
                this.showAddSiteModal()
                break
            case 1:
                this.showRenameModal()
                break
            case 2:
                this.showDelConfirmModal()
                break
            default:
                return
        }
        this.setState({
            visible: false
        })
    }
    handleSelect = (selectedKeys, info) => {
        // console.log(selectedKeys)
        const { dataRef } = info.node.props
        if (dataRef.address) {
            const _url = handleUrlSplicing(dataRef.address)
            window.open(_url)
        } else {
            const arr = dataRef.children
            this.props.setSiteStore(arr)
        }
    }
    handleAddSiteOk = () => {}
    handleAddSiteCancel = () => {}
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
            </div>
        )
    }
    renderTree = data => {
        // console.log(data)
        const result = data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTree(item.children)}
                    </TreeNode>
                )
            }

            return (
                <TreeNode
                    title={item.title}
                    key={item.key}
                    dataRef={item}
                    isLeaf={item.isLeaf}
                />
            )
        })

        return result
    }
    render() {
        return (
            <Fragment>
                <DirectoryTree
                    onSelect={this.handleSelect}
                    onRightClick={this.handleRightClick}
                >
                    {this.renderTree(this.props.data)}
                </DirectoryTree>
                {this.renderContextMenuTpl()}
            </Fragment>
        )
    }
}

const _TreeCatalog = Form.create({})(TreeCatalog)

const mapDispatchToProps = dispatch => {
    return {
        setSiteStore: val => {
            dispatch(setSiteStore(val))
        },
        setFolder: folder => {
            dispatch(setFolder(folder))
        },
        toggleRenameModal: bool => {
            dispatch(toggleRenameModal(bool))
        }
    }
}

const mapStateToProps = ({ user }) => {
    return {
        folder: user.folder,
        userId: user.userId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(_TreeCatalog)
