import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTaskStore } from './store/taskStore';
import { TaskCard } from './components/TaskCard';
import { TaskForm } from './components/TaskForm';
import { ChatBot } from './components/ChatBot';
import { ProgressBar } from './components/ProgressBar';
import { Background } from './components/Background';
import { AnimatedCharacter } from './components/AnimatedCharacter';
import { Task } from './types/task';
import { CheckCircle2, ListTodo, Timer, Brain, Moon, Sun, Search } from 'lucide-react';
import { getChatResponse } from './services/gemini';
import { useTheme } from './store/themeStore';

function App() {
  const { tasks, addTask, updateTask, deleteTask, reorderTasks, sortTasks } = useTaskStore();
  const { theme, toggleTheme } = useTheme();
  const [filter, setFilter] = useState<Task['status']>('todo');
  const [isLoading, setIsLoading] = useState(true);
  const [showAIChat, setShowAIChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const filteredTasks = tasks
    .filter((task) => task.status === filter)
    .filter((task) => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const completedTasks = tasks.filter((task) => task.status === 'completed').length;

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    reorderTasks(result.source.index, result.destination.index);
  };

  const handleAIPrioritize = async () => {
    setShowAIChat(true);
    setIsAnalyzing(true);
    const todoTasks = tasks.filter(task => task.status === 'todo');
    if (todoTasks.length === 0) {
      setIsAnalyzing(false);
      return;
    }

    const taskList = todoTasks.map(task => 
      `Title: ${task.title}\nDescription: ${task.description}\nPriority: ${task.priority}\nDue Date: ${task.dueDate}`
    ).join('\n\n');

    const prompt = `As an AI task manager, analyze these tasks and provide a priority order based on urgency, importance, and due dates. Return the response in this exact format for parsing:
    PRIORITY_ORDER:
    1. [Task Title 1]
    2. [Task Title 2]
    etc.
    
    ANALYSIS:
    [Your detailed explanation here]
    
    Tasks to analyze:\n\n${taskList}`;
    
    try {
      const response = await getChatResponse(prompt);
      const priorityOrderMatch = response.match(/PRIORITY_ORDER:\n([\s\S]*?)\n\nANALYSIS:/);
      if (priorityOrderMatch) {
        const priorityOrder = priorityOrderMatch[1]
          .split('\n')
          .map(line => line.replace(/^\d+\.\s*/, '').trim())
          .filter(title => title);
        
        sortTasks(priorityOrder);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getFilterIcon = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return <ListTodo size={20} />;
      case 'in-progress':
        return <Timer size={20} />;
      case 'completed':
        return <CheckCircle2 size={20} />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-white'}`}>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`w-16 h-16 border-4 ${theme === 'dark' ? 'border-blue-400' : 'border-blue-500'} border-t-transparent rounded-full`}
        />
      </div>
    );
  }

  return (
    <>
      <Background />
      <div className={`min-h-screen p-8 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} text-center`}
            >
              TaskSync - Team Titans
            </motion.h1>
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={`p-3 rounded-full ${
                  theme === 'dark' 
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                    : 'bg-white text-gray-800 hover:bg-gray-100'
                } shadow-neumorphic`}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 pr-4 py-2 rounded-lg ${
                    theme === 'dark'
                      ? 'bg-gray-800 text-white border-gray-700'
                      : 'bg-white text-gray-800 border-gray-200'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Overall Progress</h2>
            <ProgressBar completed={completedTasks} total={tasks.length} />
          </motion.div>

          <div className="flex justify-center gap-4 mb-8">
            {(['todo', 'in-progress', 'completed'] as Task['status'][]).map(
              (status) => (
                <motion.button
                  key={status}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(status)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg 
                            ${
                              filter === status
                                ? theme === 'dark'
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-blue-600 text-white'
                                : theme === 'dark'
                                ? 'bg-gray-800 text-gray-200'
                                : 'bg-white text-gray-700'
                            }
                            shadow-[5px_5px_15px_#d1d9e6,-5px_-5px_15px_#ffffff]
                            transition-all duration-300`}
                >
                  {getFilterIcon(status)}
                  {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                </motion.button>
              )
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAIPrioritize}
            disabled={isAnalyzing}
            className={`fixed top-6 right-6 bg-gradient-to-r 
                     ${theme === 'dark' 
                       ? 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' 
                       : 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'} 
                     text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2
                     transition-all duration-300 ${isAnalyzing ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isAnalyzing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Analyzing...
              </>
            ) : (
              <>
                <Brain size={20} />
                AI Prioritize
              </>
            )}
          </motion.button>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <AnimatePresence>
                    {filteredTasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard
                              task={task}
                              onDelete={deleteTask}
                              onStatusChange={(id, status) =>
                                updateTask(id, { status })
                              }
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </AnimatePresence>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <TaskForm onSubmit={addTask} />
          <ChatBot isOpen={showAIChat} onClose={() => setShowAIChat(false)} />
          <AnimatedCharacter />
        </div>
      </div>
    </>
  );
}

export default App;