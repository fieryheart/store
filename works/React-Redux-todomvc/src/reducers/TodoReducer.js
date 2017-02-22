import Counter from './Counter';
import { fromJS } from 'immutable';

const initailState = {
  text: '',
  editing: '',
  didTodos: 0,
  willTodos: 0,
  todos: []
}

export default (state = initailState, Actions) => {
  
  let newState={},
       index=null,
       willTodos = state.willTodos,
       didTodos = state.didTodos;

  switch (Actions.type) {

        case 'todo/ADD_TODO':
                  if(!Actions.payload){
                        return state;
                  }
                  const id = Counter.increment();
                  let newTodo = {
                      id: id,
                      complete: false,
                      text: Actions.payload
                  };
                  return fromJS(state).update('todos', list => list.push(newTodo))
                                        .set('willTodos', state.willTodos + 1)
                                        .toJS();

        case 'todo/DELETE_COMPLETED_TODOS':
                  let i = 1;
                  newState = Object.assign({}, state, {
                              todos: state.todos.filter(todo => !todo.complete),
                              didTodos: 0
                        })
                  newState.todos.map(todo => todo.id = i++);
                  Counter.assign(i);
                  return newState;

      case 'todo/DELETE_TODO':
                    index = Actions.payload;
                    Counter.subtracter();
                    if(state.todos[Actions.payload - 1].complete){
                              newState = Object.assign({}, state, {
                                  todos: state.todos.filter(todo => todo.id != index),
                                  didTodos: didTodos - 1
                              })
                    }else{
                              newState = Object.assign({}, state, {
                                  todos: state.todos.filter(todo => todo.id != index),
                                  willTodos: willTodos - 1
                              })

                    }
                    return newState;

      case 'todo/EDIT_TODO':
            return fromJS(state).setIn(['todos', Actions.payload.id-1, 'text'], Actions.payload.text).toJS();

      case 'todo/START_EDITING_TODO':
            return fromJS(state).set('editing', Actions.payload).toJS();

      case 'todo/STOP_EDITING_TODO':
            return fromJS(state).set('editing', '').toJS();

      case 'todo/TOGGLE_ALL_TODOS':
            const areAllComplete = state.todos.every(todo => todo.complete);
            return fromJS(state).update('todos', list => list.map(todo => todo.set('complete', !areAllComplete)))
                                            .set('didTodos', state.didTodos+state.willTodos)
                                            .set('willTodos', 0)
                                            .toJS();

      case 'todo/TOGGLE_TODO':
            let complete = !state.todos[Actions.payload-1].complete;
            return fromJS(state).setIn(['todos', Actions.payload-1, 'complete'], complete)
                                            .set('willTodos', state.willTodos - 1)
                                            .set('didTodos', state.didTodos + 1)
                                            .toJS();

      default:
            return state;
  }
}
