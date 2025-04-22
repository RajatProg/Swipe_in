// swipe_history_styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // ── Outer container ───────────────────────────
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },

  // ── Header with title + search ────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  searchInput: {
    flex: 1,
    height: 36,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginLeft: 12,
  },

  // ── Table rows ───────────────────────────────
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  headerRow: {
    backgroundColor: '#f2f2f2',
  },
  cell: {
    paddingHorizontal: 4,
  },
  // small vs medium width for columns
  small: {
    flex: 0.8,
    textAlign: 'center',
  },
  medium: {
    flex: 1.2,
    textAlign: 'center',
  },

  // ── Expanded section under each user ─────────
  expandedSection: {
    backgroundColor: '#fafafa',
  },

  // ── Filter bar inside expanded section ────────
  filterRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'flex-end'
  },
  filterBtn: {
    marginRight: 16,
    paddingVertical: 4,
  },
  filterBtnActive: {
    borderBottomWidth: 2,
    borderColor: '#007bff',
  },
  filterText: {
    fontSize: 14,
    color: '#555',
  },
  filterTextActive: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: 'bold',
  },
  dateInput: {
    height: 36,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 8,
    marginVertical: 8,
    alignSelf: 'flex-start',
    minWidth: 120,
  },

 
  dateBtn: {
    marginRight: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
  },
  dateBtnText: {
    fontSize: 14,
    color: '#333',
  },

  // ── Transactions header row ───────────────────
  txHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#eaeaea',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  txHeaderCell: {
    flex: 1,
    fontWeight: '600',
    textAlign: 'center',
  },

  // ── Transactions data rows ────────────────────
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  txCell: {
    flex: 1,
    textAlign: 'center',
  },

  // ── Show More / Show Less button ─────────────
  showMoreBtn: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  showMoreText: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: '600',
  },

  dateFilterRow: {
    flexDirection: 'row',         // put children in a row
    justifyContent: 'center',     // center them horizontally
    alignItems: 'flex-end',       // align labels & inputs along baseline
    paddingVertical: 12,
  },
  dateContainer: {
    marginHorizontal: 16,         // space between From/To
    alignItems: 'flex-start',     // label & input align left
  },
  dateLabel: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  dateInputWeb: {
    height: 36,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 8,
    width: 140,                   // fix width so both fit
  },
  dateButton: {
    height: 36,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  dateButtonText: {
    fontSize: 14,
    color: '#333',
  },

});
