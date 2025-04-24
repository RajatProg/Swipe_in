// components/StudentNavbar.tsx
import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { AuthContext } from '../AuthContext';

const tabs = [
  { label: 'Home',               path: '/Student',              icon: 'home-outline'       },
  { label: 'Locations',          path: '/Student/Location',     icon: 'location-outline'   },
  { label: 'Menu',               path: undefined,               icon: 'restaurant-outline' },
  { label: 'Transaction History',path: '/Student/s_transaction', icon: 'time-outline'       },
] as const;

const studentMenuSub = [
  { label: 'CFA',    path: '/Student/cfa_menu',    icon: 'fast-food-outline'  },
  { label: 'Dining', path: '/Student/dining_menu', icon: 'restaurant-outline' },
] as const;

export default function StudentNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { firstname, username, logout } = useContext(AuthContext);
  const firstName = firstname || 'User';

  const [menuOpen, setMenuOpen]         = useState(false); // profile dropdown
  const [profileOpen, setProfileOpen]   = useState(false); // profile modal
  const [expandedMenu, setExpandedMenu] = useState(false); // “Menu” submenu

  // auto-expand if landing on a submenu
  useEffect(() => {
    if (studentMenuSub.some(s => s.path === pathname)) {
      setExpandedMenu(true);
    }
  }, [pathname]);

  const isActive = (p?: string) => p === pathname;

  const handleTabPress = (tab: typeof tabs[number]) => {
    if (tab.label === 'Menu') {
      setExpandedMenu(v => !v);
    } else if (tab.path) {
      router.push(tab.path as never);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../../assets/images/swipein_1.png')}
        style={styles.logo}
      />

      {/* Centered nav tabs */}
      <View style={styles.center}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {tabs.map(tab => {
            const active = (tab.path && isActive(tab.path))
                        || (tab.label === 'Menu' && studentMenuSub.some(s => s.path === pathname));

            return (
              <Pressable
                key={tab.label}
                onPress={() => handleTabPress(tab)}
                onHoverIn={() => {
                  if (tab.label === 'Menu') setExpandedMenu(true);
                }}
                onHoverOut={() => {
                  if (tab.label === 'Menu') setExpandedMenu(false);
                }}
                style={({ hovered, pressed }) => [
                  styles.tab,
                  active  && styles.tabActive,
                  hovered && styles.tabHover,
                  pressed && styles.tabPressed,
                ]}
              >
                <Ionicons
                  name={tab.icon as any}
                  size={20}
                  color={active ? '#005fa8' : '#555'}
                />
                <Text style={[styles.label, active && styles.labelActive]}>
                  {tab.label}
                </Text>
                {tab.label === 'Menu' && (
                  <Ionicons
                    name={expandedMenu ? 'chevron-down-outline' : 'chevron-forward-outline'}
                    size={16}
                    color={active ? '#005fa8' : '#555'}
                    style={styles.expandIcon}
                  />
                )}
              </Pressable>
            );
          })}
        </ScrollView>

        {/* “Menu” dropdown */}
        {expandedMenu && (
          <View style={styles.menuDropdown}>
            {studentMenuSub.map(s => {
              const active = isActive(s.path);
              return (
                <Pressable
                  key={s.label}
                  onPress={() => {
                    setExpandedMenu(false);
                    router.push(s.path as never);
                  }}
                  style={({ hovered, pressed }) => [
                    styles.menuItem,
                    active  && styles.menuItemActive,
                    hovered && styles.menuItemHover,
                    pressed && styles.menuItemPressed,
                  ]}
                >
                  <Ionicons name={s.icon as any} size={18} color={active ? '#005fa8' : '#555'} />
                  <Text style={[styles.menuLabel, active && styles.menuLabelActive]}>
                    {s.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}
      </View>

      {/* Profile toggle */}
      <View style={styles.userContainer}>
        <Pressable
          onPress={() => setMenuOpen(v => !v)}
          onHoverIn={() => setMenuOpen(true)}
          onHoverOut={() => setMenuOpen(false)}
          style={({ hovered, pressed }) => [
            styles.userToggle,
            hovered && styles.userToggleHover,
            pressed && styles.userTogglePressed,
          ]}
        >
          <Ionicons name="person-circle-outline" size={28} color="#555" />
          <Text style={styles.userText}>Hi {firstName}</Text>
        </Pressable>

        {/* Profile dropdown */}
        {menuOpen && (
          <View style={styles.dropdown}>
            <Pressable
              onPress={() => {
                setMenuOpen(false);
                setProfileOpen(true);
              }}
              style={({ hovered, pressed }) => [
                styles.dropdownItem,
                hovered && styles.dropdownItemHover,
                pressed && styles.dropdownItemPressed,
              ]}
            >
              <Text style={styles.dropdownText}>My Profile</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setMenuOpen(false);
                router.push('/membership');
              }}
              style={({ hovered, pressed }) => [
                styles.dropdownItem,
                hovered && styles.dropdownItemHover,
                pressed && styles.dropdownItemPressed,
              ]}
            >
              <Text style={styles.dropdownText}>My Membership</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setMenuOpen(false);
                logout();
              }}
              style={({ hovered, pressed }) => [
                styles.dropdownItem,
                hovered && styles.dropdownItemHover,
                pressed && styles.dropdownItemPressed,
              ]}
            >
              <Text style={styles.dropdownText}>Logout</Text>
            </Pressable>
          </View>
        )}
      </View>

      {/* Profile Modal */}
      <Modal
        visible={profileOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setProfileOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image
              source={require('../../assets/images/swipein_1.png')}
              style={styles.profilePic}
            />
            <Text style={styles.profileName}>First Name: {firstName}</Text>
            <Text style={styles.profileInfo}>Mustang ID: {username}</Text>
            <Pressable style={styles.closeBtn} onPress={() => setProfileOpen(false)}>
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 12,
    overflow: 'visible',
  },
  logo: {
    width: 98,
    height: 98,
    resizeMode: 'contain',
    marginRight: 16,
  },

  center: {
    flex: 1,
    position: 'relative',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Tabs
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  tabActive:   { backgroundColor: '#D0E8FF' },
  tabHover:    { backgroundColor: '#E6F7FF' },
  tabPressed:  { opacity: 0.6 },
  label:       { marginLeft: 6, fontSize: 15, color: '#555' },
  labelActive: { color: '#005fa8', fontWeight: '600' },
  expandIcon:  { marginLeft: 4 },

  // “Menu” dropdown
  menuDropdown: {
    position: 'absolute',
    top: 46,
    left: 0,
    right: 0,
    marginHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 4,
    zIndex: 100,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  menuItemActive:   { backgroundColor: '#E6F7FF' },
  menuItemHover:    { backgroundColor: '#F0F8FF' },
  menuItemPressed:  { opacity: 0.6 },
  menuLabel:        { marginLeft: 8, fontSize: 14, color: '#555' },
  menuLabelActive:  { color: '#005fa8', fontWeight: '600' },

  // Profile dropdown
  userContainer: { position: 'relative', marginRight: 24 },
  userToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    borderRadius: 6,
  },
  userToggleHover:   { backgroundColor: '#f0f0f0' },
  userTogglePressed: { opacity: 0.6 },
  userText: {
    marginLeft: 6,
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  dropdown: {
    position: 'absolute',
    top: 44,
    right: 0,
    width: 160,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingVertical: 4,
    zIndex: 100,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  dropdownItemHover:   { backgroundColor: '#f9f9f9' },
  dropdownItemPressed: { opacity: 0.6 },
  dropdownText:        { fontSize: 16, color: '#333' },

  // Profile Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  profilePic:   { width: 100, height: 100, borderRadius: 50, marginBottom: 16 },
  profileName:  { fontSize: 20, fontWeight: '600', marginBottom: 8 },
  profileInfo:  { fontSize: 16, marginBottom: 4 },
  closeBtn:     { marginTop: 16, backgroundColor: '#005fa8', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 6 },
  closeText:    { color: '#fff', fontSize: 16 },
});
