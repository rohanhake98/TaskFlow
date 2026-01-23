import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { projectService } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
    Calendar,
    CheckSquare,
    Filter,
    Loader2,
    MoreHorizontal,
    Plus,
    Search,
    Users as UsersIcon
} from 'lucide-react';
import { useState } from 'react';

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
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const { data: projectsData, isLoading, isError, error } = useQuery({
    queryKey: ['projects'],
    queryFn: projectService.getAll
  });

  const errorMessage = (error as any)?.message || "An error occurred fetching projects.";

  const projects = projectsData?.map((p: any) => ({
    ...p,
    tasks: { completed: 0, total: 0 }, // Mocked for now
    members: 0 // Mocked for now
  })) || [];

  const filteredProjects = projects.filter((project: any) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Projects</h1>
              <p className="text-muted-foreground">Manage and track your ongoing projects</p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search projects..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button variant="outline" className="gap-2">
                <Calendar className="w-4 h-4" />
                Sort
              </Button>
            </div>
          </motion.div>

          {isLoading ? (
             <div className="flex justify-center items-center h-64">
               <Loader2 className="w-8 h-8 animate-spin text-primary" />
             </div>
          ) : isError ? (
            <div className="flex justify-center items-center h-64 text-destructive">
               <p>Error loading projects: {errorMessage}</p>
            </div>
          ) : (
          /* Projects Grid */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project: any) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: project.color || '#3b82f6' }}
                  >
                    {project.name.charAt(0)}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Project</DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete Project</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2">{project.name}</h3>
                <p className="text-sm text-muted-foreground mb-6 line-clamp-2 h-10">
                  {project.description}
                </p>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{project.progress || 0}%</span>
                    </div>
                    <Progress value={project.progress || 0} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex -space-x-2">
                      {[...Array(Math.min(project.members || 0, 3))].map((_, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium"
                        >
                          <UsersIcon className="w-4 h-4 text-muted-foreground" />
                        </div>
                      ))}
                      {(project.members || 0) > 3 && (
                        <div className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                          +{(project.members || 0) - 3}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[project.status]?.className || ''}`}>
                        {statusConfig[project.status]?.label || project.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <CheckSquare className="w-3.5 h-3.5" />
                      {project.tasks?.completed || 0}/{project.tasks?.total || 0}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {project.deadline}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
