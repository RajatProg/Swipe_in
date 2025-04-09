import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    paddingHorizontal: 12,
  },
  topBar: {
    marginTop: 40,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '500',
    marginRight: 6,
  },
  logo: {
    width: 220,
    height: 100,
    resizeMode: 'contain',
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    marginTop: 5,
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  menuItem: {
    paddingVertical: 8,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 25,
  },
  navItem: {
    paddingHorizontal: 10,
  },
  navText: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 16,
  },
  carouselImage: {
    width: '100%',
    height: 700,
    borderRadius: 14,
    alignSelf: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    margin: 5,
  },
  activeDot: {
    backgroundColor: '#7a1e1e',
  },

  // Footer styles
  footer: {
    backgroundColor: '#222',
    paddingVertical: 25,
    paddingHorizontal: 15,
    marginTop: 35,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  footerSection: {
    marginBottom: 15,
    maxWidth: '25%',
  },
  footerHeading: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 8,
  },
  footerText: {
    color: '#ccc',
    fontSize: 14,
    marginVertical: 1,
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  footerBottom: {
    marginTop: 20,
    textAlign: 'center',
    color: '#aaa',
    fontSize: 14,
  },
});
