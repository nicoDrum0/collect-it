import React, { useEffect } from 'react'
import emitter from '../../utils/event'
import { Form, Input } from 'antd'

const AddModal = props => {
    const handleSubmit = e => {
        e.preventDefault()
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
            }
        })
    }
    const { getFieldDecorator } = props.form
    useEffect(() => {
        emitter.addListener('submit', e => {
            handleSubmit(e)
        })
    }, [])
    return (
        <section className="box">
            <Form onSubmit={handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('sitename', {
                        rules: [
                            {
                                required: true,
                                message: '请输入网站名称！'
                            }
                        ]
                    })(<Input placeholder="请输入网站名称" />)}
                </Form.Item>
                <Form.Item>
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
        </section>
    )
}

export default Form.create({})(AddModal)
