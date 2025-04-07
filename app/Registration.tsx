import { router, useNavigation } from "expo-router";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  TextInput,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { styles } from "./styles/RegistrationUI";
import LottieView from "lottie-react-native";
import { Modal, StyleSheet } from "react-native";

const PlaceholderImage = require("@/assets/images/food1.jpg");

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const navigation = useNavigation();

  const togglePasswordVisibility = (field: "password" | "confirm") => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleRegister = () => {
    if (
      !username.trim() ||
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      window.alert("Required Fields");
      return;
    }
    if (password !== confirmPassword) {
      window.alert("Passwords do not match.");
      return;
    }

    const role = "STUDENT";

    fetch("http://127.0.0.1:8081/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        first_name: firstName,
        last_name: lastName,
        role: role,
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => Promise.reject(data));
        }
      })
      .then((data) => {
        setShowSuccess(true);
        setFirstName(data.first_name);
        setTimeout(() => {
          setShowSuccess(false);
          setUsername("");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          navigation.navigate("Login" as never);
        }, 1100);
      })
      .catch((error) => {
        window.alert(
          "Registration Failed, There was an issue registering your account."
        );
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={PlaceholderImage}
        style={styles.backgroundImage}
        blurRadius={5}
      >
        <View style={styles.background}>
          <View style={styles.navbar}>
            <TouchableOpacity
              onPress={() => navigation.navigate("index" as never)}
            >
              <Image
                source={require("@/assets/images/swipein_1.png")}
                style={styles.navbarTitle}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navLinks}>
              {[
                { label: "Home", route: "index" },
                { label: "Membership", route: "membership" },
                { label: "Menu", route: "menu" },
                { label: "About", route: "about" },
              ].map((navItem, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigation.navigate(navItem.route as never)}
                  style={styles.navItem}
                >
                  <Text style={styles.navText}>{navItem.label}</Text>
                </TouchableOpacity>
              ))}
            </TouchableOpacity>
          </View>

          <View style={styles.RegistrationContainer}>
            <Text style={styles.RegisterHeading}>Student Registration</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your first name"
                placeholderTextColor="#999"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your last name"
                placeholderTextColor="#999"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>M Number</Text>
              <TextInput
                style={styles.input}
                placeholder="M12345678"
                placeholderTextColor="#999"
                value={username}
                onChangeText={(text) => {
                  const cleaned = text.replace(/[^0-9]/g, "");

                  const formatted = `M${cleaned.slice(0, 8)}`;
                  setUsername(formatted);
                }}
                maxLength={9}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>University Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your university email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Create a password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => togglePasswordVisibility("password")}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={24}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Confirm your password"
                  placeholderTextColor="#999"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => togglePasswordVisibility("confirm")}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showConfirmPassword ? "eye-off" : "eye"}
                    size={24}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleRegister}
              style={styles.RegisterButton}
            >
              <Text style={styles.RegisterButtonText}>Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Login" as never)}
              style={styles.linkText}
            >
              <Text style={styles.linkText}>Already have an Account ?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("index" as never)}
              style={styles.linkText}
            >
              <Text style={styles.linkText}>Back to Home</Text>
            </TouchableOpacity>

            <Modal visible={showSuccess} transparent animationType="fade">
              <View style={styles.modalContainer}>
                <View style={styles.alertBox}>
                  <LottieView
                    source={require("../assets/images/Tick.json")}
                    autoPlay
                    loop={false}
                    style={styles.animation}
                  />
                  <Text style={styles.text}>
                    Welcome {firstName}, you have successfully Registered !!
                  </Text>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
