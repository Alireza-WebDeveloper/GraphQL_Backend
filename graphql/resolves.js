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

const resolvers = {
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
  },
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
