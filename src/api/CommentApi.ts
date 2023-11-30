import { http } from './HttpClient.ts';
import {CommentCreateRequest, CommentCreateResponse, Task, TaskCreateRequest, TaskUpdateRequest} from "./types.ts";

export const CommentApi = {
  add: (request: CommentCreateRequest): Promise<CommentCreateResponse> => {
    return http.post({
      url: `/comment`,
      data: request,
    });
  },
};
