import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, MoreHorizontal, Clock, User } from 'lucide-react';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Task {
  id: number;
  title: string;
  description: string;
  project: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in_progress' | 'review' | 'completed';
  dueDate: string;
}

const tasks: Task[] = [
  { id: 1, title: 'Design homepage mockups', description: 'Create wireframes and high-fidelity designs', project: 'Website Redesign', assignee: 'Alice', priority: 'high', status: 'in_progress', dueDate: '2024-03-08' },
  { id: 2, title: 'Implement user authentication', description: 'Set up OAuth and email authentication', project: 'Mobile App', assignee: 'Bob', priority: 'urgent', status: 'in_progress', dueDate: '2024-03-07' },
  { id: 3, title: 'Write API documentation', description: 'Document all endpoints with examples', project: 'API Integration', assignee: 'Charlie', priority: 'medium', status: 'todo', dueDate: '2024-03-12' },
  { id: 4, title: 'Database schema design', description: 'Design normalized database schema', project: 'Database Migration', assignee: 'Diana', priority: 'high', status: 'review', dueDate: '2024-03-09' },
  { id: 5, title: 'Set up CI/CD pipeline', description: 'Configure automated testing and deployment', project: 'Website Redesign', assignee: 'Eve', priority: 'medium', status: 'todo', dueDate: '2024-03-15' },
  { id: 6, title: 'Performance optimization', description: 'Optimize database queries and caching', project: 'Mobile App', assignee: 'Alice', priority: 'low', status: 'completed', dueDate: '2024-03-05' },
  { id: 7, title: 'Security vulnerability scan', description: 'Run security scans and fix issues', project: 'Security Audit', assignee: 'Bob', priority: 'urgent', status: 'in_progress', dueDate: '2024-03-06' },
  { id: 8, title: 'User testing sessions', description: 'Conduct user testing with 5 participants', project: 'Website Redesign', assignee: 'Charlie', priority: 'medium', status: 'todo', dueDate: '2024-03-14' },
];

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

  const getTasksByStatus = (status: string) =>
    tasks.filter(
      (task) =>
        task.status === status &&
        (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.project.toLowerCase().includes(searchQuery.toLowerCase()))
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

          {/* Kanban Board */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto">
            {columns.map((column) => (
              <div key={column.id} className="kanban-column min-w-[280px]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${column.color}`} />
                    <h3 className="font-semibold text-foreground">{column.title}</h3>
                    <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {getTasksByStatus(column.id).length}
                    </span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3"
                >
                  {getTasksByStatus(column.id).map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-card border border-border rounded-lg p-4 cursor-pointer hover:border-primary/30 transition-all group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${priorityConfig[task.priority].className}`}>
                          {priorityConfig[task.priority].label}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
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

                      <h4 className="font-medium text-foreground text-sm mb-1">{task.title}</h4>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{task.description}</p>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1 bg-muted px-2 py-1 rounded">
                          {task.project}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center" title={task.assignee}>
                            <User className="w-3 h-3 text-primary" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
