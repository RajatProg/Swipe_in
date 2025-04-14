import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  
  StyleSheet,
  
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { cfaImages } from "../styles/cfa_images";

type MenuAPIItem = {
  menu_id: number;
  item_title: string;
  item_description: string;
  calories: number;
  price: number;
  category_id: number;
};

export type MenuItem = {
  id: number;
  name: string;
  description: string;
  calories: number;
  price: string;
  category: string;
  image: any;
};

const categoryMap: Record<number, string> = {
  4: "Entree",
  1: "Sides",
  7: "Nuggets",
  2: "Deserts",
  3: "Drinks",
  5: "Sauces",
  6: "Additional Items",
};

const categories = [
  "Entree",
  "Sides",
  "Nuggets",
  "Deserts",
  "Drinks",
  "Sauces",
  "Additional Items",
];

const defaultImage = require("../../assets/images/swipee.jpg");

const useHover = () => {
  const [isHovered, setHovered] = useState(false);
  const hoverProps = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };
  return { hoverProps, isHovered };
};

type NavLinkProps = {
  label: string;
  route: string;
  isActive: boolean;
  onPress: () => void;
};
function NavLink({ label, isActive, onPress }: NavLinkProps) {
  const { isHovered, hoverProps } = useHover();
  const activeStyle = (isHovered || isActive) ? localStyles.navTextActive : {};
  return (
    <TouchableOpacity onPress={onPress} style={localStyles.navItem} {...hoverProps}>
      <Text style={[localStyles.navText, activeStyle]}>{label}</Text>
    </TouchableOpacity>
  );
}

//
type CategorySectionProps = {
  cat: string;
  itemsForCat: MenuItem[];
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
    expandedCategory === cat || isHovered ? localStyles.categoryHeaderActive : null;
  
  return (
    <View style={localStyles.categorySection}>
      <TouchableOpacity onPress={() => toggleCategory(cat)} {...hoverProps}>
        <Text style={[localStyles.categoryHeader, underlineStyle]}>{cat}</Text>
      </TouchableOpacity>
      {expandedCategory === cat && (
        <View style={localStyles.categoryItemsGrid}>
          {itemsForCat.map((item) => (
            <TouchableOpacity key={item.id} style={localStyles.card}>
              <Image source={item.image} style={localStyles.itemImage} resizeMode="contain" />
              <View style={localStyles.textContainer}>
                <Text style={localStyles.itemName}>{item.name}</Text>
                <Text style={localStyles.calories}>{item.calories} Cal</Text>
              </View>
              <View style={localStyles.bottomRow}>
                <Text style={localStyles.price}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

export default function MenuItemsScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("http://127.0.0.1:8081/CFA_Menu/");
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data: MenuAPIItem[] = await response.json();
        const mapped = data.map((item) => {
          const priceString = `$${item.price.toFixed(2)}`;
          const catLabel = categoryMap[item.category_id] || "Additional Items";
          const foundImage = cfaImages[item.item_title] || defaultImage;
          return {
            id: item.menu_id,
            name: item.item_title,
            description: item.item_description,
            calories: item.calories,
            price: priceString,
            category: catLabel,
            image: foundImage,
          };
        });
        setMenuData(mapped);
      } catch (err: any) {
        setError(err.message || "Error fetching menu data");
      } finally {
        setLoading(false);
      }
    };
    fetchMenuData();
  }, []);

  const toggleCategory = (cat: string) => {
    setExpandedCategory((prev) => (prev === cat ? null : cat));
  };


  const navItems = [
    { label: "Home", route: "index" },
    { label: "Menu", route: "Locations" },
    { label: "About", route: "about" },
    { label: "Login/Register", route: "Login" },
  ];

  return (
    <View style={localStyles.container}>
      {/* NAVIGATION BAR */}
      <View style={localStyles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate("index" as never)}>
          <Image
            source={require("@/assets/images/swipein_1.png")}
            style={localStyles.navbarLogo}
          />
        </TouchableOpacity>
        <View style={localStyles.navLinks}>
                  {navItems.map((navItem, idx) => (
                    <NavLink
                      key={idx}
                      label={navItem.label}
                      route={navItem.route}
                      // Determine active state using the current route name
                      isActive={route.name === navItem.route}
                      onPress={() => navigation.navigate(navItem.route as never)}
                    />
                  ))}
                </View>
      </View>
      

      <View style={centerHeaderStyles.header}>
        <Image
          source={require("../../assets/images/CFA_Logo.svg")}
          style={centerHeaderStyles.logo}
          resizeMode="contain"
        />
      </View>
      
      {/* Menu Items Grouped by Category */}
      <ScrollView
        style={localStyles.menuContainer}
        contentContainerStyle={{ paddingBottom: 60, paddingTop: 20 }}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={{ color: "red", padding: 10 }}>{error}</Text>
        ) : (
          categories.map((cat) => {
            const itemsForCat = menuData.filter((item) => item.category === cat);
            if (itemsForCat.length === 0) return null;
            return (
              <CategorySection
                key={cat}
                cat={cat}
                itemsForCat={itemsForCat}
                expandedCategory={expandedCategory}
                toggleCategory={toggleCategory}
              />
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

//
// Centered header styles
//
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

//
// Local styles used in this CFA screen
//
const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  // Navigation Bar
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  navbarLogo: {
    width: 100,
    height: 80,
    marginLeft: 40,
    marginTop: 20,
  },
  navLinks: {
    flexDirection: "row",
    marginRight: 40,
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
  // Underline style for navlinks when active or hovered
  navTextActive: {
    borderBottomWidth: 5,
    borderBottomColor: "rgb(198, 2, 2)",
    paddingBottom: 2,
    borderRadius: 5,
  },
  // Menu Container
  menuContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
  },
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
    borderBottomColor: "red",   
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
  // Card styles: 4 items per row
  card: {
    width: "23%",
    backgroundColor: "#fff",
    borderRadius: 19,
    margin: 14,
    elevation: 3,
    alignItems: "center",
    paddingVertical: 10,
  },
  itemImage: {
    width: "80%",
    height: 190,
    borderRadius: 20,
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
  bottomRow: {
    marginTop: 8,
  },
  price: {
    fontSize: 14,
    color: "#c41200",
    fontWeight: "700",
  },
});

export { MenuItemsScreen };
