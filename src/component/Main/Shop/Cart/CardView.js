import * as CartAction from "../../../../Actions/CartAction";
import { bindActionCreators } from "redux";
import * as types from "../../../../constants/ActionTypes";

import React, { Component } from "react";
import { FlatList } from "react-native";
import { connect } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";

const url = "http://vaomua.club/ungdung/images/product/";

import sp1 from "../../.././../media/temp/sp1.jpeg";

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

class CartView extends Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 1 };
  }

  decreaseQuantity = () => {
    if (this.state.quantity <= 1) {
      return;
    } else {
      this.setState({
        quantity: this.state.quantity - 1,
      });
    }
  };

  increaseQuantitiy = () => {
    this.setState({
      quantity: this.state.quantity - 1 + 2,
    });
  };

  componentDidMount() {
    this.props.getCart();
  }

  gotoDetail() {
    const { navigation } = this.props;
    navigation.push("ProductDetail");
  }

  render() {
    const { navigation } = this.props;
    var { cart } = this.props;
    console.log("render cart abc", cart);

    const {
      main,
      checkoutButton,
      checkoutTitle,
      wrapper,
      product,
      mainRight,
      productController,
      txtName,
      txtPrice,
      productImage,
      numberOfProduct,
      txtShowDetail,
      showDetailContainer,
    } = styles;
    return (
      <View style={wrapper}>
        <Image
          source={{ uri: "http://vaomua.club/ungdung/images/product/58.jpeg" }}
          style={productImage}
        />
        <FlatList
          data={cart}
          renderItem={({ item }) => (
            <View style={product}>
              <Image
                source={{ uri: `${url}${item.images[0]}` }}
                style={productImage}
              />
              <View style={[mainRight]}>
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Text style={txtName}>{item.name}</Text>
                  <TouchableOpacity>
                    <Text style={{ color: "#969696" }}>X</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={txtPrice}>{item.price}$</Text>
                </View>
                <View style={productController}>
                  <View style={numberOfProduct}>
                    <TouchableOpacity onPress={this.increaseQuantitiy}>
                      <Text>+</Text>
                    </TouchableOpacity>
                    <TextInput
                      style={styles.input}
                      onChangeText={(quantity) => this.setState({ quantity })}
                      value={`${this.state.quantity}`}
                      keyboardType="numeric"
                    />
                    <TouchableOpacity onPress={this.decreaseQuantity}>
                      <Text>-</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={showDetailContainer}
                    onPress={() => {
                      navigation.navigate("ProductDetail", {
                        product: item,
                        // Lay du lieu array gui qua product
                      });
                    }}
                  >
                    <Text style={txtShowDetail}>SHOW DETAILS</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />

        <TouchableOpacity style={checkoutButton}>
          <Text style={checkoutTitle}>TOTAL {1000}$ CHECKOUT NOW</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    cart: state.cart,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: () => {
      dispatch({ type: types.GET_CART_SUCCESS });
    },
    deleteCart: () => {
      dispatch({ type: types.REMOVE_FROM_CART_SUCCESS });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartView);

const { width } = Dimensions.get("window");
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#DFDFDF",
  },
  checkoutButton: {
    height: 50,
    margin: 10,
    marginTop: 0,
    backgroundColor: "#2ABB9C",
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    width,
    backgroundColor: "#DFDFDF",
  },
  checkoutTitle: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  product: {
    flexDirection: "row",
    margin: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
    shadowColor: "#3B5458",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
  },
  productImage: {
    width: imageWidth,
    height: imageHeight,
    flex: 1,
    resizeMode: "center",
  },
  mainRight: {
    flex: 3,
    justifyContent: "space-between",
  },
  productController: {
    flexDirection: "row",
  },
  numberOfProduct: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  txtName: {
    paddingLeft: 20,
    color: "#A7A7A7",
    fontSize: 20,
    fontWeight: "400",
  },
  txtPrice: {
    paddingLeft: 20,
    color: "#C21C70",
    fontSize: 20,
    fontWeight: "400",
  },
  txtShowDetail: {
    color: "#C21C70",
    fontSize: 10,
    fontWeight: "400",

    textAlign: "right",
  },
  showDetailContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  input: {
    height: 40,
    width: 50,
    borderWidth: 1,
    borderColor: 'rgba(27,31,35,0.05)',
    padding: 10,
    backgroundColor: 'rgba(27,31,35,0.05)',
    },
});

//   function mapDispatchToProps(dispatch) {
//     return {
//       CartAction: bindActionCreators(CartAction, dispatch)
//     };
//   }
