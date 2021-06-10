import React from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView, TextInput } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import * as RNFS from 'react-native-fs';

import AsyncStorage from '@react-native-async-storage/async-storage';


class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : 1,
            //image_uri: './images/sample.PNG',
            image_uri: null,
            Res: null,  // 추출된 텍스트
            summary : null, // 요약된 텍스트
            subject : null, // 주제
            base64 : null,

            result_arr : [
                {
                    id : 0,
                    image_uri: null,
                    Res: null,
                    summary : null,
                    subject: null,
                },
            ],

            result_del : [],

        };
    }

    async UNSAFE_componentWillMount() {
        //AsyncStorage.removeItem("result_arr");

//          AsyncStorage.setItem('result_arr',this.state.result_del, () => {
//            console.log('시작')
//          });

          try {
            let result_arr1 = await AsyncStorage.getItem('result_arr')
            if(result_arr1 == null){
              console.log('처음');
            } else {

               this.setState({ result_arr: result_arr1})
              console.log(this.state.result_arr)
            }
          } catch(e) {
            console.log("ERR");
          }
     }


    //촬영
    addImage = () => {
        launchCamera( {includeBase64: true, maxWidth : 300, maxHeight : 300}, response => {
            this.setState({ image_uri: response['assets'][0]['uri']})
            this.setState({ base64: response['assets'][0]['base64']})
        });
    }

    //앨범
    ChoosePhoto = () => {
        launchImageLibrary( {includeBase64: true, maxWidth : 300, maxHeight : 300}, response => {   // includeBase64 : true 인 경우 이미지의 base64 문자열을 생성
            this.setState({ image_uri: response['assets'][0]['uri']})
            this.setState({ base64: response['assets'][0]['base64']})
        });
    }


    ocr = () => {
        fetch('http://192.168.10.103:3001/ocr', {
            method : 'POST',
            headers: { 'Content-type': 'application/json'},
            body : JSON.stringify({ name : this.state.base64 })
        })
        .then(res => res.json())
        .then(data => {
            this.setState({Res : data.Res})
        })
        .catch(err => {
              console.log(err.message, err.code);
        });
    }

    summary = () => {
        fetch('http://192.168.10.103:3001/summary', {
            method : 'POST',
            headers: { 'Content-type': 'application/json'},
            body : JSON.stringify({ name : this.state.Res })
        })
        .then(res => res.json())
        .then(data => {
            this.setState({summary : data.Res})
        })
        .catch(err => {
              console.log(err.message, err.code);
        });
    }



        goArchiveScreen = () =>{

            this.props.navigation.navigate('ARCHIVE', {
                result_arr: this.state.result_arr,
            });
        }

        store = () => {

            this.state.result_arr.push(
                {   id : this.state.id,
                    summary: this.state.summary,
                    subject:this.state.subject,
                    image_uri : this.state.image_uri,
                    Res : this.state.Res
                })
            this.setState({id : this.state.id+1})

//            AsyncStorage.setItem('result_arr',JSON.stringify(this.state.result_arr), () => {
//              console.log('저장 완료')
//            });


        }


    render() {
        return (
            <View style={styles.container}>
                <ScrollView>

                <Image
                    style={styles.image_style}
                    source={{uri: this.state.image_uri}}
                />




                    <Button
                        title="촬영"
                        onPress={() => this.addImage()}
                    />
                    <Button
                        title="앨범"
                        onPress={() => this.ChoosePhoto()}
                    />


                <Button
                    title="텍스트 추출"
                    onPress={() => this.ocr()}
                />
                <Button
                    title="저장소"
                    onPress={() => this.goArchiveScreen()}
                />




                <View style={styles.container_result}>
                    <TextInput
                        style={{ width:'99.7%',  borderWidth: 2, }}
                        multiline={true}
                        onChangeText={(Res) => {this.setState({Res: Res})}}
                        value = {this.state.Res}
                    />
                </View>

                <Button
                    title="텍스트 요약"
                    onPress={() => this.summary()}
                />

                <View style={styles.container_result}>
                    <Text style={{width:'99.7%',  borderWidth: 2, }}>{this.state.summary}</Text>
                </View>



                <View style={styles.container_result}>
                <TextInput style={{width:'99.7%',borderWidth: 2, }}
                    onChangeText={(subject) => {this.setState({subject: subject})}}
                    placeholder="주제를 입력해주세요."
                />
                </View>
                <Button
                    title="저장"
                    onPress={() => this.store()}
                />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // ?
    },

    image_style: {
        resizeMode: 'stretch', // 이미지를 안짤리게
        width: '99.7%',
        height: 460,


    },

    container_result: {
        alignItems: 'center',
    },

    ButtonRow: {
        flexDirection: 'row',

    },

});
export default MainScreen;