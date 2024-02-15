import axios from "axios";

const LOAD_USERS = "LOAD_USERS";

const _loadUsers = (users) => {
  return { type: LOAD_USERS, users };
};

export const loadUsers = () => {
  return async (dispatch) => {
    const users = (await axios.get("/api/users")).data;
    dispatch(_loadUsers(users));
  };
};

export const users = (state = [], action) => {
  switch (action.type) {
    case LOAD_USERS:
      return action.users;
    default:
      return state;
  }
};
