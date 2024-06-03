import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

// !! Error Message Function
function ErrorMessage(message) {
  return new GraphQLError('the error message', {
    extensions: {
      code: 'SOMETHING_BAD_HAPPENED',
      http: {
        status: 404,
        headers: new Map([
          ['some-header', 'it was bad'],
          ['another-header', 'seriously'],
        ]),
      },
    },
  });
}

// !! Sample Data
const data = [
  {
    id: '1',
    title: 'programming',
    description: 'learn javascript frameworks in 2024.',
  },
  {
    id: '2',
    title: 'student',
    description: 'alireza is a student in a React.js course',
  },
];

const products = [
  {
    id: '1',
    name: 'shirt',
    price: '350',
  },
  {
    id: '2',
    name: 'jacket',
    price: '210',
  },
];

// !! Blog Post Schema and Model
const { Schema } = mongoose;
const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    collection: 'Blog',
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.id;
      },
    },
    toObject: { virtuals: true },
  }
);

const BlogModel = mongoose.model('Blog', BlogSchema);

// !! Resolvers
const resolvers = {
  Query: {
    // Blog
    getBlog: async () => {
      const data = await BlogModel.find();
      if (!data) {
        return ErrorMessage('Not Found Blogs');
      }
      return data;
    },
    // Job
    job: async () => data,
    jobById: async (_root, args) => {
      const { id } = args;
      const job = data.find((item) => item.id === id);
      if (job) return job;
      return ErrorMessage(`No job found with id ${id}`);
    },
    // Company
    companyById: (_root, args) => {
      const { id } = args;
      return {
        id,
        name: 'udemy',
        description: 'learning programming',
      };
    },
    // Product
    product: async () => products,
    productById: async (_root, args) => {
      const { id } = args;
      const product = products.find((item) => item.id === id);
      if (product) return product;
      return null;
    },
  },
  //  Job
  Job: {
    company: () => ({
      id: `${Math.floor(Math.random() * 21)}`,
      name: 'udemy',
      description: 'learning programming',
    }),
  },

  Mutation: {
    // Job
    createJob: async (_root, { title, description }) => ({
      id: uuidv4(),
      title,
      description,
    }),
    // Blog
    createBlog: async (_root, { data }) => {
      const { title, content, author } = data;
      console.log(data);
      if (!title || !content || !author) {
        return ErrorMessage('Please Enter title,content,author');
      }
      const blog = await BlogModel.create({ title, content, author });
      return blog;
    },
    deleteBlog: async (_root, args) => {
      const { id } = args;
      const blog = await BlogModel.deleteOne({ _id: id });
      if (blog.deletedCount === 0) {
        return ErrorMessage('The blog post was not found.');
      }
      return {
        status: 200,
      };
    },
  },
};

export { resolvers };
