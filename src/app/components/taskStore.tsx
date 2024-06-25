import create from 'zustand';

interface TaskStore {
  tasks: string[];
  setTasks: (tasks: string[]) => void;
  addTask: (task: string) => void;
  deleteTask: (index: number) => void;
  toggleTask: (index: number) => void;
  markAllCompleted: () => void;
  deleteAllTasks: () => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  deleteTask: (index) => set((state) => ({ tasks: state.tasks.filter((_, i) => i !== index) })),
  toggleTask: (index) =>
    set((state) => ({
      tasks: state.tasks.map((task, i) =>
        i === index ? (task.includes('(Feito)') ? task.replace(' (Feito)', '') : task + ' (Feito)') : task
      ),
    })),
  markAllCompleted: () => set((state) => ({ tasks: state.tasks.map((task) => task + ' (Feito)') })),
  deleteAllTasks: () => set({ tasks: [] }),
}));
