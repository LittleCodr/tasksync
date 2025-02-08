'use client';

import { useEffect } from 'react';
import { useTaskStore } from '@/store/tasks';
import { TaskBoard } from '@/components/task-board';
import { AIChat } from '@/components/ai-chat';
import { TaskAnalytics } from '@/components/task-analytics';
import { Button } from '@/components/ui/button';
import { PlusCircle, LayoutDashboard, MessageSquare, BarChart3 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreateTaskDialog } from '@/components/create-task-dialog';
import { useState } from 'react';

export default function Home() {
  const { fetchTasks } = useTaskStore();
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">TaskSync</h1>
          <Button onClick={() => setShowCreateDialog(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="board" className="space-y-4">
          <TabsList>
            <TabsTrigger value="board">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Board
            </TabsTrigger>
            <TabsTrigger value="chat">
              <MessageSquare className="mr-2 h-4 w-4" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="board" className="space-y-4">
            <TaskBoard />
          </TabsContent>

          <TabsContent value="chat" className="space-y-4">
            <AIChat />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <TaskAnalytics />
          </TabsContent>
        </Tabs>
      </main>

      <CreateTaskDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />
    </div>
  );
}