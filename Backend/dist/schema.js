"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { gql } = require('apollo-server-express');
exports.typeDefs = gql `
type Hello 
{
 name: String
}

type Query 
{
    getHello: Hello
}

`;
exports.resolvers = {
    Query: {
        getHello: () => {
            return { name: 'Hello World' };
        }
    }
};
//# sourceMappingURL=schema.js.map