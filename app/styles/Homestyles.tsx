import {
    StyleSheet,
    } from 'react-native';


export const styles = StyleSheet.create({



    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: 150,
      marginHorizontal: 40,
      backgroundColor: 'rgba(14, 1, 1, 0.5)',
      borderRadius: 30,
      paddingBottom: 30,
      marginLeft: 450,
      marginRight: 450,
      marginBottom: 190,
      flexWrap: 'wrap'
   
    },
      
    background: {
      backgroundColor: 'rgba(14, 1, 1, 0.5)',
      borderRadius: 30,
      height: 750
    
    },
  
    navbar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap'
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

    navTextActive: {
      borderBottomWidth: 5,
      borderBottomColor: 'rgb(198, 2, 2)',
      paddingBottom: 2,
      borderRadius: 5,
    },
    
    backgroundImage: {
      width: '100%',
      resizeMode: 'cover',
      height: 700,
      shadowColor: '#000',
      shadowOffset: { width: 7, height: 7 },
      shadowOpacity: 0.2,
      shadowRadius: 1
    },
  
    title: {
      fontSize: 38,
      color: 'rgba(255, 255, 255, 0.98)',
      textAlign: 'center',
      marginBottom: 10,
      padding : 15,
      fontWeight: 'bold'
  
    },
    subtitle: {
      fontSize: 17,
      color: 'rgba(255, 255, 255, 0.98)',
      marginBottom: 40,
      textAlign: 'center',
    },
    
    button: {
      marginTop: 10,
      padding: 10,
      borderWidth: 5,
      borderColor: 'rgb(198, 2, 2)',
      borderRadius: 500,
      alignItems: 'center'
      
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'justify'
    },
  
    topcntr:
    {
      flexDirection: 'row',
      justifyContent: 'center',
         
    },
  
    featurename: {
      paddingTop: 40,
      fontSize: 50,
      fontWeight: 'bold',
      marginBottom: 15,
      color: 'rgb(198, 2, 2)',
      textAlign: 'center'
    },
    featuresGrid: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: 30,
      flexWrap: 'wrap',
      
      
    },
    featureCard: {
      width: 400,
      margin: 10,
      borderWidth: 3,
      borderColor: 'rgb(198, 2, 2)',
      borderRadius: 20,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 15, height: 15 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    featureimage: {
      width: '100%',
      height: 200,
      resizeMode: 'contain',
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12
    },
    feature: {
      backgroundColor: 'hsla(0, 0.00%, 0.00%, 0.66)',
      padding: 10,
      borderBottomRightRadius: 70,
      position: 'relative',
      
      
    },
    featureTitle: {
      fontSize: 21,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      
    },
    featureDescription: {
      fontSize: 16,
      marginTop: 14,
      color: 'rgba(255, 255, 255, 0.98)',
      textAlign: 'center'
    },
    
    meal:
    {
      flex: 1.3,
      backgroundColor: 'rgba(190, 76, 76, 0.3)',
      paddingHorizontal: 70,
      paddingTop: 10,
      margin: 50,
      borderRadius: 30,
      shadowColor: '#000',
      shadowOffset: { width: 10, height: 10 },
      shadowOpacity: 0.2,
      shadowRadius: 5,

      
      
    },
  
    mainHeading: {
      fontSize: 40,
      fontWeight: 'bold',
      color: 'rgb(198, 2, 2)',
      marginBottom: 4,
      paddingTop: 40
    },
    headingUnderline: {
      width: 50,
      height: 6,
      backgroundColor: '#7B3E76',
      marginBottom: 16,
    },
    
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap', 
      alignItems: 'flex-start',
      marginBottom: 30,
      
    },
    mealPlanImage: {
      width: 400,
      height: 400,
      borderRadius: 30,
      marginLeft: 50,
      marginBottom: 100, 
      resizeMode: 'cover',
      flex: 0.7 ,
      borderColor: 'rgb(198, 2, 2)',
      borderWidth: 2
           
    },
    benefitsContainer: {
      flex: 1.1, 
      minWidth: 200
    },
    benefitsHeading: {
      marginTop: 20,
      fontSize: 52,
      fontWeight: 'bold',
      color: '#4A2B5F',
      marginBottom: 15,
    },
    benefitCard: {
      backgroundColor: '#326273',
      borderBottomEndRadius: 30,
      padding: 10,
      marginBottom: 10,
      marginRight: 30
      
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFF',
      marginBottom: 6,
    },
    cardText: {
      fontSize: 13,
      color: '#FFF',
      lineHeight: 20,
    },
  
    subHeading: {
      fontSize: 40,
      fontWeight: 'bold',
      color: 'rgb(198, 2, 2)',
      textAlign: 'center',
      marginBottom: 1,
      paddingTop: 40
    },
    subHeadingUnderline: {
      width: 200,
      height: 6,
      backgroundColor: '#7B3E76',
      alignSelf: 'center',
      marginBottom: 16,
    },
  
    plan:
    {
      flex: 1.1,
      backgroundColor: '#FFF',
      paddingHorizontal: 100,
      margin: 10,
      marginLeft: 50,
      marginRight: 50,
      paddingBottom: 20,
      borderRadius: 30,
      shadowColor: '#000',
      shadowOffset: { width: 7, height: 7 },
      shadowOpacity: 0.2,
      shadowRadius: 4
    },
  
    tableTitle: {
      fontSize: 25,
      fontWeight: 'bold',
      color: '#4A2B5F',
      marginBottom: 10,
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: '#f2f2f2',
      paddingVertical: 8,
      paddingHorizontal: 4,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    },
    tableHeaderText: {
      fontWeight: 'bold',
      color: '#333',
    },
  
  
    categoryTitle: {
      marginTop: 10,
      fontSize: 16,
      fontWeight: '600',
      color: '#7B3E76',
      marginBottom: 4,
    },
    tableRow: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      paddingVertical: 8,
      paddingHorizontal: 4,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    tableCell: {
      fontSize: 15,
      color: '#333',
      textAlign: 'left'
  
    },
  
  
    cards: {
      padding: 16,
      justifyContent: 'space-between',
    },
    cardsContainer: {
      flexDirection: 'row',      
      justifyContent: 'space-evenly' 
    },
    card: {
      backgroundColor: 'rgba(190, 76, 76, 0.3)',
      borderRadius: 30,
      padding: 16,
      alignItems: 'center',       
      shadowColor: '#000',
      shadowOffset: { width: 7, height: 7 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
      marginTop: 30
    },
    planName: {
      fontSize: 48,
      fontWeight: 'bold',
      marginBottom: 40,
      color: '#rgb(198, 2, 2)',
    },
    planValue: {
      fontSize: 18,
      color: '#555',
      paddingBottom: 15
    },


    footer: {
        backgroundColor: '#222',
        paddingVertical: 50,
        paddingHorizontal: 40,
        marginTop: 30
      },
      footerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      },
      footerSection: {
        width: '30%',
        marginBottom: 10,
      },
      footerHeading: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
      },
      footerText: {
        fontSize: 14,
        color: '#bbb',
        marginBottom: 4,
      },
      footerBottom: {
        textAlign: 'center',
        color: '#aaa',
        marginTop: 70,

      }





  
  });



  export default styles;
  