import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, MoreHorizontal, Mail, Phone, Shield } from 'lucide-react';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const teamMembers = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@taskflow.com',
    phone: '+1 234 567 890',
    role: 'admin',
    department: 'Engineering',
    projects: 5,
    tasks: 24,
    status: 'online',
    color: '#3b82f6',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@taskflow.com',
    phone: '+1 234 567 891',
    role: 'project_manager',
    department: 'Product',
    projects: 3,
    tasks: 18,
    status: 'online',
    color: '#10b981',
  },
  {
    id: 3,
    name: 'Charlie Brown',
    email: 'charlie@taskflow.com',
    phone: '+1 234 567 892',
    role: 'team_member',
    department: 'Design',
    projects: 4,
    tasks: 32,
    status: 'away',
    color: '#f59e0b',
  },
  {
    id: 4,
    name: 'Diana Prince',
    email: 'diana@taskflow.com',
    phone: '+1 234 567 893',
    role: 'team_member',
    department: 'Engineering',
    projects: 2,
    tasks: 15,
    status: 'offline',
    color: '#8b5cf6',
  },
  {
    id: 5,
    name: 'Eve Wilson',
    email: 'eve@taskflow.com',
    phone: '+1 234 567 894',
    role: 'project_manager',
    department: 'Marketing',
    projects: 3,
    tasks: 21,
    status: 'online',
    color: '#ef4444',
  },
  {
    id: 6,
    name: 'Frank Miller',
    email: 'frank@taskflow.com',
    phone: '+1 234 567 895',
    role: 'team_member',
    department: 'Engineering',
    projects: 2,
    tasks: 12,
    status: 'online',
    color: '#06b6d4',
  },
];

const roleConfig = {
  admin: { label: 'Admin', className: 'bg-primary/10 text-primary' },
  project_manager: { label: 'Project Manager', className: 'bg-success/10 text-success' },
  team_member: { label: 'Team Member', className: 'bg-muted text-muted-foreground' },
};

const statusConfig = {
  online: { label: 'Online', className: 'bg-success' },
  away: { label: 'Away', className: 'bg-warning' },
  offline: { label: 'Offline', className: 'bg-muted-foreground' },
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

export default function Team() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Team</h1>
              <p className="text-muted-foreground">Manage your team members and roles</p>
            </div>
            <Button variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Total Members', value: teamMembers.length },
              { label: 'Online Now', value: teamMembers.filter((m) => m.status === 'online').length },
              { label: 'Admins', value: teamMembers.filter((m) => m.role === 'admin').length },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Search */}
          <div className="relative max-w-md mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Team Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback style={{ backgroundColor: member.color, color: 'white' }}>
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${statusConfig[member.status].className}`}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.department}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Role</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {member.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    {member.phone}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-muted-foreground" />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleConfig[member.role].className}`}>
                      {roleConfig[member.role].label}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {member.projects} projects • {member.tasks} tasks
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No team members found matching your search.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
