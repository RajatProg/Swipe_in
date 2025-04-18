import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Container around the whole screen
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  backText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: '600',
  },

  // Search + Add bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    height: 36,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28A745',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  addBtnText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: '600',
  },

  // Table header and rows
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#EFEFEF',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#EEE',
  },
  tableHeader: {
    fontWeight: 'bold',
    color: '#333',
  },
  tableCell: {
    color: '#333',
    fontSize: 14,
  },

  // Column widths (flex ratios)
  usernameColumn: {
    flex: 1.2,
  },
  firstNameColumn: {
    flex: 1,
  },
  lastNameColumn: {
    flex: 1,
  },
  emailColumn: {
    flex: 1.8,
  },
  actionsColumn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  // Action buttons in each row
  editBtn: {
    backgroundColor: '#17A2B8',
    padding: 6,
    borderRadius: 4,
    marginRight: 8,
  },
  deleteBtn: {
    backgroundColor: '#DC3545',
    padding: 6,
    borderRadius: 4,
  },

  // Modal overlay + box
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelBtn: {
    backgroundColor: '#6C757D',
    padding: 10,
    borderRadius: 4,
  },
  cancelTxt: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  confirmBtn: {
    backgroundColor: '#DC3545',
    padding: 10,
    borderRadius: 4,
  },
  confirmTxt: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  // Add/Edit Modal
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
