import Header from '@/components/layout/Header';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { userService } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Loader2, Mail, MoreHorizontal, Phone, Plus, Search, Shield } from 'lucide-react';
import { useState } from 'react';

const roleConfig: Record<string, { label: string; className: string }> = {
  admin: { label: 'Admin', className: 'bg-primary/10 text-primary' },
  project_manager: { label: 'Project Manager', className: 'bg-success/10 text-success' },
  team_member: { label: 'Team Member', className: 'bg-muted text-muted-foreground' },
};

const statusConfig: Record<string, { label: string; className: string }> = {
  online: { label: 'Online', className: 'bg-success' },
  away: { label: 'Away', className: 'bg-warning' },
  offline: { label: 'Offline', className: 'bg-muted-foreground' },
};

export default function Team() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: usersData, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll
  });

  const errorMessage = (error as any)?.message || "An error occurred fetching team members.";

  const teamMembers = usersData?.map((user: any) => ({
    ...user,
    name: user.username, // Map username to name
    phone: '', // Mocked
    department: 'General', // Mocked
    projects: 0, // Mocked
    tasks: 0, // Mocked
    status: 'online', // Mocked
    color: '#3b82f6' // Mocked
  })) || [];

  const filteredMembers = teamMembers.filter((member: any) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <h1 className="text-3xl font-bold text-foreground mb-2">Team Members</h1>
              <p className="text-muted-foreground">Manage your team and permissions</p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </motion.div>

          {/* Search */}
          <div className="relative max-w-md mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search by name, email, or role..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {isLoading ? (
             <div className="flex justify-center items-center h-64">
               <Loader2 className="w-8 h-8 animate-spin text-primary" />
             </div>
          ) : isError ? (
            <div className="flex justify-center items-center h-64 text-destructive">
               <p>Error loading team members: {errorMessage}</p>
            </div>
          ) : (
          /* Team Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member: any, index: number) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12 border-2 border-background">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {member.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.department}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Remove Member</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {member.email}
                  </div>
                  {member.phone && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      {member.phone}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${roleConfig[member.role]?.className || ''}`}>
                      {roleConfig[member.role]?.label || member.role}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
                  <div className="flex gap-4 text-sm">
                    <div>
                      <span className="block font-semibold text-foreground">{member.projects}</span>
                      <span className="text-muted-foreground">Projects</span>
                    </div>
                    <div>
                      <span className="block font-semibold text-foreground">{member.tasks}</span>
                      <span className="text-muted-foreground">Tasks</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${statusConfig[member.status]?.className || 'bg-gray-400'}`} />
                    <span className="text-sm font-medium text-muted-foreground capitalize">
                      {member.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          )}
        </div>
      </main>
    </div>
  );
}
