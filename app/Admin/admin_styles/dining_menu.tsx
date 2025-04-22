import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  mainCategoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e3c50',
    marginTop: 20,
    marginBottom: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

  // ── Search + Add Row ─────────────────────────────────────────
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },

  // ── Sub‑Category Header ───────────────────────────────────────
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#eee",
    marginTop: 8,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  subCategoryText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#555",
  },
  categoryActions: {
    flexDirection: "row",
    alignItems: "center",
  },

  // ── Items List Header & Rows ─────────────────────────────────
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#f7f7f7",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  headerCell: {
    flex: 1,
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 4,
  },
  actionHeader: {
    width: 60,
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  itemCell: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 4,
  },
  itemActions: {
    flexDirection: "row",
    width: 60,
    justifyContent: "space-around",
  },

  // ── Modals ────────────────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  modalInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  modalPicker: {
    height: 40,
    marginBottom: 8,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
  },
});
