export type Project = {
  id: string;
  name: string;
  description?: string;
  dueDate?: string;
};

export type TaskStatus = "backlog" | "todo" | "doing" | "done";

export type Task = {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  owner?: string;
};

const projects: Project[] = [
  {
    id: "demo",
    name: "Demo Project",
    description: "A fake project so the UI isn't empty.",
    dueDate: "2026-03-01",
  },
];

const tasks: Task[] = [
  {
    id: "t1",
    projectId: "demo",
    title: "Read brief",
    description: "Extract requirements and constraints.",
    status: "todo",
    owner: "Filo",
  },
  {
    id: "t2",
    projectId: "demo",
    title: "Design MVP screens",
    description: "Decide the smallest end-to-end flow.",
    status: "doing",
    owner: "Gilf",
  },
  {
    id: "t3",
    projectId: "demo",
    title: "Ship",
    description: "Deploy somewhere and stop talking.",
    status: "backlog",
  },
];

export const mockDb = {
  listProjects(): Project[] {
    return [...projects];
  },
  getProject(id: string): Project | undefined {
    return projects.find((p) => p.id === id);
  },
  listTasks(projectId: string): Task[] {
    return tasks.filter((t) => t.projectId === projectId);
  },
};
