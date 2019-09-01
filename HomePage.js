import React from 'react';
import { View , Text , Alert , TouchableOpacity} from 'react-native';
import { f, auth, database, storage } from '../config/config';
import ImageCapture from './ImagePicker/ImageCapture';

class HomePage extends React.Component{
  constructor(props){
    super(props);

    const currentUser = f.auth().currentUser.uid;
    console.log(currentUser);

    this.state = {
        user : currentUser,
        username : 'No user'
    }
  }

 componentDidMount(){
    const that = this;

    f.database().ref('users/' + that.state.user + '/personal_info').once("value")
    .then((snapshot)=> {
    console.log(snapshot);
    const snap = snapshot.val();
    console.log(snap.username);
    that.setState({ username: snap.username });
    //console.log(that.state.username);
    })
    .catch(error => console.log(error));

 }


 signOut = () => {

    Alert.alert('Warning','Are You really wanna SignOut ?',[{text : 'cancel',style: 'cancel'},{text : 'Ok'}],{cancelable: false});

    f.auth().signOut();
    this.props.navigation.navigate('Form');

 }

  render(){
    return(
    <View style = {{ flex : 1 , justifyContent : 'center' , alignItems : 'center' , marginTop : 100 }}>
        <Text>Welcome {this.state.username}</Text>
            <TouchableOpacity
              style = {{ borderRadius: 5, borderWidth: 1, padding: 20 }}
              onPress = {() => this.signOut()}
             >
              <Text>SignOut</Text>
            </TouchableOpacity>

               <View>
                 <ImageCapture />
                </View>
    </View>
    );
  }
}

export default HomePage;
