export default {
  projectNames: (state) => {
    if (!state.projects.length) {
      return [];
    }
    return state.projects.map((project) => {
      return project.name;
    });
  },
  words: (state) => {
    const data = state.projects.filter((project) => {
      return project.name === state.selectedProject;
    })[0];

    if (!data) {
      return [];
    }

    return data.words;
  }
};
