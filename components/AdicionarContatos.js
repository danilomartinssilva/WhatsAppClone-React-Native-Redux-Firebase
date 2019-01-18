import React from 'react';
import { View, TextInput, Button,Text } from 'react-native';
import { connect } from 'react-redux';
import {modificaAdicionaContatoEmail,adicionaContato} from '../actions/AppActions'


class AdicionarContatos extends React.Component{
    constructor(props)
    {
        super(props);
    }
    
    cadastroRealizado = ()=>{
      
    }
    cadastroNaoRealizado = props =>{
  
    }
    render()
    {
        if(this.props.cadastro_resultado_inclusao){
            return (
                <View style={{flex:1,justifyContent:'center',alignContent:'center',flexDirection:'row'}}> 

                    <Text style={{alignSelf:'center'}}>Cadastro realizado com sucesso!</Text>
                </View>
            )
        }
        else{
            return (
                <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>

                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <TextInput
                        placeholder='E-mail'
                        style={{ fontSize: 20, height: 50,borderWidth:1,elevation:0, borderRadius:25 }}
                        onChangeText={(texto) => this.props.modificaAdicionaContatoEmail(texto) }
                        value = {this.props.adicionar_contato_email}
                    />
                     <Text style = {{color:'red',fontSize:20}}>
                    {this.props.cadastro_resultado_txt_erro}
                    </Text>
                     <Text style = {{color:'dark',fontSize:20}}>
                      {this.props.cadastro_resultado_inclusao}
                    </Text>
                </View>
        
                <View style={{ flex: 1 }}>
                    <Button title="Adicionar" color="#115E54" onPress={() => this.props.adicionaContato(this.props.adicionar_contato_email) } />
                   
                </View>
               
            </View>
            )
        }
    }
}


const mapStateToProps = state => ({
    adicionar_contato_email:state.AppReducer.adicionar_contato_email,
    cadastro_resultado_txt_erro:state.AppReducer.cadastro_resultado_txt_erro,
    cadastro_resultado_inclusao:state.AppReducer.cadastro_resultado_inclusao
});
export default connect(mapStateToProps,{modificaAdicionaContatoEmail,adicionaContato})(AdicionarContatos);
