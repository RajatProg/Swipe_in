import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  Button,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
  Alert,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../admin_styles/dining_menu";
import { router } from "expo-router";

// point axios at your FastAPI
axios.defaults.baseURL = "http://127.0.0.1:8081";

// enable Android LayoutAnimation
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// ─── Helpers ─────────────────────────────
// Force any Date to local‑noon (avoids TZ drift)
function toLocalNoon(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0);
}
// Format as YYYY‑MM‑DD in America/Chicago
function formatYMD_CT(d: Date): string {
  return d.toLocaleDateString("sv-SE", { timeZone: "America/Chicago" });
}

export default function DiningMenuManagement() {
  // ─── fetched data ───────────────────────
  const [mainCats, setMainCats] = useState<any[]>([]);
  const [subs,      setSubs]     = useState<any[]>([]);
  const [items,     setItems]    = useState<any[]>([]);

  // ─── UI state ───────────────────────────
  const [expanded,        setExpanded]       = useState<number|null>(null);
  const [search,          setSearch]         = useState("");
  const [selectedDate,    setSelectedDate]   = useState<Date>(toLocalNoon(new Date()));
  const [showDatePicker,  setShowDatePicker] = useState(false);

  // ─── item‑modal ──────────────────────────
  const [itemModal,       setItemModal]       = useState(false);
  const [itemEdit,        setItemEdit]        = useState<any>(null);
  const [modalShowDatePicker, setModalShowDatePicker] = useState(false);
  const [formItem, setFormItem] = useState({
    item_title:  "",
    item_detail: "",
    portion:     "",
    diet:        "",
    date:        formatYMD_CT(selectedDate),
    calories:    0,
    category_id: 0,
  });

  // ─── sub‑category‑modal ─────────────────
  const [catModal, setCatModal] = useState(false);
  const [catEdit,  setCatEdit]  = useState<any>(null);
  const [formCat, setFormCat] = useState({
    category_name:    "",
    main_category_id: 0,
  });

  // ─── delete confirmation ───────────────
  const [delModal, setDelModal] = useState(false);
  const [toDelete, setToDelete] = useState<{
    type: "item"|"sub";
    id: number;
    label: string;
  }|null>(null);

  // ─── initial load ───────────────────────
  function reloadAll() {
    axios.get("/Dining_Categories_Main/").then(r => setMainCats(r.data));
    axios.get("/Dining_Categories/").then(r => setSubs(r.data));
    axios.get("/dining_menu/").then(r => setItems(r.data));
  }
  useEffect(reloadAll, []);

  // ─── reload only menu on date change ────
  useEffect(() => {
    // keep the form date in sync
    setFormItem(f => ({ ...f, date: formatYMD_CT(selectedDate) }));
    // fetch only the menu items
    axios.get("/dining_menu/").then(r => setItems(r.data));
  }, [selectedDate]);

  // ─── grouping + filtering ──────────────
  const selectedYMD = formatYMD_CT(selectedDate);
  const grouped = subs.map(sub => ({
    ...sub,
    items: items.filter(i => {
      const rowYMD = formatYMD_CT(toLocalNoon(new Date(i.date)));
      return (
        i.category_id === sub.category_id &&
        rowYMD === selectedYMD &&
        i.item_title.toLowerCase().includes(search.toLowerCase())
      );
    })
  }));

  // ─── UI helpers ─────────────────────────
  function toggle(id:number) {
    LayoutAnimation.easeInEaseOut();
    setExpanded(expanded === id ? null : id);
  }

  // ─── item CRUD ──────────────────────────
  function openItemModal(action:"create"|"edit", categoryId:number, item?:any) {
    if (action === "edit" && item) {
      setItemEdit(item);
      setFormItem({
        item_title:  item.item_title,
        item_detail: item.item_detail,
        portion:     item.portion,
        diet:        item.diet,
        date:        item.date.slice(0,10),
        calories:    item.calories,
        category_id: item.category_id,
      });
    } else {
      setItemEdit(null);
      setFormItem(f => ({
        ...f,
        item_title:  "",
        item_detail: "",
        portion:     "",
        diet:        "",
        date:        selectedYMD,
        calories:    0,
        category_id: categoryId,
      }));
    }
    setItemModal(true);
  }
  async function saveItem() {
    const [y,m,d] = formItem.date.split("-").map(Number);
    const payload = {
      ...formItem,
      date: new Date(y, m-1, d, 12, 0, 0).toISOString(),
    };
    try {
      if (itemEdit?.menu_id) {
        await axios.put(`/Dining_Menu/${itemEdit.menu_id}`, payload);
      } else {
        await axios.post("/Dining_Menu/", payload);
      }
      setItemModal(false);
      Alert.alert("Success","Menu item saved");
      reloadAll();
    } catch {
      Alert.alert("Error","Could not save item");
    }
  }
  function confirmDeleteItem(item:any) {
    setToDelete({ type:"item", id:item.menu_id, label:item.item_title });
    setDelModal(true);
  }

  // ─── sub‑category CRUD ───────────────────
  function openCatModal(action:"create"|"edit", sub?:any, mainId?:number) {
    if (action==="edit" && sub) {
      setCatEdit(sub);
      setFormCat({
        category_name:    sub.category_name,
        main_category_id: sub.main_category_id,
      });
    } else {
      setCatEdit(null);
      setFormCat({
        category_name:    "",
        main_category_id: mainId ?? mainCats[0]?.main_category_id,
      });
    }
    setCatModal(true);
  }
  async function saveCat(){
    try {
      if (catEdit?.category_id) {
        await axios.put(`/Dining_Categories/${catEdit.category_id}`, formCat);
      } else {
        await axios.post("/Dining_Categories/", formCat);
      }
      setCatModal(false);
      reloadAll();
    } catch {
      Alert.alert("Error","Could not save sub‑category");
    }
  }
  function confirmDeleteSub(sub:any) {
    setToDelete({ type:"sub", id:sub.category_id, label:sub.category_name });
    setDelModal(true);
  }

  // ─── delete handler ─────────────────────
  async function handleConfirmDelete(){
    if (!toDelete) return;
    try {
      if (toDelete.type==="item") {
        await axios.delete(`/Dining_Menu/${toDelete.id}`);
      } else {
        await axios.delete(`/Dining_Categories/${toDelete.id}`);
      }
      setDelModal(false);
      reloadAll();
    } catch {
      Alert.alert("Error","Could not delete");
    }
  }

  // ─── date‑picker handlers ───────────────
  const handleWebDateChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const [y,m,d] = e.target.value.split("-").map(Number);
    setSelectedDate(new Date(y,m-1,d,12,0,0));
  };
  const onDateChange = (_:any, d?:Date) => {
    setShowDatePicker(false);
    if (d) setSelectedDate(toLocalNoon(d));
  };

  return (
    <View style={styles.container}>

      {/* HEADER & DATE */}
      <View style={styles.topRow}>
        <TouchableOpacity
                        style={styles.title}
                        onPress={() =>
                          // navigate to recent transactions
                          router.push("Profiles/Dining" as never)
                        }
                      >

        <Text style={styles.title}>Dining Menu Management</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection:"row",alignItems:"center"}}
          onPress={()=>setShowDatePicker(true)}
        >
          <Ionicons name="calendar-outline" size={20} color="#007AFF"/>
          <Text style={{marginLeft:6,color:"#007AFF"}}>{selectedYMD}</Text>
        </TouchableOpacity>
      </View>
      {showDatePicker && (Platform.OS==="web"
        ? <input
            type="date"
            value={selectedYMD}
            onChange={handleWebDateChange}
            style={{marginBottom:8}}
          />
        : <DateTimePicker
            value={selectedDate}
            mode="date"
            display="calendar"
            onChange={onDateChange}
          />
      )}

      {/* SEARCH */}
      <View style={styles.topRow}>
        <TextInput
          style={[styles.searchInput,{flex:1}]}
          placeholder="Search items…"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* GROUPED LIST */}
      <ScrollView contentContainerStyle={{paddingBottom:60}}>
        {mainCats.map(main=>(
          <View key={main.main_category_id}>

            {/* Main header + add‑sub */}
            <View style={{
              flexDirection:"row",
              alignItems:"center",
              justifyContent:"space-between",
              padding:8
            }}>
              <Text style={styles.mainCategoryTitle}>
                {main.main_category_name}
              </Text>
              <TouchableOpacity
                onPress={()=>openCatModal("create",undefined, main.main_category_id)}
              >
                <Ionicons name="add-circle-outline" size={24} color="#0A0"/>
              </TouchableOpacity>
            </View>

            {/* Subcategories */}
            {grouped
              .filter(g=>g.main_category_id===main.main_category_id)
              .map(sub=>(
                <View key={sub.category_id}>

                  <View style={styles.categoryHeader}>
                    <TouchableOpacity
                      style={styles.categoryRow}
                      onPress={()=>toggle(sub.category_id)}
                    >
                      <Ionicons
                        name={expanded===sub.category_id
                          ? "chevron-down-outline"
                          : "chevron-forward-outline"}
                        size={20}
                        color="#333"
                      />
                      <Text style={styles.categoryText}>
                        {sub.category_name}
                      </Text>
                    </TouchableOpacity>

                    <View style={{flexDirection:"row", alignItems:"center"}}>
                      {/* add item */}
                      <TouchableOpacity
                        onPress={()=>openItemModal("create", sub.category_id)}
                        style={{marginRight:12}}
                      >
                        <Ionicons name="add-outline" size={20} color="#0A0"/>
                      </TouchableOpacity>
                      {/* edit sub */}
                      <TouchableOpacity
                        onPress={()=>openCatModal("edit",sub)}
                        style={{marginRight:12}}
                      >
                        <Ionicons name="pencil-outline" size={18} color="#666"/>
                      </TouchableOpacity>
                      {/* delete sub */}
                      <TouchableOpacity
                        onPress={()=>confirmDeleteSub(sub)}
                      >
                        <Ionicons name="trash-outline" size={18} color="#E00"/>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* item list */}
                  {expanded===sub.category_id && (
                    <FlatList
                      data={sub.items}
                      keyExtractor={i=>String(i.menu_id)}
                      ListHeaderComponent={()=>(
                        <View style={styles.headerRow}>
                          <Text style={styles.headerCell}>Title</Text>
                          <Text style={styles.headerCell}>Portion</Text>
                          <Text style={styles.headerCell}>Diet</Text>
                          <Text style={styles.headerCell}>Calories</Text>
                          <View style={styles.actionHeader}/>
                        </View>
                      )}
                      renderItem={({item})=>(
                        <View style={styles.itemRow}>
                          <Text style={styles.itemCell}>{item.item_title}</Text>
                          <Text style={styles.itemCell}>{item.portion}</Text>
                          <Text style={styles.itemCell}>{item.diet}</Text>
                          <Text style={styles.itemCell}>{item.calories}</Text>
                          <View style={styles.itemActions}>
                            <TouchableOpacity
                              onPress={()=>openItemModal("edit", sub.category_id, item)}
                            >
                              <Ionicons name="pencil-outline" size={18} color="#666"/>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={()=>confirmDeleteItem(item)}
                            >
                              <Ionicons name="trash-outline" size={18} color="#E00"/>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                    />
                  )}
                </View>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* sub‑category modal */}
      <Modal visible={catModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {catEdit ? "Edit Sub‑Category" : "Add Sub‑Category"}
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Name"
              value={formCat.category_name}
              onChangeText={t=>setFormCat(f=>({...f,category_name:t}))}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={()=>setCatModal(false)}/>
              <Button title="Save"   onPress={saveCat}/>
            </View>
          </View>
        </View>
      </Modal>

      {/* item modal */}
      <Modal visible={itemModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {itemEdit ? "Edit Item" : "Add Item"}
            </Text>

            {/* Title */}
            <TextInput
              style={styles.modalInput}
              placeholder="Title"
              value={formItem.item_title}
              onChangeText={t=>setFormItem(f=>({...f,item_title:t}))}
            />
            {/* Detail */}
            <TextInput
              style={styles.modalInput}
              placeholder="Detail"
              value={formItem.item_detail}
              onChangeText={t=>setFormItem(f=>({...f,item_detail:t}))}
            />
            {/* Portion */}
            <TextInput
              style={styles.modalInput}
              placeholder="Portion"
              value={formItem.portion}
              onChangeText={t=>setFormItem(f=>({...f,portion:t}))}
            />

            {/* Diet */}
            {Platform.OS==="web" ? (
              <select
                style={styles.modalInput}
                value={formItem.diet}
                onChange={e=>setFormItem(f=>({...f,diet:e.target.value}))}
              >
                <option value="">— Select diet —</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Protein">Protein</option>
              </select>
            ) : (
              <View style={styles.modalInput}>
                <Picker
                  selectedValue={formItem.diet}
                  onValueChange={v=>setFormItem(f=>({...f,diet:v}))}
                >
                  <Picker.Item label="— Select diet —" value="" />
                  <Picker.Item label="Vegetarian" value="Vegetarian" />
                  <Picker.Item label="Vegan"      value="Vegan"      />
                  <Picker.Item label="Protein"    value="Protein"    />
                </Picker>
              </View>
            )}

            {/* Date */}
            {Platform.OS==="web" ? (
              <input
                type="date"
                value={formItem.date}
                onChange={e=>{
                  const [y,m,d]=e.target.value.split("-").map(Number);
                  setFormItem(f=>({
                    ...f,
                    date:`${y}-${String(m).padStart(2,"0")}-${String(d).padStart(2,"0")}`
                  }));
                }}
                style={styles.modalInput}
              />
            ) : (
              <>
                <TouchableOpacity
                  style={[styles.modalInput,{justifyContent:"center"}]}
                  onPress={()=>setModalShowDatePicker(true)}
                >
                  <Text>{formItem.date}</Text>
                </TouchableOpacity>
                {modalShowDatePicker && (
                  <DateTimePicker
                    value={new Date(formItem.date)}
                    mode="date"
                    display="calendar"
                    onChange={(_,d)=>{
                      setModalShowDatePicker(false);
                      if(d){
                        const local = toLocalNoon(d);
                        setFormItem(f=>({...f,date:formatYMD_CT(local)}));
                      }
                    }}
                  />
                )}
              </>
            )}

            {/* Calories */}
            <TextInput
              style={styles.modalInput}
              placeholder="Calories"
              keyboardType="numeric"
              value={String(formItem.calories)}
              onChangeText={t=>setFormItem(f=>({...f,calories:Number(t)}))}
            />

            {/* Buttons */}
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={()=>setItemModal(false)} />
              <Button title="Save"   onPress={saveItem} />
            </View>
          </View>
        </View>
      </Modal>

      {/* delete confirmation */}
      <Modal visible={delModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Delete “{toDelete?.label}”?
            </Text>
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={()=>setDelModal(false)} />
              <Button title="Delete" color="red" onPress={handleConfirmDelete} />
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}
