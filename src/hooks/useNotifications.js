import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  fetchNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  subscribeToNotifications,
} from "../services/notificationsServices";

export const useNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Cargar notificaciones iniciales
  useEffect(() => {
    if (!user?.id) return;

    const loadNotifications = async () => {
      try {
        setLoading(true);
        const data = await fetchNotifications(user.id);
        setNotifications(data);
        
        // Contar no leídas
        const unread = data.filter((n) => !n.is_read).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error("Error al cargar notificaciones:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();

    // Suscribirse a notificaciones en tiempo real
    const channel = subscribeToNotifications(user.id, (newNotification) => {
      console.log("Nueva notificación recibida:", newNotification);
      
      // Agregar la nueva notificación al principio
      setNotifications((prev) => [newNotification, ...prev]);
      setUnreadCount((prev) => prev + 1);
      
      // Opcional: Mostrar notificación del navegador
      if (Notification.permission === "granted") {
        new Notification(newNotification.title, {
          body: newNotification.message,
          icon: "/favicon.ico",
        });
      }
    });

    // Cleanup: Desuscribirse al desmontar
    return () => {
      channel.unsubscribe();
    };
  }, [user?.id]);

  // Marcar notificación como leída
  const handleMarkAsRead = async (notificationId) => {
    const result = await markAsRead(notificationId);
    if (result.success) {
      setNotifications((prev) =>
        prev.map((n) =>
          n.notification_id === notificationId ? { ...n, is_read: true } : n
        )
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    }
  };

  // Marcar todas como leídas
  const handleMarkAllAsRead = async () => {
    if (!user?.id) return;
    
    const result = await markAllAsRead(user.id);
    if (result.success) {
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, is_read: true }))
      );
      setUnreadCount(0);
    }
  };

  // Eliminar notificación
  const handleDelete = async (notificationId) => {
    const result = await deleteNotification(notificationId);
    if (result.success) {
      // Verificar si era no leída antes de eliminar
      const wasUnread = notifications.find(
        (n) => n.notification_id === notificationId && !n.is_read
      );
      
      // Eliminar de la lista
      setNotifications((prev) =>
        prev.filter((n) => n.notification_id !== notificationId)
      );
      
      // Actualizar contador si era no leída
      if (wasUnread) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    }
  };

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead: handleMarkAsRead,
    markAllAsRead: handleMarkAllAsRead,
    deleteNotification: handleDelete,
  };
};