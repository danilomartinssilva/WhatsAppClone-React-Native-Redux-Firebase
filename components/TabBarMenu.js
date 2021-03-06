import React from 'react';

import { View,Text,StatusBar,Image,TouchableHighlight } from 'react-native';
import {TabBar} from 'react-native-tab-view'
// import styles from './styles';
import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import { habilitaInclusaoContato} from '../actions/AppActions'
import firebase from 'firebase';
const TabBarMenu = props =>
 (<View style={{backgroundColor:"#115E54",elevation:0,marginBottom:6}}>
     <StatusBar backgroundColor="#114D44"/>
     <View  style = {{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{height:50,justifyContent:'center'}}>
            <Text style={{color:'#fff',fontSize:20,marginLeft:20}}>WhatsApp Clone</Text>

        </View>
        <View style = {{flexDirection:'row',marginRight:20}}>
            <View style={{width:50, justifyContent:'center',alignItems:'center'}}> 
                <TouchableHighlight 
                underlayColor="#114D44"
                onPress={()=>{Actions.adiconarContatos();props.habilitaInclusaoContato()}}>
                <Image source={require('../assets/adicionar-contato.png')} />
                </TouchableHighlight>
            </View>
            <View style={{justifyContent:'center'}}>
            <TouchableHighlight onPress = { () =>firebase.auth().signOut().then(()=>{
                Actions.formLogin();
            })}>

                    <Text style = {{color:'#fff',fontSize:20}}>Sair</Text>

            </TouchableHighlight>
            </View>
        
        </View>   
    </View>
    <TabBar {...props} style={{ backgroundColor:"#115E54",elevation:4}}/>
</View>);


export default connect(null,{habilitaInclusaoContato})(TabBarMenu);


