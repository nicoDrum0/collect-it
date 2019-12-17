import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Icon, Button, Checkbox, message } from 'antd'
import './index.scss'
import Axios from 'axios'
import qs from 'qs'
// import { login } from '../../../utils/request'

class Login extends React.Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props)
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // login(values).then(res => {
                //     console.log(res)
                // })
                Axios.post(
                    'http://localhost:3001/login',
                    qs.stringify(values)
                ).then(res => {
                    const data = res.data
                    console.log(res)
                    const mes = data.message
                    if (data.code === 0) {
                        message.success(mes)
                        this.props.history.push('/homepage')
                    } else {
                        message.error(mes)
                    }
                })
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div className="login" id="id">
                <section className="login_box">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入用户名!'
                                    }
                                ]
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type="user"
                                            style={{ color: 'rgba(0,0,0,.25)' }}
                                        />
                                    }
                                    placeholder="Username"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入密码!'
                                    }
                                ]
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type="lock"
                                            style={{ color: 'rgba(0,0,0,.25)' }}
                                        />
                                    }
                                    type="password"
                                    placeholder="Password"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true
                            })(<Checkbox>记住我</Checkbox>)}
                            <a className="login-form-forgot" href="/">
                                忘记密码
                            </a>
                            <Button
                                block
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >
                                登录
                            </Button>
                            <Link to="/register">注册账号</Link>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

export default Form.create({})(Login)
