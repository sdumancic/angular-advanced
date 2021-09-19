import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { TodoQuery } from '../state/todo-query';
import { TodoStore } from '../state/todo-store';
import { Todo, TodoStatus } from '../todo.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loading = false;
  todos: Todo[] = [];

  constructor(
    private router: Router,
    private todoQuery: TodoQuery,
    private todoStore: TodoStore,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.todoQuery.getIsLoading().subscribe((res) => {
      console.log('getIsLoading from store ', res);
      this.loading = res;
    });
    this.todoQuery.getTodos().subscribe((res) => {
      console.log('getTodos from store', res);
      this.todos = res;
    });
    this.todoQuery
      .getLoaded()
      .pipe(
        take(1),
        filter((res) => !res),
        switchMap(() => {
          this.todoStore.setLoading(true);
          return this.apiService.getTodos();
        })
      )
      .subscribe(
        (res) => {
          this.todoStore.update((state) => {
            return {
              todos: res,
            };
          });
          this.todoStore.setLoading(false);
        },
        (err) => {
          console.log(err);
          this.todoStore.setLoading(false);
        }
      );
  }

  addTodo() {
    this.router.navigate(['akita-home', 'add-todo']);
  }

  markAsComplete(id: string) {
    this.apiService.updateTodo(id, { status: TodoStatus.DONE }).subscribe(
      (res) => {
        this.todoStore.update((state) => {
          const todos = [...state.todos];
          const index = todos.findIndex((i) => i._id === id);
          if (index > -1) {
            todos[index] = {
              ...todos[index],
              status: TodoStatus.DONE,
            };
          }
          return {
            ...state,
            todos,
          };
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteTodo(id: string) {
    this.apiService.deleteTodo(id).subscribe(
      (res) => {
        this.todoStore.update((state) => {
          return {
            ...state,
            todos: state.todos.filter((t) => t._id !== id),
          };
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
