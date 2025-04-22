// CFAMenuManagement.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  Button,
  Alert,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../admin_styles/cfa_menu";
import { useRouter } from "expo-router";


axios.defaults.baseURL = "http://127.0.0.1:8081";

// fixed Chick‑fil‑A IDs in the order you want
const FIXED_ORDER = [4, 1, 7, 2, 3, 5, 6];
const CHICK = "Chick‑fil‑A";
const LOCATIONS = [CHICK, "Mesquite Dining Hall"];
const router = useRouter();
export default function CFAMenuManagement() {
  // data
  const [categories, setCategories] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  // category modal
  const [catModal, setCatModal] = useState(false);
  const [catEdit, setCatEdit] = useState<any>(null);
  const [catName, setCatName] = useState("");
  const [catLoc, setCatLoc] = useState(CHICK);

  // item modal
  const [itemModal, setItemModal] = useState(false);
  const [itmEdit, setItmEdit] = useState<any>(null);
  const [itm, setItm] = useState({
    title: "",
    desc: "",
    calories: 0,
    price: 0,
    catId: FIXED_ORDER[0],
  });

  // delete confirmation modal
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [toDelete, setToDelete] = useState<{
    type: "category" | "item";
    id: number;
    label: string;
  } | null>(null);

  // enable LayoutAnimation on Android
  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  // initial load
  useEffect(reload, []);

  function reload() {
    axios.get("/CFA_Categories/").then((r) => setCategories(r.data));
    axios.get("/CFA_Menu/").then((r) => setItems(r.data));
  }


  // filter only Chick‑fil‑A categories
  const chickCats = categories.filter((c) =>
    c.location.toLowerCase().includes("chick")
  );

  // fixed order + extras
  const cats = [
    ...FIXED_ORDER.filter((id) =>
      chickCats.some((c) => c.category_id === id)
    ).map((id) => chickCats.find((c) => c.category_id === id)!),
    ...chickCats
      .filter((c) => !FIXED_ORDER.includes(c.category_id))
      .sort((a, b) => a.category_name.localeCompare(b.category_name)),
  ];

  // group & filter items
  const grouped = cats.map((c) => ({
    ...c,
    items: items
      .filter((i) => i.category_id === c.category_id)
      .filter((i) =>
        i.item_title.toLowerCase().includes(search.toLowerCase())
      ),
  }));

  function toggle(id: number) {
    LayoutAnimation.easeInEaseOut();
    setExpanded(expanded === id ? null : id);
  }

  // ── CATEGORY CRUD ─────────────────────────────────────────

  function openCatModal(action: "create" | "edit", cat?: any) {
    setCatEdit(action === "edit" ? cat : null);
    setCatName(cat?.category_name ?? "");
    setCatLoc(cat?.location ?? CHICK);
    setCatModal(true);
  }

  async function saveCategory() {
    const payload = { category_name: catName, location: catLoc };
    try {
      if (catEdit) {
        await axios.put(
          `/CFA_Categories/${catEdit.category_id}`,
          payload
        );
      } else {
        await axios.post("/CFA_Categories/", payload);
      }
      setCatModal(false);
      reload();
    } catch (err) {
      console.error(err);
      Alert.alert("Error saving category");
    }
  }

  // open confirmation for category delete
  function confirmDeleteCategory(cat: any) {
    setToDelete({
      type: "category",
      id: cat.category_id,
      label: cat.category_name,
    });
    setDeleteModalVisible(true);
  }

  // ── ITEM CRUD ───────────────────────────────────────────

  function openItemModal(action: "create" | "edit", data?: any) {
    if (action === "edit" && data?.menu_id) {
      setItmEdit(data);
      setItm({
        title: data.item_title,
        desc: data.item_description,
        calories: data.calories,
        price: data.price,
        catId: data.category_id,
      });
    } else {
      setItmEdit(null);
      setItm({
        title: "",
        desc: "",
        calories: 0,
        price: 0,
        catId: data?.category_id ?? FIXED_ORDER[0],
      });
    }
    setItemModal(true);
  }

  async function saveItem() {
    const payload = {
      item_title: itm.title,
      item_description: itm.desc,
      calories: itm.calories,
      price: itm.price,
      category_id: itm.catId,
    };
    try {
      if (itmEdit?.menu_id) {
        await axios.put(`/CFA_Menu/${itmEdit.menu_id}`, payload);
      } else {
        await axios.post("/CFA_Menu/", payload);
      }
      setItemModal(false);
      reload();
    } catch (err) {
      console.error(err);
      Alert.alert("Error saving item");
    }
  }

  // open confirmation for item delete
  function confirmDeleteItem(i: any) {
    setToDelete({
      type: "item",
      id: i.menu_id,
      label: i.item_title,
    });
    setDeleteModalVisible(true);
  }

  // actually perform the DELETE
  async function handleConfirmDelete() {
    if (!toDelete) return;
    try {
      if (toDelete.type === "category") {
        await axios.delete(`/CFA_Categories/${toDelete.id}`);
      } else {
        await axios.delete(`/CFA_Menu/${toDelete.id}`);
      }
      reload();
    } catch (err) {
      console.error("Delete failed:", err);
      Alert.alert("Error", `Could not delete ${toDelete.type}.`);
    } finally {
      setDeleteModalVisible(false);
      setToDelete(null);
    }
  }

  // ── RENDER ───────────────────────────────────────────────────

  return (
    <View style={styles.container}>

      <TouchableOpacity
                style={styles.title}
                onPress={() =>
                  // navigate to recent transactions
                  router.push("Profiles/chickfilA" as never)
                }
              >
      <Text style={styles.title}>CFA Menu Management </Text>
      </TouchableOpacity>
    
      <View style={styles.topRow}>
        <TextInput
          style={[styles.searchInput, { flex: 1 }]}
          placeholder="Search items…"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity onPress={() => openCatModal("create")}>
          <Ionicons name="add-circle-outline" size={32} color="#00BFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {cats.map((cat) => (
          <View key={cat.category_id}>
            <View style={styles.categoryHeader}>
              <TouchableOpacity
                style={styles.categoryRow}
                onPress={() => toggle(cat.category_id)}
              >
                <Ionicons
                  name={
                    expanded === cat.category_id
                      ? "chevron-down-outline"
                      : "chevron-forward-outline"
                  }
                  size={20}
                  color="#333"
                />
                <Text style={styles.categoryText}>
                  {cat.category_name}
                </Text>
              </TouchableOpacity>
              <View style={styles.categoryActions}>
                <TouchableOpacity
                  onPress={() => openCatModal("edit", cat)}
                >
                  <Ionicons name="pencil-outline" size={20} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => confirmDeleteCategory(cat)}
                >
                  <Ionicons name="trash-outline" size={20} color="#E00" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    openItemModal("create", {
                      category_id: cat.category_id,
                    })
                  }
                >
                  <Ionicons name="add-outline" size={20} color="#0A0" />
                </TouchableOpacity>
              </View>
            </View>

            {expanded === cat.category_id && (
              <FlatList
                data={
                  grouped.find(
                    (g) => g.category_id === cat.category_id
                  )?.items || []
                }
                keyExtractor={(i) => i.menu_id.toString()}
                ListHeaderComponent={() => (
                  <View style={styles.headerRow}>
                    <Text style={styles.headerCell}>Title</Text>
                    <Text style={styles.headerCell}>Calories</Text>
                    <Text style={styles.headerCell}>Price</Text>
                    <View style={styles.actionHeader} />
                  </View>
                )}
                renderItem={({ item }) => (
                  <View style={styles.itemRow}>
                    <Text style={styles.itemCell}>
                      {item.item_title}
                    </Text>
                    <Text style={styles.itemCell}>
                      {item.calories}
                    </Text>
                    <Text style={styles.itemCell}>
                      {item.price.toFixed(2)}
                    </Text>
                    <View style={styles.itemActions}>
                      <TouchableOpacity
                        onPress={() => openItemModal("edit", item)}
                      >
                        <Ionicons
                          name="pencil-outline"
                          size={18}
                          color="#666"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => confirmDeleteItem(item)}
                      >
                        <Ionicons
                          name="trash-outline"
                          size={18}
                          color="#E00"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            )}
          </View>
        ))}
      </ScrollView>

      {/* Category / Item Modal */}
      <Modal
        visible={catModal || itemModal}
        transparent
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {catModal ? (
              <>
                <Text style={styles.modalTitle}>
                  {catEdit ? "Edit Category" : "Add Category"}
                </Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Name"
                  value={catName}
                  onChangeText={setCatName}
                />
                <Picker
                  selectedValue={catLoc}
                  onValueChange={setCatLoc}
                  style={styles.modalPicker}
                >
                  {LOCATIONS.map((l) => (
                    <Picker.Item key={l} label={l} value={l} />
                  ))}
                </Picker>
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>
                  {itmEdit ? "Edit Item" : "Add Item"}
                </Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Title"
                  value={itm.title}
                  onChangeText={(t) =>
                    setItm((i) => ({ ...i, title: t }))
                  }
                />
                <TextInput
                  style={styles.modalInput}
                  placeholder="Description"
                  value={itm.desc}
                  onChangeText={(t) =>
                    setItm((i) => ({ ...i, desc: t }))
                  }
                />
                <TextInput
                  style={styles.modalInput}
                  placeholder="Calories"
                  keyboardType="numeric"
                  value={String(itm.calories)}
                  onChangeText={(t) =>
                    setItm((i) => ({
                      ...i,
                      calories: Number(t),
                    }))
                  }
                />
                <TextInput
                  style={styles.modalInput}
                  placeholder="Price"
                  keyboardType="numeric"
                  value={String(itm.price)}
                  onChangeText={(t) =>
                    setItm((i) => ({
                      ...i,
                      price: Number(t),
                    }))
                  }
                />
                <Picker
                  selectedValue={itm.catId}
                  onValueChange={(v) =>
                    setItm((i) => ({ ...i, catId: v }))
                  }
                  style={styles.modalPicker}
                >
                  {cats.map((c) => (
                    <Picker.Item
                      key={c.category_id}
                      label={c.category_name}
                      value={c.category_id}
                    />
                  ))}
                </Picker>
              </>
            )}
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                onPress={() => {
                  setCatModal(false);
                  setItemModal(false);
                }}
              />
              <Button
                title="Save"
                onPress={catModal ? saveCategory : saveItem}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={deleteModalVisible}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Delete “{toDelete?.label}”?
            </Text>
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                onPress={() => {
                  setDeleteModalVisible(false);
                  setToDelete(null);
                }}
              />
              <Button
                title="Delete"
                color="red"
                onPress={handleConfirmDelete}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
