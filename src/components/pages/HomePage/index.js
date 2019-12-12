import React from "react"
import { Form, Input } from "antd"
import "./index.scss"

class HomePage extends React.Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props)
    }
    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div className="home-page">
                <Form obSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator("sitename", {
                            rules: [
                                { required: true, message: "请输入网站名称！" }
                            ]
                        })(<Input />)}
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default HomePage
