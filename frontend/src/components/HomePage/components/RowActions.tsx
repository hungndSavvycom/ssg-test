import { Button, Flex, Popconfirm, PopconfirmProps, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useMutationEmployee } from '../../../hooks/employee'

interface IProps {
    id: number
    onRefetchList: () => void
}

const RowActions = (props: IProps) => {
    const { id, onRefetchList } = props
    const navigate = useNavigate();
    const {handleDeleteEmployee} = useMutationEmployee()
    const onConfirm: PopconfirmProps['onConfirm'] = async (event) => {
        event?.stopPropagation();
        try {
            const result = await handleDeleteEmployee(id)
            const {data} = result
            if(data?.deleteEmployee){
                onRefetchList()
                message.success('Delete employee success!')
            }
        } catch (error) {
            message.error('Error when delete employee!')
        }
    };

    const onClickEdit = () => {
        navigate(`/employee/${id}/edit`)
    }
    return (
        <Flex gap={20} vertical={false}>
            <Popconfirm
                title="Delete Employee"
                description="Are you sure to delete this Employee?"
                onConfirm={onConfirm}
                onCancel={() => { }}
                okText="Yes"
                cancelText="No"
                onPopupClick={(event) => {event.stopPropagation();}}
            >
                <Button danger>Delete</Button>
            </Popconfirm>
            <Button onClick={onClickEdit} type='primary'>Edit</Button>
        </Flex>

    )
}

export default RowActions