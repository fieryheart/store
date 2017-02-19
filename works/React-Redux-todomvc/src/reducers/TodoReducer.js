import Counter from './Counter';
import Todo from './Todo';

export default (state = {
  text: '',
  editing: '',
  didTodos: 0,
  willTodos: 0,
  todos: []
}, Actions) => {
  let newState={},
       index=null,
       text='',
       todo={};

  switch (Actions.type) {

    case 'todo/ADD_TODO':
      if(!Actions.preload){
        return state;
      }
      const id = Counter.increment();
      newState = Object.assign({}, state, {
        todos: state.todos.push(new Todo(id, false, Actions.preload)),
        willTodos: state.willTodos++
      })
      return newState;

    case 'todo/DELETE_COMPLETED_TODOS':
      newState = Object.assign({}, state, {
        todos: state.todos.filter(todo => !todo.complete),
        didTodos: 0
      })
      return newState;

    case 'todo/DELETE_TODO':
      index = Actions.preload;
      if(state.todos[index - 1]){
        newState = Object.assign({}, state, {
          todos: state.todos.filter(todo => todo.id != index),
          didTodos: state.didTodos - 1
        })
      }else{
        newState = Object.assign({}, state, {
          todos: state.todos.filter(todo => todo.id != index),
          willTodos: state.willTodos - 1
        })
      }
      return newState;

    case 'todo/EDIT_TODO':
      index = Actions.preload.id;
      text = Actions.preload.text;
      newState = Object.assign({}, state, {
        todos: [
          ...state.todos.slice(0, index-1),
          Object.assign({}, state.todos[index-1], {text}),
          ...state.todos.slice(index)
        ]
      })
      return newState;

      case 'todo/START_EDITING_TODO':
        newState = Object.assign({}, state, {
          editing: Actions.preload
        })
        return newState;

      case 'todo/STOP_EDITING_TODO':
        newState = Object.assign({}, state, {
          editing: ''
        })
        return newState;

    case 'todo/TOGGLE_ALL_TODOS':
      const areAllComplete = state.todos.every(todo => todo.complete);
      newState = Object.assign({}, state, {
        todos: state.todos.map(todo => {
          todo.complete = !areAllComplete;
        })
      });
      return newState;

    case 'todo/TOGGLE_TODO':
      index = Actions.preload;
      todo = state.todos[index-1];
      newState = Object.assign({}, state, {
        todos: [
          ...state.todos.slice(0, index-1),
          Object.assign({}, todo, {'complete': !todo.complete}),
          ...state.todos.slice(index)
        ]
      });
      return newState;

      case 'todo/UPDATE_DRAFT':
        newState = Object.assign({}, state, {
          text: Actions.preload
        })
        return newState;

      default:
        return state;
  }
}
