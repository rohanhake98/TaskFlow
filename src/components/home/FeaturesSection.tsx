import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FolderKanban, 
  CheckSquare, 
  Users, 
  BarChart3, 
  Zap,
  Shield,
  Clock
} from 'lucide-react';

const features = [
  {
    icon: LayoutDashboard,
    title: 'Intuitive Dashboard',
    description: 'Get a bird\'s eye view of all your projects, tasks, and team activity in one place.',
  },
  {
    icon: FolderKanban,
    title: 'Kanban Boards',
    description: 'Visualize your workflow with drag-and-drop Kanban boards for effortless task management.',
  },
  {
    icon: CheckSquare,
    title: 'Task Management',
    description: 'Create, assign, and track tasks with priorities, due dates, and custom statuses.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Work together seamlessly with role-based access and real-time updates.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    description: 'Track progress with detailed analytics and generate custom reports.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built for speed with optimized performance and instant updates.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Your data is protected with industry-standard encryption and security protocols.',
  },
  {
    icon: Clock,
    title: 'Time Tracking',
    description: 'Track time spent on tasks and projects with integrated time logging.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-medium text-sm uppercase tracking-wider"
          >
            Features
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6"
          >
            Everything You Need to Succeed
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Powerful features designed to help teams work smarter, not harder.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="card-interactive p-6 rounded-xl group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturesSection;
