import { http } from './HttpClient.ts';
import {Task, TaskCreateRequest, TaskUpdateRequest} from "./types.ts";

export const TaskApi = {
  findTaskById: (taskId: number): Promise<Task[]> => {

    return http.get({
      url: `/task/${taskId}`,
    });
  },

  findAll: (): Promise<Task[]> => {
    return http.get({
      url: `/task`,
    });
  },

  add: (request: TaskCreateRequest): Promise<Task> => {
    return http.post({
      url: `/task`,
      data: request,
    });
  },

  update: (id: string, request: TaskUpdateRequest): Promise<void> => {
    return http.put({
      url: `/task/${id}`,
      data: request,
    });
  },

  remove: (id: string): Promise<void> => {
    return http.delete({
      url: `/task/${id}`,
    });
  },
};
