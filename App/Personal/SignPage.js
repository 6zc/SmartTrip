import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    TextInput,
    Button
} from 'react-native';

const server = 'http://139.155.180.227:10089/users/signup' 
const holdername = 'Please input user name';
const holderpwd = 'Please input password' ;
const holderphone = 'Please input your phone';
const holderemail = 'Please input your email';
const input = React.createRef('input');
const input2 = React.createRef('input2');
const input3 = React.createRef('input3');
const input4 = React.createRef('input4');
const initState = {
            uname:'',
            pwd:'',
            phone:'',
            email :''
        }
export default class SignPage extends Component {
    constructor(props){
        super(props)
        this.state = initState
    }
    onSignUp = () => {
        fetch(server, {
        body: JSON.stringify(this.state), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
  }).then(response => {
            input.current.clear()
            input2.current.clear()
            input3.current.clear()
            input4.current.clear() 
            response.json()// parses response to JSON
        }).catch(error=>{
            //讨论错误
            
        })
    }
    render() {
        return (
            <Modal style={style.container}
                   transparent={false}
                   visible={this.props.visible}
                   onRequestClose={() => {
                       this.props.cancel()
                   }}
                    animationType='slide'      // 从底部滑入 
                   >
                <TouchableOpacity style={{flex: 1}} onPress={() => {
                    //this.props.cancel()
                }}>
                    <View style={style.innerContainer}>
                        <Text style = {style.textCreat}>Create</Text>
                        <Text style={style.textAccout}>Account</Text>
                        <TextInput 
                            placeholder={holdername} 
                            style={style.inputs}
                            keyboardType='default'
                            onChangeText={(Text)=>this.setState({uname:Text})}
                            ref={input}
                        />
                        <TextInput 
                            placeholder={holderpwd} 
                            style = {style.inputs}
                            onChangeText={(Text)=>this.setState({pwd:Text})}
                            ref={input2}
                         />
                        <TextInput 
                            placeholder={holderphone} 
                            style = {style.inputs}
                            onChangeText={(Text)=>this.setState({phone:Text})}
                            ref={input3}
                         />
                        <TextInput 
                            placeholder={holderemail} 
                            style = {style.inputs}
                            onChangeText={(Text)=>this.setState({email:Text})}
                            ref={input4}
                         />
                    <Text>
                        <Button title="cancel" onPress = {this.props.cancel} style = {style.button1}/>
                        <Button title="sign up now" onPress = {this.onSignUp} style = {style.button2}/>
                    </Text> 
                    </View>

                </TouchableOpacity>
            </Modal>
        );
    }
}
const style = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%',
        flex: 1,
        justifyContent: 'left',
        width: '100%'
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
        width: 270,
        height: 520
    },
    textCreat: {
        fontSize: 40
    },
    textAccout: {
        fontSize: 20
    },
    headbg:{
        width:'100%',
        height: 350,
        marginBottom: 20
    },
    havatar: {
        width: 80,
        height: 80,
        marginTop: 150,
        marginBottom: 20,
        borderRadius: 40,
        borderWidth: 1,
    },
    inputs: {
        marginTop: 20,
        padding: 10,
        width: '85%',
        height: 40,
        backgroundColor: '#eee',
        marginBottom: 20,
    },
    button1: {
        width: 40
    },
    button2: {

    },
    modal: {
        width: '80%',
        marginLeft: '10%',
        backgroundColor: 'white'
    }
})