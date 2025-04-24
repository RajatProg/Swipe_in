import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Image } from "expo-image";
import { useHover } from "@react-native-aria/interactions";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Video } from "expo-av";
import { styles, localStyles } from "./student_styles/styles";
import { useAuth } from "../AuthContext";
import { useRouter } from "expo-router";
import axios from "axios";

const Placeholdervideo = require("@/assets/images/video.mov");
const SCREEN_WIDTH = Dimensions.get("window").width;
const EventBg = require("@/assets/images/coming.jpg");
const router = useRouter();

function isLocationOpen(feature: any, time: Date): boolean {
  const day = time.getDay();
  const totalMinutes = time.getHours() * 60 + time.getMinutes();

  if (feature.title === "Chick-fil-A") {
    if (day === 0 || day === 6) {
      return false;
    }

    if (day === 5) {
      return totalMinutes >= 10 * 60 + 30 && totalMinutes < 14 * 60;
    }

    return totalMinutes >= 10 * 60 + 30 && totalMinutes < 16 * 60;
  } else if (feature.title === "Mesquite Dining Hall") {
    const intervals = [
      { start: 7 * 60, end: 12 * 60 },
      { start: 12 * 60, end: 15 * 60 + 30 },
      { start: 16 * 60 + 30, end: 22 * 60 },
    ];
    return intervals.some(
      (interval) =>
        totalMinutes >= interval.start && totalMinutes < interval.end
    );
  }

  return false;
}

const upcomingEvents = [
  {
    id: "1",
    name: "",
    image: require("@/assets/images/cycle.jpg"),
  },
];
const featuresData = [
  {
    title: "Chick-fil-A",
    description: "Famous for their chicken sandwiches.",
    hoverHours: `Regular Hours
  
  Monday - Thursday : 10:30 AM - 04:00 PM
  
                        Friday : 10:30 AM - 02:00 PM 
             
  Saturday - Sunday : Closed`,
    image: require("../../assets/images/cfa_local.jpg"),
  },
  {
    title: "Mesquite Dining Hall",
    description: "Enjoy a variety of meals and services.",
    hoverHours: `Regular Hours
  
  Everyday
  
    Breakfast : 07:00 AM - 12:00 PM
  
         Lunch : 12:00 PM - 03:30 PM
  
        Dinner : 04:30 PM - 10:00 PM`,
    image: require("../../assets/images/dine.jpg"),
  },
];

export default function HomePage() {
  const navigation = useNavigation();
  const route = useRoute();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const scrollRef = useRef<ScrollView>(null);
  const mealRef = useRef<View>(null);
  const index = useRef<View>(null);
  const { firstname } = useAuth(); // Assuming you have a way to get the user's first name
  const { username } = useAuth();
  const handleExplorePress = () => {
    if (mealRef.current && scrollRef.current) {
      mealRef.current.measure((x, y, width, height, pageX, pageY) => {
        scrollRef.current?.scrollTo({ y: pageY, animated: true });
      });
    }
  };
  const [selectedTab, setSelectedTab] = useState<"swipes" | "flex">("swipes");
  type Transaction = {
    transaction_date: string;
    transaction_mode: string;
    transaction_id: string;
    Total_Amount: number;
    Location: string;
  };

  // All transactions for this user
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Transaction[]>(`http://127.0.0.1:8081/transactions/${username}`)
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [username]);

  // Filter based on selected tab
  const filtered = transactions.filter((txn) =>
    selectedTab === "swipes"
      ? txn.transaction_mode === "Meal Swipes"
      : txn.transaction_mode === "Flex Dollars"
  );
  const handleindexPress = () => {
    if (index.current && scrollRef.current) {
      index.current.measure((x, y, width, height, pageX, pageY) => {
        scrollRef.current?.scrollTo({ y: pageY, animated: true });
      });
    }
  };

  return (
    <ScrollView ref={scrollRef} showsHorizontalScrollIndicator={false}>
      <View style={{ position: "relative", height: 750, width: "100%" }}>
        <Video
          source={Placeholdervideo}
          style={[styles.backgroundImage, StyleSheet.absoluteFill]}
          shouldPlay
          isLooping
          isMuted
        />

        <Text style={styles.title}>Welcome {firstname}</Text>
      </View>

      <View>
        <Text style={styles.featurename}>What's Open ?</Text>
        {/* LOCATION CARDS */}
        <View style={styles.featuresGrid}>
          {featuresData.map((feature, index) => {
            const locationOpen = isLocationOpen(feature, currentTime);
            const { isHovered, hoverProps } = useHover();

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
                    router.push("Student/cfa_menu" as never);
                  } else if (feature.title === "Mesquite Dining Hall") {
                    router.push("Student/dining_menu" as never);
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
      </View>
      <View>
        <Text style={styles.transaction}>Recent Transactions</Text>
      </View>
      {/* Tabs */}
      <View style={localStyles.tabContainer}>
        <TouchableOpacity
          style={[
            localStyles.tabButton,
            selectedTab === "swipes" && localStyles.activeTab,
          ]}
          onPress={() => setSelectedTab("swipes")}
        >
          <Text
            style={[
              localStyles.tabText,
              selectedTab === "swipes" && localStyles.activeTabText,
            ]}
          >
            Meal Swipes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            localStyles.tabButton,
            selectedTab === "flex" && localStyles.activeTab,
          ]}
          onPress={() => setSelectedTab("flex")}
        >
          <Text
            style={[
              localStyles.tabText,
              selectedTab === "flex" && localStyles.activeTabText,
            ]}
          >
            Flex Dollars Spent 
          </Text>
        </TouchableOpacity>
      </View>

      {/* Transactions Table */}
      {loading ? (
        <ActivityIndicator style={{ marginVertical: 20 }} />
      ) : (
        <ScrollView horizontal contentContainerStyle={localStyles.tableWrapper}>
          <View
            style={[
              localStyles.tableContainer,
              { width: SCREEN_WIDTH - 40, maxWidth: SCREEN_WIDTH - 40 },
            ]}
          >
            <View style={localStyles.tableRowHeader}>
              <Text style={localStyles.tableCellHeader}>Date</Text>
              <Text style={localStyles.tableCellHeader}>Mode</Text>
              <Text style={localStyles.tableCellHeader}>Location</Text>
              {selectedTab === "flex" && (
                <Text style={localStyles.tableCellHeader}>Amount</Text>
              )}
              <Text style={localStyles.tableCellHeader}>Txn ID</Text>
            </View>
            {filtered.slice(0, 5).map((t, idx) => (
              <View key={idx} style={localStyles.tableRow}>
                <Text style={localStyles.tableCell}>
                  {new Date(t.transaction_date).toLocaleString("en-US", {
                    timeZone: "America/Chicago",
                  })}
                </Text>
                <Text style={localStyles.tableCell}>{t.transaction_mode}</Text>
                <Text
                  style={[
                    localStyles.tableCell,
                    {
                      color: t.Location === "Chick-fil-A" ? "red" : "brown",
                    },
                    {
                      fontWeight: "bold",
                    },
                  ]}
                >
                  {t.Location}
                </Text>
                {selectedTab === "flex" && (
                  <Text style={localStyles.tableCell}>
                    {t.Total_Amount.toFixed(2)}
                  </Text>
                )}
                <Text style={localStyles.tableCell}>{t.transaction_id}</Text>
              </View>
            ))}
            {/* Show More, immediately under the last row */}
            <View style={localStyles.showMoreContainer}>
              <TouchableOpacity
                onPress={() =>
                    router.push("Student/s_transaction" as never)              }
              >
                <Text style={localStyles.showMoreText}>Show More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}

      {/* ─── Upcoming Events (with flyer as background) ─────────────────────────── */}
      <ImageBackground
        source={EventBg}
        style={localStyles.eventsBackground}
        imageStyle={localStyles.eventsBackgroundImage}
      >
        <View style={localStyles.eventsHeader}>
          <Text style={localStyles.eventsHeading}>Upcoming Events</Text>
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={localStyles.eventCardsContainer}
          showsHorizontalScrollIndicator={false}
        >
          {upcomingEvents.map((ev) => (
            <ImageBackground
              key={ev.id}
              source={ev.image}
              style={localStyles.eventCard}
              imageStyle={localStyles.eventCardImage}
            >
              <Text style={localStyles.eventName}>{ev.name}</Text>
            </ImageBackground>
          ))}
        </ScrollView>
      </ImageBackground>

      {/* FOOTER SECTION */}

      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View style={styles.footerSection}>
            <Text style={styles.footerHeading}>Quick Links</Text>
            <TouchableOpacity onPress={handleindexPress}>
              <Text style={styles.footerText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Student/" as never)}
            >
              <Text style={styles.footerText}>Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("about" as never)}
            >
              <Text style={styles.footerText}>About Us</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerSection}>
            <Text style={styles.footerHeading}>Contact Us</Text>
            <Text style={styles.footerText}>
              📍 3410 Taft Blvd, Wichita Falls, TX 76308
            </Text>
            <Text style={styles.footerText}>📞 (940)-397-4000</Text>
            <Text style={styles.footerText}>✉️ support@swipeinapp.com</Text>
          </View>
          <View style={styles.footerSection}>
            <Text style={styles.footerHeading}>Follow Us</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 4,
              }}
            >
              <Icon name="facebook" size={24} color="#1877f2" />
              <Text style={styles.footerText}> Facebook</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 4,
              }}
            >
              <Icon name="instagram" size={24} color="#e4405f" />
              <Text style={styles.footerText}> Instagram</Text>
            </View>
          </View>
        </View>
        <Text style={styles.footerBottom}>
          © 2025 Swipe In. All Rights Reserved.
        </Text>
      </View>
    </ScrollView>
  );
}
