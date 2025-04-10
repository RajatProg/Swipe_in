import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet,Image, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../AuthContext";

export default function ProfileSelection() {
  const navigation = useNavigation();
  const { role } = useAuth();

  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const cfaLogo = require("../../assets/images/cfa_1.svg");
  const profile = require("../../assets/images/profile_4.jpg");
  return (
    <ImageBackground
      source={profile}
      style={styles.container}
      blurRadius={1}>
    
      <Text style={styles.headerText}>Select Your Profile</Text>

      {role === "ADMIN" ? (
        <View style={styles.row}>
          {/* Admin Dashboard Card */}
          <Pressable
            style={[
              styles.card,
              hoveredCard === "admin" && {
                borderWidth: 3,
                shadowColor: "green",
               // backgroundColor: "green",
                shadowOffset: { width: 20, height: 20 },
                shadowOpacity: 0.7,
                shadowRadius: 18,
                borderColor: "green",
              
              },
            ]}
            onHoverIn={() => setHoveredCard("admin")}
            onHoverOut={() => setHoveredCard(null)}
            onPress={() => navigation.navigate("Profiles/Admin" as never)}
          >
            <Ionicons name="person" size={60} color="black" />
            <Text style={{ color: "black", fontWeight: "bold", marginTop: 10, fontSize: 20 }}>
              Dashboard
            </Text>
          </Pressable>

          {/* Chick-fil-A Profile */}
          <Pressable
            style={[
              styles.card,
              hoveredCard === "chickfila" && {
                borderWidth: 3,
                shadowColor: "red",
                shadowOffset: { width: 20, height: 20 },
                shadowOpacity: 0.7,
                shadowRadius: 18,
                borderColor: "red",
              
              },
            ]}
            onHoverIn={() => setHoveredCard("chickfila")}
            onHoverOut={() => setHoveredCard(null)}
            onPress={() => navigation.navigate("Profiles/chickfilA" as never)}
          >
             <Image source={cfaLogo} style={{ width: 70, height: 70 }} />
            <Text style={{ color: "red", fontWeight: "bold", marginTop: 10 , fontSize: 20 }}>
              Chick-fil-A
            </Text>
          </Pressable>

          {/* Dining Profile */}
          <Pressable
            style={[
              styles.card,
              hoveredCard === "dining" && {
                borderWidth: 3,
                shadowColor: "brown",
                shadowOffset: { width: 20, height: 20 },
                shadowOpacity: 0.7,
                shadowRadius: 18,
                borderColor: "brown",
              
              },
            ]}
            onHoverIn={() => setHoveredCard("dining")}
            onHoverOut={() => setHoveredCard(null)}
            onPress={() => navigation.navigate("Profiles/Dining" as never)}
          >
            <Ionicons name="restaurant" size={60} color="brown" />
            <Text style={{ color: "brown", fontWeight: "bold", marginTop: 10 , fontSize: 20 }}>
              Dining
            </Text>
          </Pressable>
        </View>
      ) : role === "EMPLOYEE" ? (
        <View style={styles.row}>
          {/* Chick-fil-A Profile */}
          <Pressable
            style={[
              styles.card,
              hoveredCard === "chickfila" && {
                borderWidth: 3,
                shadowColor: "red",
                shadowOffset: { width: 20, height: 20 },
                shadowOpacity: 0.7,
                shadowRadius: 18,
                borderColor: "red",
              },
            ]}
            onHoverIn={() => setHoveredCard("chickfila")}
            onHoverOut={() => setHoveredCard(null)}
            onPress={() => navigation.navigate("Profiles/chickfilA" as never)}
          >
            <Image source={cfaLogo} style={{ width: 60, height: 60 }} />
            <Text style={{ color: "red", fontWeight: "bold", marginTop: 10 , fontSize: 20}}>
              Chick-fil-A
            </Text>
          </Pressable>

          {/* Dining Profile */}
          <Pressable
            style={[
              styles.card,
              hoveredCard === "dining" && {
                borderWidth: 3,
                shadowColor: "brown",
                shadowOffset: { width: 20, height: 20 },
                shadowOpacity: 0.7,
                shadowRadius: 18,
                borderColor: "brown",
              },
            ]}
            onHoverIn={() => setHoveredCard("dining")}
            onHoverOut={() => setHoveredCard(null)}
            onPress={() => navigation.navigate("Profiles/Dining" as never)}
          >
            <Ionicons name="restaurant" size={60} color="brown" />
            <Text style={{ color: "brown", fontWeight: "bold", marginTop: 10, fontSize: 20 }}>
              Dining
            </Text>
          </Pressable>
        </View>
      ) : (
        <Text style={styles.noAccessText}>Access Denied: Employees Only</Text>
      )}
 
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //padding: 10,
    width: "auto",
    height: "auto",
    resizeMode: "cover",
  },
  headerText: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 90,
    color: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    width: "40%",
    height: "auto",
  },
  card: {
    backgroundColor: "white",
    width: "35%",
    paddingVertical: 20,
    borderRadius: 38,
    alignItems: "center",
    margin: 30,
    borderWidth: 0,
    borderColor: "transparent",
    cursor: "pointer",
  },
  noAccessText: {
    fontSize: 16,
    color: "red",
    marginTop: 10,
  },
});
