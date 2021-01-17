
import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, TextInput, TouchableOpacity, View ,Alert} from 'react-native';
import firebase from 'firebase'
import db from '../config'

export default class LoginScreen extends React.Component {

constructor(){
  super();
  this.state={
    emailId : '',
    password : '',
    firstName : '',
    lastname : '',
    address : '',
    contact : '',
    conformPassword : '',
    isModalVisible : 'false',
  }
}

userLogin = (emailId,password)=>{
  firebase.auth().signInWithEmailAndPassword(emailId, password)
  .then(()=>{
    return Alert.alert("Successfully Login")
  })
  .catch((error)=> {
    var errorCode = error.code;
    var errorMessage = error.message;
    return Alert.alert(errorMessage)
  })

}

userSignUp = (emailId,password)=>{
  if(password !== confirmPassword)
  {
 return Alert.alert("password doesn't match")
  }
  else{
  firebase.auth().createUserWithEmailAndPassword(emailId,password).then((response)=>{
      db.collection('users').add({
        first_name : 'this.state.firstName',
        last_name : 'this.state.lastName',
        mobile_number : 'this.state.contact',
        username : 'this.state.mailId',
        address : 'this.state.address',
      })
        
      return Alert.alert(
        'User Added Successfully',
        '',
        [
          {text : 'OK', onPress :()=> this.setState({isModalVisible:false})}
        ]
      )
  })
  .catch(function(error){
    var errorCode = error.code;
    var errorMessage = error.message;
    return(Alert.alert(errorMessage))
  })
  }
}

showModal =()=>{
  return(
    <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.isModalVisible}
      >
      <View style={styles.modalContainer}>
        <ScrollView style={{width:'100%'}}>
          <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
          <Text
            style={styles.modalTitle}
            >Registration</Text>
          <TextInput
            style={styles.formTextInput}
            placeholder ={"First Name"}
            maxLength ={8}
            onChangeText={(text)=>{
              this.setState({
                firstName: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Last Name"}
            maxLength ={8}
            onChangeText={(text)=>{
              this.setState({
                lastName: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Contact"}
            maxLength ={10}
            keyboardType={'numeric'}
            onChangeText={(text)=>{
              this.setState({
                contact: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Address"}
            multiline = {true}
            onChangeText={(text)=>{
              this.setState({
                address: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Username"}
            keyboardType ={'email-address'}
            onChangeText={(text)=>{
              this.setState({
                emailId: text
              })
            }}
          /><TextInput
            style={styles.formTextInput}
            placeholder ={"Password"}
            secureTextEntry = {true}
            onChangeText={(text)=>{
              this.setState({
                password: text
              })
            }}
          /><TextInput
            style={styles.formTextInput}
            placeholder ={"Confrim Password"}
            secureTextEntry = {true}
            onChangeText={(text)=>{
              this.setState({
                confirmPassword: text
              })
            }}
          />
          <View style={styles.modalBackButton}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={()=>
                this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
              }
            >
            <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalBackButton}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={()=>this.setState({isModalVisible :false})}
            >
            <Text style={{color:'#ff5722'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </Modal>
  )
}

render(){
return(
  <View style = {styles.container}>
    <Text style = {styles.title}>
BARTER
    </Text>

    <TextInput placeholder= "email Address" style = {styles.loginBox} 
    onChangeText = {(text)=>{
      this.setState({
        emailId: text
      })
    }}
    ></TextInput>
    <TextInput placeholder= "password" style = {styles.loginBox}
     onChangeText = {(text)=>{
      this.setState({
        password: text
      })
    }}
    ></TextInput>

    <TouchableOpacity style = {styles.button}><Text style = {styles.buttonText} onPress={()=>
              this.userLogin(this.state.emailId, this.state.password)
            }> Login</Text></TouchableOpacity>
    <TouchableOpacity style = {styles.button}><Text style = {styles.buttonText} onPress={()=>
              this.setState({isModalVisible : true})
            }> Sign Up</Text></TouchableOpacity>
  </View>
)
}
}

const styles = StyleSheet.create({
  container:{
   flex:1,
   backgroundColor:'#6A8C92',
   alignItems: 'center',
   justifyContent: 'center'
 },
 profileContainer:{
   flex:1,
   justifyContent:'center',
   alignItems:'center',
 },
 title :{
   fontSize:65,
   fontWeight:'300',
   paddingBottom:30,
   color : '#163D5C'
 },
 loginBox:{
   width: 300,
   height: 40,
   borderBottomWidth: 1.5,
   borderColor : '#70CCD5',
   fontSize: 20,
   margin:10,
   paddingLeft:10
 },
 KeyboardAvoidingView:{
   flex:1,
   justifyContent:'center',
   alignItems:'center'
 },
 modalTitle :{
   justifyContent:'center',
   alignSelf:'center',
   fontSize:30,
   color:'#70CCD5',
   margin:50
 },
 modalContainer:{
   flex:1,
   borderRadius:20,
   justifyContent:'center',
   alignItems:'center',
   backgroundColor:"#70CCD5",
   marginRight:30,
   marginLeft : 30,
   marginTop:80,
   marginBottom:80,
 },
 formTextInput:{
   width:"75%",
   height:35,
   alignSelf:'center',
   borderColor:'#70CCD5',
   borderRadius:10,
   borderWidth:1,
   marginTop:20,
   padding:10
 },
 registerButton:{
   width:200,
   height:40,
   alignItems:'center',
   justifyContent:'center',
   borderWidth:1,
   borderRadius:10,
   marginTop:30
 },
 registerButtonText:{
   color:'#ff5722',
   fontSize:15,
   fontWeight:'bold'
 },
 cancelButton:{
   width:200,
   height:30,
   justifyContent:'center',
   alignItems:'center',
   marginTop:5,
 },

 button:{
   marginTop : 50,
   width:300,
   height:50,
   justifyContent:'center',
   alignItems:'center',
   borderRadius:25,
   backgroundColor:"#70CCD5",
   shadowColor: "#000",
   shadowOffset: {
      width: 0,
      height: 8,
   },
   shadowOpacity: 0.30,
   shadowRadius: 10.32,
   elevation: 16,
   padding: 10
 },
 buttonText:{
   color:'#ffff',
   fontWeight:'200',
   fontSize:20
 }
})