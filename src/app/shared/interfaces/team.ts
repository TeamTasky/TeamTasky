export interface Team {
    id: string;
    adminId: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    membersIds?: string[];
    showFullDescription?: boolean;
  }
