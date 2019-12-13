const graphql= require('graphql')

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLList} = graphql

const movies = [
  {id: '1', name: 'first', genre: 'Crime', directorId: 1},
  {id: 2, name: 'second', genre: 'Sci-Fi', directorId: 2},
  {id: 2, name: 'second', genre: 'Sci-yyy', directorId: 2}
]

const directors = [
  {id: 1, name: 'Tarantino', age: 55},
  {id: 2, name: 'Radford', age: 45}
]

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies.filter(movie => movie.directorId == parent.id)
      }
    }
  })
})

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    director: {
      type: DirectorType,
      resolve(parent, args) {
        // return directors.find(director => director.id == parent.id)
      }
    }
  })
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        // return movies.find(movie => movie.id == args.id)
      }
    },
    director: {
      type: DirectorType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        // return directors.find(director => director.id == args.id)
      }
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies
      }
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        // return directors
      }
    }
  }
})


module.exports = new GraphQLSchema({
  query: Query,
})