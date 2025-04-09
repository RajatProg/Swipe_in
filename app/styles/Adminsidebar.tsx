// app/styles/AdminSidebarUI.tsx
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  sidebar: {
    width: 250,
    backgroundColor: '#1e1e2f',
    paddingVertical: 40,
    paddingHorizontal: 20,
    height: '100%',
  },
  title: {
    color: '#00BFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  icon: {
    marginRight: 10,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
  }
});
