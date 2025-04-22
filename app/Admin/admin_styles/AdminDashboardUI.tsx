// admin_styles/AdminDashboardUI.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F4F4F4",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#1C2541",
    borderRadius: 8,
    padding: 16,
    width: "48%",
    marginBottom: 16,
    alignItems: "center",
  },
  cardCount: {
    fontSize: 32,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
  },
});
