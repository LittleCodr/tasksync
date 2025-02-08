'use client';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTaskStore } from '@/store/tasks';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Clock, Tag } from 'lucide-react';

const columns = [
  { id: 'To Do', title: 'To Do' },
  { id: 'In Progress', title: 'In Progress' },
  { id: 'Completed', title: 'Completed' },
];

export function TaskBoard() {
  const { tasks, updateTask, reorderTasks } = useTaskStore();

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const updatedTasks = Array.from(tasks);
    const [removed] = updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, removed);

    if (destination.droppableId !== source.droppableId) {
      updateTask(draggableId, { status: destination.droppableId });
    }

    reorderTasks(updatedTasks);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500';
      case 'Medium':
        return 'bg-yellow-500';
      case 'Low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((column) => (
          <div key={column.id} className="space-y-4">
            <h2 className="text-lg font-semibold">{column.title}</h2>
            <Droppable droppableId={column.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="min-h-[500px] bg-muted/50 rounded-lg p-4 space-y-4"
                >
                  {tasks
                    .filter((task) => task.status === column.id)
                    .map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-4 space-y-2"
                          >
                            <div className="flex items-start justify-between">
                              <h3 className="font-medium">{task.title}</h3>
                              <Badge
                                variant="secondary"
                                className={`${getPriorityColor(
                                  task.priority
                                )} text-white`}
                              >
                                {task.priority}
                              </Badge>
                            </div>
                            {task.description && (
                              <p className="text-sm text-muted-foreground">
                                {task.description}
                              </p>
                            )}
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              {task.due_date && (
                                <div className="flex items-center">
                                  <Clock className="mr-1 h-4 w-4" />
                                  {format(
                                    new Date(task.due_date),
                                    'MMM d, yyyy'
                                  )}
                                </div>
                              )}
                              {task.category && (
                                <div className="flex items-center">
                                  <Tag className="mr-1 h-4 w-4" />
                                  {task.category}
                                </div>
                              )}
                            </div>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}