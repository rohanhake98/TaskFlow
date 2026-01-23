import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { projectService, taskService } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
    ArrowUpRight,
    CheckSquare,
    Clock,
    FolderKanban,
    Loader2,
    Plus,
    TrendingUp,
    Users
} from 'lucide-react';

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

export default function Dashboard() {
  const { data: projects, isLoading: projectsLoading, isError: projectsError, error: projectsErrorObj } = useQuery({
    queryKey: ['projects'],
    queryFn: projectService.getAll
  });

  const { data: tasks, isLoading: tasksLoading, isError: tasksError, error: tasksErrorObj } = useQuery({
    queryKey: ['tasks'],
    queryFn: taskService.getAll
  });

  const isLoading = projectsLoading || tasksLoading;
  const isError = projectsError || tasksError;
  const errorMessage = projectsErrorObj?.message || tasksErrorObj?.message || "An error occurred fetching data.";

  const stats = [
    { label: 'Active Projects', value: projects?.length || 0, change: '+0', icon: FolderKanban, trend: 'up' },
    { label: 'Tasks Completed', value: tasks?.filter((t: any) => t.status === 'completed').length || 0, change: '+0', icon: CheckSquare, trend: 'up' },
    { label: 'Team Members', value: '0', change: '+0', icon: Users, trend: 'neutral' }, // Mocked for now
    { label: 'Productivity', value: '0%', change: '+0%', icon: TrendingUp, trend: 'neutral' }, // Mocked for now
  ];

  const recentProjects = projects?.slice(0, 4) || [];
  const recentTasks = tasks?.slice(0, 4) || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back!</h1>
            <p className="text-muted-foreground">Here's what's happening with your projects today.</p>
          </motion.div>

          {isLoading ? (
             <div className="flex justify-center items-center h-64">
               <Loader2 className="w-8 h-8 animate-spin text-primary" />
             </div>
          ) : isError ? (
            <div className="flex justify-center items-center h-64 text-destructive">
               <p>Error loading data: {errorMessage}</p>
            </div>
          ) : (
          <>
          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="flex items-center gap-1 text-sm font-medium text-success">
                      {stat.change}
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Projects Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">Recent Projects</h2>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>

              <div className="space-y-4">
                {recentProjects.map((project: any, index: number) => (
                  <div
                    key={index}
                    className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-foreground">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {project.description} • Due {project.deadline}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          project.status === 'active' ? 'status-in-progress' : 'status-review'
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={project.progress || 0} className="flex-1 h-2" />
                      <span className="text-sm font-medium text-muted-foreground">
                        {project.progress || 0}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tasks Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">Upcoming Tasks</h2>
                <Button variant="ghost" size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {recentTasks.map((task: any, index: number) => (
                  <div
                    key={index}
                    className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <div className="w-4 h-4 border-2 border-muted-foreground rounded" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground text-sm truncate">
                          {task.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">{task.description}</p>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium shrink-0 ${
                          task.priority === 'urgent'
                            ? 'priority-urgent'
                            : task.priority === 'high'
                            ? 'priority-high'
                            : task.priority === 'medium'
                            ? 'priority-medium'
                            : 'priority-low'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-2 ml-7 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {task.due_date}
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                View All Tasks
              </Button>
            </motion.div>
          </div>
          </>
          )}
        </div>
      </main>
    </div>
  );
}
