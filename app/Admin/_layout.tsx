// app/Admin/_layout.tsx
import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import AdminSidebar from './Adminsidebar';

export default function AdminLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.row}>
        <View style={styles.sidebar}>
          <AdminSidebar />
        </View>

        <View style={styles.content}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 260,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  content: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
});
