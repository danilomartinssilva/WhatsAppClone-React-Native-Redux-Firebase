import {MODIFICA_ADICIONA_CONTATO_EMAIL,ADICIONA_CONTATO_ERRO,CADASTRO_RESULTADO_INCLUSAO, MODIFICA_MENSAGEM,ENVIA_MENSAGEM_SUCESSO} from '../actions/types';
const INITIAL_STATE = {

    adicionar_contato_email:'teste@teste.com.br',
    cadastro_resultado_txt_erro:'',
    cadastro_resultado_inclusao:false,
    mensagem:''
};


export default (state = INITIAL_STATE,action)=>{
console.log(action);
    switch(action.type){
        case MODIFICA_ADICIONA_CONTATO_EMAIL:
        return {...state, adicionar_contato_email:action.payload}
        case ADICIONA_CONTATO_ERRO:
        return {...state, cadastro_resultado_txt_erro:action.payload}
        case CADASTRO_RESULTADO_INCLUSAO:
        return {...state, cadastro_resultado_inclusao:action.payload,adicionar_contato_email:''}
        case MODIFICA_MENSAGEM:
        return {...state, mensagem:action.payload}
        case ENVIA_MENSAGEM_SUCESSO:
        return {...state, mensagem:''}
        default:
        return state
    }
}