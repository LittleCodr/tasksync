import { create } from 'zustand';
import { Task } from '../types/task';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  reorderTasks: (startIndex: number, endIndex: number) => void;
  sortTasks: (priorityOrder: string[]) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (taskId, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      ),
    })),
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
  reorderTasks: (startIndex, endIndex) =>
    set((state) => {
      const newTasks = [...state.tasks];
      const [removed] = newTasks.splice(startIndex, 1);
      newTasks.splice(endIndex, 0, removed);
      return { tasks: newTasks };
    }),
  sortTasks: (priorityOrder) =>
    set((state) => {
      const todoTasks = state.tasks.filter(task => task.status === 'todo');
      const otherTasks = state.tasks.filter(task => task.status !== 'todo');
      
      const sortedTodoTasks = [...todoTasks].sort((a, b) => {
        const aIndex = priorityOrder.indexOf(a.title);
        const bIndex = priorityOrder.indexOf(b.title);
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
      });

      return {
        tasks: [...sortedTodoTasks, ...otherTasks]
      };
    }),
}));