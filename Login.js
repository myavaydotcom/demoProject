import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { f,auth } from '../config/config';

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      email : '',
      password : '',
      loading : false
    }
  }

/*  reset = () => {
    this.setState({ loading: false, email: '', password: '' });
  }
*/

  componentWillUnmount() {
    this.setState({ loading: false, email: '', password: '' });
   }


  login = () => {
    this.setState({ loading: true });
    const that = this;

    const { email, password } = this.state;
    f.auth().signInWithEmailAndPassword(email,password)
    .then(function(User){
      console.log('this is login user credential...');
      console.log(User);
      that.setState({ loading: false });
      that.props.navigation.navigate('HomePage');
    })
    .catch(error => {
      console.log(error);
    });
  }


  buttonOption = () => {
     return (
        this.state.loading == true ? <ActivityIndicator size = "large" />
         :
           <View>
              <TouchableOpacity
              style = {{ padding : 25,justifyContent : 'center',alignItems: 'center',flex: 1,borderWidth: 1, borderRadius: 5,color : "green"}}
              onPress = {this.login}>
                <Text>Login</Text>
              </TouchableOpacity>
           </View>
     );
  }


  render(){
    return(
      <View style = {{ flex:1,marginTop : 100}}>
          <Text style = {{ fontSize: 25, color: 'green'}}>-----Login----</Text>

          <TextInput
               label = 'Email'
               style = {{ marginBottom : 70 }}
               value = {this.state.email}
               onChangeText = { email => this.setState({ email })}
               mode = 'outlined'
                />

          <TextInput
                  label = 'Password'
                  style = {{ marginBottom :70 }}
                  value = {this.state.password}
                  onChangeText = { password => this.setState({ password })}
                  mode = 'outlined'
                />
              {this.buttonOption()}
      </View>
    );
  }
}

export default Login;
