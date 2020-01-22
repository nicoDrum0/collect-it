import React from 'react'
import { Avatar, Dropdown, Menu, Icon, Modal } from 'antd'
import emitter from '../../utils/event'
import './index.scss'

const HeaderComponent = props => {
    const logout = () => {
        Modal.confirm({
            title: '退出登录',
            content: '确认退出登录？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                emitter.emit('logout')
            },
            onCancel() {
                console.log('Cancel')
            }
        })
    }
    const menu = (
        <Menu>
            <Menu.Item>修改密码</Menu.Item>
            <Menu.Item onClick={logout}>退出登录</Menu.Item>
        </Menu>
    )
    return (
        <div className="header">
            <Dropdown overlay={menu} trigger={['click']}>
                <div className="inline">
                    <Avatar size={30} icon="user" />
                    <div>
                        <span className="username">用户名</span>
                        <Icon type="down" />
                    </div>
                </div>
            </Dropdown>
        </div>
    )
}

export default HeaderComponent
