const { gql } = require('apollo-server-express');

export const typeDefs = gql`
type Hello 
{
 name: String
}

type Query 
{
    getHello: Hello
}

`

export const resolvers = {
    Query:
    {
        getHello: () => {

            return { name: 'Hello World' }
        }
    }
}