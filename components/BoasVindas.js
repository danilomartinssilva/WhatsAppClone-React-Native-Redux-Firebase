import React, { Component } from 'react';

import { View ,Text,Image,Button,ImageBackground} from 'react-native';
import {Actions} from 'react-native-router-flux';


export default class BoasVindas extends Component {
  render() {
    return(
<ImageBackground style={{flex:1,width:null}} source = {require('../assets/bg.png')}>
        <View style = {{flex:1,padding:15}}>
            <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:20,color:'#fff'}}>Seja Bem Vindo</Text>
                <Image source={require('../assets/logo.png')}/>
            </View>
            <View style={{flex:1}}>
                <Button title="Fazer Login"color="#115E54" onPress={()=>Actions.formLogin()}></Button>
            </View>

        </View>
      </ImageBackground>  
        );
  }
}
