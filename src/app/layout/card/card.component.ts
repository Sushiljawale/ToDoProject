import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validator, Validators } from '@angular/forms';
import { myTask } from 'src/app/models/task';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  todoform!:FormGroup;
  tasks:myTask[]=[];
  inProgress:myTask[]=[];
  done:myTask[]=[];
  updateIndex!:any;
  isEditEnabled:boolean=false;

    constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.todoform=this.fb.group({
      item:['',Validators.required]
      
    });
    
  } 
  
  addTask(){
    this.tasks.push({
      description: this.todoform.value.item,
      done:false
    });
    this.todoform.reset();
  }

  deleteTask(i:number){
      this.tasks.splice(i,1)
  
    }

    deleteInProgress(i:number){
      this.inProgress.splice(i,1)

    }

    deleteDoneTask(i:number){
      this.done.splice(i,1)

    }

    

    onEdit(item:myTask,i:number){
      this.todoform.controls['item'].setValue(item.description);
      this.updateIndex=i;
      this.isEditEnabled=true;

    }

    updateTask(){
this.tasks[this.updateIndex].description=this.todoform.value.item;
this.tasks[this.updateIndex].done=false;
this.todoform.reset();
this.updateIndex=undefined;
this.isEditEnabled=false;
    }
  

  drop(event: CdkDragDrop<myTask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }


}
