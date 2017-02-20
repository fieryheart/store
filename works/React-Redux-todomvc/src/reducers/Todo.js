'use strict';

// import Immutable from 'immutable';

// const Todo = Immutable.Record({
//   id: '',
//   complete: false,
//   text: '',
// });

export default  class Todo {
  constructor(id, complete, text){
    this.id = id;
    this.complete = complete;
    this.text = text;
  }
}