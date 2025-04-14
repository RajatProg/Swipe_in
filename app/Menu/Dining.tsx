import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
  Platform,
  StyleSheet,
  LayoutChangeEvent,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";

// Data shape from your Dining API
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

export type DiningItem = {
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

// Default image if none is found
const defaultImage = require("../../assets/images/swipee.jpg");

// Simple useHover hook for web (ignored on native)
const useHover = () => {
  const [isHovered, setHovered] = useState(false);
  const hoverProps = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };
  return { hoverProps, isHovered };
};

//
// NavLink Component – for the top navigation bar.
// Applies an underline when hovered (on web) or when active.
//
type NavLinkProps = {
  label: string;
  route: string;
  isActive: boolean;
  onPress: () => void;
};

function NavLink({ label, route, isActive, onPress }: NavLinkProps) {
  const { hoverProps, isHovered } = useHover();
  const activeStyle = (isHovered || isActive) ? styles.navTextActive : {};
  return (
    <TouchableOpacity onPress={onPress} style={styles.navItem} {...hoverProps}>
      <Text style={[styles.navText, activeStyle]}>{label}</Text>
    </TouchableOpacity>
  );
}

//
// MainCategory Component – for Breakfast, Lunch, Dinner with hover + selected underline.
//
type MainCategoryProps = {
  category: string;
  isSelected: boolean;
  onSelect: () => void;
};

function MainCategory({ category, isSelected, onSelect }: MainCategoryProps) {
  const { hoverProps, isHovered } = useHover();
  // If hovered or selected, apply the thick underline style
  const underlineStyle = (isHovered || isSelected)
    ? styles.categoryButtonTextSelected
    : null;

  return (
    <TouchableOpacity
      style={styles.categoryButton}
      onPress={onSelect}
      {...hoverProps}
    >
      <Text style={[styles.categoryButtonText, underlineStyle]}>
        {category.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
}

//
// Component: CategorySection for grouping dining items by subcategory.
//
type CategorySectionProps = {
  cat: string;
  itemsForCat: DiningItem[];
  expandedCategory: string | null;
  toggleCategory: (cat: string) => void;
};

function CategorySection({
  cat,
  itemsForCat,
  expandedCategory,
  toggleCategory,
}: CategorySectionProps) {
  const { hoverProps, isHovered } = useHover();
  const underlineStyle =
    expandedCategory === cat || isHovered
      ? localStyles.categoryHeaderActive
      : null;

  return (
    <View style={localStyles.categorySection}>
      <TouchableOpacity onPress={() => toggleCategory(cat)} {...hoverProps}>
        <Text style={[localStyles.categoryHeader, underlineStyle]}>{cat}</Text>
      </TouchableOpacity>
      {expandedCategory === cat && (
        <View style={localStyles.categoryItemsGrid}>
          {itemsForCat.map((item) => (
            <TouchableOpacity key={item.id} style={localStyles.card}>
              <View style={localStyles.textContainer}>
                <Text style={localStyles.itemName}>{item.title}</Text>
                <Text style={localStyles.calories}>{item.diet}</Text>
                <Text style={localStyles.calories}>{item.portion}</Text>
                <Text style={localStyles.calories}>{item.calories} Cal</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

//
// Helper Functions: Date formatting and local noon date creation
//
function formatDateToYMD(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function createLocalNoonDate(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0);
}

function createLocalNoonDateForToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0);
}

//
// Main Dining Screen
//
export default function DiningMenuScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [menuData, setMenuData] = useState<DiningItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mainCategories = ["Breakfast", "Lunch", "Dinner"];
  const [selectedCategory, setSelectedCategory] = useState<string>("Breakfast");


  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Date picker state
  const [selectedDate, setSelectedDate] = useState<Date>(
    createLocalNoonDateForToday()
  );
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  // Fetch dining data from the API
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
          const dateStr = item.date.includes("T")
            ? item.date.slice(0, 10)
            : item.date;
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
        setMenuData(mapped);
      } catch (err: any) {
        setError(err.message || "Error fetching dining menu");
      } finally {
        setLoading(false);
      }
    };
    fetchDiningMenu();
  }, []);

 
  const handleWebDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const forcedNoon = createLocalNoonDate(e.target.value);
    setSelectedDate(forcedNoon);
  };

  const onDateChange = (event: any, date?: Date) => {
    if (Platform.OS !== "web") setShowDatePicker(false);
    if (date) {
      const forcedNoon = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        12,
        0,
        0
      );
      setSelectedDate(forcedNoon);
    }
  };
  const filterDateStr = formatDateToYMD(selectedDate);
  const filteredItems = menuData.filter((item) => {
    const catMatch = item.mainCategory === selectedCategory;
    const dateMatch = item.date === filterDateStr;
    return catMatch && dateMatch;
  });


  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.subcategory]) {
      acc[item.subcategory] = [];
    }
    acc[item.subcategory].push(item);
    return acc;
  }, {} as Record<string, DiningItem[]>);

  // Toggle the expanded subcategory group
  const toggleCategory = (cat: string) => {
    setExpandedCategory((prev) => (prev === cat ? null : cat));
  };

  // Navigation items for the top nav bar
  const navItems = [
    { label: "Home", route: "index" },
    { label: "Menu", route: "Locations" },
    { label: "About", route: "about" },
    { label: "Login/Register", route: "Login" },
  ];

  return (
    <View style={styles.container}>
      {/* NAVIGATION BAR */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate("index" as never)}>
          <Image
            source={require("@/assets/images/swipein_1.png")}
            style={styles.navbarLogo}
          />
        </TouchableOpacity>
        <View style={styles.navLinks}>
          {navItems.map((navItem, idx) => (
            <NavLink
              key={idx}
              label={navItem.label}
              route={navItem.route}
              isActive={route.name === navItem.route}
              onPress={() => navigation.navigate(navItem.route as never)}
            />
          ))}
        </View>
      </View>

      {/* CENTERED HEADER */}
      <View style={centerHeaderStyles.header}>
        <Text style={{ fontSize: 40, marginTop:35 ,fontWeight: "bold" , color: "rgb(198, 2, 2)"}}>
          Mesquite Dining Hall
        </Text>
      </View>


      <View style={styles.datePickerContainer}>
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

    
      <View style={styles.topCard}>
        <View style={styles.categoriesRow}>
          {mainCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <MainCategory
                key={cat}
                category={cat}
                isSelected={isSelected}
                onSelect={() => setSelectedCategory(cat)}
              />
            );
          })}
        </View>
      </View>


      <ScrollView
        style={styles.menuContainer}
        contentContainerStyle={{ paddingBottom: 60, paddingTop: 20 }}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={{ color: "red", padding: 10 }}>{error}</Text>
        ) : (
          Object.keys(groupedItems).map((subcat) => (
            <CategorySection
              key={subcat}
              cat={subcat}
              itemsForCat={groupedItems[subcat]}
              expandedCategory={expandedCategory}
              toggleCategory={toggleCategory}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}


const centerHeaderStyles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  logo: {
    width: "100%",
    height: 120,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  // Navigation Bar
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  navbarLogo: {
    width: 100,
    height: 80,
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
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    marginHorizontal: 10,
  },

  navTextActive: {
    borderBottomWidth: 5,
    borderBottomColor: "rgb(198, 2, 2)",
    paddingBottom: 2,
    borderRadius: 5,
  },

  datePickerContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 15,
  },
  dateLabel: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  dateInputWeb: {
    padding: 9,
    paddingLeft: 12,
    fontSize: 17,
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
    borderRadius: 15,
    marginBottom  : 19,
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
  topCard: {
    marginTop: 10,
  },
  categoriesRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginRight: 60,
    flexWrap: "wrap",
  },

  categoryButton: {
    marginHorizontal: 20,
    paddingVertical: 7,

  },
  categoryButtonText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
  },
  categoryButtonTextSelected: {
    borderBottomWidth: 5,
    borderBottomColor: "rgb(198, 2, 2)",
    paddingBottom: 2,
    borderRadius: 5,
  },
  
  menuContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
  },
});

const localStyles = StyleSheet.create({
  categorySection: {
    marginBottom: 30,
  },
  categoryHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1f2a44",
    textAlign: "center",
    marginVertical: 10,
  },
  categoryHeaderActive: {
    borderBottomWidth: 9,
    borderBottomColor: "rgb(198, 2, 2)",   
    padding: 4,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    marginHorizontal: 690,
  },
  categoryItemsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    width: "23%",
    backgroundColor: "#fff",
    borderRadius: 19,
    margin: 14,
    elevation: 3,
    alignItems: "center",
    paddingVertical: 10,
  },
  textContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  calories: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});

export { DiningMenuScreen };
