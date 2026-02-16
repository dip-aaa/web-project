'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Task } from '../page';
import { taskAPI } from '../../../lib/api';

interface TodoListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function TodoList({ tasks, setTasks }: TodoListProps) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch tasks from database on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await taskAPI.getTasks();
        if (response.success && response.data) {
          setTasks(response.data);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [setTasks]);

  const addTask = async () => {
    if (newTaskTitle.trim() && newTaskDate && !submitting) {
      try {
        setSubmitting(true);
        const response = await taskAPI.createTask({
          title: newTaskTitle.trim(),
          date: newTaskDate
        });

        if (response.success && response.data) {
          // Add the new task to the list
          setTasks([...tasks, response.data]);
          setNewTaskTitle('');
          setNewTaskDate('');
        } else {
          alert('Failed to create task: ' + response.message);
        }
      } catch (error) {
        console.error('Error creating task:', error);
        alert('Failed to create task. Please make sure you are logged in.');
      } finally {
        setSubmitting(false);
      }
    }
  };
  
  const toggleTask = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      const response = await taskAPI.updateTask(id, {
        completed: !task.completed
      });

      if (response.success) {
        setTasks(tasks.map(task => 
          task.id === id ? { ...task, completed: !task.completed } : task
        ));
      } else {
        alert('Failed to update task: ' + response.message);
      }
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task');
    }
  };
  
  const deleteTask = async (id: number) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      const response = await taskAPI.deleteTask(id);

      if (response.success) {
        setTasks(tasks.filter(task => task.id !== id));
      } else {
        alert('Failed to delete task: ' + response.message);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border-2 border-[#d4a574]/20 h-full">
      <div className="flex items-center gap-4 mb-6">
        <svg viewBox="0 0 50 50" className="w-12 h-12">
          <rect x="5" y="5" width="40" height="40" rx="8" fill="#8b6f47" />
          <rect x="10" y="15" width="30" height="2" rx="1" fill="#f9f6f3" />
          <rect x="10" y="23" width="25" height="2" rx="1" fill="#f9f6f3" />
          <rect x="10" y="31" width="28" height="2" rx="1" fill="#f9f6f3" />
          <circle cx="15" cy="16" r="2" fill="#ffd89b" />
          <circle cx="15" cy="24" r="2" fill="#ffd89b" />
          <circle cx="15" cy="32" r="2" fill="#ffd89b" />
        </svg>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-[#6b4423] to-[#8b5a3c] bg-clip-text text-transparent">
          Today's Tasks
        </h3>
      </div>

      {/* Add Task Input */}
      <div className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Add new task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          disabled={submitting}
          className="w-full bg-gradient-to-r from-[#f9f6f3] to-[#fdfcfa] border-2 border-[#d4a574]/30 rounded-2xl px-5 py-3 text-[#6b4423] placeholder-[#8b6f47]/50 focus:outline-none focus:ring-2 focus:ring-[#8b6f47]/40 focus:border-[#8b6f47] transition-all disabled:opacity-50"
        />
        <div className="flex gap-3">
          <input
            type="date"
            value={newTaskDate}
            onChange={(e) => setNewTaskDate(e.target.value)}
            disabled={submitting}
            className="flex-1 bg-gradient-to-r from-[#f9f6f3] to-[#fdfcfa] border-2 border-[#d4a574]/30 rounded-2xl px-4 py-2 text-[#6b4423] focus:outline-none focus:ring-2 focus:ring-[#8b6f47]/40 transition-all disabled:opacity-50"
          />
          <motion.button
            whileHover={{ scale: submitting ? 1 : 1.05 }}
            whileTap={{ scale: submitting ? 1 : 0.95 }}
            onClick={addTask}
            disabled={submitting}
            className="bg-gradient-to-r from-[#8b6f47] to-[#6b4423] text-white rounded-2xl px-6 py-2 font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Adding...' : 'Add'}
          </motion.button>
        </div>
      </div>

      {/* Task List */}
      {loading ? (
        <div className="text-center py-12 text-[#8b6f47]">
          <div className="text-5xl mb-3">⏳</div>
          <div className="font-semibold">Loading tasks...</div>
        </div>
      ) : (
        <>
          <style jsx>{`
            .scrollbar-custom {
              scrollbar-width: thin;
              scrollbar-color: #d4a574 #f9f6f3;
            }
            .scrollbar-custom::-webkit-scrollbar {
              width: 8px;
            }
            .scrollbar-custom::-webkit-scrollbar-thumb {
              background: #d4a574;
              border-radius: 8px;
            }
            .scrollbar-custom::-webkit-scrollbar-track {
              background: #f9f6f3;
            }
          `}</style>
          {tasks.length > 2 ? (
        <div className="space-y-3 pr-2 overflow-y-scroll scrollbar-custom h-48">
          {tasks.map((task, idx) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ x: 5 }}
              className="bg-gradient-to-r from-[#f9f6f3] to-[#fdfcfa] rounded-2xl p-4 shadow-md hover:shadow-lg transition-all border border-[#d4a574]/10 group"
            >
              <div className="flex items-start gap-4">
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleTask(task.id)}
                  className={`mt-1 w-6 h-6 rounded-xl flex items-center justify-center shadow-md transition-all ${
                    task.completed 
                      ? 'bg-gradient-to-br from-emerald-400 to-emerald-600' 
                      : 'bg-white border-2 border-[#d4a574]'
                  }`}
                >
                  {task.completed && <span className="text-white font-bold">✓</span>}
                </motion.button>
                <div className="flex-1 min-w-0">
                  <div className={`font-bold text-[#6b4423] ${task.completed ? 'line-through opacity-60' : ''}`}>
                    {task.title}
                  </div>
                  <div className="text-sm text-[#8b6f47] mt-1 flex items-center gap-2">
                    <span>📅</span>
                    <span>{new Date(task.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all text-xl font-bold w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50"
                >
                  ×
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-3 pr-2">
          {tasks.length === 0 ? (
            <div className="text-center py-12 text-[#8b6f47]/50">
              <div className="text-5xl mb-3">📝</div>
              <div className="font-semibold">No tasks yet. Add one!</div>
            </div>
          ) : (
            tasks.map((task, idx) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ x: 5 }}
                className="bg-gradient-to-r from-[#f9f6f3] to-[#fdfcfa] rounded-2xl p-4 shadow-md hover:shadow-lg transition-all border border-[#d4a574]/10 group"
              >
                <div className="flex items-start gap-4">
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleTask(task.id)}
                    className={`mt-1 w-6 h-6 rounded-xl flex items-center justify-center shadow-md transition-all ${
                      task.completed 
                        ? 'bg-gradient-to-br from-emerald-400 to-emerald-600' 
                        : 'bg-white border-2 border-[#d4a574]'
                    }`}
                  >
                    {task.completed && <span className="text-white font-bold">✓</span>}
                  </motion.button>
                  <div className="flex-1 min-w-0">
                    <div className={`font-bold text-[#6b4423] ${task.completed ? 'line-through opacity-60' : ''}`}>
                      {task.title}
                    </div>
                    <div className="text-sm text-[#8b6f47] mt-1 flex items-center gap-2">
                      <span>📅</span>
                      <span>{new Date(task.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all text-xl font-bold w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50"
                  >
                    ×
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
        </>
      )}
    </div>
  );
}