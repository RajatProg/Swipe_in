import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  StyleSheet,
  LayoutChangeEvent,
  Image,
  ImageBackground,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";

// Custom hook to track hover state (for web)
function useHover() {
  const [isHovered, setHovered] = useState(false);
  const hoverProps = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };
  return { isHovered, hoverProps };
}

// NavLink component that underlines when hovered or active.
type NavLinkProps = {
  label: string;
  route: string;
  isActive: boolean;
  onPress: () => void;
};

function NavLink({ label, route, isActive, onPress }: NavLinkProps) {
  const { isHovered, hoverProps } = useHover();
  const activeStyle = (isHovered || isActive) ? styles.navTextActive : {};
  return (
    <TouchableOpacity onPress={onPress} style={styles.navItem} {...hoverProps}>
      <Text style={[styles.navText, activeStyle]}>{label}</Text>
    </TouchableOpacity>
  );
}

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

function formatCurrentTimeLabel(d: Date): string {
  let hours = d.getHours();
  const minutes = d.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const mm = String(minutes).padStart(2, "0");
  return `${hours}:${mm} ${ampm}`;
}

/**
 * Check if a given location is open based on its title and a given date.
 */
function isLocationOpen(featureTitle: string, date: Date): boolean {
  const day = date.getDay();
  const totalMinutes = date.getHours() * 60 + date.getMinutes();

  if (featureTitle === "Chick-fil-A") {
    if (day === 0 || day === 6) {
      return false;
    }
    return totalMinutes >= 8 * 60 && totalMinutes < 23 * 60;
  } else {
    let openTime: number;
    let closeTime: number;
    if (day >= 1 && day <= 5) {
      openTime = 8 * 60;
      closeTime = 23 * 60;
    } else {
      openTime = 7 * 60;
      closeTime = 23 * 60;
    }
    return totalMinutes >= openTime && totalMinutes < closeTime;
  }
}

const featuresData = [
  {
    title: "Chick-fil-A",
    description: "Famous for their chicken sandwiches.",
    hoverHours: `Regular Hours

Monday - Thursday :   10:30 AM - 04:00 PM

Friday :     10:30 AM - 02:00 PM

Saturday - Sunday :   Closed`,
    image: require("../assets/images/cfa_local.jpg"),
  },
  {
    title: "Mesquite Dining Hall",
    description: "Enjoy a variety of meals and services.",
    hoverHours: `Regular Hours

Everyday

  Breakfast : 07:00 AM - 12:00 PM

  Lunch : 12:00 AM - 03:30 PM

  Dinner : 04:30 PM - 10:00 PM`,
    image: require("../assets/images/dine.jpg"),
  },
];

export default function LocationScreen() {
  const navigation = useNavigation();
  const route = useRoute(); // Get the current route
  // Define the nav items with route names that match your navigation configuration.
  const navItems = [
    { label: "Home", route: "index" },
    { label: "Menu", route: "Locations" },
    { label: "About", route: "about" },
    { label: "Login/Register", route: "Login" },
  ];

  const [selectedDate, setSelectedDate] = useState<Date>(
    createLocalNoonDateForToday()
  );
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [timelineWidth, setTimelineWidth] = useState<number>(0);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  function getTimeFraction(d: Date): number {
    const hr = d.getHours();
    const min = d.getMinutes();
    return (hr * 60 + min) / (24 * 60);
  }
  const fraction = getTimeFraction(currentTime);
  const pointerLeft = fraction * timelineWidth;
  const elapsedWidth = pointerLeft;
  const remainingWidth = timelineWidth - pointerLeft;

  const handleWebDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const forcedNoon = createLocalNoonDate(e.target.value);
    setSelectedDate(forcedNoon);
  };

  const onDateChange = (event: any, date?: Date) => {
    if (Platform.OS !== "web") {
      setShowDatePicker(false);
    }
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

  return (
    <ScrollView style={styles.container}>
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
              // Determine active state using the current route name
              isActive={route.name === navItem.route}
              onPress={() => navigation.navigate(navItem.route as never)}
            />
          ))}
        </View>
      </View>
      <Text style={styles.sectionTitle}>Locations</Text>

      {/* TIMELINE AND DATE PICKER */}
      <View style={styles.timelineDateRow}>
        <View style={styles.timelineDarkBackground}>
          <View style={styles.timelineLabelsRow}>
            <Text style={styles.timelineLabel}>12:00 AM</Text>
            <Text style={styles.timelineLabel}>06:00 AM</Text>
            <Text style={styles.timelineLabel}>12:00 PM</Text>
            <Text style={styles.timelineLabel}>06:00 PM</Text>
            <Text style={styles.timelineLabel}>12:00 AM</Text>
          </View>
          <View
            style={styles.timelineTrackContainer}
            onLayout={(e: LayoutChangeEvent) =>
              setTimelineWidth(e.nativeEvent.layout.width)
            }
          >
            <View style={[styles.timelineElapsed, { width: elapsedWidth }]} />
            <View
              style={[
                styles.timelineRemaining,
                { left: elapsedWidth, width: remainingWidth },
              ]}
            />
            <View style={[styles.pointerKnob, { left: pointerLeft - 5 }]} />
            <View style={[styles.pointerBubble, { left: pointerLeft - 30 }]}>
              <Text style={styles.pointerBubbleText}>
                {formatCurrentTimeLabel(currentTime)}
              </Text>
            </View>
          </View>
        </View>

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

      {/* LOCATION CARDS */}
      <View style={styles.featuresGrid}>
        {featuresData.map((feature, index) => {
          const { isHovered, hoverProps } = useHover();
          const locationOpen = isLocationOpen(feature.title, selectedDate);
          return (
            <TouchableOpacity
              key={index}
              {...hoverProps}
              style={[
                styles.featureCard,
                locationOpen ? styles.openCard : styles.closedCard,
              ]}
              onPress={() => {
                if (feature.title === "Chick-fil-A") {
                  navigation.navigate("Menu/ChickfilA" as never);
                } else if (feature.title === "Mesquite Dining Hall") {
                  navigation.navigate("Menu/Dining" as never);
                }
              }}
            >
              {locationOpen ? (
                <Text style={styles.openTag}>OPEN</Text>
              ) : (
                <Text style={styles.closedTag}>CLOSED</Text>
              )}
              {!isHovered && (
                <ImageBackground
                  source={feature.image}
                  style={styles.featureImage}
                  resizeMode="stretch"
                />
              )}
              <View style={styles.feature}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                {isHovered ? (
                  <Text style={styles.featureDescription}>
                    {feature.hoverHours}
                  </Text>
                ) : (
                  <Text style={styles.featureDescription}>
                    {feature.description}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
  // Thick underline style using borderBottom for active or hovered nav items
  navTextActive: {
    borderBottomWidth: 5,
    borderBottomColor: "brown",
    paddingBottom: 2,
    borderRadius: 5,
  },
  // Timeline and Date Picker styles
  timelineDateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 16,
    marginBottom: 40,
  },
  timelineDarkBackground: {
    backgroundColor: "transparent",
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
    fontWeight: "bold",
    textAlign: "center",
  },
  timelineTrackContainer: {
    position: "relative",
    height: 4,
    backgroundColor: "transparent",
    marginTop: 13,
    margin: 5,
  },
  timelineElapsed: {
    position: "absolute",
    left: 0,
    top: 0,
    height: 4,
    backgroundColor: "black",
  },
  timelineRemaining: {
    position: "absolute",
    top: 0,
    height: 4,
    backgroundColor: "grey",
  },
  pointerKnob: {
    position: "absolute",
    top: -6,
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: "maroon",
  },
  pointerBubble: {
    position: "absolute",
    bottom: 14,
    backgroundColor: "black",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  pointerBubbleText: {
    color: "#fff",
    fontSize: 12,
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
    padding: 9,
    paddingLeft: 12,
    fontSize: 17,
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
    borderRadius: 15,
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
  sectionTitle: {
    paddingTop: 40,
    fontSize: 46,
    fontWeight: "bold",
    marginBottom: 25,
    color: "brown",
    textAlign: "center",
  },
  // Feature Cards styles
  featuresGrid: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 30,
    flexWrap: "wrap",
  },
  featureCard: {
    width: 400,
    margin: 10,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 15, height: 15 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    position: "relative",
    borderWidth: 3,
  },
  openCard: {
    borderColor: "green",
  },
  closedCard: {
    borderColor: "red",
  },
  closedTag: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "red",
    color: "white",
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 16,
    borderColor: "red",
    borderWidth: 2,
    zIndex: 1000,
  },
  openTag: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "green",
    color: "white",
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 16,
    borderColor: "green",
    borderWidth: 2,
    zIndex: 1000,
  },
  featureImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  feature: {
    backgroundColor: "hsla(0, 40.00%, 98.00%, 0.66)",
    padding: 10,
    borderBottomRightRadius: 70,
    position: "relative",
  },
  featureTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "black",
    paddingTop: 3,
    paddingBottom: 10,
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 16,
    marginTop: 14,
    color: "rgba(3, 0, 0, 0.98)",
    textAlign: "center",
    fontWeight: "500",
  },
});

export { NavLink };
