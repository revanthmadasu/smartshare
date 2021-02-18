import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import auth from '@react-native-firebase/auth';
import Tabs from '../components/Tabs';

const { width, height } = Dimensions.get("screen");
class Register extends React.Component {
  userInpObj = {
    userName: '',
    email: '',
    password: ''
  };

  tabs = [
    {
      id: 'login', 
      title: 'Login'
    }, 
    {
      id: 'signup',
      title: 'Sign Up'
    }
  ];

  state = {
    authWidget: 'signup'
  }
  set authWidget(val) {
    this.state.authWidget = val;
    this.setState(this.state);
  }

  actionButtonClick() {
    if (this.state.authWidget === 'signup') {
      auth().createUserWithEmailAndPassword(this.userInpObj.email, this.userInpObj.password).then((user) => {
        console.log('user created: ', user);
      }).catch(() => {
        console.log('Cannot create user');
      });
    } else {
      auth().signInWithEmailAndPassword(this.userInpObj.email, this.userInpObj.password).then((user) => {
        console.log('user logged in: ', user);
      }).catch(() => {
        console.log('login failed');
      });
    }
  };

  onSuccess() {

  }

  onTextInput (inputType, inputValue) {
    console.log(`${inputType} : ${inputValue}`);
    this.userInpObj[inputType] = inputValue;
  }
  render() {
    const strsMap = {
      signup: {
        title: 'Sign Up using email',
        actionButton: 'Create Account'
      },
      login: {
        title: 'Login using email',
        actionButton: 'Login'
      }
    };
    const actionButton = strsMap[this.state.authWidget].actionButton;
    const title = strsMap[this.state.authWidget].title;
    return (
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              {
                // #Todo activate after auth with facebook and google is allowed
              }
              {/* <Block flex={0.25} middle style={styles.socialConnect}>
                <Text color="#8898AA" size={12}>
                  Sign up with
                </Text>
                <Block row style={{ marginTop: theme.SIZES.BASE }}>
                  <Button style={{ ...styles.socialButtons, marginRight: 30 }}>
                    <Block row>
                      <Icon
                        name="logo-github"
                        family="Ionicon"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>Facebook</Text>
                    </Block>
                  </Button>
                  <Button style={styles.socialButtons}>
                    <Block row>
                      <Icon
                        name="logo-google"
                        family="Ionicon"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>GOOGLE</Text>
                    </Block>
                  </Button>
                </Block>
              </Block> */}
              <Block flex>
              <Block row>
                  <Button style={styles.socialButtons} onPress={() => this.authWidget = 'signup'}>
                    <Text>Sign Up</Text>
                  </Button>
                  <Button style={styles.socialButtons} onPress={() => this.authWidget = 'login'}>
                    <Text>Login</Text>
                  </Button>
                </Block>
                <Block flex={0.17} middle>
                  <Text color="#8898AA" size={12}>
                    {
                      title
                    }
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      {
                        this.state.authWidget === 'signup' && 
                      <Input
                        onChangeText={(text) => this.onTextInput('userName', text)}
                        borderless
                        placeholder="Name"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="hat-3"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                      }
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        onChangeText={(text) => this.onTextInput('email', text)}
                        borderless
                        placeholder="Email"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        onChangeText={(text) => this.onTextInput('password', text)}
                        password
                        borderless
                        placeholder="Password"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block middle>
                      <Button color="primary" style={styles.createButton} onPress={() => this.actionButtonClick()}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          {actionButton}
                        </Text>
                      </Button>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    // height: height * 0.78,
    height: height * 0.58,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  }
});

export default Register;
