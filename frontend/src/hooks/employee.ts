import { useMutation, useQuery } from "@apollo/client";
import { CREATE_EMPLOYEE, DELETE_EMPLOYEE, EmployeeInput, GET_DETAIL_EMPLOYEE, GET_EMPLOYEES, UPDATE_EMPLOYEE } from "../services/employee";

export const useQueryListEmployee = () => {
    const {data, loading, refetch} = useQuery(GET_EMPLOYEES, {
        fetchPolicy: 'no-cache'
    })
    return {data, loading, refetch}
}

export const useQueryDetailEmployee = (id?: number) => {
    const {data, loading} = useQuery(GET_DETAIL_EMPLOYEE, {
        variables: {getEmployeeId: id},
        fetchPolicy: 'no-cache'
    })

    return {data, loading}
}

export const useMutationEmployee = () => {
    const [createEmployee] = useMutation(CREATE_EMPLOYEE)
    const [updateEmployee] = useMutation(UPDATE_EMPLOYEE)
    const [deleteEmployee] = useMutation(DELETE_EMPLOYEE)
    const handleCreateEmployee = async (employee: EmployeeInput) => {
        const {data, errors} = await createEmployee({
            variables: employee,
            refetchQueries: [{query: GET_EMPLOYEES}]
        })

        return {data, errors}
    }

    const handleUpdateEmployee = async (id: number, employee: EmployeeInput) => {
        if(!id) return {error: 'Error when update employee'}
        const {data, errors} = await updateEmployee({
            variables: {updateEmployeeId: id, ...employee},
            refetchQueries: [{query: GET_EMPLOYEES}]
        })
        return {data, errors}
    }

    const handleDeleteEmployee = async (id: number) => {
        if(!id) return {error: 'Error when delete employee'}
        const {data, errors} = await deleteEmployee({
            variables: {deleteEmployeeId: id},
            refetchQueries: [{query: GET_EMPLOYEES}]
        })
        return {data, errors}
    }

    return {handleCreateEmployee, handleUpdateEmployee, handleDeleteEmployee}
}