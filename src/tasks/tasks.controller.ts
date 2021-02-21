import { Body, Catch, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, UseFilters } from '@nestjs/common';
import { Task } from './shared/task';
import { TaskService } from './shared/task.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TaskService) {

    }
    
    @Get()
    async getAll() : Promise<Task[] | HttpException> {
        return this.taskService.getAll();
    }

    @Get(":id")
    async getById(@Param("id") id: string) : Promise<Task | HttpException> {
        return this.taskService.getById(id);    
    }

    @Post()
    async create(@Body() task: Task): Promise<Task> {
        return this.taskService.create(task);
    }

    @Put(":id")
    async update(@Param("id") id: string, @Body() task: Task): Promise<Task | HttpException> {
        return this.taskService.update(id, task);
    }

    @Delete(":id")
    async delete(@Param("id") id: string): Promise<any> {
        return this.taskService.delete(id);
    }
}


