export interface User {
    id: string;
    email: any;
    displayName?: string;
    photoURL?: string;
    teamIds?: string[];
    createdAt?: Date;
}