export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string | null;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function fetchNotes(getToken: () => Promise<string | null>): Promise<Note[]> {
  const token = await getToken();
  const res = await fetch('/api/notes', {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch notes');
  return res.json();
}

export async function createNote(noteData: Partial<Note>, getToken: () => Promise<string | null>): Promise<Note> {
  const token = await getToken();
  const res = await fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(noteData)
  });
  if (!res.ok) throw new Error('Failed to create note');
  return res.json();
}

export async function updateNote(noteId: string, updateData: Partial<Note>, getToken: () => Promise<string | null>): Promise<Note> {
  const token = await getToken();
  const res = await fetch(`/api/notes/${noteId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(updateData)
  });
  if (!res.ok) throw new Error('Failed to update note');
  return res.json();
}
