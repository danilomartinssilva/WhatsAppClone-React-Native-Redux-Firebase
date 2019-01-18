import React from 'react';
import { View, StyleSheet, Dimensions ,Text} from 'react-native';
import { TabView,  SceneMap } from 'react-native-tab-view';
import  TabBarMenu from './TabBarMenu';
import Contatos from './Contatos';
import Conversas from './Conversas';
/* const Conversas = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);
const Contatos = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
); */



export default class Principal extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Conversas' },
      { key: '2', title: 'Contatos' },
    ],
  };
  _renderHeader = props => <TabBarMenu {...props} />;

  render() {
    return (
      <TabView
        renderTabBar = {this._renderHeader}
        renderLabel={(<Text>WhatsApp Clone</Text>)}
        navigationState={this.state}
        renderScene={SceneMap({
          1: Conversas,
          2: Contatos,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});