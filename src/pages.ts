const pages = {
  home: {
    path: '/',
    title: 'Study App',
  },
  gitHubCompanies: {
    index: {
      path: '/github/companies',
      title: 'Various company members',
    },
    members: {
      path: '/github/members/:companyName',
      title: 'Members of %s',
    },
  },
  gitHubRepositories: {
    search: {
      path: '/github/repositories/search',
      title: 'Search GitHub Repository',
    },
  },
  chatApp: {
    path: '/chat',
    title: 'Chat',
  },
  todoList: {
    path: '/todo',
    title: 'Todo List',
  },
};

export default pages;
