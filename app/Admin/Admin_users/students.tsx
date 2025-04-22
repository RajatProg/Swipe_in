import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
} from "react-native";
import { styles } from "../admin_styles/manage_user";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";

/* ---------- types ---------- */
type Student = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  meal_plan: "Platinum" | "Gold" | "Silver" | "Bronze";
  meal_swipes: number;
  flex_dollars: number;
};

/* valid plan values */
const PLAN_CHOICES = ["Platinum", "Gold", "Silver", "Bronze"] as const;

/* plan → default totals */
const PLAN_DEFAULTS = {
  Platinum: { meal_swipes: 600, flex_dollars: 100 },
  Gold: { meal_swipes: 200, flex_dollars: 100 },
  Silver: { meal_swipes: 150, flex_dollars: 100 },
  Bronze: { meal_swipes: 75, flex_dollars: 100 },
} as const;

/* default form state */
const defaultForm: Student = {
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  meal_plan: "Gold",
  meal_swipes: 0,
  flex_dollars: 0,
};

export default function Students() {
  const [searchText, setSearchText] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  /* modal state */
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);
  const [editTarget, setEditTarget] = useState<Student | null>(null);

  /* form state */
  const [formData, setFormData] = useState(defaultForm);
  const [formError, setFormError] = useState("");

  const router = useRouter();

  /* fetch list from Meals */
  useEffect(() => {
    fetchStudents();
  }, []);
  const fetchStudents = async () => {
    try {
      const { data } = await axios.get<Student[]>(
        "http://127.0.0.1:8081/student_users/"
      );
      setStudents(data);
    } catch (e) {
      console.error("Failed to fetch students:", e);
    }
  };

  /* build suggestions whenever searchText or students changes */
  useEffect(() => {
    if (!searchText) {
      setSuggestions([]);
      return;
    }
    const matches = students
      .map((s) => s.username)
      .filter((u) => u.toLowerCase().startsWith(searchText.toLowerCase()))
      .slice(0, 5);
    setSuggestions(matches);
  }, [searchText, students]);

  /* placeholder for voice search */
  const handleVoiceSearch = () => {
    console.log("🎤 voice search not yet implemented");
  };

  /* delete student */
  const confirmDelete = (username: string) => {
    setStudentToDelete(username);
    setDeleteModal(true);
  };
  const handleDelete = async () => {
    if (!studentToDelete) return;
    try {
      const resp = await fetch(
        `http://127.0.0.1:8081/student_users/${studentToDelete}`,
        { method: "DELETE" }
      );
      if (resp.ok) fetchStudents();
    } catch (e) {
      console.error("Delete failed:", e);
    } finally {
      setDeleteModal(false);
      setStudentToDelete(null);
    }
  };

  /* open Add modal */
  const openAdd = () => {
    setFormData(defaultForm);
    setFormError("");
    setAddModal(true);
  };

  /* open Edit modal */
  const openEdit = (s: Student) => {
    setEditTarget(s);
    setFormData(s);
    setFormError("");
    setEditModal(true);
  };

  /* validate name/email */
  const validateForm = () => {
    const { username, first_name, last_name, email } = formData;
    if (!username || !first_name || !last_name || !email) {
      setFormError("All fields are required");
      return false;
    }
    setFormError("");
    return true;
  };

  /* ADD student */
  const handleAdd = async () => {
    if (!validateForm()) return;
    try {
      const resp = await fetch("http://127.0.0.1:8081/student/registration/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (resp.ok) {
        setAddModal(false);
        fetchStudents();
      } else {
        setFormError("Add failed");
      }
    } catch (e) {
      console.error("Add error:", e);
    }
  };

  /* EDIT student */
  const handleUpdate = async () => {
    if (!editTarget || !validateForm()) return;
    try {
      const resp = await fetch(
        `http://127.0.0.1:8081/student_users/${editTarget.username}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (resp.ok) {
        setEditModal(false);
        fetchStudents();
      } else {
        const err = await resp.json();
        setFormError(err.detail || "Update failed");
      }
    } catch (e) {
      console.error("Update error:", e);
      setFormError("Network error");
    }
  };

  /* filter by MNumber only */
  const filtered = students.filter((s) =>
    s.username.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderRow = ({ item }: { item: Student }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, styles.usernameColumn]}>
        {item.username}
      </Text>
      <Text style={[styles.tableCell, styles.firstNameColumn]}>
        {item.first_name}
      </Text>
      <Text style={[styles.tableCell, styles.lastNameColumn]}>
        {item.last_name}
      </Text>
      <Text style={[styles.tableCell, styles.emailColumn]}>{item.email}</Text>
      <Text style={[styles.tableCell, styles.planColumn]}>
        {item.meal_plan}
      </Text>
      <View style={styles.actionsColumn}>
        <TouchableOpacity style={styles.editBtn} onPress={() => openEdit(item)}>
          <Ionicons name="create-outline" size={18} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => confirmDelete(item.username)}
        >
          <Ionicons name="trash-outline" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.pageTitle}>Manage Students</Text>
      </View>

      <View style={styles.topBar}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search MNumber…"
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity
            onPress={() => {
              /* you could re‑trigger fetch or blur here */
            }}
            style={styles.searchIcon}
          >
            <Ionicons name="search-outline" size={20} color="#666" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={openAdd}>
          <Ionicons name="add-circle-outline" size={20} color="white" />
          <Text style={styles.addBtnText}>Add Student</Text>
        </TouchableOpacity>
      </View>
      {/* Autocomplete suggestions */}
      {suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          {suggestions.map((u) => (
            <TouchableOpacity
              key={u}
              style={styles.suggestionItem}
              onPress={() => {
                setSearchText(u);
                setSuggestions([]);
              }}
            >
              <Text>{u}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Table Header */}
      <View style={[styles.tableRow, styles.headerRow]}>
        <Text style={[styles.tableHeader, styles.usernameColumn]}>Mustang Number</Text>
        <Text style={[styles.tableHeader, styles.firstNameColumn]}>
          First Name
        </Text>
        <Text style={[styles.tableHeader, styles.lastNameColumn]}>
          Last Name
        </Text>
        <Text style={[styles.tableHeader, styles.emailColumn]}>Email ID</Text>
        <Text style={[styles.tableHeader, styles.planColumn]}>Meal Plan</Text>
        <Text style={[styles.tableHeader, styles.actionsColumn]}>Actions</Text>
      </View>

      <FlatList
        data={filtered}
        renderItem={renderRow}
        keyExtractor={(u) => u.username}
      />

      {/* Delete Modal */}
      <Modal
        visible={deleteModal}
        transparent
        animationType="fade"
        onRequestClose={() => setDeleteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>Delete "{studentToDelete}"?</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setDeleteModal(false)}
              >
                <Text style={styles.cancelTxt}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={handleDelete}
              >
                <Text style={styles.confirmTxt}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Modal */}
      <Modal
        visible={addModal}
        transparent
        animationType="fade"
        onRequestClose={() => setAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <ScrollView>
              <Text style={styles.modalTitle}>Add Student</Text>

              {/* basic info */}
              {["username", "first_name", "last_name", "email"].map((field) => (
                <TextInput
                  key={field}
                  style={styles.input}
                  placeholder={field.replace("_", " ").toUpperCase()}
                  value={(formData as any)[field]}
                  onChangeText={(val) =>
                    setFormData({ ...formData, [field]: val })
                  }
                  autoCapitalize="none"
                />
              ))}

              {/* PLAN CHIPS */}
              <View style={styles.planPicker}>
                {PLAN_CHOICES.map((p) => (
                  <TouchableOpacity
                    key={p}
                    style={[
                      styles.planChip,
                      formData.meal_plan === p && styles.planChipSelected,
                    ]}
                    onPress={() => {
                      const d = PLAN_DEFAULTS[p];
                      setFormData({
                        ...formData,
                        meal_plan: p,
                        meal_swipes: d.meal_swipes,
                        flex_dollars: d.flex_dollars,
                      });
                    }}
                  >
                    <Text
                      style={[
                        styles.planChipTxt,
                        formData.meal_plan === p && { color: "white" },
                      ]}
                    >
                      {p}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* ONLY TWO FIELDS */}
              <TextInput
                style={styles.input}
                placeholder="Total Swipes"
                keyboardType="numeric"
                value={String(formData.meal_swipes)}
                onChangeText={(val) =>
                  setFormData({
                    ...formData,
                    meal_swipes: Number(val) || 0,
                  })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Total Flex Dollars"
                keyboardType="numeric"
                value={String(formData.flex_dollars)}
                onChangeText={(val) =>
                  setFormData({
                    ...formData,
                    flex_dollars: Number(val) || 0,
                  })
                }
              />

              {formError ? (
                <Text style={styles.errorText}>{formError}</Text>
              ) : null}
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => setAddModal(false)}
                >
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
      <Modal
        visible={editModal}
        transparent
        animationType="fade"
        onRequestClose={() => setEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <ScrollView>
              <Text style={styles.modalTitle}>Edit Student</Text>

              {/* ─── Uneditable MNumber ─── */}
              <TextInput
                style={[styles.input, { backgroundColor: "#eee" }]}
                value={formData.username}
                editable={false}
                placeholder="MNumber"
              />

              {/* name & email */}
              {["first_name", "last_name", "email"].map((field) => (
                <TextInput
                  key={field}
                  style={styles.input}
                  placeholder={field.replace("_", " ").toUpperCase()}
                  value={(formData as any)[field]}
                  onChangeText={(val) =>
                    setFormData({ ...formData, [field]: val })
                  }
                  autoCapitalize="none"
                />
              ))}

              {/* PLAN CHIPS */}
              <View style={styles.planPicker}>
                {PLAN_CHOICES.map((p) => (
                  <TouchableOpacity
                    key={p}
                    style={[
                      styles.planChip,
                      formData.meal_plan === p && styles.planChipSelected,
                    ]}
                    onPress={() => {
                      const d = PLAN_DEFAULTS[p];
                      setFormData({
                        ...formData,
                        meal_plan: p,
                        meal_swipes: d.meal_swipes,
                        flex_dollars: d.flex_dollars,
                      });
                    }}
                  >
                    <Text
                      style={[
                        styles.planChipTxt,
                        formData.meal_plan === p && { color: "white" },
                      ]}
                    >
                      {p}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* ONLY TWO FIELDS */}
              <TextInput
                style={styles.input}
                placeholder="Total Swipes"
                keyboardType="numeric"
                value={String(formData.meal_swipes)}
                onChangeText={(val) =>
                  setFormData({
                    ...formData,
                    meal_swipes: Number(val) || 0,
                  })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Total Flex $"
                keyboardType="numeric"
                value={String(formData.flex_dollars)}
                onChangeText={(val) =>
                  setFormData({
                    ...formData,
                    flex_dollars: Number(val) || 0,
                  })
                }
              />

              {formError ? (
                <Text style={styles.errorText}>{formError}</Text>
              ) : null}
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => setEditModal(false)}
                >
                  <Text style={styles.cancelTxt}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.confirmBtn}
                  onPress={handleUpdate}
                >
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
