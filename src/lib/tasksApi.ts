export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  time: string | null;
  itemType: 'Task' | 'Reminder';
  category: 'Focus' | 'Meeting' | 'Personal' | 'Work';
  status: string;
  energy: string | null;
  scheduledDate: string | null;
  createdAt: string;
}

export async function fetchTasks(getToken: () => Promise<string | null>): Promise<Task[]> {
  const token = await getToken();
  const res = await fetch('/api/tasks', {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

export async function createTask(taskData: Partial<Task>, getToken: () => Promise<string | null>): Promise<Task> {
  const token = await getToken();
  const res = await fetch('/api/tasks', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify(taskData)
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to create task');
  }
  return res.json();
}

export async function updateTask(taskId: string, updateData: Partial<Task>, getToken: () => Promise<string | null>): Promise<Task> {
  const token = await getToken();
  const res = await fetch(`/api/tasks/${taskId}`, {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify(updateData)
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to update task');
  }
  return res.json();
}

export async function deleteTask(taskId: string, getToken: () => Promise<string | null>): Promise<{ success: boolean }> {
  const token = await getToken();
  const res = await fetch(`/api/tasks/${taskId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to delete task');
  }
  return res.json();
}
