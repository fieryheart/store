'use strict';

// import Immutable from 'immutable';

// const Todo = Immutable.Record({
//   id: '',
//   complete: false,
//   text: '',
// });

class Todo {
  constructor(id, complete, text){
    this.id = id;
    this.complete = complete;
    this.text = text;
  }
}

export default Todo;
