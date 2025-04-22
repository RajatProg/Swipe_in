import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView
} from 'react-native';
import { styles } from '../admin_styles/manage_user';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';

type UserType = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  password: string;
};

export default function Employees() {
  const [searchText, setSearchText] = useState('');
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
    role: 'EMPLOYEE',
  });
  const [formError, setFormError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const resp = await axios.get<UserType[]>('http://127.0.0.1:8081/users/');
      setUsers(resp.data.filter(u => u.role === 'EMPLOYEE'));
    } catch (e) {
      console.error('Failed to fetch employees:', e);
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
  const handleDelete = async () => {
    if (!userToDelete) return;
    try {
      const resp = await fetch(`http://127.0.0.1:8081/users/${userToDelete}`, { method: 'DELETE' });
      if (resp.ok) fetchUsers();
    } catch (e) {
      console.error('Delete failed:', e);
    } finally {
      cancelDelete();
    }
  };

  const openAddModal = () => {
    setFormData({
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      role: 'EMPLOYEE',
    });
    setFormError('');
    setAddModalVisible(true);
  };
  const openEditModal = (u: UserType) => {
    setEditUser(u);
    setFormData({ ...u });
    setFormError('');
    setEditModalVisible(true);
  };

  const handleAdd = async () => {
    const { username, first_name, last_name, email, password } = formData;
    if (!username || !first_name || !last_name || !email || !password) {
      setFormError('All fields required');
      return;
    }
    try {
      const resp = await fetch('http://127.0.0.1:8081/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (resp.ok) {
        setAddModalVisible(false);
        fetchUsers();
      } else {
        setFormError('Add failed');
      }
    } catch (e) {
      console.error('Add error:', e);
    }
  };
  const handleUpdate = async () => {
    if (!editUser) return;
    const { first_name, last_name, email } = formData;
    if (!first_name || !last_name || !email) {
      setFormError('All fields required');
      return;
    }
    try {
      const resp = await fetch(`http://127.0.0.1:8081/users/${editUser.username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, password: editUser.password }),
      });
      if (resp.ok) {
        setEditModalVisible(false);
        fetchUsers();
      } else {
        setFormError('Update failed');
      }
    } catch (e) {
      console.error('Update error:', e);
    }
  };

  const filtered = users.filter(u =>
    [u.username, u.first_name, u.last_name, u.email]
      .some(f => f.toLowerCase().includes(searchText.toLowerCase()))
  );

  const renderUser = ({ item }: { item: UserType }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, styles.usernameColumn]}>{item.username}</Text>
      <Text style={[styles.tableCell, styles.firstNameColumn]}>{item.first_name}</Text>
      <Text style={[styles.tableCell, styles.lastNameColumn]}>{item.last_name}</Text>
      <Text style={[styles.tableCell, styles.emailColumn]}>{item.email}</Text>
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
      <View style={styles.headerContainer}>
        <Text style={styles.pageTitle}>Manage Employees</Text>
        
      </View>

      <View style={styles.topBar}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon}/>
          <TextInput
            style={styles.searchInput}
            placeholder="Search employees..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={openAddModal}>
          <Ionicons name="add-circle-outline" size={20} color="white" />
          <Text style={styles.addBtnText}>Add Employee</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.tableRow, styles.headerRow]}>
        <Text style={[styles.tableHeader, styles.usernameColumn]}>Username</Text>
        <Text style={[styles.tableHeader, styles.firstNameColumn]}>First Name</Text>
        <Text style={[styles.tableHeader, styles.lastNameColumn]}>Last Name</Text>
        <Text style={[styles.tableHeader, styles.emailColumn]}>Email</Text>
        <Text style={[styles.tableHeader, styles.actionsColumn]}>Actions</Text>
      </View>

      <FlatList
        data={filtered}
        renderItem={renderUser}
        keyExtractor={u => u.username}
      />

      {/* Delete Modal */}
      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={cancelDelete}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>
              Delete "{userToDelete}"?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={cancelDelete}>
                <Text style={styles.cancelTxt}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmBtn} onPress={handleDelete}>
                <Text style={styles.confirmTxt}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Modal */}
      <Modal visible={addModalVisible} transparent animationType="fade" onRequestClose={() => setAddModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <ScrollView>
              <Text style={styles.modalTitle}>Add Employee</Text>
              {['username','first_name','last_name','email','password'].map(field => (
                <TextInput
                  key={field}
                  style={styles.input}
                  placeholder={field.replace('_',' ').toUpperCase()}
                  value={(formData as any)[field]}
                  onChangeText={val => setFormData({ ...formData,[field]: val })}
                  autoCapitalize="none"
                />
              ))}
              {formError ? <Text style={styles.errorText}>{formError}</Text> : null}
              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setAddModalVisible(false)}>
                  <Text style={styles.cancelTxt}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmBtn} onPress={handleAdd}>
                  <Text style={styles.confirmTxt}>Submit</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Edit Modal */}
      <Modal visible={editModalVisible} transparent animationType="fade" onRequestClose={() => setEditModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <ScrollView>
              <Text style={styles.modalTitle}>Edit Employee</Text>
              {['first_name','last_name','email'].map(field => (
                <TextInput
                  key={field}
                  style={styles.input}
                  placeholder={field.replace('_',' ').toUpperCase()}
                  value={(formData as any)[field]}
                  onChangeText={val => setFormData({ ...formData,[field]: val })}
                  autoCapitalize="none"
                />
              ))}
              {formError ? <Text style={styles.errorText}>{formError}</Text> : null}
              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setEditModalVisible(false)}>
                  <Text style={styles.cancelTxt}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmBtn} onPress={handleUpdate}>
                  <Text style={styles.confirmTxt}>Update</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
);
}
