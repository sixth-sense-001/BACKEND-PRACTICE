import crypto from 'node:crypto';

const tasks = [
  {
    id: crypto.randomUUID(),
    title: 'Finish backend practice',
    description: 'Complete the Task Management API',
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: crypto.randomUUID(),
    title: 'Study mathematics',
    description: 'Review equations and inequalities',
    priority: 'medium',
    status: 'pending'
  },
  {
    id: crypto.randomUUID(),
    title: 'Complete physics assignment',
    description: 'Solve the mechanics exercises',
    priority: 'high',
    status: 'pending'
  },
  {
    id: crypto.randomUUID(),
    title: 'Read database chapter',
    description: 'Study PostgreSQL and database concepts',
    priority: 'medium',
    status: 'completed'
  },
  {
    id: crypto.randomUUID(),
    title: 'Practice JavaScript',
    description: 'Solve array and object exercises',
    priority: 'low',
    status: 'in-progress'
  },
  {
    id: crypto.randomUUID(),
    title: 'Build portfolio',
    description: 'Add recent projects to the portfolio',
    priority: 'high',
    status: 'pending'
  },
  {
    id: crypto.randomUUID(),
    title: 'Review Express middleware',
    description: 'Practice creating custom middleware',
    priority: 'medium',
    status: 'completed'
  },
  {
    id: crypto.randomUUID(),
    title: 'Practice REST APIs',
    description: 'Build and test different API endpoints',
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: crypto.randomUUID(),
    title: 'Learn Git commands',
    description: 'Practice branching and merging',
    priority: 'low',
    status: 'pending'
  },
  {
    id: crypto.randomUUID(),
    title: 'Study algorithms',
    description: 'Practice searching and sorting algorithms',
    priority: 'high',
    status: 'pending'
  },
  {
    id: crypto.randomUUID(),
    title: 'Clean project files',
    description: 'Organize the backend project structure',
    priority: 'low',
    status: 'completed'
  },
  {
    id: crypto.randomUUID(),
    title: 'Practice PostgreSQL',
    description: 'Create tables and execute SQL queries',
    priority: 'medium',
    status: 'in-progress'
  }
];

export default tasks;