import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { motion } from 'framer-motion';

const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900">
      {/* Background particles effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-yellow-300 opacity-40"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0.2 }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <Navbar toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
