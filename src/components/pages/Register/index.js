import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import '../Login/index.scss'
import Axios from 'axios'
import qs from 'qs'

const Register = props => {
    const [confirmDirty, setConfirmDirty] = useState(false)
    const handleSubmit = e => {
        e.preventDefault()
        props.form.validateFields((err, values) => {
            if (!err) {
                Axios.post(
                    'http://localhost:3001/register',
                    qs.stringify(values)
                ).then(res => {
                    console.log(res)
                })
            }
        })
    }
    const validateToNextPassword = (rule, value, callback) => {
        if (value && confirmDirty) {
            props.form.validateFields(['confirm_password'], { force: true })
        }
        callback()
    }
    const compareToFirstPassword = (rule, value, callback) => {
        if (value && value !== props.form.getFieldValue('password')) {
            callback('两次输入的密码不一致!')
        } else {
            callback()
        }
    }
    const handleConfirmBlur = e =>
        setConfirmDirty(confirmDirty || e.target.value)
    const { getFieldDecorator } = props.form
    return (
        <div className="login">
            <section className="login_box">
                <Form onSubmit={handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入用户名!'
                                }
                            ]
                        })(<Input placeholder="输入用户名" />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入密码!'
                                },
                                {
                                    validator: validateToNextPassword
                                }
                            ]
                        })(<Input type="password" placeholder="输入密码" />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: '请再次输入密码!'
                                },
                                {
                                    validator: compareToFirstPassword
                                }
                            ]
                        })(
                            <Input
                                type="password"
                                placeholder="再次输入密码"
                                onBlur={handleConfirmBlur}
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </section>
        </div>
    )
}

export default Form.create({})(Register)
