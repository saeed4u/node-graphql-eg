const express = require('express');
const graphQLServer = require('express-graphql');
const {buildSchema} = require('graphql');

const users = [
    {
        id: 1,
        name: 'Brian',
        age: '21',
        shark: 'Great White Shark'
    },
    {
        id: 2,
        name: 'Kim',
        age: '22',
        shark: 'Whale Shark'
    },
    {
        id: 3,
        name: 'Faith',
        age: '23',
        shark: 'Hammerhead Shark'
    },
    {
        id: 4,
        name: 'Joseph',
        age: '23',
        shark: 'Tiger Shark'
    },
    {
        id: 5,
        name: 'Joy',
        age: '25',
        shark: 'Hammerhead Shark'
    }
];


const schema = buildSchema(`
  type Query {
    user(id: Int!): Person
    users(shark: String): [Person]
  },
  type Person {
    id: Int
    name: String
    age: Int
    shark: String
  }
  type Mutation{
    updateUser(id: Int!, name: String): Person
  }
`);

const getUser = ({id}) => {
    return users.find(user => user.id === id );
}

const retrieveUsers = (args) => {
    if (args.shark){
        return users.filter(({shark}) =>shark === args.shark);
    }
    return users;
}

const updateUser = ({id,name}) => {
    let userToUpdate = users.find((user) => user.id === id);
    userToUpdate = {
        ...userToUpdate,
        name
    }
    return userToUpdate;
}

const root = {
    user: getUser,
    users: retrieveUsers,
    updateUser
};

// Create an express server and a GraphQL endpoint
const app = express();
app.use('/graphql', graphQLServer({
    schema: schema,  // Must be provided
    rootValue: root,
    graphiql: true,  // Enable GraphiQL when server endpoint is accessed in browser
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
