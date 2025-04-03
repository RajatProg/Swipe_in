import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
  Platform,
  LayoutChangeEvent,
} from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

// Data shape from your DB
type DiningAPIItem = {
  menu_id: number;
  item_title: string;
  item_detail: string;
  portion: string;
  diet: string;
  date: string; 
  calories: number;
  main_category: string;
  subcategory: string;
};

type DiningItem = {
  id: number;
  title: string;
  detail: string;
  portion: string;
  diet: string;
  date: string; 
  calories: number;
  mainCategory: string;
  subcategory: string;
};

// Main categories & Payment methods
const mainCategories = ["Breakfast", "Lunch", "Dinner"];
const paymentMethods = [
  "Meal Swipes",
  "Cash",
  "Card",
  "Flex Dollars",
  "Employee Meal",
];
const userFirstName = "John";

// Create date at local noon from "YYYY-MM-DD"
function createLocalNoonDate(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0);
}

// Create today's date at local noon
function createLocalNoonDateForToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0);
}

export default function DiningScreen() {
  const navigation = useNavigation();

  const [diningData, setDiningData] = useState<DiningItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState("Breakfast");
  const [selectedDiet, setSelectedDiet] = useState("All");
  const [selectedDate, setSelectedDate] = useState<Date>(createLocalNoonDateForToday());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [timelineWidth, setTimelineWidth] = useState<number>(0);

  // ========== Fetch Data ==========
  useEffect(() => {
    const fetchDiningMenu = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("http://127.0.0.1:8081/Dinig_Menu/");
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data: DiningAPIItem[] = await response.json();
        const mapped = data.map((item) => {
          const dateStr = item.date.includes("T") ? item.date.slice(0, 10) : item.date;
          return {
            id: item.menu_id,
            title: item.item_title,
            detail: item.item_detail,
            portion: item.portion,
            diet: item.diet,
            date: dateStr,
            calories: item.calories,
            mainCategory: item.main_category,
            subcategory: item.subcategory,
          };
        });
        setDiningData(mapped);
      } catch (err: any) {
        setError(err.message || "Error fetching dining menu");
      } finally {
        setLoading(false);
      }
    };
    fetchDiningMenu();
  }, []);

  // Update currentTime every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  // Automatic Category Switch
  useEffect(() => {
    const hr = currentTime.getHours();
    const min = currentTime.getMinutes();
    const totalMinutes = hr * 60 + min;
    if (totalMinutes >= 7 * 60 && totalMinutes <= 10 * 60) {
      setSelectedCategory("Breakfast");
    } else if (totalMinutes >= 11 * 60 && totalMinutes <= 15 * 60) {
      setSelectedCategory("Lunch");
    } else if (totalMinutes >= (16 * 60) && totalMinutes <= 22 * 60) {
      setSelectedCategory("Dinner");
    }
  }, [currentTime]);

  // DateTimePicker
  function formatDateToYMD(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  const filterDateStr = formatDateToYMD(selectedDate);

  // Native date => local noon
  const onDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS !== "web") {
      setShowDatePicker(false);
    }
    if (date) {
      const forcedNoon = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0);
      setSelectedDate(forcedNoon);
    }
  };

  // Web date => local noon
  const handleWebDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const forcedNoon = createLocalNoonDate(e.target.value);
    setSelectedDate(forcedNoon);
  };

  // Filter Items
  const filteredItems = diningData.filter((item) => {
    const catMatch = item.mainCategory === selectedCategory;
    const dietMatch = selectedDiet === "All" ? true : item.diet === selectedDiet;
    const dateMatch = item.date === filterDateStr;
    return catMatch && dietMatch && dateMatch;
  });

  // Group by subcategory
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.subcategory]) {
      acc[item.subcategory] = [];
    }
    acc[item.subcategory].push(item);
    return acc;
  }, {} as Record<string, DiningItem[]>);

  // Timeline Calculation
  function getTimeFraction(d: Date): number {
    const hr = d.getHours();
    const min = d.getMinutes();
    return (hr * 60 + min) / (24 * 60);
  }
  const fraction = getTimeFraction(currentTime);
  const pointerLeft = fraction * timelineWidth;
  const elapsedWidth = pointerLeft;
  const remainingWidth = timelineWidth - pointerLeft;

  function formatCurrentTimeLabel(d: Date): string {
    let hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    if (hours === 0) hours = 12;
    const mm = String(minutes).padStart(2, "0");
    return `${hours}:${mm} ${ampm}`;
  }
  const currentTimeLabel = formatCurrentTimeLabel(currentTime);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/swipein_1.png")}
            style={styles.logo}
          />
          <Text style={styles.logoText}>Mesquite Dining Hall</Text>
        </View>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Hi {userFirstName}!</Text>
        </View>
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={() => alert("Logging out...")}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* BANNER */}
      <View style={styles.bannerContainer}>
        <Text style={styles.bannerText}>What's On The Menu?</Text>
      </View>

      {/* MAIN + RIGHT columns */}
      <View style={{ flex: 1, flexDirection: "row", marginTop: 130 }}>
        {/* MAIN COLUMN (70%) */}
        <View style={[styles.mainColumn, { flex: 0.8 }]}>
          {/* Categories */}
          <View style={styles.topCard}>
            <View style={styles.categoriesRow}>
              {mainCategories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryButton,
                      isSelected && styles.categoryButtonSelected,
                    ]}
                    onPress={() => setSelectedCategory(cat)}
                  >
                    <Text
                      style={[
                        styles.categoryButtonText,
                        isSelected && styles.categoryButtonTextSelected,
                      ]}
                    >
                      {cat.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* TIMELINE + DATE ROW */}
          <View style={styles.timelineDateRow}>
           
            <View style={styles.timelineDarkBackground}>
              {/* TIME LABELS (white) */}
              <View style={styles.timelineLabelsRow}>
                <Text style={styles.timelineLabel}>12:00 AM</Text>
                <Text style={styles.timelineLabel}>06:00 AM</Text>
                <Text style={styles.timelineLabel}>12:00 PM</Text>
                <Text style={styles.timelineLabel}>06:00 PM</Text>
                <Text style={styles.timelineLabel}>12:00 AM</Text>
              </View>
              {/* The line itself: black portion vs. grey portion */}
              <View
                style={styles.timelineTrackContainer}
                onLayout={(e: LayoutChangeEvent) => {
                  const { width } = e.nativeEvent.layout;
                  setTimelineWidth(width);
                }}
              >
                {/* black portion from midnight to pointer */}
                <View style={[styles.timelineElapsed, { width: elapsedWidth }]} />
                {/* grey portion after pointer */}
                <View style={[styles.timelineRemaining, { left: elapsedWidth, width: remainingWidth }]} />
                {/* small circle knob on the line */}
                <View style={[styles.pointerKnob, { left: pointerLeft - 5 }]} />
                {/* black bubble above it with white text */}
                <View style={[styles.pointerBubble, { left: pointerLeft - 30 }]}>
                  <Text style={styles.pointerBubbleText}>{formatCurrentTimeLabel(currentTime)}</Text>
                </View>
              </View>
            </View>

            {/* Date Picker */}
            <View style={styles.dateContainer}>
              <Text style={styles.dateLabel}>Date</Text>
              {Platform.OS === "web" ? (
                <input
                  type="date"
                  value={formatDateToYMD(selectedDate)}
                  onChange={handleWebDateChange}
                  style={styles.dateInputWeb}
                />
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text style={styles.dateButtonText}>
                      {formatDateToYMD(selectedDate)}
                    </Text>
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      value={selectedDate}
                      mode="date"
                      display="calendar"
                      onChange={onDateChange}
                    />
                  )}
                </>
              )}
            </View>
          </View>

          {/* Diet Filter */}
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Filter by Category:</Text>
            <Picker
              selectedValue={selectedDiet}
              style={styles.picker}
              onValueChange={(val) => setSelectedDiet(val)}
            >
              <Picker.Item label="All" value="All" />
              <Picker.Item label="Vegan" value="Vegan" />
              <Picker.Item label="Vegetarian" value="Vegetarian" />
              <Picker.Item label="Protein" value="Protein" />
            </Picker>
          </View>

          {/* Menu Items */}
          {loading ? (
            <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <ScrollView style={styles.menuScroll} showsVerticalScrollIndicator={false}>
              {Object.keys(groupedItems).length === 0 ? (
                <Text style={styles.noItemsText}>No items found.</Text>
              ) : (
                Object.keys(groupedItems).map((subcat) => (
                  <View key={subcat} style={styles.subcategorySection}>
                    <Text style={styles.subcategoryHeader}>{subcat}</Text>
                    <View style={styles.tableHeaderRow}>
                      <Text style={[styles.tableHeaderText, { flex: 2 }]}>Menu Item</Text>
                      <Text style={styles.tableHeaderText}></Text>
                      <Text style={styles.tableHeaderText}>Portion</Text>
                      <Text style={styles.tableHeaderText}>Calories</Text>
                    </View>
                    {groupedItems[subcat].map((item) => (
                      <View key={item.id} style={styles.tableRow}>
                        <View style={[styles.tableCell, { flex: 2 }]}>
                          <Text style={styles.menuItemTitle}>{item.title}</Text>
                        </View>
                        {item.diet ? (
                            <Text style={styles.dietText}>{item.diet} </Text>
                          ) : null}
                        <Text style={styles.tableCell}>{item.portion || "N/A"}</Text>
                        <Text style={styles.tableCell}>{item.calories || 0} cal</Text>
                      </View>
                    ))}
                  </View>
                ))
              )}
            </ScrollView>
          )}
        </View>

        {/* RIGHT COLUMN (30%) */}
        <View style={[styles.rightColumn, { flex: 0.3 }]}>
          <Text style={styles.rightColumnHeader}>Payment Methods</Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity key={method} style={styles.paymentMethodItem}>
              <Text style={styles.paymentMethodText}>{method}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

// ------------- STYLES -------------
const styles = StyleSheet.create({
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
  },
  logoutContainer: {
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#ff3b30",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
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
});
