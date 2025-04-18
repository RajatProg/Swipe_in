// app/Admin/Admin.tsx   (or whatever you named the dashboard screen)
import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { styles } from './admin_styles/AdminDashboardUI';

export default function AdminDashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Admin Dashboard</Text>

      {/* Summary Cards */}
      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardText}>Total Students</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>Total Employees</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>Swipe</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>Income</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
