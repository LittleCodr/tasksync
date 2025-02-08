'use client';

import { useTaskStore } from '@/store/tasks';
import { Card } from './ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export function TaskAnalytics() {
  const { tasks } = useTaskStore();

  const statusData = [
    {
      name: 'To Do',
      value: tasks.filter((t) => t.status === 'To Do').length,
    },
    {
      name: 'In Progress',
      value: tasks.filter((t) => t.status === 'In Progress').length,
    },
    {
      name: 'Completed',
      value: tasks.filter((t) => t.status === 'Completed').length,
    },
  ];

  const priorityData = [
    {
      name: 'High',
      tasks: tasks.filter((t) => t.priority === 'High').length,
    },
    {
      name: 'Medium',
      tasks: tasks.filter((t) => t.priority === 'Medium').length,
    },
    {
      name: 'Low',
      tasks: tasks.filter((t) => t.priority === 'Low').length,
    },
  ];

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Task Status Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Tasks by Priority</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tasks" fill="hsl(var(--chart-1))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}