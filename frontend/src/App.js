import React, { useState, useEffect } from 'react';
import './App.css';
import NotificationBell from './components/NotificationBell';
import NotificationPanel from './components/NotificationPanel';
import apiService from './services/apiService';

function App() {
  const [notifications, setNotifications] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await apiService.getNotifications();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleBellClick = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const handleMarkRead = async (id) => {
    try {
      await apiService.markNotificationRead(id);
      setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiService.deleteNotification(id);
      setNotifications(notifications.filter(n => n.id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Management App</h1>
        <NotificationBell unreadCount={unreadCount} onClick={handleBellClick} />
      </header>
      {isPanelOpen && (
        <NotificationPanel
          notifications={notifications}
          onMarkRead={handleMarkRead}
          onDelete={handleDelete}
          onClose={() => setIsPanelOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
