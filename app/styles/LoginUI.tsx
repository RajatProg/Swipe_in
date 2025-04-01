import {
    StyleSheet,
    } from 'react-native';

export const styles = StyleSheet.create({
  
    backgroundImage: {
      width: '100%',
      height: 900
  
  },
  background: {
      backgroundColor: 'rgba(14, 1, 1, 0.5)',
      borderRadius: 30,
      height: 900
    
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
    
    loginContainer: {
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
    
    loginHeading: {
      fontSize: 40,
      color: '#fff',
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
  
  
    inputGroup: {
      margin: 10,
    },
    inputLabel: {
      fontSize: 16,
      color: '#fff',
      marginBottom: 5,
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
      
    loginButton: {
      backgroundColor: 'rgba(0, 145, 255, 0.98)',
      paddingVertical: 10,
      borderRadius: 30,
      marginHorizontal: 150,
      marginTop: 30,
      alignItems: 'center',
      
    },
    loginButtonText: {
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

      tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
      },
      tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'white',
      },
      activeTab: {
        backgroundColor: 'rgba(0, 145, 255, 0.98)',
      },
      tabText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      image_:
      {
        height: 65,
        width: 65,
        paddingLeft: 60,
        marginHorizontal: 200
           
      }

  });


  export default styles;