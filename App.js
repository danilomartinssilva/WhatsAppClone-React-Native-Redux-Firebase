/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';


//REDUX
 import { Provider } from 'react-redux';
import { createStore,applyMiddleware} from 'redux';
import reducers from './reducers'; 
import Routes from './Routes'; 
import ReduxThunk from 'redux-thunk'
import  * as firebase from 'firebase/app';


 //Firebase


export default class App extends Component{

   componentWillMount(){
    firebase.initializeApp({
      apiKey: "AIzaSyCd78dQJuHoUkK2Zgr1i7b2Lc9sqfLwoMk",
      authDomain: "whatsappclone-6393c.firebaseapp.com",
      databaseURL: "https://whatsappclone-6393c.firebaseio.com",
      projectId: "whatsappclone-6393c",
      storageBucket: "whatsappclone-6393c.appspot.com",
      messagingSenderId: "1003029858914"
    })
  } 

  render() {
    return (
          <Provider store={createStore(reducers,{},applyMiddleware(ReduxThunk))}>
              <Routes/>
          </Provider>             
          
              
    );
  }
}


