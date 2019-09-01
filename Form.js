import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ActivityIndicator , Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { f, auth, database } from '../config/config';

class Form extends React.Component{
 constructor(props){
   super(props);
   this.state = {
      email : '',
      password : '',
      username : '',
      loading : false
   }
 }


     componentWillUnmount() {
        this.reset();
      }

      componentWillMount() {
         this.reset();
       }

  reset = () => {
    this.setState({ loading: false, email: '', password: '', username: '' });
  }

  signup = () => {
        this.setState({ loading: true });

        const { email,password,username } = this.state;
        f.auth().createUserWithEmailAndPassword(email,password)
         .then((User) => {
              let uid  = User.user.uid;

              console.log(User);
              console.log(uid);

            f.database().ref('users/' + uid + '/personal_info').set({ username : username})
             .catch(error => console.log(error));

             this.setState({ loading: false });
             // navigate to homepage

             this.props.navigation.navigate('HomePage');

        })
        .catch(error => {
          console.log(error);
          this.reset();
        });

  }


 buttonOption = () => {
       return (
          (this.state.loading == true ) ? <ActivityIndicator size = "large" />
             :
             <View>
           <TouchableOpacity
             style = {{ flex : 1, justifyContent: 'center', alignItems: 'center' ,borderWidth: 1, backgroundColor: "grey", borderRadius: 5, marginTop: 40, color: 'white', padding: 30 }}
             onPress = {this.signup}
             >
             <Text>
              SignUp
              </Text>

           </TouchableOpacity>
           </View>
       );
 }

 loginButton = () => {
   this.props.navigation.navigate('Login');
 }


  render(){
    return(
      <View style = {{ flex : 1, marginTop : 100 }}>
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

          <TextInput
                  label = 'Username'
                  style = {{ marginBottom :70 }}
                  value = {this.state.username}
                  onChangeText = { username => this.setState({ username })}
                  mode = 'outlined'
                 />

          {this.buttonOption()}
       <View style = {{ marginTop : 50}}>
          <TouchableOpacity
            style = {{ flex : 1, justifyContent: 'center', alignItems: 'center' ,borderWidth: 1, backgroundColor: "grey", borderRadius: 5, marginTop: 40, color: 'white', padding: 30 }}
            onPress = {this.loginButton}
            >
            <Text>
             Login
             </Text>

          </TouchableOpacity>
        </View>
    </View>
    );
  }
}


export default Form;
