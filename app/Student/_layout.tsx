// app/Student/_layout.tsx
import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import StudentNavbar from './StudentNavbar';
import { Stack } from 'expo-router';

export default function StudentLayout(){
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.wrapper}>
          <StudentNavbar />
        </View>

        <View style={styles.content}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  content: { flex: 8 },
});
