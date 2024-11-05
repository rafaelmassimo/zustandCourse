
//Type is better for status, lists, booleans, but both could have made by using type
export type TaskStatus = 'open' | 'in-progress' | 'done';

//Interface better for objects
export interface Task {
    id:string;
    title: string;
    status: TaskStatus;
}


//* JUST AN EXAMPLE HOW TO EXTEND A INTERFACE
// interface Task {
//     id: string;
//     title: string;
//     status: TaskStatus;
// }

// interface DetailedTask extends Task {
//     description: string;
// }