import { Injectable } from '@nestjs/common';
import { lstat } from 'node:fs';
import { Task } from './task';

@Injectable()
export class TaskService {
    tasks: Task[] = [
        {
            id: 1,
            description: "Tarefa 1",
            completed: true
        },

        {
            id: 2,
            description: "Tarefa 2",
            completed: true
        },

        {
            id: 3,
            description: "Tarefa 3",
            completed: false
        },

        {
            id: 4,
            description: "Tarefa 4",
            completed: false
        }
    ]

    getAll() {
        return this.tasks;
    }

    getById(id: number) {
        const task = this.tasks.find((task) => task.id == id);

        return task;
    }

    create(task: Task) {
        let lastId: number = 0;

        if (this.tasks.length > 0) {
            lastId = this.tasks[this.tasks.length - 1].id;
            task.id = lastId + 1;
        }

        this.tasks.push(task);

        return task as Task;
    }

    update(task: Task) {
        let targetTask = this.getById(task.id);

        if (targetTask) {
            targetTask = {
                ...targetTask,
                description: task.description,
                completed: task.completed
            }

            this.tasks[task.id - 1] = targetTask;

            return targetTask; 
        } else {
            return {
                status: 400,
                response: "Task not found!"
            } 
        }
    }

    delete(id: number): {status: number, response: string} {
        const targetTask = this.getById(id);

        console.log("Aaaa");
        console.log(targetTask);

        if (targetTask) {
            this.tasks.splice(id - 1, 1);

            return {
                status: 200,
                response: "Task deleted successfully!"
            }
        } else {
            return {
                status: 400,
                response: "Task not found!"
            }
        }
    }
}
