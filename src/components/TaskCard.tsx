import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Tag, Trash2, Play, CheckCircle } from 'lucide-react';
import { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onDelete,
  onStatusChange,
}) => {
  const priorityColors = {
    low: 'bg-green-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl p-6 shadow-[5px_5px_15px_#d1d9e6,-5px_-5px_15px_#ffffff] 
                hover:shadow-[8px_8px_20px_#d1d9e6,-8px_-8px_20px_#ffffff] 
                transition-shadow duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
        <div className="flex gap-2">
          <span
            className={`${
              priorityColors[task.priority]
            } w-3 h-3 rounded-full mt-2`}
          />
          <button
            onClick={() => onDelete(task.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <p className="text-gray-600 mb-4">{task.description}</p>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <Clock size={16} />
          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <Tag size={16} />
          <div className="flex gap-1">
            {task.tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {task.status !== 'in-progress' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onStatusChange(task.id, 'in-progress')}
            className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 text-white py-2 rounded-lg
                     hover:bg-yellow-600 transition-colors"
          >
            <Play size={16} />
            Start
          </motion.button>
        )}
        {task.status !== 'completed' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onStatusChange(task.id, 'completed')}
            className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg
                     hover:bg-green-600 transition-colors"
          >
            <CheckCircle size={16} />
            Complete
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};