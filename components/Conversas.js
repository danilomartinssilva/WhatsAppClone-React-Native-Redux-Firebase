import React from 'react';

import { View,Text,ListView,TouchableHighlight } from 'react-native';

import {conversasUsuarioFetch} from '../actions/AppActions';
import {connect} from 'react-redux'
import _ from 'lodash'
import { Actions } from 'react-native-router-flux';

// import styles from './styles';

class Conversas extends React.Component{

    componentWillMount(){
        this.props.conversasUsuarioFetch();
        console.log('componentWillMount',this.props.conversas);
        this.criaFonteDeDados(this.props.conversas);
    }
    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps',nextProps.conversas);
        this.criaFonteDeDados(nextProps.conversas);

    }
    criaFonteDeDados = conversas =>{
        const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1 !== r2});

        this.dataSource = ds.cloneWithRows(conversas);

    }
    renderRow = conversa =>{
        return(
            <TouchableHighlight onPress={()=>Actions.conversa({title:conversa.nome,contatoNome:conversa.nome,contatoEmail:conversa.email})} underlayColor="#fff">

                <View style = {{flex:1,padding:20,borderBottomWidth:1,borderColor:'#CCC'}}>
                    <Text style={{fontSize:25}}>{conversa.nome}</Text>
                </View>

            </TouchableHighlight>
        )
    }

    render(){
        return (
     <ListView
            dataSource = {this.dataSource}
            enableEmptySections
            renderRow = {this.renderRow}
     />
        )
    }
}

const mapStateToProps = state => {
    const conversas = _.map(state.ListaConversasReducer,(val,uid)=>{
            return {...val,uid};
    });
    console.log('mapStateToProps',conversas);
    
    return {    
        conversas
    }

}
    
export default connect(mapStateToProps,{conversasUsuarioFetch})(Conversas);
