import classes from './Employee.module.scss'
import EmployeeForm from './components/EmployeeForm'
import { Form, message } from 'antd'
import { useMutationEmployee } from '../../hooks/employee'
import { useNavigate } from 'react-router-dom'

const EmployeeCreateComponent = () => {
  const [form] = Form.useForm();
  const [messageApi] = message.useMessage();
  const navigate = useNavigate();
  const {handleCreateEmployee} = useMutationEmployee()
  const onSubmitForm = async () => {
    const formValues = form.getFieldsValue();
    try {
        const payload = {
            name: formValues.name,
            position: formValues.position,
            salary: Number(formValues.salary) 
        }
        const result = await handleCreateEmployee(payload)
        const {data} = result
        if(data?.createEmployee){
            messageApi.success('Create employee success!')
            navigate('/')
        }else{
            messageApi.error('Create employee failed!')
        }
    } catch (error) {
        messageApi.error('Error when create employee!')
    }
  }
  return (
    <div className={classes.container}>
        <div className={classes.content}>
            <EmployeeForm form={form} onSubmitForm={onSubmitForm} />
        </div>
    </div>
  )
}

export default EmployeeCreateComponent