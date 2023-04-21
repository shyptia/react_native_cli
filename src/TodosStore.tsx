import {makeObservable, action, observable} from 'mobx';
import {Todo} from '../type/Todo';

class TodosStore {
  todos: Todo[] = [];

  constructor() {
    makeObservable(this, {
      todos: observable,
      addTodo: action.bound,
    });
  }

  addTodo(newTodo: Todo) {
    this.todos = [...this.todos, newTodo];
  }
}

export const todosStore = new TodosStore();
