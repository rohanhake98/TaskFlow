import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { taskService } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Clock, Filter, Loader2, MoreHorizontal, Plus, Search, User } from 'lucide-react';
import { useState } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  project: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in_progress' | 'review' | 'completed';
  due_date: string; // Changed to match API response
}

const columns = [
  { id: 'todo', title: 'To Do', color: 'bg-muted' },
  { id: 'in_progress', title: 'In Progress', color: 'bg-primary/10' },
  { id: 'review', title: 'In Review', color: 'bg-warning/10' },
  { id: 'completed', title: 'Completed', color: 'bg-success/10' },
];

const priorityConfig = {
  low: { label: 'Low', className: 'priority-low' },
  medium: { label: 'Medium', className: 'priority-medium' },
  high: { label: 'High', className: 'priority-high' },
  urgent: { label: 'Urgent', className: 'priority-urgent' },
};

export default function Tasks() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: tasksData, isLoading, isError, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: taskService.getAll
  });

  const errorMessage = (error as any)?.message || "An error occurred fetching tasks.";

  const tasks = tasksData || [];

  const getTasksByStatus = (status: string) =>
    tasks.filter(
      (task: any) =>
        task.status === status &&
        (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (task.project && task.project.toLowerCase().includes(searchQuery.toLowerCase())))
    );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Tasks</h1>
              <p className="text-muted-foreground">Manage your tasks with Kanban board</p>
            </div>
            <Button variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {isLoading ? (
             <div className="flex justify-center items-center h-64">
               <Loader2 className="w-8 h-8 animate-spin text-primary" />
             </div>
          ) : isError ? (
            <div className="flex justify-center items-center h-64 text-destructive">
               <p>Error loading tasks: {errorMessage}</p>
            </div>
          ) : (
          /* Kanban Board */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto">
            {columns.map((column) => (
              <div key={column.id} className="kanban-column min-w-[280px]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${column.color.replace('/10', '')}`} />
                    {column.title}
                  </h3>
                  <span className="text-xs text-muted-foreground font-medium px-2 py-0.5 rounded-full bg-muted">
                    {getTasksByStatus(column.id).length}
                  </span>
                </div>
                
                <div className="space-y-3">
                  {getTasksByStatus(column.id).map((task: any) => (
                    <motion.div
                      key={task.id}
                      layoutId={`task-${task.id}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded ${priorityConfig[task.priority as keyof typeof priorityConfig]?.className}`}>
                          {priorityConfig[task.priority as keyof typeof priorityConfig]?.label || task.priority}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <MoreHorizontal className="w-3 h-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Move to...</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <h4 className="font-medium text-foreground mb-1">{task.title}</h4>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {task.description}
                      </p>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {task.due_date}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {task.assignee || 'Unassigned'}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </main>
    </div>
  );
}
