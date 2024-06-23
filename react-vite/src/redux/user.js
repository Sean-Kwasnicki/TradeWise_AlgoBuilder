// Actions
const LOAD_USERS = 'users/LOAD_USERS';
const ADD_USER = 'users/ADD_USER';
const UPDATE_USER = 'users/UPDATE_USER';
const DELETE_USER = 'users/DELETE_USER';

// Action Creators
const loadUsers = (users) => ({
  type: LOAD_USERS,
  users,
});

const addUser = (user) => ({
  type: ADD_USER,
  user,
});

const updateUser = (user) => ({
  type: UPDATE_USER,
  user,
});

const deleteUser = (userId) => ({
  type: DELETE_USER,
  userId,
});

// Thunks
export const fetchUsers = () => async (dispatch) => {
  const response = await fetch('/api/users');
  if (response.ok) {
    const users = await response.json();
    dispatch(loadUsers(users));
  }
};

export const createUser = (user) => async (dispatch) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (response.ok) {
    const newUser = await response.json();
    dispatch(addUser(newUser));
  }
};

export const updateUserThunk = (user) => async (dispatch) => {
  const response = await fetch(`/api/users/${user.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (response.ok) {
    const updatedUser = await response.json();
    dispatch(updateUser(updatedUser));
  }
};

export const deleteUserThunk = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(deleteUser(userId));
  }
};

// Reducer
const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USERS:
      const newUsers = {};
      action.users.forEach((user) => {
        newUsers[user.id] = user;
      });
      return { ...state, ...newUsers };
    case ADD_USER:
      return { ...state, [action.user.id]: action.user };
    case UPDATE_USER:
      return { ...state, [action.user.id]: action.user };
    case DELETE_USER:
      const newState = { ...state };
      delete newState[action.userId];
      return newState;
    default:
      return state;
  }
};

export default userReducer;
