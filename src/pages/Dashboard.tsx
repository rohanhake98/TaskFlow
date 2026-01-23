import { motion } from 'framer-motion';
import { 
  FolderKanban, 
  CheckSquare, 
  Users, 
  TrendingUp, 
  Clock, 
  ArrowUpRight,
  Plus
} from 'lucide-react';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const stats = [
  { label: 'Active Projects', value: '12', change: '+2', icon: FolderKanban, trend: 'up' },
  { label: 'Tasks Completed', value: '148', change: '+24', icon: CheckSquare, trend: 'up' },
  { label: 'Team Members', value: '8', change: '+1', icon: Users, trend: 'up' },
  { label: 'Productivity', value: '94%', change: '+5%', icon: TrendingUp, trend: 'up' },
];

const recentProjects = [
  { name: 'Website Redesign', progress: 75, status: 'active', tasks: 24, dueDate: 'Mar 15' },
  { name: 'Mobile App Development', progress: 45, status: 'active', tasks: 32, dueDate: 'Apr 1' },
  { name: 'API Integration', progress: 90, status: 'review', tasks: 12, dueDate: 'Mar 10' },
  { name: 'Database Migration', progress: 30, status: 'active', tasks: 18, dueDate: 'Mar 25' },
];

const recentTasks = [
  { title: 'Review homepage mockups', project: 'Website Redesign', priority: 'high', dueDate: 'Today' },
  { title: 'Fix authentication bug', project: 'Mobile App', priority: 'urgent', dueDate: 'Today' },
  { title: 'Update API documentation', project: 'API Integration', priority: 'medium', dueDate: 'Tomorrow' },
  { title: 'Database schema review', project: 'Database Migration', priority: 'low', dueDate: 'Mar 12' },
];

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
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, John!</h1>
            <p className="text-muted-foreground">Here's what's happening with your projects today.</p>
          </motion.div>

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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                {recentProjects.map((project, index) => (
                  <div
                    key={index}
                    className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-foreground">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {project.tasks} tasks • Due {project.dueDate}
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
                      <Progress value={project.progress} className="flex-1 h-2" />
                      <span className="text-sm font-medium text-muted-foreground">
                        {project.progress}%
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
                {recentTasks.map((task, index) => (
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
                        <p className="text-xs text-muted-foreground">{task.project}</p>
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
                      {task.dueDate}
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                View All Tasks
              </Button>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
