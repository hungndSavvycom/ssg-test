import { Button, Form, FormInstance, Input } from 'antd';
import React from 'react';
type FieldType = {
    name?: string;
    position?: string;
    salary?: number;
};

interface IProps {
    form: FormInstance<any>
    onSubmitForm: () => void
}

const EmployeeForm: React.FC<IProps> = (props: IProps) => {
    const { form, onSubmitForm } = props
    const handleSubmitForm = () =>{
        if(typeof onSubmitForm === 'function'){
            onSubmitForm()
        }
    }
    return (
        <Form
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input employee name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Position"
                name="position"
                rules={[{ required: true, message: 'Please input employee position!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Salary"
                name="salary"
                rules={[{ required: true, message: 'Please input employee salary!' }]}
            >
                <Input type='number' />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" onClick={handleSubmitForm}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default EmployeeForm