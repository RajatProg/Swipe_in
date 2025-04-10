import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { styles } from '../styles/AdminDashboardUI';
import AdminSidebar from '../Adminsidebar';

export default function AdminDashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sidebar}>
        <AdminSidebar />
      </View>

      <View style={styles.mainContent}>
        <Text style={styles.heading}>Admin Dashboard</Text>

        {/* Summary Cards - just placeholder now */}
        <View style={styles.cardsContainer}>
          <View style={styles.card}><Text style={styles.cardText}>Total Students</Text></View>
          <View style={styles.card}><Text style={styles.cardText}>Total Employees</Text></View>
          <View style={styles.card}><Text style={styles.cardText}>Swipes</Text></View>
          <View style={styles.card}><Text style={styles.cardText}>Income</Text></View>
        </View>

        {/* Future content - graphs/tables will go here */}
      </View>
    </SafeAreaView>
  );
}
