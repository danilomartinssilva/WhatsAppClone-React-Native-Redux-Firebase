import React from 'react';

import { View,TextInput,TouchableHighlight,Text,StyleSheet ,Button,ImageBackground,ActivityIndicator} from 'react-native';
import {Actions} from 'react-native-router-flux'
import { connect }from 'react-redux';
import { modificaEmail , modificaSenha,autenticaUsuario} from  '../actions/AutenticacaoActions';


// import styles from './styles';
class FormLogin extends React.Component{
    constructor(props){
        super(props);
    }
    _autenticaUsuario = ()=>{
        const {email,senha} = this.props;
        this.props.autenticaUsuario({email,senha});
    }
    renderBtnAcessar = () =>{
        if(this.props.loadingLogin)   {
            return (
                <ActivityIndicator size="large" animating/>
            )
            
        }
        return (

            <Button title="Acessar" color="#115E54" onPress={()=>this._autenticaUsuario()}/>
        )
        
    }
    render(){
        return(
            <ImageBackground style={{flex:1,width:null}} source = {require('../assets/bg.png')}>
              
            <View style = {{flex:1,padding:10,flexDirection:'column'}}>
                <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:25,color:"#fff"}}>WhatsAppClone</Text>
                </View>    
                <View style = {{flex:2}}> 
                    
                    <TextInput placeholder="E-mail" value = {this.props.email} style = {{borderWidth:1,borderColor:"#ececec" ,fontSize:20,height:45,color:"#fff"}} placeholderTextColor="#fff" onChangeText = {texto => this.props.modificaEmail(texto)} />
                    <TextInput placeholder="Senha" value = {this.props.senha}  secureTextEntry = {true} style = {{ fontSize:20,height:45,borderWidth:1,borderColor:"#ececec",color:"#fff"}} placeholderTextColor="#fff" onChangeText = {texto => this.props.modificaSenha(texto)}/>
                    <TouchableHighlight onPress={()=>Actions.formCadastro()}>
                        <Text style = {{fontSize:20,alignSelf:'center',color:"#fff"}}>Ainda não tem cadastro? Cadastre-se</Text>
                    </TouchableHighlight>
                    
                </View>    
                <View style={{flex:2}}>
    
                    {this.renderBtnAcessar()}
                    <Text style={{fontSize:20,color:"yellow",fontWeight:"900"}}> {this.props.erroLogin}</Text>
                </View>
            </View>
            </ImageBackground>);
    
    }

}


const mapStateToProps = state => ({
    email: state.AutenticacaoReducer.email,
    senha: state.AutenticacaoReducer.senha,
    erroLogin:state.AutenticacaoReducer.erroLogin,
    loadingLogin:state.AutenticacaoReducer.loadingLogin 
});
export default connect(mapStateToProps,{modificaEmail,modificaSenha,autenticaUsuario})(FormLogin);