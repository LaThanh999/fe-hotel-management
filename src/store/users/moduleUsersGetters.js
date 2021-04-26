export default {
  getUserByRole: ({ users }) => (id) => {
    return users.filter((el) => el.role === id);
  },
};
