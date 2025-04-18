// app/styles/AdminSidebarUI.tsx
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginBottom: 4,
  },
  menuItemActive: {
    backgroundColor: '#E0F7FA',
  },
  icon: {
    marginRight: 12,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  expandIcon: {
    marginLeft: 'auto',
  },
  subMenuContainer: {
    marginTop: 4,
  },
  subMenuItem: {
    paddingLeft: 28,
  },
});
