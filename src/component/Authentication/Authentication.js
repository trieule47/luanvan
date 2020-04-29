import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';

import icBack from '../../media/appIcon/back_white.png';
import icLogo from '../../media/appIcon/ic_logo.png';

export default class Authantication extends Component {
    constructor(props){
        super(props);
        this.state = {
            isSignIn: true
        }
    }
    signIn() {
        this.setState({ isSignIn: true });
    }
    signUp() {
        this.setState({ isSignIn: false });
    }

    goBackToMain() {
        const { navigation } = this.props;
        navigation.navigate('Menu');
    }
    render() {
        const { row1, iconStyle, titleStyle,
            container, controlStyle, singInStyle,
            signUpStyle, inactiveStyle, activeStyle,
            inputStyle, bigButton, buttonText
        } = styles;

        const signInJSX = (
            <View>
                <TextInput style={inputStyle} placeholder="Enter your Email / Username" />
                <TextInput style={inputStyle} placeholder="Enter your password" />
                <TouchableOpacity style={bigButton} >
                    <Text style={buttonText} >SIGN IN NOW</Text>
                </TouchableOpacity>
            </View>
        );
        
        const signUpJSX = (
            <View>
                    <TextInput style={inputStyle} placeholder="Enter your name" />
                    <TextInput style={inputStyle} placeholder="Enter your email" />
                    <TextInput style={inputStyle} placeholder="Enter your password" />
                    <TextInput style={inputStyle} placeholder="Re-enter your password" />
                    <TouchableOpacity style={bigButton} >
                        <Text style={buttonText} >SIGN UP NOW</Text>
                    </TouchableOpacity>
                </View>
        );
        
        const { isSignIn } = this.state;
        const mainJSX = isSignIn ? signInJSX : signUpJSX;

        return (
            <View style={container}>
                <View style={row1}>
                    <TouchableOpacity onPress={this.goBackToMain.bind(this)} >
                        <Image source={icBack} style={iconStyle}/>
                    </TouchableOpacity>
                    <Text style={titleStyle}>Nông sản</Text>
                    <TouchableOpacity>
                        <Image source={icLogo} style={iconStyle} />
                    </TouchableOpacity>
                </View>
                {mainJSX}
                <View style={controlStyle} >
                    <TouchableOpacity style={singInStyle}  onPress={this.signIn.bind(this)} >
                        <Text style={isSignIn ? activeStyle : inactiveStyle} >SIGN IN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={signUpStyle}  onPress={this.signUp.bind(this)} >
                        <Text style={!isSignIn ? activeStyle : inactiveStyle} >SIGN UP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3EBA77',
        padding: 20,
        justifyContent: 'space-between',
    },
    row1: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3, alignItems: 'center' },
    iconStyle: { width: 30, height: 30 },
    titleStyle: { color: '#FFF', fontSize: 30 },
    controlStyle: {
        flexDirection: 'row',

    },
    inactiveStyle: {
        color: '#D7D7D7'
    },
    activeStyle: {
        color: '#3EBA77'
    },
    singInStyle: {
        backgroundColor: '#FFF',
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        marginRight: 1,
    },
    signUpStyle: {
        backgroundColor: '#FFF',
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        marginLeft: 1,
    },
    inputStyle: {
        height: 50,
        backgroundColor: '#FFF',
        marginBottom: 10,
        borderRadius: 20,
        paddingLeft: 30
    },
    bigButton: {
        height: 50,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
       
        color: '#FFF',
        fontWeight: '400'
    },
});