import React, { Component } from 'react';
import { View, Text, Image, Button, StyleSheet,TouchableOpacity} from 'react-native';

export default class AchiveScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject : '',
            subject_arr : [
                {
                    id : 0,
                    subject: null,
                },
            ],
        };
    }


    goArchiveScreen2 = (subject) =>{

        this.props.navigation.navigate('ARCHIVE2', {
            result_arr : this.props.route.params.result_arr,
            subject : subject,
        });
    }

    render() {
        let result = this.props.route.params.result_arr;

        if(result.length > 1){
            for(let i = 0; i < result.length-1; i++){
                if(result[i]['subject'] != result[i+1]['subject']){
                    this.state.subject_arr.push(
                    {   id : result[i+1]['id'],
                        subject:result[i+1]['subject']
                    })
                }
            }
        }

        this.state.subject_arr.sort(function (a, b) {
        	return a.subject < b.subject ? -1 : a.subject > b.subject ? 1 : 0;
        });


        let arr = this.state.subject_arr.map( (value, key) =>

            value.id != 0 ?

                <View key={value.id} >

                    <Button
                        title = {value.subject}
                        onPress={() =>{  this.goArchiveScreen2(value.subject); } }
                    />

                </View>




                : null
        );

        return (
            <View>
                    {arr}
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
