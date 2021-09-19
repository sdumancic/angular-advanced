import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { TodoQuery } from '../state/todo-query';
import { TodoState, TodoStore } from '../state/todo-store';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  form: FormGroup;

  constructor(
    private apiService: ApiService,
    private todoStore: TodoStore,
    private todoQuery: TodoQuery,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
  }

  addTodo() {
    this.todoStore.setLoading(true);
    this.apiService
      .addTodo(
        this.form.controls['title'].value,
        this.form.controls['description'].value
      )
      .subscribe((res) => {
        this.todoStore.update((state) => {
          return { todos: [...state.todos, res] };
        });
        this.todoStore.setLoading(false);
        this.router.navigateByUrl('akita-home');
      });
  }
}
