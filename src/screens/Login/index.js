import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { connect } from "react-redux";
import {
  backArrow,
  facebookLogin,
  googleLogin,
  passwordHide,
  passwordShow,
} from "../../assets";
import CustomBtnLayout, {
  CustomImageBtnLayout,
} from "../../components/CustomBtnLayout";
import CustomInput from "../../components/CustomInput";
import CustomText from "../../components/CustomText";
import colors from "../../constants/colors";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { AccessToken, LoginManager, Settings } from "react-native-fbsdk-next";

const LoginScreen = ({ dimension, ...props }) => {
  const [email, setEmail] = useState("xyz@gmail.com");
  const [password, setPassword] = useState("1234");
  const [passwordSecureTextEntry, setPasswordSecureTextEntry] = useState(true);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "166425644696-oet0n2sesui75iku3apgc80pjs9tnhe0.apps.googleusercontent.com",
    });
    Settings.setAppID("1922928054561873");
    Settings.initializeSDK();
  }, []);

  const handleEmailLogin = () => {
    const isVaildEmail = new RegExp(
      /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g
    ).test(email);
    if (!isVaildEmail) {
      Alert.alert("Please Enter vaild email!");
      return null;
    }
    if (!email || !password) {
      Alert.alert("All input required!");
      return null;
    }
    axios({
      url:
        "http://44.196.172.114:4040/api/user/login/" + email + "/" + password,
      method: "get",
    })
      .then((response) => {
        if (response?.data?.success) Alert.alert("Login Successfully");
        else Alert.alert(response?.data?.error);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Somethings went wrong!");
      });
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("userInfo=>", userInfo);
      Alert.alert("Login Successfully with Google!");
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED)
        Alert.alert("user cancelled the login flow");
      else if (error.code === statusCodes.IN_PROGRESS)
        Alert.alert("operation (e.g. sign in) is in progress already");
      else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE)
        Alert.alert("play services not available or outdated");
      else Alert.alert("Somethings went worng!");
    }
  };

  const handleFacebookLogin = async () => {
    const result = await LoginManager.logInWithPermissions([
      "public_profile",
      "email",
    ]);
    if (result.isCancelled) {
      Alert.alert("User cancelled the login process");
      return null;
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      Alert.alert("Something went wrong obtaining access token");
      return null;
    }
    Alert.alert("Login Successfully with Facebook!");
    return null;
  };
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: 24,
          width: "100%",
          marginTop: 23,
        }}
      >
        <View
          style={{
            width: "20%",
            height: "100%",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity>
            <Image source={backArrow} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CustomText fontSize={16} lineHeight={24}>
            Login
          </CustomText>
        </View>
        <View
          style={{
            width: "20%",
            height: "100%",
          }}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}
      >
        <CustomInput
          marginTop={47}
          textInputLabel={"Email or Username"}
          placeholder={"abc@gmail.com/abc"}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <CustomInput
          marginTop={16}
          value={password}
          textInputLabel={"Password"}
          imageSrc={passwordSecureTextEntry ? passwordHide : passwordShow}
          secureTextEntry={passwordSecureTextEntry}
          placeholder={"***********"}
          onChangeText={(text) => setPassword(text)}
          imageOnPress={() =>
            setPasswordSecureTextEntry(!passwordSecureTextEntry)
          }
        />

        <CustomBtnLayout
          marginTop={32}
          btnLabel={"Login"}
          onPress={handleEmailLogin}
          fontFamily="NotoSans-Regular"
        />
        <CustomText
          fontSize={14}
          lineHeight={16}
          color={colors.grey400}
          marginTop={32}
          fontFamily="NotoSans-Regular"
        >
          Or
        </CustomText>
        <CustomImageBtnLayout
          marginTop={32}
          btnLabel={"Google"}
          onPress={handleGoogleLogin}
          imageSrc={googleLogin}
          backgroundColor={colors.wgm3}
          color={colors.black800}
        />
        <CustomImageBtnLayout
          marginTop={16}
          btnLabel={"Facebook"}
          onPress={handleFacebookLogin}
          imageSrc={facebookLogin}
          backgroundColor={colors.wgm3}
          color={colors.black800}
        />
        <TouchableOpacity
          style={{
            marginTop: 102,
          }}
        >
          <CustomText fontSize={16} lineHeight={24} color={colors.greyLight20}>
            Don’t have an account ?{" "}
            <CustomText fontSize={16} lineHeight={24} color={colors.green}>
              Sign Up
            </CustomText>
          </CustomText>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const mapStatetoProps = (state) => ({
  dimension: state.deviceDimensionReducer,
});
export default connect(mapStatetoProps)(LoginScreen);
