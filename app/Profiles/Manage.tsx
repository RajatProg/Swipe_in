import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, ScrollView } from 'react-native';
import { styles } from '../styles/manageuser';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';

type UserType = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
};

export default function ManageUsers() {
  const [searchText, setSearchText] = useState('');
  const [filterRole, setFilterRole] = useState<'ALL' | 'STUDENT' | 'EMPLOYEE'>('ALL');
  const [users, setUsers] = useState<UserType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [editUser, setEditUser] = useState<UserType | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: '',
  });
  const [formError, setFormError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8081/users/');
      setUsers(response.data);
      console.log('Users fetched:', response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    try {
      const response = await fetch(`http://127.0.0.1:8081/users/${userToDelete}`, {
        method: 'DELETE',
      });
      if (response.ok) fetchUsers();
    } catch (error) {
      console.error('❌ Delete failed:', error);
    } finally {
      setModalVisible(false);
      setUserToDelete(null);
    }
  };

  const openDeleteModal = (username: string) => {
    setUserToDelete(username);
    setModalVisible(true);
  };

  const cancelDelete = () => {
    setModalVisible(false);
    setUserToDelete(null);
  };

  const openAddModal = () => {
    setFormData({ username: '', first_name: '', last_name: '', email: '', password: '', role: 'STUDENT' });
    setFormError('');
    setAddModalVisible(true);
  };

  const openEditModal = (user: UserType) => {
    setEditUser(user);
    setFormData({
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: '',
      role: user.role,
    });
    setFormError('');
    setEditModalVisible(true);
  };

  const handleAddUser = async () => {
    const { username, first_name, last_name, email, password, role } = formData;
    if (!username || !first_name || !last_name || !email || !password || !role) {
      setFormError('Please enter all details.');
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:8081/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setAddModalVisible(false);
        fetchUsers();
      } else {
        setFormError('Failed to add user.');
      }
    } catch (error) {
      console.error('Add failed:', error);
    }
  };

  const handleUpdateUser = async () => {
    if (!editUser) return;
    const { first_name, last_name, email, role } = formData;
    if (!first_name || !last_name || !email || !role) {
      setFormError('Please fill all fields.');
      return;
    }
    try {
      const response = await fetch(`http://127.0.0.1:8081/users/${editUser.username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: editUser.username,
          first_name,
          last_name,
          email,

          role,
        }),
      });
      if (response.ok) {
        setEditModalVisible(false);
        setEditUser(null);
        fetchUsers();
      } else {
        setFormError('Failed to update user.');
      }
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchRole = filterRole === 'ALL' || user.role === filterRole;
    const matchSearch = [user.username, user.first_name, user.last_name, user.email, user.role].some((field) =>
      field.toLowerCase().includes(searchText.toLowerCase())
    );
    return matchRole && matchSearch;
  });

  const renderUser = ({ item }: { item: UserType }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, styles.usernameColumn]}>{item.username}</Text>
      <Text style={[styles.tableCell, styles.firstNameColumn]}>{item.first_name}</Text>
      <Text style={[styles.tableCell, styles.lastNameColumn]}>{item.last_name}</Text>
      <Text style={[styles.tableCell, styles.emailColumn]}>{item.email}</Text>
      <Text style={[styles.tableCell, styles.roleColumn]}>{item.role}</Text>
      <View style={styles.actionsColumn}>
        <TouchableOpacity style={styles.editBtn} onPress={() => openEditModal(item)}>
          <Ionicons name="create-outline" size={18} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={() => openDeleteModal(item.username)}>
          <Ionicons name="trash-outline" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.pageTitle}>Manage Students and Employees</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.push('/Profiles/Admin')}>
            <Ionicons name="arrow-back" size={16} color="white" />
            <Text style={styles.backText}>Admin Dashboard</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.topBar}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <View style={styles.filterButtons}>
            {['ALL', 'STUDENT', 'EMPLOYEE'].map((role) => (
              <TouchableOpacity
                key={role}
                style={[styles.filterBtn, filterRole === role && styles.activeFilterBtn]}
                onPress={() => setFilterRole(role as 'ALL' | 'STUDENT' | 'EMPLOYEE')}
              >
                <Text style={styles.filterText}>{role}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.addBtn} onPress={openAddModal}>
            <Ionicons name="add-circle-outline" size={20} color="white" />
            <Text style={styles.addBtnText}>Add</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.tableRow, styles.headerRow]}>
          <Text style={[styles.tableHeader, styles.usernameColumn]}>Username</Text>
          <Text style={[styles.tableHeader, styles.firstNameColumn]}>First Name</Text>
          <Text style={[styles.tableHeader, styles.lastNameColumn]}>Last Name</Text>
          <Text style={[styles.tableHeader, styles.emailColumn]}>Email</Text>
          <Text style={[styles.tableHeader, styles.roleColumn]}>Role</Text>
          <Text style={[styles.tableHeader, styles.actionsColumn]}>Actions</Text>
        </View>

        <FlatList data={filteredUsers} renderItem={renderUser} keyExtractor={(item) => item.username} />
      </View>

      {/* Delete Modal */}
      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={cancelDelete}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 24, borderRadius: 12, alignItems: 'center', width: '80%' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>
              Are you sure you want to delete "{userToDelete}"?
            </Text>
            <View style={{ flexDirection: 'row', gap: 20 }}>
              <TouchableOpacity style={{ backgroundColor: '#007BFF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 }} onPress={cancelDelete}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: 'red', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 }} onPress={handleDelete}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Modal */}
      <Modal visible={addModalVisible} transparent animationType="fade" onRequestClose={() => setAddModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 24, borderRadius: 12, width: '90%' }}>
            <ScrollView>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Add New User</Text>
              {['username', 'first_name', 'last_name', 'email', 'password'].map((field) => (
                <TextInput
                  key={field}
                  style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 10 }}
                  placeholder={field.replace('_', ' ').toUpperCase()}
                  value={(formData as any)[field]}
                  onChangeText={(value) => setFormData({ ...formData, [field]: value })}
                  autoCapitalize="none"
                />
              ))}
              <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
                {['STUDENT', 'EMPLOYEE'].map((roleOption) => (
                  <TouchableOpacity
                    key={roleOption}
                    style={{ flex: 1, padding: 10, backgroundColor: formData.role === roleOption ? '#007BFF' : '#ccc', borderRadius: 8, alignItems: 'center' }}
                    onPress={() => setFormData({ ...formData, role: roleOption })}
                  >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>{roleOption}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {formError !== '' && <Text style={{ color: 'red', marginBottom: 8 }}>{formError}</Text>}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <TouchableOpacity style={{ backgroundColor: '#6c757d', padding: 10, borderRadius: 8 }} onPress={() => setAddModalVisible(false)}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: '#28A745', padding: 10, borderRadius: 8 }} onPress={handleAddUser}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Edit Modal */}
      <Modal visible={editModalVisible} transparent animationType="fade" onRequestClose={() => setEditModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 24, borderRadius: 12, width: '90%' }}>
            <ScrollView>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Edit User</Text>
              {['first_name', 'last_name', 'email'].map((field) => (
                <TextInput
                  key={field}
                  style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 10 }}
                  placeholder={field.replace('_', ' ').toUpperCase()}
                  value={(formData as any)[field]}
                  onChangeText={(value) => setFormData({ ...formData, [field]: value })}
                  autoCapitalize="none"
                />
              ))}
              <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
                {['STUDENT', 'EMPLOYEE'].map((roleOption) => (
                  <TouchableOpacity
                    key={roleOption}
                    style={{ flex: 1, padding: 10, backgroundColor: formData.role === roleOption ? '#007BFF' : '#ccc', borderRadius: 8, alignItems: 'center' }}
                    onPress={() => setFormData({ ...formData, role: roleOption })}
                  >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>{roleOption}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {formError !== '' && <Text style={{ color: 'red', marginBottom: 8 }}>{formError}</Text>}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <TouchableOpacity style={{ backgroundColor: '#6c757d', padding: 10, borderRadius: 8 }} onPress={() => setEditModalVisible(false)}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: '#28A745', padding: 10, borderRadius: 8 }} onPress={handleUpdateUser}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Update</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}