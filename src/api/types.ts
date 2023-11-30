export interface Task {
    id?: number;
    title?: string;
    description?: string;
    priority?: Priority;
    deadline?: string;
    createdBy?: string;
    lastEditBy?: string;
}




export interface TaskExtendedData {
    id: number;
    title: string;
    description: string;
    priority: Priority;
    deadline: string; // Assuming Instant is converted to string for simplicity (can use Date or other formats based on requirements)
    createdBy: UserInfo;
    lastEditBy: UserInfo;
    comments: Comment[];
}

export interface TaskUpdateRequest {
    title: number;
    description: string;
    priority: Priority;
    deadline: string;
}

export interface TaskCreateRequest extends TaskUpdateRequest {
    comment: string;
}


export interface UserInfo {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface Comment {
    id: number;
    content: string;
    createdBy: UserInfo;
    createdAt: string;
}

export interface CommentCreateRequest {
    taskId: number;
    content: string;
}

export interface CommentCreateResponse {
    id: number;
    content: string;
    createdAt: string;
}

export enum Priority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    CRITICAL = 'CRITICAL'
}