// app/Admin/AdminDashboard.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../Admin/admin_styles/AdminDashboardUI";

// point axios at your FastAPI
axios.defaults.baseURL = "http://127.0.0.1:8081";

// helper to format today as YYYY‑MM‑DD in America/Chicago
function toLocalNoon(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0);
}
function formatYMD_CT(d: Date): string {
  return d.toLocaleDateString("sv-SE", { timeZone: "America/Chicago" });
}

export default function AdminDashboard() {
  const navigation = useNavigation();
  const [studentCount,  setStudentCount]  = useState<number>(0);
  const [employeeCount, setEmployeeCount] = useState<number>(0);
  const [swipeCount,    setSwipeCount]    = useState<number>(0);
  const [income,        setIncome]        = useState<number>(0);

  useEffect(() => {
    async function fetchStats() {
      try {
        // total students
        const studRes = await axios.get("/student_users/");
        setStudentCount(Array.isArray(studRes.data) ? studRes.data.length : 0);

        // total employees
        const empRes = await axios.get("/users/");
        setEmployeeCount(Array.isArray(empRes.data) ? empRes.data.length : 0);

        // swipes & income for today
        const today = formatYMD_CT(toLocalNoon(new Date()));
        const swipeRes = await axios.get(`/total_swipes/?date=${today}`);
        const swipes = Array.isArray(swipeRes.data) ? swipeRes.data  : [];
        setSwipeCount(swipes.length);


        const sum = swipes.reduce((acc: any, tx: any) => acc + (tx.amount || 0), 0);
        setIncome(sum);
      } catch (e) {
        console.error(e);
        Alert.alert("Error","Could not load dashboard stats");
      }
    }
    fetchStats();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Admin Dashboard</Text>
      <View style={styles.cardsContainer}>

        {/* Total Students */}
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            // navigate to your User Management, Students tab
            navigation.navigate("Admin_users/students" as never)
          }
        >
          <Text style={styles.cardCount}>{studentCount}</Text>
          <Text style={styles.cardText}>Total Students</Text>
        </TouchableOpacity>

        {/* Total Employees */}
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("Admin_users/employees" as never)
          }
        >
          <Text style={styles.cardCount}>{employeeCount}</Text>
          <Text style={styles.cardText}>Total Employees</Text>
        </TouchableOpacity>

        {/* Swipes Today */}
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            // navigate to recent transactions
            navigation.navigate("Transactions/Meal_flex" as never)
          }
        >
          <Text style={styles.cardCount}>{swipeCount}</Text>
          <Text style={styles.cardText}>Swipes Today</Text>
        </TouchableOpacity>

        {/* Income Today */}
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("Transactions/cash_card" as never)
          }
        >
          <Text style={styles.cardCount}>${income.toFixed(2)}</Text>
          <Text style={styles.cardText}>Income Today</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}
