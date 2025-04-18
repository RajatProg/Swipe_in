import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './admin_styles/Adminsidebar';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';

/* ---------- menu definitions (full paths) ---------- */
const main = [
  { label: 'Dashboard',      path: '/Admin',                                  icon: 'home-outline' },
  { label: 'User Management',                                                 icon: 'people-outline' },
  { label: 'Swipe History',  path: '/Admin/Profiles/SwipeHistory',            icon: 'calendar-outline' },
  { label: 'Menu Management',path: '/Admin/Profiles/MenuManagement',          icon: 'restaurant-outline' },
  { label: 'Logout',         path: '/',                                       icon: 'log-out-outline' },
];

const sub = [
  { label: 'Students',  path: '/Admin/Admin_users/students',  icon: 'school-outline' },
  { label: 'Employees', path: '/Admin/Admin_users/employees', icon: 'person-outline' },
];

export default function AdminSidebar() {
  const pathname = usePathname();   // e.g. "/Admin/Admin_users/students"
  const router   = useRouter();     // path‑based navigation

  /* ----------- state for submenu ----------- */
  const [expanded, setExpanded] = useState(
    pathname.startsWith('/Admin/Admin_users/')
  );
  useEffect(() => {
    setExpanded(pathname.startsWith('/Admin/Admin_users/'));
  }, [pathname]);

  /* helper for active highlight */
  const isActive = (p?: string) => p ? pathname === p : false;
  const inUserMgmt = pathname.startsWith('/Admin/Admin_users/');

  /* ----------- handlers ----------- */
  const goMain = (item: typeof main[0]) => {
    if (item.label === 'User Management') {
      if (!inUserMgmt) setExpanded(prev => !prev);   // manual expand / collapse
    } else if (item.path) {
      router.push(item.path as never);
    }
  };
  const goSub = (s: typeof sub[0]) => router.push(s.path as never);

  /* ----------- UI ----------- */
  return (
    <View style={styles.sidebar}>
      <Text style={styles.title}>Admin Dashboard</Text>

      {main.map(item => (
        <React.Fragment key={item.label}>
          <TouchableOpacity
            style={[
              styles.menuItem,
              (item.label === 'User Management' && inUserMgmt) || isActive(item.path)
                ? styles.menuItemActive
                : null,
            ]}
            onPress={() => goMain(item)}
          >
            <Ionicons name={item.icon as any} size={20} color="#00BFFF" style={styles.icon} />
            <Text style={styles.menuText}>{item.label}</Text>

            {item.label === 'User Management' && (
              <Ionicons
                name={expanded ? 'chevron-down-outline' : 'chevron-forward-outline'}
                size={16}
                color="#00BFFF"
                style={styles.expandIcon}
              />
            )}
          </TouchableOpacity>

          {/* sub‑menu */}
          {item.label === 'User Management' && expanded && (
            <View style={styles.subMenuContainer}>
              {sub.map(s => (
                <TouchableOpacity
                  key={s.label}
                  style={[
                    styles.menuItem,
                    styles.subMenuItem,
                    isActive(s.path) ? styles.menuItemActive : null,
                  ]}
                  onPress={() => goSub(s)}
                >
                  <Ionicons name={s.icon as any} size={18} color="#00BFFF" style={styles.icon} />
                  <Text style={styles.menuText}>{s.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </React.Fragment>
      ))}
    </View>
  );
}
