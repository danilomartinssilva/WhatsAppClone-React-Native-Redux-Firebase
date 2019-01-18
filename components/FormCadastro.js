import React, {Component} from 'react';

import { View ,TextInput,Button,ImageBackground,TouchableHighlight,Text,ActivityIndicator} from 'react-native';
import {connect } from 'react-redux';
import {modificaEmail,
        modificaSenha,
        modificaNome,
        cadastraUsuario} from '../actions/AutenticacaoActions';
        


// import styles from './styles';
class FormCadastro extends Component{
    constructor(props)
    {
        super(props);
    }
    _cadastrarUsuario(){
        const { nome,email,senha } = this.props;        
        this.props.cadastraUsuario({nome,email,senha});

    }
    _renderBtnCadastrar = () =>{
        if(this.props.loadingCadastro){
            return (
                <ActivityIndicator size="large" animating />
            )
        }
        return (
            <Button title="Acessar" color="#115E54" onPress={()=>this._cadastrarUsuario()}/>
        )
    }

    render(){
        return(
            <ImageBackground style={{flex:1,width:null}} source = {require('../assets/bg.png')}>
                <View style={{flex:1,padding:10}}>
                    <View style={{flex:4,justifyContent:'center'}}>
                        <TextInput placeholder="Nome" value = {this.props.nome} style = {{borderWidth:1,borderColor:"#ececec" ,fontSize:20,height:45,color:"#fff"}}  placeholderTextColor="#fff" onChangeText = {texto => this.props.modificaNome(texto)} />
                        <TextInput placeholder="E-mail" value = {this.props.email} style = {{borderWidth:1,borderColor:"#ececec" ,fontSize:20,height:45,color:"#fff"}} placeholderTextColor="#fff" onChangeText = {texto => this.props.modificaEmail(texto)} />
                        <TextInput secureTextEntry = {true} placeholder="Senha" value = {this.props.senha} style = {{ fontSize:20,height:45,borderWidth:1,borderColor:"#ececec",color:"#fff"}}  onChangeText = {texto => this.props.modificaSenha(texto)}/>
                        <Text style={{color:'red',fontWeight:'900'}}>{this.props.erroCadastro}</Text>
                        
                    </View>
                    <View style={{flex:1}}>
                        {this._renderBtnCadastrar()}
                    </View>

                </View>
            </ImageBackground>
        )
    }

}



    

const mapStateToProps = state => {
    
   
return ({

    email: state.AutenticacaoReducer.email,
    senha: state.AutenticacaoReducer.senha,
    nome: state.AutenticacaoReducer.nome,
    erroCadastro: state.AutenticacaoReducer.erroCadastro,
    loadingCadastro:state.AutenticacaoReducer.loadingCadastro

});
};
export default connect(mapStateToProps,{modificaEmail,modificaSenha,modificaNome,cadastraUsuario})(FormCadastro);

