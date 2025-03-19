import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../AuthContext";



export default function ProfileSelection() {

  const navigation = useNavigation();
  const { role } = useAuth();


  return (
    
      <View style={styles.container}>
        <Text style={styles.headerText}>Select Your Profile</Text>
  
        {/* Allow only EMPLOYEE or ADMIN to access this screen */}
        {role === "EMPLOYEE" || role === "ADMIN" ? (
          
          <View style={styles.row}>
            {/* Chick-fil-A Profile */}
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("Profiles/chickfilA" as never)}
            >
              <Ionicons name="fast-food-outline" size={40} color="white" />
              <Text style={styles.title}>Chick-fil-A</Text>
            </TouchableOpacity>
  
            {/* Dining Profile */}
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("Profiles/Dining" as never)}
            >
              <Ionicons name="restaurant-outline" size={40} color="white" />
              <Text style={styles.title}>Dining</Text>
            </TouchableOpacity>
          </View>
        ) : (

          <Text style={styles.noAccessText}>Access Denied: Employees Only</Text>
        )}
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 50,
  },
  headerText: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 90,
  },
  row: {
    flexDirection: "row", 
    justifyContent: "space-between",
    width: "40%", 
  },
  card: {
    backgroundColor: "#D32F2F",
    width: "35%", 
    paddingVertical: 20,
    borderRadius: 38,
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  noAccessText: {
    fontSize: 16,
    color: "red",
    marginTop: 20,
  },
});
