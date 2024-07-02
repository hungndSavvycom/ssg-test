import { gql } from 'apollo-server';
import { mergeResolvers } from '@graphql-tools/merge';
import { employeeResolvers } from '../modules/employee/employee.resolvers';
const typeDefs = gql`
  type Employee {
    id: Int!
    name: String!
    position: String!
    salary: Float!
  }

  type Query {
    getEmployee(id: Int!): Employee
    getAllEmployees: [Employee!]!
  }

  type Mutation {
    createEmployee(name: String!, position: String!, salary: Float!): Employee
    updateEmployee(id: Int!, name: String!, position: String!, salary: Float!): Employee
    deleteEmployee(id: Int!): String
  }
`;

const resolvers = mergeResolvers([employeeResolvers]);

export { typeDefs, resolvers };