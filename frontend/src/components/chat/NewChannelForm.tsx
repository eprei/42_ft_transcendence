import React from 'react'
import { useState } from 'react'
import { Button, Form, Input, Select } from 'antd'
import type { FormInstance } from 'antd/es/form'
import styles from './NewChannelForm.module.css'

const { Option } = Select

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
}

const App: React.FC = () => {
    const formRef = React.useRef<FormInstance>(null)

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [fin, setFin] = useState(false);
	

	const onFinish = (values: any) => {
        console.log(values)
		setFormSubmitted(true)

		setTimeout(() => {
			setFin(true);
		  }, 3000);

	}

    const onReset = () => {
        formRef.current?.resetFields()
    }

	if (formSubmitted && !fin) {
		return <div>Form submitted successfully!</div>;
	  }
	else if (formSubmitted && fin) {
		return <div></div>;
	  }

    return (
		<div className={styles.cont}>
		<Form
            {...layout}
            ref={formRef}
            name="control-ref"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
        >
            <Form.Item
                className={styles.Buttons}
                name="type"
                label="Type"
                rules={[{ required: true }]}
            >
                <Select placeholder="Select Type" allowClear>
                    <Option value="public">public</Option>
                    <Option value="private">private</Option>
                </Select>
            </Form.Item>

            <Form.Item
                className={styles.Buttons}
                name="channel name"
                label="Channel name"
                rules={[{ required: true }]}
            >
                <Input className={styles.input} />
            </Form.Item>

            <Form.Item
                name="password"
                label="password"
                rules={[{ required: false }]}
                className={styles.Buttons}
            >
                <Input className={styles.input} />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="default" htmlType="submit">
                    Create Channel
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button>
            </Form.Item>
        </Form>
		</div>
    )
}

export default App
