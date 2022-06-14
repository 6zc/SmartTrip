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
import { Input } from "@rneui/themed";

const server = 'http://139.155.180.227:10089/users/signup' 
const holdername = 'Please input user name *';
const holderpwd = 'Please input password *' ;
const holderphone = 'Please input your phone *';
const holderemail = 'Please input your email';
const input = React.createRef('input');
const input2 = React.createRef('input2');
const input3 = React.createRef('input3');
const input4 = React.createRef('input4');
const initState = {
            uname:'',
            pwd:'',
            phone:'',
            email:''
        }
export default class SignPage extends Component {
    constructor(props){
        super(props)
        this.state = initState
    }
    onSignUp = () => {

        console.log('here',this.state.uname,this.state.pwd,this.state.phone,this.state.email)
        if(this.state.uname==''){
            input.current.shake()
        }
        if(this.state.pwd==''){
            input2.current.shake()
        }
        if(this.state.phone==''){
            input3.current.shake()
        }
        if(this.state.email==''){
            input4.current.shake()
        }
        fetch(server, {
        body: JSON.stringify(this.state), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
  }).then(response => {
            console.log('success')
            response.json()// parses response to JSON
            console.log(response.json())
            //讨论code
            //跳转页面
        }).catch(error=>{
            //讨论错误
            console.log('error:',error)

        })
        input.current.clear()
        input2.current.clear()
        input3.current.clear()
        input4.current.clear() 
        this.setState(initState)
    }
    render() {
        return (
            <Modal 
                   transparent={false}
                   visible={this.props.visible}
                   onRequestClose={() => {
                       this.props.cancel()
                   }}
                    animationType='slide'      // 从底部滑入 
                   >
                <TouchableOpacity style={style.contains} onPress={() => {
                    //this.props.cancel()
                }}>
                    <View style={style.innerContainer}>
                        <Text style = {style.textCreat}>Create</Text>
                        <Text style={style.textAccout}>Account</Text>
                        <Input 
                            placeholder={holdername}
                            onChangeText={(Text)=>this.setState({uname:Text})}
                            ref={input}
                        />
                        <Input 
                            placeholder={holderpwd}
                            onChangeText={(Text)=>this.setState({pwd:Text})}
                            ref={input2}
                        />
                        <Input 
                            placeholder={holderemail}
                            onChangeText={(Text)=>this.setState({phone:Text})}
                            ref={input3}
                        />
                        <Input 
                            placeholder={holderphone}
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
    contains: {
        alignItems: 'center',
        height: '100%',
        width: '100%',
        flex:1
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 10,
        backgroundColor: '#fff',
        width: 270,
        height: 520,
        
    },
    textCreat: {
        fontSize: 45,
        paddingBottom: 20,
    },
    textAccout: {
        fontSize: 30,
        paddingBottom:15
    },
    headbg:{
        width:'100%',
        height: 350,
        marginBottom: 20,
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
        width: '90%',
        height: 40,
        backgroundColor: '#eee',
        marginBottom: 20,
    },
    button1: {
    },
    button2: {

    },
    modal: {
        width: '80%',
        marginLeft: '10%',
        backgroundColor: 'white'
    }
})