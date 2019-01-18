import React from 'react';
import {Router,Scene,Actions} from 'react-native-router-flux';
import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import BoasVindas from './components/BoasVindas';
import Principal from './components/Principal';
import AdicionarContatos from './components/AdicionarContatos'
import Conversa from './components/Conversa';


const scenes = Actions.create(
    <Scene key="root" hideNavBar={true} navigationBarStyle={{ backgroundColor: '#115E54' }} titleStyle={{color:'#fff'}}> 
    
      <Scene hideNavBar={false} key='boasVindas' component = {BoasVindas} title="Bem vindo" hideNavBar={true}/>
      <Scene hideNavBar={false} key='principal' component = {Principal} title="Página Principal"  hideNavBar/>      
      <Scene hideNavBar={false}  key='formCadastro' component = {FormCadastro} title="Cadastro" />
      <Scene hideNavBar={false} key='formLogin' component = {FormLogin} title="Login" hideNavBar  initial/>
      <Scene hideNavBar={false} key='adiconarContatos' component = {AdicionarContatos} title="Adicionar Contatos"  />
      <Scene hideNavBar={false} key='conversa' component = {Conversa} title="Conversa"  />

    </Scene>
  );

export default props =>(

  <Router scenes={scenes}/>
)


