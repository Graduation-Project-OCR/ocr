import React, { Component } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity,ScrollView,TextInput} from 'react-native';

export default class ResultScreen extends Component {


    render() {

        let result = this.props.route.params.result;






        return (
            <View>
                <ScrollView>
                    <TextInput
                                            style={{ width:'99.7%',  borderWidth: 2, }}
                                            multiline={true}

                                            value = {result}
                    />
                </ScrollView>
            </View>
        );
    }
}


