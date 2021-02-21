import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { lstat } from 'node:fs';
import { Task } from './task';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class TaskService {

    constructor(@InjectModel("Task") private readonly taskModel: Model<Task>) {

    }

    async getAll() {
        const allTasks = await this.taskModel.find().exec();    

        if (!allTasks) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: "Could not fetch resource!"
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return allTasks;
    }

    async getById(id: string) {
        const targetTask: Task = await this.taskModel.findById(id).exec();

        if (!targetTask) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: "Task not found!"
            }, HttpStatus.NOT_FOUND);
        }

        return targetTask;
    }
    
    async create(task: Task) {
        const createdTask = new this.taskModel(task);
        return await createdTask.save();
    }

    async update(id: string, task: Task) {
        const targetTask: Task = await this.taskModel.updateOne({
            _id: id
        }, task).exec();
        
        if (!targetTask) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: "Task not found!"
            }, HttpStatus.NOT_FOUND);
        }

        return this.getById(id);
    }

    async delete(id: string) {
        const searchTask = await this.getById(id);

        if (!searchTask) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: "Task not found!"
            }, HttpStatus.NOT_FOUND);
        }

        return await this.taskModel.deleteOne({
            _id: id
        }).exec();
    }
}
