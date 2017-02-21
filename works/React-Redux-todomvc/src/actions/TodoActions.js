'use strict';

const Actions = {
  addTodo: text => ({
    type: 'todo/ADD_TODO',
    payload: text
  }),

  deleteCompletedTodos: () => ({
    type: 'todo/DELETE_COMPLETED_TODOS'
  }),

  deleteTodo: id => ({
    type: 'todo/DELETE_TODO',
    payload: id
  }),

  editTodo: (id, text) => ({
    type: 'todo/EDIT_TODO',
    payload: {id, text}
  }),

  startEditingTodo: id => ({
    type: 'todo/START_EDITING_TODO',
    payload: id
  }),

  stopEditingTodo: () => ({
    type: 'todo/STOP_EDITING_TODO'
  }),

  toggleAllTodos: () => ({
    type:'todo/TOGGLE_ALL_TODOS'
  }),

  toggleTodo: id => ({
    type: 'todo/TOGGLE_TODO',
    payload: id
  }),

  updateDraft: (text) => ({
    type: 'todo/UPDATE_DRAFT',
    payload: text
  })
};

export default Actions;
