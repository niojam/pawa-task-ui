import { defineStore } from 'pinia';

import { DashboardState } from './types.ts';
import { TaskApi } from '../api/TaskApi.ts';
import { Task, TaskCreateRequest, TaskUpdateRequest } from '../api/types.ts';
import { parseISO } from 'date-fns';

export const useTaskStore = defineStore({
  id: 'task-store',
  state: (): DashboardState => ({
    tasks: [],
  }),
  getters: {
    getAllTasksSortedByDeadline: (state) => {
      return state.tasks.sort((a, b) => (parseISO(a.deadline) < parseISO(b.deadline) ? -1 : 1));
    },
  },
  actions: {
    async loadTasks() {
      try {
        this.tasks = await TaskApi.findAll();
      } catch (error) {
        console.error('Error getting tasks', error);
      }
    },
    async updateTask(id: number, taskRequest: TaskUpdateRequest) {
      try {
        await TaskApi.update(id, taskRequest);
        const task = this.tasks.find((task) => task.id === id);
        task.title = taskRequest.title;
        task.deadline = taskRequest.deadline;
        task.description = taskRequest.description;
        task.priority = taskRequest.priority;
      } catch (error) {
        console.error('Error getting tasks', error);
      }
    },
    async addTask(taskRequest: TaskCreateRequest) {
      try {
        const response: Task = await TaskApi.add(taskRequest);
        this.tasks.push(response);
      } catch (error) {
        console.error('Error getting tasks', error);
      }
    },
    async removeTask(taskId: number) {
      try {
        await TaskApi.remove(taskId);
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
      } catch (error) {
        console.error('Error getting tasks', error);
      }
    },
  },
});
