import React, { useRef } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground
} 
from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image } from 'expo-image';
import { useHover } from '@react-native-aria/interactions';
import { useNavigation } from 'expo-router';
import { styles } from './styles/Homestyles';


const PlaceholderImage = require('@/assets/images/dining2.jpg');
const MealPlanImage = require('@/assets/images/chef1.jpg');
const FeatureImages = [
  require('@/assets/images/meals1.jpg'),
  require('@/assets/images/countingcalories.png'),
  require('@/assets/images/track__.jpg')
];

const titles = [
  ' Track Meal Swipes & Flex $ ',
  ' Calorie Count On-the-Go ',
  ' Track Meal Spendings  '
];

const featuresData = [
  {
    title: titles[0],
    description:
      'Track your meal plan usage and remaining flex dollars with ease using our dedicated system. This resource provides real-time updates on your balances, so you never run out unexpectedly.\n',
    image: FeatureImages[0]
  },
  {
    title: titles[1],
    description:
      "Whether you're trying to maintain a balanced diet, lose weight, or just stay informed, Calorie Count On-the-Go ensures that you always have access to accurate nutritional data, making it easier to eat smart and stay fit! 🚀🥗\n",
    image: FeatureImages[1]
  },
  {
    title: titles[2],
    description:
      "With Meal History, you can review past meals, track your nutrition, and make informed dining choices. Whether you're managing your calorie intake or simply keeping an eye on your favorite dishes, this feature gives you a complete overview of your dining habits. ",
    image: FeatureImages[2]
  }
];

export default function HomePage() {
  const navigation = useNavigation();



  const scrollRef = useRef<ScrollView>(null);
  const mealRef = useRef<View>(null);
  const index = useRef<View>(null);

  const handleExplorePress = () => {
    if (mealRef.current && scrollRef.current) {
      mealRef.current.measure((x, y, width, height, pageX, pageY) => {
        scrollRef.current?.scrollTo({ y: pageY, animated: true });
      });
    }
  };

  const handleindexPress = () => {
    if (index.current && scrollRef.current) {
      index.current.measure((x, y, width, height, pageX, pageY) => {
        scrollRef.current?.scrollTo({ y: pageY, animated: true });
      });
    }
  };



  return (
    <ScrollView  ref={scrollRef} 
    showsHorizontalScrollIndicator={false}
    >
      
      <ImageBackground source={PlaceholderImage} style={styles.backgroundImage} blurRadius={1}>
      <View style={styles.background}>
        <View ref={index} style={styles.navbar}>
          <Image
            source={require('@/assets/images/swipein_1.png')}
            style={styles.navbarTitle}
          />
          <View style={styles.navLinks}>
            {[
              { label: 'Home', route: 'index' },
             // { label: 'Menu', route: 'menu' },
              {label: 'Locations', route: 'Locations'},
              { label: 'About', route: 'about' },
              { label: 'Login/Register', route: 'Login' }
            ].map((navItem, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate(navItem.route as never)}
                style={styles.navItem}
              >
                <Text style={styles.navText}>{navItem.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.container}>
          <Text style={styles.title}>Swipe In</Text>
          <Text style={styles.subtitle}>
            One-step platform for a seamless Dine-in experience.
          </Text>
          <View style={styles.topcntr}>
            <TouchableOpacity onPress={handleExplorePress} style={styles.button}>
              <Text style={styles.buttonText}>Explore Our Membership</Text>
            </TouchableOpacity>
          </View>

          </View>
          
          </View>
        
      </ImageBackground>
  
      
      <View >
        <Text style={styles.featurename}>New Features</Text>

        <View style={styles.featuresGrid}>
          {featuresData.map((feature, index) => {
           
            const { hoverProps, isHovered } = useHover();

            return (
              <View key={index} {...hoverProps} style={styles.featureCard}>
               
                {!isHovered ? (<ImageBackground source={feature.image} style={styles.featureimage} resizeMode="stretch"/>) : null}

                <View style={styles.feature}>
          
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                
                  {isHovered ? (<Text style={styles.featureDescription}> {feature.description} </Text> ) : null}
                </View>
              </View>
            );
          })}
        </View>
      </View>


<View 
style={styles.meal}>
<Text style={styles.mainHeading}>Meal Plan Information</Text>
      <View style={styles.headingUnderline} />

     
      <View style={styles.row}>
        
        <View style={styles.benefitsContainer}>
          <Text style={styles.benefitsHeading}>Benefits of a Meal Plan</Text>

      
          <View style={styles.benefitCard}>
            <Text style={styles.cardTitle}>MEAL PLANS SAVE YOU TIME & MONEY</Text>
            <Text style={styles.cardText}>
              Eating out, buying groceries, cooking and cleaning up can be costly 
              and time consuming. With a meal plan you simply show up and enjoy 
              a nutritional and well-balanced meal. We do the shopping, cooking, 
              and the dishes so you have more time to focus on learning, engaging 
              in campus life and other personal pursuits. Plus, with all-you-care-to-eat 
              meals at our residential dining commons, you'll not only get more for your 
              dollar, but your per meal cost will be lower than meals purchased at local 
              eateries.
            </Text>
          </View>


          <View style={styles.benefitCard}>
            <Text style={styles.cardTitle}>MEAL PLANS ARE FLEXIBLE & CONVENIENT</Text>
            <Text style={styles.cardText}>
              Meal plans include a set number of meals per week to be used 
              whenever it's convenient. There are multiple meal plans available, 
              so you can easily find the meal plan that works best for you. For extra 
              flexibility, meal plans also include Flex Dollars, 
              which can be used to purchase Starbucks coffee, meals, or snacks to-go.
            </Text>
          </View>
        </View>

        <Image source={MealPlanImage} style={styles.mealPlanImage} />
      </View>
      </View>




      <View ref={mealRef} style={styles.plan}>
      <Text style={styles.subHeading}>Choose Your Meal Plan</Text>
      <View style={styles.subHeadingUnderline} />

     
      <Text style={styles.tableTitle}>2025-2026 Meal Plans &amp; Rates</Text>

      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, { flex: 2 }]}>Type of Meal Plan</Text>
        <Text style={[styles.tableHeaderText, { flex: 1 }]}>Price per Semester</Text>
      </View>

      
      <Text style={styles.categoryTitle}>Residential Students</Text>
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, { flex: 2 }]}> Platinum Unlimited (All Access)</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}> $2,263</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, { flex: 2 }]}> Gold 200</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}> $2,036</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, { flex: 2 }]}> Silver 150</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}> $1,792</Text>
      </View>

      <Text style={styles.categoryTitle}>On-Campus Apartments & Commuters</Text>
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, { flex: 2 }]}>Bronze 75</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>  $958</Text>
      </View>
      
      
      </View>



      <View style={styles.cards}>
           
      <View style={styles.cardsContainer}>
        

      <View style={styles.card}>
          <Text style={styles.planName}>PLATINUM</Text>
          <Text style={styles.planValue}>Unlimited Swipes + $100 Flex Dollars</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.planName}>GOLD</Text>
          <Text style={styles.planValue}>200 Swipes + $100 Flex Dollars</Text>
        </View>

  
        <View style={styles.card}>
          <Text style={styles.planName}>SILVER</Text>
          <Text style={styles.planValue}>150 Swipes + $100 Flex Dollars</Text>
        </View>

      
        <View style={styles.card}>
          <Text style={styles.planName}>BRONZE</Text>
          <Text style={styles.planValue}>75 Swipes + $100 Flex Dollars</Text>
        </View>
      </View>
    </View>




    <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View style={styles.footerSection}>
            <Text style={styles.footerHeading}>Quick Links</Text>
            <TouchableOpacity  onPress={handleindexPress}>
              <Text style={styles.footerText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('menu' as never)}>
              <Text style={styles.footerText}>Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('about' as never)}>
              <Text style={styles.footerText}>About Us</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footerSection}>
            <Text style={styles.footerHeading}>Contact Us</Text>
            <Text style={styles.footerText}>📍 3410 Taft Blvd, Wichita Falls, TX 76308 </Text>
            <Text style={styles.footerText}>📞 (940)-397-4000</Text>
            <Text style={styles.footerText}>✉️ support@swipeinapp.com</Text>
          </View>

    <View style={styles.footerSection}>
      <Text style={styles.footerHeading}>Follow Us</Text>
      <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 4 }}>
    < Icon name="facebook" size={24} color="#1877f2" />
    <Text style={styles.footerText}> Facebook</Text>
  </View>
  <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 4 }}>
    <Icon name="instagram" size={24} color="#e4405f" />
    <Text style={styles.footerText}> Instagram</Text>
  </View>
</View>

    </View>
    <Text style={styles.footerBottom}>© 2025 Swipe In. All Rights Reserved.</Text>
  </View>
    </ScrollView>
  );
}
