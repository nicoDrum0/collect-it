import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import './index.scss'

const HomePage = props => {
    const [site, setSite] = useState(null)
    const [address, setAddress] = useState(null)
    const handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
            }
        })
    }
    const handleGetInfo = () => {
        console.log(site)
        console.log(address)
    }
    const { getFieldDecorator } = props.form
    return (
        <div className="home-page">
            <section className="box">
                <Form onSubmit={handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('sitename', {
                            rules: [
                                { required: true, message: '请输入网站名称！' }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('address', {
                            rules: [{ required: true, message: '请输入网址！' }]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            block
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </section>
            <section className="box">
                <div>网站：{site}</div>
                <div>网址：{address}</div>
                <Button onClick={handleGetInfo}>get</Button>
            </section>
        </div>
    )
}

export default Form.create({})(HomePage)
