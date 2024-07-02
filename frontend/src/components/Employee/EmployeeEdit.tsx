import { useEffect } from 'react'
import classes from './Employee.module.scss'
import EmployeeForm from './components/EmployeeForm'
import { Form, message } from 'antd'
import { useMutationEmployee, useQueryDetailEmployee } from '../../hooks/employee'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeEditComponent = () => {
    const {id} = useParams()
  const [form] = Form.useForm();
  const [messageApi] = message.useMessage();
  const navigate = useNavigate();
  const {data} = useQueryDetailEmployee(Number(id || 0))

  useEffect(() => {
    if(data){
        form.setFieldsValue({
            name: data?.getEmployee?.name,
            position: data?.getEmployee?.position,
            salary: data?.getEmployee?.salary
        })
    }
  },[data])

  const {handleUpdateEmployee} = useMutationEmployee()
  const onSubmitForm = async () => {
    const formValues = form.getFieldsValue();
    try {
        const payload = {
            name: formValues.name,
            position: formValues.position,
            salary: Number(formValues.salary) 
        }
        const result = await handleUpdateEmployee(Number(id || 0), payload)
        const {data} = result
        if(data?.updateEmployee){
            messageApi.success('Update employee success!')
            navigate('/')
        }else{
            messageApi.error('Update employee failed!')
        }
    } catch (error) {
        messageApi.error('Error when update employee!')
    }
  }
  return (
    <div className={classes.container}>
        <div className={classes.content}>
            <h2 className={classes.title}>{`Edit Employee Id: ${id}`}</h2>
            <EmployeeForm form={form} onSubmitForm={onSubmitForm} />
        </div>
    </div>
  )
}

export default EmployeeEditComponent