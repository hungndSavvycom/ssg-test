import { gql } from "@apollo/client";

export interface EmployeeInput {
    name: string;
    position: string;
    salary: number;
}

export const GET_EMPLOYEES = gql`
    query GetAllEmployees {
        getAllEmployees {
            id
            name
            position
            salary
        }
    }
`

export const GET_DETAIL_EMPLOYEE = gql`
    query GetEmployee($getEmployeeId: Int!) {
        getEmployee(id: $getEmployeeId) {
            id
            name
            position
            salary
        }
    }
`

export const CREATE_EMPLOYEE = gql`
    mutation CreateEmployee($name: String!, $position: String!, $salary: Float!) {
        createEmployee(name: $name, position: $position, salary: $salary) {
            id
            name
            position
            salary
        }
    }
`

export const UPDATE_EMPLOYEE = gql`
    mutation UpdateEmployee($updateEmployeeId: Int!, $name: String!, $position: String!, $salary: Float!) {
        updateEmployee(id: $updateEmployeeId, name: $name, position: $position, salary: $salary) {
            id
            name
            position
            salary
        }
    }
`

export const DELETE_EMPLOYEE = gql`
    mutation DeleteEmployee($deleteEmployeeId: Int!) {
        deleteEmployee(id: $deleteEmployeeId)
    }
`