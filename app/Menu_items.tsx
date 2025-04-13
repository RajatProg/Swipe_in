// MenuItemsScreen.tsx
import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function MenuItemsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Navigation Bar */}
      <View style={styles.navbar}>
        <Image
          source={require("../assets/images/swipein_1.png")}
          style={styles.navbarLogo}
        />
        <View style={styles.navLinks}>
          {[
            { label: "Home", route: "index" },
            { label: "Menu", route: "Locations" },
            { label: "About", route: "about" },
            { label: "Login/Register", route: "Login" },
          ].map((navItem, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.navItem}
              onPress={() => navigation.navigate(navItem.route as never)}
            >
              <Text style={styles.navText}>{navItem.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      navigation.navigate("Menu_items" as never);
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  // Navigation Bar
  navbar: {
    backgroundColor: "#1f2a44",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  navbarLogo: {
    width: 100,
    height: 100,
    marginLeft: 40,
    marginTop: 20,
  },
  navLinks: {
    flexDirection: "row",
  },
  navItem: {
    marginHorizontal: 40,
  },
  navText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
