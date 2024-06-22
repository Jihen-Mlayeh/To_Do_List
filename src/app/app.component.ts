import { Component, OnInit, ViewChild} from '@angular/core';
import { Todo } from './todo';
import { AppService } from './app.service';
import { CheckboxChangeEvent } from 'primeng/checkbox';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('todoTask') todoTask: any;
  task=''
  todos:Todo[]=[]
  constructor(private appService:AppService ){}
  
  
  ngOnInit(): void {
    this.appService.getTodoList().subscribe(
      Response=>this.todos=Response
    )
  }
  getList():void{
    this.appService.getTodoList().subscribe(
      Response=>this.todos=Response
    )
  }
  

  updateTodo(e:CheckboxChangeEvent,todo:Todo){
    this.appService.updateTodo({...todo,completed:e.checked})
    .subscribe
    (response=>console.log(response))

  }
  deleteTodo(e:unknown, todo:Todo){
    this.appService.deleteTodo(todo.id).subscribe(
      response=>this.getList()
    )
   
   
    }

  
  addTodo(){
    this.appService.addTodo({task:this.task,completed:false}).subscribe(
      Response=>{console.log(Response)
        this.todoTask.reset()
        this.appService.getTodoList().subscribe(
          Response=>this.todos=Response
        )
      }
    )
  }
}
