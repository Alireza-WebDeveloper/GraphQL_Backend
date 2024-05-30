import { v4 as uuidv4 } from 'uuid';

const resolvers = {
  Query: {
    job: async () => {
      return [
        {
          id: uuidv4(),
          title: 'programming',
          description: 'learn javascript frameworks on 2024.',
        },
        {
          id: uuidv4(),
          title: 'student',
          description: 'alireza are students course react.js',
        },
      ];
    },
  },
  Job: {
    title: (job) => {
      console.log(job);
      return ` job.title:auth-alireza`;
    },
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
