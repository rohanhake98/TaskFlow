import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Calendar,
  Users as UsersIcon,
  CheckSquare
} from 'lucide-react';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const projects = [
  {
    id: 1,
    name: 'Website Redesign',
    description: 'Complete overhaul of the company website with modern design',
    status: 'active',
    progress: 75,
    tasks: { completed: 18, total: 24 },
    members: 4,
    deadline: '2024-03-15',
    color: '#3b82f6',
  },
  {
    id: 2,
    name: 'Mobile App Development',
    description: 'Cross-platform mobile application for iOS and Android',
    status: 'active',
    progress: 45,
    tasks: { completed: 14, total: 32 },
    members: 6,
    deadline: '2024-04-01',
    color: '#10b981',
  },
  {
    id: 3,
    name: 'API Integration',
    description: 'Third-party API integration for payment processing',
    status: 'review',
    progress: 90,
    tasks: { completed: 11, total: 12 },
    members: 2,
    deadline: '2024-03-10',
    color: '#f59e0b',
  },
  {
    id: 4,
    name: 'Database Migration',
    description: 'Migrate legacy database to new cloud infrastructure',
    status: 'planning',
    progress: 15,
    tasks: { completed: 3, total: 18 },
    members: 3,
    deadline: '2024-03-25',
    color: '#8b5cf6',
  },
  {
    id: 5,
    name: 'Security Audit',
    description: 'Comprehensive security review and penetration testing',
    status: 'on_hold',
    progress: 60,
    tasks: { completed: 6, total: 10 },
    members: 2,
    deadline: '2024-03-20',
    color: '#ef4444',
  },
  {
    id: 6,
    name: 'Analytics Dashboard',
    description: 'Real-time analytics and reporting dashboard',
    status: 'completed',
    progress: 100,
    tasks: { completed: 20, total: 20 },
    members: 3,
    deadline: '2024-02-28',
    color: '#06b6d4',
  },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  planning: { label: 'Planning', className: 'status-todo' },
  active: { label: 'Active', className: 'status-in-progress' },
  review: { label: 'In Review', className: 'status-review' },
  on_hold: { label: 'On Hold', className: 'bg-muted text-muted-foreground' },
  completed: { label: 'Completed', className: 'status-completed' },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Projects</h1>
              <p className="text-muted-foreground">Manage and track all your projects</p>
            </div>
            <Button variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  {statusFilter === 'all' ? 'All Status' : statusConfig[statusFilter]?.label}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                  All Status
                </DropdownMenuItem>
                {Object.entries(statusConfig).map(([key, value]) => (
                  <DropdownMenuItem key={key} onClick={() => setStatusFilter(key)}>
                    {value.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all cursor-pointer group"
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[project.status].className}`}>
                      {statusConfig[project.status].label}
                    </span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Project</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Project Info */}
                <h3 className="text-lg font-semibold text-foreground mb-2">{project.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium text-foreground">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <CheckSquare className="w-4 h-4" />
                      {project.tasks.completed}/{project.tasks.total}
                    </span>
                    <span className="flex items-center gap-1">
                      <UsersIcon className="w-4 h-4" />
                      {project.members}
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
