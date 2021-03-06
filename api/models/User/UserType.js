const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const PostType = require('../Post/PostType');
const Post = require('../Post/Post');

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a User',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: (user) => user.id,
    },
    username: {
      type: GraphQLString,
      resolve: (user) => user.username,
    },
    email: {
      type: GraphQLString,
      resolve: (user) => user.email,
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: (user) => (
        Post.findAll({
          where: {
            UserId: user.id,
          },
        })
      ),
    },
    createdAt: {
      type: GraphQLString,
      resolve: (user) => user.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (user) => user.updatedAt,
    },
  }),
});

module.exports = UserType;
