import { v4 as uuidv4 } from 'uuid';

const data = [
  {
    id: '1',
    title: 'programming',
    description: 'learn javascript frameworks on 2024.',
  },
  {
    id: '2',
    title: 'student',
    description: 'alireza are students course react.js',
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

const resolvers = {
  // Query Functions
  Query: {
    job: async () => {
      return data;
    },
    jobById: (_root, args) => {
      const { id } = args;
      const find = data.find((item) => item.id === id);
      if (find) return find;
      return null;
    },
    companyById: (_root, args) => {
      const { id } = args;
      return {
        id,
        name: 'udemy',
        description: 'learning programming',
      };
    },
    product: async (_root, args) => {
      return products;
    },
    productById: async (_root, args) => {
      const { id } = args;
      console.log(args);
      const find = products.find((item) => item.id === id);
      if (find) return find;
      return null;
    },
  },

  // Types State
  Job: {
    company: () => {
      return {
        id: `${Math.floor(Math.random() * 21)}`,
        name: 'udemy',
        description: 'learning programming',
      };
    },
  },
};

export { resolvers };
