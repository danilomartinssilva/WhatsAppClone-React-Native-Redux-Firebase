import firebase from 'firebase';
import b64 from 'base-64'
import _ from 'lodash';
import {MODIFICA_ADICIONA_CONTATO_EMAIL,
    ADICIONA_CONTATO_ERRO,CADASTRO_RESULTADO_INCLUSAO,LISTA_CONTATO_USUARIO,MODIFICA_MENSAGEM,LISTA_CONVERSA_USUARIO,ENVIA_MENSAGEM_SUCESSO,LISTA_CONVERSAS_USUARIO} from './types'

export const modificaAdicionaContatoEmail = texto =>{
 
    
    return {
        type:MODIFICA_ADICIONA_CONTATO_EMAIL,
        payload:texto
    }
}
export const adicionaContato =email =>{

    return dispatch =>{

        const emailB64 = b64.encode(email);
        firebase.database().ref(`/contatos/${emailB64}`).once('value').then((resposta)=>{
            if(resposta.val()){
                
                const dadosUsuario =_.first(_.values(resposta.val()));
                const {currentUser} = firebase.auth();
                let emailUsuarioB64 = b64.encode(currentUser.email);
                firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
                .push({
                    email:email,nome:dadosUsuario
                })
                .then(()=>console.log('Sucesso'),adicionaContatoSucesso(dispatch))
                .catch((erro)=>console.log(adicionaContatoErro(dispatch,erro.message)));
            }   
            else{
                console.log("Usuário não existe")
                adicionaContatoErro(dispatch,"Email informado não corresponde a um usuário");
                /* dispatch({type:ADICIONA_CONTATO_ERRO,payload:"Email informado não corresponde a um usuário válido"}) */
            }
        })
    }

    
}

const adicionaContatoErro = (dispatch,erro) =>{
    dispatch({
        type:ADICIONA_CONTATO_ERRO,
        payload:erro

    })
}
const adicionaContatoSucesso = (dispatch) =>{
    dispatch({
        type:CADASTRO_RESULTADO_INCLUSAO,
        payload:true
        

    })
}
export const habilitaInclusaoContato = ()=>(
    {
        type:CADASTRO_RESULTADO_INCLUSAO,
        payload:false
    }
)
export const contatosUsuarioFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        let emailUsuarioB64 = b64.encode( currentUser.email );

        firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_CONTATO_USUARIO, payload: snapshot.val() })
            })
    }
}

export const modificaMensagem = text =>{
    return ({
        type:MODIFICA_MENSAGEM,
        payload:text
    })   
}

export const enviarMensagem =(contatoNome,mensagem,contatoEmail) =>{
    
    return dispatch=>{
        const {currentUser} = firebase.auth();
        const usuarioEmail = currentUser.email;
        const usuarioEmailB64 = b64.encode(usuarioEmail);
        const contatoEmailB64 = b64.encode(contatoEmail);
        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
        .push({
            mensagem,tipo:'e'
        })
        .then(()=>{
            firebase.database().ref(`/mensagens/${contatoEmailB64}/${usuarioEmailB64}`)
            .push({
                mensagem,tipo:'r'
            }).then(()=>dispatch({type:ENVIA_MENSAGEM_SUCESSO,}))             
        })
        //Armazenar os cabeçalhos do usuário autenticado
        .then(()=>{
            firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}/${contatoEmailB64}`).set({
                nome:contatoNome,email:contatoEmail
            })
        //Armazenar os cabeçalhos do contato autenticado            
         .then(()=>{
            firebase.database().ref(`/contatos/${usuarioEmailB64}`)
            .once('value')
            .then((sn)=>{
                const dadosUsuario = _.first(_.values(sn.val()));
                console.log("Dados Usuario",dadosUsuario)
                
                firebase.database().ref(`/usuario_conversas/${contatoEmailB64}/${usuarioEmailB64}`)
                .set({
                    email:usuarioEmail,
                    nome:dadosUsuario
                })
            })
            
         })   
        })

    } 
    /* return ({
        type:'xys'
    }) */
}

export const conversaUsuarioFetch = contatoEmail => {

    const { currentUser } = firebase.auth();

    //compor os emails na base64
    let usuarioEmailB64 = b64.encode(currentUser.email)
    let contatoEmailB64 = b64.encode(contatoEmail)

    return dispatch => {
        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_CONVERSA_USUARIO, payload: snapshot.val() })
            })
    }
}

export const conversasUsuarioFetch = () =>{

    const  { currentUser } = firebase.auth();
    return dispatch =>{
        let usuarioEmailB64 = b64.encode(currentUser.email);
        firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}`)
            .on('value',(sn)=>{
                dispatch({
                    type:LISTA_CONVERSAS_USUARIO,
                    payload:sn.val()
                })
            })

    }

}