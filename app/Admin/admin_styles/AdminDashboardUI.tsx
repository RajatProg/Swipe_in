import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
  },

  sidebar: {
    width: 250,
    backgroundColor: '#1e1e2f',
    paddingTop: 30,
  },

  mainContent: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },

  heading: {
    color: '#333',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  card: {
    width: '48%',
    height: 100,
    backgroundColor: '#1f2a44', // 💙 Navy-inspired blue
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    justifyContent: 'center',

    // Optional depth effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  cardText: {
    color: '#fff', // White text for contrast
    fontSize: 18,
    fontWeight: 'bold',
  },
});
