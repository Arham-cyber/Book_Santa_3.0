import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert, KeyboardAvoidingView,header } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../Component/MyHeader'

export default class WelcomeScreen extends Component{
    constructor(){
        super();
        this.state={
        BookName:"",
        reason:"",
        userId : firebase.auth().currentUser.email,

        }
    }
    createUniqueId(){
        return Math.random().toString(36).substring(7);
    }

    addRequest = (BookName, reason)=>{
        var userId = this.state.userId
        var randomRequestId = this.createUniqueId();
         db.collection('requested_books').add({
            "book_name" : BookName,
            "user_id" : userId,
            "reason_to_request" : reason,
            "request_id" : randomRequestId
        })

        this.setState({
            BookName:"",
            reason:""
        })

        return alert("Book Requested Successfully")
    }
    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader title = "Request Book" />    
                <KeyboardAvoidingView style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
                <TextInput 
                style = {styles.formTextInput}
                placeholder="Name of book"
                 onChangeText ={(text)=> { this.setState({BookName:text})}}
                 value = {this.state.BookName}
                 />
          
                
                <TextInput 
                style = {[styles.formTextInput, {height:200}]}
                placeholder = "Reason of request" 
                onChangeText ={(text)=> { this.setState({reason:text})}}
                value = {this.state.reason}
                />
          <TouchableOpacity 
          style = {styles.button}
          onPress={()=>{this.addRequest(this.state.BookName,this.state.reason)}}>
              <Text style = {{color:'#fff'}}>
                  Request              
              </Text>
          </TouchableOpacity>
                
                </KeyboardAvoidingView>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10,
      },
      button:{
        width:"75%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:"#ff5722",
        marginTop:20
      }
})