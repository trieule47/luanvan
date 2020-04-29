import React, { Component } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'

// compent
import Header from '../Header'
import Colection from './Colection';
import Category from './Category';
import TopProduct from './TopProduct';

const { height } = Dimensions.get('window');

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            types: [],
            topProducts: [],
            cartArray: [1],
        }
    }

    componentDidMount() {
        fetch('http://vaomua.club/ungdung')
          .then((response) => response.json())
          .then((resJson) => {
            const {type, product} = resJson;
            this.setState({
                types: type,
                topProducts: product
            })//, console.log(this.state.topProducts);
          })
          .catch((error) => {
            console.error(error);
          });
      }

    openMenu() {
        this.props.navigation.openDrawer();
    }

    render() {
        const { types, topProducts, cartArray } = this.state;
        return (
            <View style={{ backgroundColor: '#DBDBD8', flex: 1 }}>
                <Header onOpen={() => { this.openMenu() }} />
                <ScrollView>
                    <Colection />
                    <Category navigation={this.props.navigation} types={types} />
                    <TopProduct navigation={this.props.navigation} topProducts={topProducts} cartArray={cartArray} />
                </ScrollView>
            </View>
        )
    }
}
