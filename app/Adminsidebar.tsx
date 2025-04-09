// app/components/AdminSidebar.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles/Adminsidebar';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const menuItems = [
  { label: 'Dashboard', route: 'Profiles/Admin', icon: 'home-outline' },
  { label: 'Students & Employees', route: 'Profiles/Manage', icon: 'people-outline' },
  { label: 'Swipe History', route: 'Profiles/SwipeHistory', icon: 'calendar-outline' },
  { label: 'Menu Management', route: 'Profiles/MenuManagement', icon: 'restaurant-outline' },
  { label: 'Trends', route: 'Profiles/Trends', icon: 'stats-chart-outline' },
  { label: 'Logout', route: 'index', icon: 'log-out-outline' }
];

export default function AdminSidebar() {
  const navigation = useNavigation();

  return (
    <View style={styles.sidebar}>
      <Text style={styles.title}>Admin Dashboard</Text>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={() => navigation.navigate(item.route as never)}
        >
          <Ionicons name={item.icon as any} size={20} color="#00BFFF" style={styles.icon} />
          <Text style={styles.menuText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
