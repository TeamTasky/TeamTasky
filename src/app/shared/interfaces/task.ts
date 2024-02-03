export interface Task {
    id: string;
    teamId?: string;
    title: string;
    description?: string;
    completed: boolean;
    starred: boolean;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
  }
