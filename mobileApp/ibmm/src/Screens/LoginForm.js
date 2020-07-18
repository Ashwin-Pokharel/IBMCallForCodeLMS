import React, {Component, Fragment} from "react";
 import {
         Platform,
        StyleSheet,
        Text,
        View,
        SafeAreaView,
        TextInput,
        TouchableOpacity,
        Button
 } from 'react-native';
 
 import { createAppContainer } from 'react-navigation';
 import { createStackNavigator } from 'react-navigation-stack'
 import { AsyncStorage } from 'react-native'
 import {StackNavigator} from 'react-navigation';
 import { NavigationContainer } from '@react-navigation/native';
 import { useNavigation } from '@react-navigation/native';
 import { NavigationEvents } from 'react-navigation';
 import { useFocusEffect } from '@react-navigation/native';
 import Logo from '../components/Logo';




 export default class LoginForm extends React.Component<{}>{
  constructor(props){
    super(props);
    this.state = {
      email : '',
      password : '',
      token: ''}
    this.getData();
    console.log(this.state.email)
    console.log(this.state.token)
  } 
      
      getData = async () => {
        try {
          const value = await AsyncStorage.getItem('token');
          const email = await AsyncStorage.getItem('email');
          if (value !== null) {
            this.setState({token : value})
            console.log(value)
          }
          if (email  !== null) {
            this.setState({email : email})
            console.log(email)
          }
          if (password  !== null) {
            this.setState({password : password})
            console.log(password)
          }
        
        } catch (error) {
          // Error retrieving data
        }
      };

    async onSubmit() { 
        try{
          console.log("FUCK")
          await this.fetcher(this.state.password, this.state.email)
          console.log(":(")
          await AsyncStorage.setItem('token', this.state.token) 
          
        } 
        catch(err){
          console.log(err)
        }
      }

      async fetcher(password, email){
        var self = this
        fetch('http://127.0.0.1:8000/auth/token/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'password': password,
          'email': email
        })})
        .then((response) => response.json())
        .then((json) =>{ 
           self.setState({
            token: json.auth_token,
            });
          })
        .catch((error) => {
          console.error(error);
        })
      }
  

    goHS(navigation) {
        //AsyncStorage.getItem('token').then(val =>{if (val != null)
        if(this.state.token != null){
        console.log("GOIN TRUE")
        navigation.navigate('HP')
      }
        else{
          console.log("GOING FALSE 2")
          alert('its okay!!! ily babe ur doing great')
    }}


    signup(navigation){
      navigation.navigate('SU')
    }

    
    /*
    useFocusEffect(){
      React.useCallback(() => {
        console.log('focusinf')
  
        return () => {
          console.log('unfocusing')
        };
      }, [])
 }  
    */

  render(){
      return(
        <View style = {styles.container}>
            <Logo/>
            <Text>{this.state.token}</Text>
            <TextInput style={styles.inputBox} 
                underlineColorAndroid= 'rgba(0,0,0,0)' 
                placeholder="Email"
                placeholderTextColor="#ffffff"
                autoCapitalize = 'none'
                ref={(u) => this._username = u}
                onChangeText={email => this.setState({email})}
                value = {this.state.email}/>
            <TextInput style={styles.inputBox} 
                underlineColorAndroid= 'rgba(0,0,0,0)' 
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor="#ffffff"
                autoCapitalize = 'none'
                onChangeText={password => this.setState({password})}
                value = {this.state.password}
                />
            <TouchableOpacity style={styles.button} onPress={ async () => 
                {
                await this.onSubmit()
                this.goHS(this.props.navigation)
                }}>
                <Text style = {styles.buttonText}> Sign In </Text> 
            </TouchableOpacity>
            <View style = {styles.signupTextCont}>
              <Text style = {styles.signupText}> Don't have an account yet?</Text>
               <TouchableOpacity onPress={ async () =>
                      await this.signup(this.props.navigation)}>
                  <Text style = {styles.signupButton}> Sign Up
                  </Text>
                </TouchableOpacity>
         </View>
        </View>
      )
                }
  }


  const styles = StyleSheet.create({
    container:{
        backgroundColor: '#ef5350',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBox:{
       width: 300,
       height: 40,
       backgroundColor: 'rgba(255,255,255,0.3)',
       borderRadius: 25,
       paddingHorizontal: 12,
       fontSize: 16,
       color: '#ffffff',
       marginVertical: 10
    },
    button:{
      width: 300,
      backgroundColor: '#66bb6a',//#b61826 #26c6da
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 12

    },
    buttonText:{
      fontSize: 16,
      fontWeight: '500',
      color: '#ffffff',
      textAlign: 'center'
  },
  signupTextCont:{
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginVertical: 16,
    paddingVertical: 16,
    flexDirection: 'row'
  },
  signupButton:{
    color: "#ffffff",
    fontSize: 16,
    fontWeight: '500'
  },
  signupText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16
  }
  })