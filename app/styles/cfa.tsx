// styles/cfa.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  }, 

  navItem: 
  {
    padding: 40,
    paddingTop: 50 ,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50
    
  },


  navText: {
    color: 'rgb(0, 7, 3)',
    fontSize: 14,
    textAlign: 'center'
  },

  textContainer: {
    marginBottom: 5,
  },
  
  
  
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  selectedNavItem: {
    backgroundColor: 'rgb(218, 15, 15)',
  },
  navColumn: {
    flex: .9,
    backgroundColor: '#f8f8f8',
    paddingVertical: 20,
  },
  
  menuContainer: {
    flex: 7,
    padding: 10,
    backgroundColor: '#fff'
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },

  card: {
    width: '32%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 50,
    justifyContent: 'space-evenly',
    elevation: 3,
    margin: '6%',
    overflow:'hidden',
    height: 322
  },

  itemImage: {
    width: 'auto',
    height: '70%',
    borderRadius: 8,
    
  },

  

  itemName: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  calories: {
    color: '#666',
    fontSize: 12,
    marginBottom: 8,
  },
  price: {
    color: '#c41200', 
    fontSize: 14,
    fontWeight: '700',
  },
  orderButton: {
    backgroundColor: '#c41200',
    borderRadius: 16,
    minWidth: 80,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },

  cartContainer: {
    flex: 2.2,
    backgroundColor: '#fff',
    borderLeftWidth: 1,
    borderLeftColor: '#eee',
  },

  cartHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 15,
    backgroundColor: '#f8f8f8',
  },
  cartItems: {
    flex: 1,
    paddingHorizontal: 15,
  },
 
  cartItemName: {
    fontSize: 14,
    maxWidth: '70%',
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#666',
  },
  emptyCart: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  totalContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  paymentButton: {
    backgroundColor: '#c41200',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cartItemInfo: {
    flex: 1,
    marginRight: 10,
  },
  removeButton: {
    padding: 5,
    marginLeft: 10,
  },
  removeText: {
    fontSize: 24,
    color: '#c41200',
    lineHeight: 24,
  },
  

});


export const headerStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingLeft: 10,
  },
  logo: {
    width: 150,
    height: 70,
  },
  greeting: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  logoutButton: {
    backgroundColor: '#e53935',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});


export const mealStyles = StyleSheet.create({

  mealCard: {
    width: 200,                
    height: 320,              
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 73,   
    alignItems: 'center',
    padding: 10,
    position: 'relative',
    marginTop: 50,
    justifyContent: 'space-evenly',
  },

  /** Title text at top (e.g. "Entree", "Sides", etc.) */
  mealCardTitle: {
    fontWeight: 'bold',
    fontSize: 19,
    marginBottom: 40,
    textAlign: 'center'
  },

  /** Red plus button in top-right corner */
  plusButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: '#d81c1c',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /** The image for each selected item */
  mealImage: {
    width: 170,
    height: 145,
    marginVertical: 15,  // space around the image
    resizeMode: 'cover'
  },

  /** The name of the selected item */
  mealItemName: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
    color: '#333'
  },

  /** The "Add Meal to Cart" button (if you have it) */
  addMealButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: '12%',
    alignSelf: 'center'
  }
});


export const paymentPromptStyles = StyleSheet.create({
  paymentOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  paymentOption: {
    backgroundColor: "rgba(207, 9, 9, 0.83)",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: "center",
    width: '48%',   
    marginVertical: 6,
  },
});

export const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContainer: {
    width: "30%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 12,
    padding: 8
  }
});