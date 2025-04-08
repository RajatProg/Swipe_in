import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
    },
    // HEADER
    headerContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 80,
      backgroundColor: "#ffffff",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#e0e0e0",
      zIndex: 20,
    },
    logoContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    logo: {
      width: 40,
      height: 40,
      resizeMode: "contain",
      marginRight: 8,
    },
    logoText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333",
    },
    greetingContainer: {
      flex: 1,
      alignItems: "center",
    },
    greetingText: {
      fontSize: 18,
      color: "#333",
      fontWeight: "bold",
    },
    logoutContainer: {
      alignItems: "center",
      marginRight: 16,
    },
    logoutButton: {
      backgroundColor: 'brown',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
    },
    logoutText: {
      color: '#fff',
    fontWeight: 'bold',
    
    },
    // BANNER
    bannerContainer: {
      position: "absolute",
      top: 80,
      left: 0,
      right: 0,
      height: 52,
      backgroundColor: "#880000",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 19,
    },
    bannerText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
  
    // MAIN COLUMN
    mainColumn: {
      marginLeft: 0,
      marginRight: 0,
      paddingHorizontal: 16,
      paddingVertical: 20,
    },
    topCard: {
      backgroundColor: "#ffffff",
      padding: 16,
      borderRadius: 12,
      marginBottom: 16,
      elevation: 2,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 4,
    },
    categoriesRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    categoryButton: {
      flex: 1,
      marginHorizontal: 4,
      paddingVertical: 10,
      backgroundColor: "#ffffff",
      borderWidth: 1,
      borderColor: "#e0e0e0",
      borderRadius: 12,
      alignItems: "center",
    },
    categoryButtonSelected: {
      backgroundColor: "maroon",
      borderColor: "maroon",
    },
    categoryButtonText: {
      fontSize: 16,
      color: "#333",
    },
    categoryButtonTextSelected: {
      color: "#ffffff",
    },
  
    // TIMELINE + DATE ROW
    timelineDateRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    dateContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
      marginLeft: 10,
      marginTop: 30,
      marginRight: 10,
    },
    dateLabel: {
      fontSize: 14,
      color: "#333",
      marginBottom: 4,
    },
    dateInputWeb: {
      padding: 4,
      fontSize: 14,
      borderWidth: 1,
      borderColor: "#e0e0e0",
      borderRadius: 6,
    },
    dateButton: {
      backgroundColor: "#007AFF",
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 6,
    },
    dateButtonText: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "600",
    },
  
    // TIMELINE STYLES
    timelineDarkBackground: {
      backgroundColor: "transaparent", // dark row background
      padding: 20,
      flex: 1,
  
      borderRadius: 12,
    },
    timelineLabelsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 40,
    },
    timelineLabel: {
      
      fontSize: 13,
      color: "maroon",
      fontWeight: "bold", // white text
      textAlign: "center",
    },
    timelineTrackContainer: {
      position: "relative",
      height: 4,
      backgroundColor: "transparent",
      marginTop: 4,
      margin: 5
    },
    timelineElapsed: {
      position: "absolute",
      left: 0,
      top: 0,
      height: 4,
      backgroundColor: "black", // white portion
    },
    timelineRemaining: {
      position: "absolute",
      top: 0,
      height: 4,
      backgroundColor: "grey", // grey portion
    },
    pointerKnob: {
      position: "absolute",
      top: -6,
      width: 16,
      height: 16,
      borderRadius: 100,
      backgroundColor: "maroon", // blue knob
    },
    pointerBubble: {
      position: "absolute",
      bottom: 14, // above the line
      backgroundColor: "black", // dark bubble
      borderRadius: 14,
      paddingHorizontal: 10,
      paddingVertical: 3,
    },
    pointerBubbleText: {
      color: "#fff",
      fontSize: 12,
    },
  
    // DIET FILTER
    pickerContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 17,
      paddingHorizontal: 8,
      paddingVertical: 4,
      backgroundColor: "#ffffff",
      borderWidth: 1,
      borderColor: "#e0e0e0",
      borderRadius: 12,
      marginLeft: "auto",
    },
    pickerLabel: {
      fontSize: 16,
      marginRight: 10,
      color: "#333",
    },
    picker: {
      flex: 1,
      height: 22,
      borderRadius: 12,
    },
  
    // MENU LIST
    menuScroll: {
      flex: 1,
    
      
    },
    errorText: {
      color: "red",
      textAlign: "center",
      marginTop: 20,
      fontSize: 16,
    },
    noItemsText: {
      textAlign: "center",
      marginVertical: 20,
      fontSize: 16,
      color: "#777",
    },
    subcategorySection: {
      marginBottom: 30,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },
    subcategoryHeader: {
      fontSize: 17,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 12,
    },
    tableHeaderRow: {
      flexDirection: "row",
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      marginBottom: 8,
    },
    tableHeaderText: {
      flex: 1,
      fontSize: 15,
      fontWeight: "600",
      color: "#333",
    },
    tableRow: {
      flexDirection: "row",
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: "#f0f0f0",
      alignItems: "center",
    },
    tableCell: {
      flex: 1,
      fontSize: 14,
      color: "#444",
    },
    menuItemTitle: {
      fontSize: 15,
      fontWeight: "400",
      marginBottom: 4,
      color: "#333",
    },
    dietText: {
      flex:1,
      fontSize: 14,
      fontStyle: "italic",
      marginBottom: 4,
      color: "#777",
    },
  
    // RIGHT COLUMN (30%)
    rightColumn: {
      
      backgroundColor: "#fafafa",
      paddingHorizontal: 32,
      borderLeftWidth: 1,
      borderLeftColor: "#e0e0e0",
    },
    rightColumnHeader: {
      fontWeight: "bold",
      fontSize: 18,
      margin: 80,
      marginBottom: 42,
      color: "#333",
      textAlign: "center",
    },
    paymentMethodItem: {
      
      paddingVertical: 28,
      marginHorizontal: 100,
      marginBottom: 40,
      borderRadius: 12,
      backgroundColor: "brown",
      borderWidth: 1,
      borderColor: "#e0e0e0",
    },
    paymentMethodText: {
      fontSize: 16,
      textAlign: "center",
      color: "white",
    },

    
  modalContainer2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.68)'

    
  },
  alertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 95,
    borderRadius: 22,
    margin: 450,
    borderColor: 'brown',
    borderWidth: 6
  
  },
  animation: {
    width: 150,
    height: 150,
    marginRight: 20,
  },
  text: {
    fontSize: 20,
    flexShrink: 1
    
  }
  });
  
  export const modalStyles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      width: 300,
      backgroundColor: "#fff",
      borderRadius: 8,
      padding: 16,
    },
    modalPromptLabel: {
      fontSize: 16,
      marginBottom: 8,
      color: "#333",
      fontWeight: "600",
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 6,
      fontSize: 16,
      marginBottom: 12,
      color: "#333",
    },
    totalText: {
      fontSize: 18,
      marginTop: 12,
      textAlign: "center",
      color: "#333",
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: 20,
    },
    modalCancelButton: {
      marginRight: 24,
      padding: 8,
    },
    modalCancelText: {
      color: "red",
      fontWeight: "bold",
    },
    modalConfirmButton: {
      padding: 8,
    },
    modalConfirmText: {
      color: "green",
      fontWeight: "bold",
    },
  });
  
  