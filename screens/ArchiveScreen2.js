import React, { Component } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity,ScrollView} from 'react-native';

export default class ArchiveScreen2 extends Component {


    goResultScreen = (result) =>{

            this.props.navigation.navigate('RESULT', {

                result : result,
            });
    }




    render() {



        let subject = this.props.route.params.subject;  // 주제

        let result = this.props.route.params.result_arr;
        result.sort(function (a, b) {
            return a.subject < b.subject ? -1 : a.subject > b.subject ? 1 : 0;
        });

        let arr = result.map( (value, key) =>

            value.id != 0 && value.subject == subject?

                <View key={value.id} style={styles.item1}>
                    <Image
                        style={{ width:300, height:300,  resizeMode: 'stretch', }}
                        source={{uri: value.image_uri}}
                    />


                    <View style={styles.container}>

                        <TouchableOpacity style={[
                            styles.button,
                            {backgroundColor:  '#33CC33'}
                            ]}
                            onPress={() =>{ this.goResultScreen(value.Res) } }>
                            <Text style={
                            {color: '#FFF', fontSize:18}}
                            >
                                원본
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[
                            styles.button,
                            {backgroundColor:  '#33CC33'}
                            ]}

                            onPress={() =>{ this.goResultScreen(value.summary)  } }>
                            <Text style={
                                {color: '#FFF',fontSize:18}}
                            >
                                요약본
                            </Text>
                        </TouchableOpacity>


                    </View>





                </View> : null
        );



        return (
            <View style={styles.container}>
                <ScrollView>
                {arr}





                </ScrollView>
            </View>
        );
    }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  item1: {
    height : 300,
    flexDirection: 'row',
  },

  button: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      margin : 1,
      borderRadius: 10,
  },

  title: {
      fontSize: 15,
  },

});