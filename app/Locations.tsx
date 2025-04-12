import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Image assets – update paths and formats as needed
const BackgroundImage = require("../assets/images/dining.jpg");
const NavbarLogo = require("../assets/images/swipein_1.png");
// Use a PNG version of the Chick‑fil‑A logo (or configure SVG support if needed)
const CFA_Logo = require("../assets/images/CFA_Logo.svg");

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

export default function LocationScreen() {
  const navigation = useNavigation();
  const scrollRef = useRef<ScrollView>(null);

  // Date and time states
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [timelineWidth, setTimelineWidth] = useState<number>(0);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // --- Timeline Calculation ---
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
    hours = hours % 12 || 12;
    const mm = String(minutes).padStart(2, "0");
    return `${hours}:${mm} ${ampm}`;
  }
  const currentTimeLabel = formatCurrentTimeLabel(currentTime);

  // Date change handler for TextInput (web-friendly)
  const handleWebDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const forcedNoon = createLocalNoonDate(e.target.value);
    setSelectedDate(forcedNoon);
  };

  return (
    <ScrollView ref={scrollRef} showsHorizontalScrollIndicator={false}>
      <ImageBackground source={BackgroundImage} style={styles.backgroundImage} blurRadius={1}>
        <View style={styles.background}>
          {/* Navigation Bar */}
          <View style={styles.navbar}>
            <Image source={NavbarLogo} style={styles.navbarTitle} />
            <View style={styles.navLinks}>
              {[
                { label: "Home", route: "index" },
                { label: "Locations", route: "Locations" },
                { label: "About", route: "about" },
                { label: "Login/Register", route: "Login" },
              ].map((navItem, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => navigation.navigate(navItem.route as never)}
                  style={styles.navItem}
                >
                  <Text style={styles.navText}>{navItem.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Content Section */}
          <ScrollView style={styles.container}>
            {/* Timeline (Barcode-style time indicator) */}
            <View
              style={styles.timelineTrackContainer}
              onLayout={(e) => setTimelineWidth(e.nativeEvent.layout.width)}
            >
              <View style={[styles.timelineElapsed, { width: elapsedWidth }]} />
              <View style={[styles.timelineRemaining, { width: remainingWidth }]} />
              <View style={[styles.pointerKnob, { left: pointerLeft - 5 }]} />
              <View style={[styles.pointerBubble, { left: pointerLeft - 30 }]}>
                <Text style={styles.pointerBubbleText}>{currentTimeLabel}</Text>
              </View>
            </View>
            <Text style={styles.timeLabel}>Current Time: {currentTimeLabel}</Text>

            {/* Date Picker */}
            <View style={styles.dateRow}>
              <Text style={styles.dateLabel}>Date:</Text>
              <TextInput
                style={styles.dateInput}
                value={formatDateToYMD(selectedDate)}
                onChangeText={(val) =>
                  // Simulate event for web
                  handleWebDateChange({ target: { value: val } } as any)
                }
              />
            </View>

            {/* Location Cards (Column-wise) */}
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("Profiles/chickfilA" as never)}
            >
              <Image source={CFA_Logo} style={styles.cardImage} />
              <Text style={styles.closedTag}>CLOSED</Text>
              <Text style={styles.cardTitle}>Chick-fil-A</Text>
              <Text style={styles.cardSub}>Normal Hours</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("Profiles/Dining" as never)}
            >
              <Image source={BackgroundImage} style={styles.cardImage} />
              <Text style={styles.closedTag}>CLOSED</Text>
              <Text style={styles.cardTitle}>Shepler Dining Hall</Text>
              <Text style={styles.cardSub}>Normal Hours</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  background: {
    backgroundColor: "rgba(255,255,255,0.85)",
    flex: 1,
  },
  // Navbar styles
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  navbarTitle: {
    width: 100,
    height: 40,
    resizeMode: "contain",
  },
  navLinks: {
    flexDirection: "row",
    alignItems: "center",
  },
  navItem: {
    marginLeft: 20,
  },
  navText: {
    fontSize: 16,
    color: "#333",
  },
  // Container for the main content
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  // Timeline (Barcode-style) styles
  timelineTrackContainer: {
    height: 20,
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    marginVertical: 16,
    position: "relative",
    overflow: "hidden",
  },
  timelineElapsed: {
    backgroundColor: "#000",
    height: "100%",
  },
  timelineRemaining: {
    backgroundColor: "#ccc",
    height: "100%",
  },
  pointerKnob: {
    position: "absolute",
    top: -5,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#000",
  },
  pointerBubble: {
    position: "absolute",
    top: -35,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: "#000",
    borderRadius: 4,
  },
  pointerBubbleText: {
    color: "#fff",
    fontSize: 12,
  },
  timeLabel: {
    alignSelf: "flex-end",
    marginBottom: 10,
    fontWeight: "500",
  },
  // Date Picker styles
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  dateLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  dateInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#999",
    fontSize: 16,
    width: 120,
  },
  // Card styles
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    resizeMode: "cover",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  cardSub: {
    fontSize: 14,
    color: "#777",
  },
  closedTag: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#fff",
    color: "red",
    fontWeight: "bold",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    borderColor: "red",
    borderWidth: 1,
  },
});
