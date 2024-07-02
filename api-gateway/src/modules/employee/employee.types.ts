export interface Employee {
    id: number;
    name: string;
    position: string;
    salary: number;
}
  
export interface GetEmployeeRequest {
    id: number;
}

export interface CreateEmployeeRequest {
    name: string;
    position: string;
    salary: number;
}

export interface UpdateEmployeeRequest {
    id: number;
    name: string;
    position: string;
    salary: number;
}

export interface DeleteEmployeeRequest {
        id: number;
}

export interface EmployeesResponse {
    employees: Employee[];
}

export interface DeleteEmployeeResponse {
    message: string;
}