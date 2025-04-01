import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%'
  },
  background: {
    backgroundColor: 'rgba(14, 1, 1, 0.5)',
      borderRadius: 30,
      height: '100%'
  },
  
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navbarTitle: {
    width: 100,
    height: 100,
    marginLeft: 40,
    marginTop: 20
  },
  navLinks: {
    flexDirection: 'row',
    marginRight: 40,
  },
  navItem: {
    marginHorizontal: 15,
  },

  navText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal: 10,
  },
  RegistrationContainer: {
    flexWrap:'wrap',
      marginTop: 40,  
      margin: 50,
      marginHorizontal: 500,
      backgroundColor: 'rgba(0, 0, 0, 0.45)',
      borderRadius: 30,
      padding: 30,
      borderWidth: 1,
      borderColor: 'white'
  },
  RegisterHeading: {
    fontSize: 36,
      color: '#fff',
      fontWeight: 'bold',
      marginBottom: 40,
      textAlign: 'center'
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top:12,
    padding: 10,
  },
  
  inputGroup: {
    marginBottom: 18,
  },
  inputLabel: {
    fontSize: 16,
      color: '#fff',
      marginBottom: 2,
      fontWeight: 'bold'
  },
  input: {
    marginTop: 15,
      backgroundColor: '#fff',
      borderRadius: 15,
      paddingHorizontal: 20,
      paddingVertical: 8,
      fontSize: 18,
  },
  RegisterButton: {
    backgroundColor: 'rgba(0, 145, 255, 0.98)',
      paddingVertical: 10,
      borderRadius: 30,
      marginHorizontal: 150,
      marginTop: 30,
      alignItems: 'center',
  },
  RegisterButtonText: {
    color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
  },
  linkText: {
    color: 'rgb(255, 255, 255)',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.68)'
    
  },
  alertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 95,
    borderRadius: 22,
    margin: 450,
    borderColor: 'rgb(218, 15, 15)',
    borderWidth: 6
  },
  animation: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  text: {
    fontSize: 20,
    flexShrink: 1,
  }

  
});


export default styles;