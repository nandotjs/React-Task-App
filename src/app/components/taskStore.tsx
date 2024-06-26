import create from "zustand"

interface Task {
  title: string
  completed: boolean
  _id: string
}

interface TaskStore {
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  addTask: (task: string) => void
  deleteTask: (index: number) => void
  toggleTask: (index: number) => void
  markAllCompleted: () => void
  deleteAllTasks: () => void
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  addTask: (title) =>
    set((state) => ({
      tasks: [...state.tasks, { title, completed: false, _id: "" }],
    })),
  deleteTask: (index) =>
    set((state) => ({ tasks: state.tasks.filter((_, i) => i !== index) })),
  toggleTask: (index) =>
    set((state) => ({
      tasks: state.tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      ),
    })),
  markAllCompleted: () =>
    set((state) => ({
      tasks: state.tasks.map((task) => ({ ...task, completed: true })),
    })),
  deleteAllTasks: () => set({ tasks: [] }),
}))
