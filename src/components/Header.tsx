import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import FitImage from "react-native-fit-image";
import { url } from "inspector";

class Header extends React.Component {
  render() {
    return (
      // <View height='50' style={styles.fitImageWithSize}>
      <Image style={styles.viewStyle} source={require('../../assets/img/logo.png')} resizeMode="contain" />
      //   <FitImage source={{uri : "https://upload.wikimedia.org/wikipedia/commons/5/58/Toba_Landsat_satellite_image.jpg"}} style={styles.fitImage}></FitImage>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    marginTop: 40,
    width: '100%',
    height: 50
  },

});

export { Header as PureComponent };
export default Header;
