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

//  Course Data
const courses = [
  {
    name: 'React',
    description: 'A JavaScript library for building user interfaces',
  },
  { name: 'Vue', description: 'The Progressive JavaScript Framework' },
  { name: 'Angular', description: 'One framework. Mobile & desktop.' },
  { name: 'Svelte', description: 'Cybernetically enhanced web apps' },
  { name: 'Ember', description: 'A framework for ambitious web developers' },
  {
    name: 'Backbone',
    description:
      'Give your JS App some Backbone with Models, Views, Collections, and Events',
  },
  { name: 'jQuery', description: 'Write less, do more.' },
  { name: 'Next.js', description: 'The React Framework for Production' },
  { name: 'Nuxt.js', description: 'The Intuitive Vue Framework' },
  { name: 'Gatsby', description: 'Fast in every way that matters' },
  { name: 'Meteor', description: 'The fastest way to build JavaScript apps' },
  { name: 'Aurelia', description: 'The next generation UI framework' },
  { name: 'Polymer', description: 'Build modern apps using web components' },
  {
    name: 'Alpine.js',
    description: 'Think of it like Tailwind for JavaScript',
  },
  {
    name: 'Stimulus',
    description: 'A modest JavaScript framework for the HTML you already have',
  },
  {
    name: 'Preact',
    description: 'Fast 3kB alternative to React with the same modern API',
  },
  {
    name: 'Inferno',
    description:
      'An extremely fast, React-like JavaScript library for building modern user interfaces',
  },
  {
    name: 'LitElement',
    description:
      'A simple base class for creating fast, lightweight web components',
  },
  {
    name: 'Hyperapp',
    description: 'The tiny framework for building hypertext applications',
  },
  {
    name: 'Marko',
    description:
      'A friendly (and fast!) UI library that makes building web apps fun',
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
    // Course
    getCourse: async (_root, { page = 1, limit = 10 }, context) => {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      return {
        status: 200,
        message: 'success',
        count: courses.length,
        data: {
          course: courses.slice(startIndex, endIndex),
        },
      };
    },
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
    companyById: (_root, args, context) => {
      const { user } = context;

      if (user) {
        throw 'Error: Authentication required. Please log in to view blogs.';
      }
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
    // Account
    getAccount: async (_root, { username, password }, context) => {
      console.log(username, password);
      return args;
    },
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
