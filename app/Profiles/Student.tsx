import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { styles } from '../styles/student';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const images = [
  require('../../assets/images/calorie.jpg'),
  require('../../assets/images/chef1.jpg'),
  require('../../assets/images/dining1.jpg'),
  require('../../assets/images/calorie1.png'),
  require('../../assets/images/image2.png'),
];

export default function Student() {
  const [profileVisible, setProfileVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<any>>(null);
  const router = useRouter();

  const toggleProfileMenu = () => setProfileVisible(!profileVisible);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;

      if (nextIndex >= images.length) {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
        setCurrentIndex(0);
      } else {
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        setCurrentIndex(nextIndex);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <ScrollView style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Image
          source={require('../../assets/images/swipein_1.png')}
          style={styles.logo}
        />
        <View style={styles.profileSection}>
          <Text style={styles.welcomeText}>Hi, Tejaswi 👋</Text>
          <TouchableOpacity onPress={toggleProfileMenu}>
            <Ionicons name="person-circle-outline" size={60} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile dropdown */}
      {profileVisible && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity style={styles.menuItem}><Text>Edit Profile</Text></TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}><Text>Delete Account</Text></TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.replace('/Login')}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Navigation bar */}
      <View style={styles.navBar}>
        {['Home', 'Menu', 'Locations', 'Meal Plans', 'Add Funds', 'Swipes'].map((item) => (
          <TouchableOpacity key={item} style={styles.navItem}>
            <Text style={styles.navText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Carousel */}
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        ref={flatListRef}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        renderItem={({ item }) => (
          <View style={{ width }}>
            <Image source={item} style={styles.carouselImage} />
          </View>
        )}
      />
      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View style={styles.footerSection}>
            <Text style={styles.footerHeading}>Quick Links</Text>
            <Text style={styles.footerText}>Home</Text>
            <Text style={styles.footerText}>Menu</Text>
            <Text style={styles.footerText}>About Us</Text>
          </View>

          <View style={styles.footerSection}>
            <Text style={styles.footerHeading}>Contact Us</Text>
            <Text style={styles.footerText}>📍 3410 Taft Blvd, Wichita Falls, TX 76308</Text>
            <Text style={styles.footerText}>📞 (940)-397-4000</Text>
            <Text style={styles.footerText}>✉️ support@swipeinapp.com</Text>
          </View>

          <View style={styles.footerSection}>
            <Text style={styles.footerHeading}>Follow Us</Text>
            <View style={styles.socialRow}>
              <FontAwesome name="facebook-square" size={24} color="#1877f2" />
              <Text style={styles.footerText}> Facebook</Text>
            </View>
            <View style={styles.socialRow}>
              <FontAwesome name="instagram" size={24} color="#e4405f" />
              <Text style={styles.footerText}> Instagram</Text>
            </View>
          </View>
        </View>
        <Text style={styles.footerBottom}>© 2025 Swipe In. All Rights Reserved.</Text>
      </View>
    </ScrollView>
  );
}
