import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  innerContainer: {
    width: '95%',
    alignSelf: 'center',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flex: 1,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  searchIcon: {
    marginRight: 8,
  },
  filterButtons: {
    flexDirection: 'row',
    marginRight: 10,
    gap: 6,
  },
  filterBtn: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  activeFilterBtn: {
    backgroundColor: '#007BFF',
  },
  filterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addBtn: {
    flexDirection: 'row',
    backgroundColor: '#28A745',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  addBtnText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: '600',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerRow: {
    backgroundColor: '#333',
  },
  tableHeader: {
    fontWeight: 'bold',
    color: '#fff',
  },
  tableCell: {
    color: '#333',
  },

  // Fixed width columns for perfect alignment
  usernameColumn: { width: '16%' },
  firstNameColumn: { width: '16%' },
  lastNameColumn: { width: '16%' },
  emailColumn: { width: '22%' },
  roleColumn: {
    width: '14%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  actionsColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 8,
    zIndex: 1,
    gap: 8,
  },

  roleBadge: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 6,
    alignSelf: 'flex-start', 
    minWidth: 0,
    maxWidth: '100%',
  },
  studentRole: {
    backgroundColor: '#ADD8E6',
  },
  employeeRole: {
    backgroundColor: '#FFFACD',
  },
  roleText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  editBtn: {
    backgroundColor: '#007BFF',
    padding: 6,
    borderRadius: 5,
  },
  deleteBtn: {
    padding: 6,
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    elevation: 3,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  backText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: '600',
  },
});
