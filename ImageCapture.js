import * as React from 'react';
import { View,
         Text,
         TouchableOpacity,
         Image,
         Alert,
         TextInput,
         ScrollView } from 'react-native';
//import { TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { f, database, storage } from '../../config/config';

export default class ImageCapture extends React.Component{
  constructor(props){
    super(props);

    this.state = {
         image: '',
         selected : false,
         caption : '',
         currentFileType: '',
         progress: ''
      }
  }

  // Get Permissions async......
  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL,Permissions.CAMERA);
      if (status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }
  // Permissions granted ......

  // choosing images ......
  _pickImage = async () => {
    var that = this;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {

      that.setState({ image: result.uri, selected: true });
      console.log(this.state.selected);

    }else{

      console.log('select true is not happened');
      that.setState({ selected : false });

    }
  };


  _captureImage = async () => {
     var that = this;

     let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [5, 4],
     });
      console.log(result);

      if(!result.cancelled) {
        that.setState({ image: result.uri, selected: true });
      }else{
        console.log('selected true not occur');
        that.setState({ selected : false });
      }

  }

  // choosing ended ....


  // uploading scene .....

 // for creating unique id ...

 s4 = () => {
   return Math.floor((1+Math.random()) * 0x10000)
   .toString(16)
   .substring(1);
 }

 uniqueId = () => {
      return (this.s4() + this.s4() + '-' + this.s4() + this.s4() + '-' +
      this.s4() + this.s4() + '-' + this.s4() + this.s4() + '-' + this.s4());
 }

 /// ended of unique id...


 _uploadFile = async (uri) => {

   var that = this;
   var userid = f.auth().currentUser.uid;
   var imageId = this.uniqueId();

   var re = /(?:\.([^.]+))?$/;
   var ext = re.exec(uri)[1];
   that.setState({
    currentFileType : ext,
    uploading : true

  });

   const response = await fetch(uri);
   const blob = await response.blob();
   var FilePath = imageId + '.' +that.state.currentFileType;

   const uploadTask = storage.ref('users/'+userid+'/img').child(FilePath).put(blob);

   uploadTask.on('state_changed', function(snapshot){
     var progress = ((snapshot.bytesTransferred / snapshot.totalBytes)*100).toFixed(0);
      console.log('Upload is '+progress+'% complete');
      that.setState({ progress : progress });
  }, function(error) {
    console.log(error);
  } ,function(){
    // upload complete in this scenario
    that.setState({ progress : 100 });
    uploadTask.snapshot.ref.getDownloadUrl().then(function(downloadURL){
     //	alert(downloadURL);
      console.log(downloadURL);
      const image_info = "image_info"+(t.time/1000).toFixed(0);
      console.log(image_info);

      f.database().ref('users/'+userid+'/images').set(
        {
          image_info : {
                  image : downloadURL,
                caption : that.state.caption,
                   time : new Date()/1
                          }
        }
    ).catch(error => console.log(error));

    });

  });

 }


 _upload = () => {

       this._uploadFile(this.state.image);

 }
  // uploading ended .....

  render() {
    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      { this.state.selected == false ? (

      <View>
         <TouchableOpacity
             style = {{ textAlign: 'center', padding: 20, marginHorizontal: 5, borderRadius: 4 , borderWidth: 1, backgroundColor: "grey" , color : 'white' }}
             onPress = {this._pickImage}
             >
             <Text>gallery</Text>
           </TouchableOpacity>

         <TouchableOpacity
            style = {{ textAlign: 'center', padding: 20, marginHorizontal: 5 , borderRadius: 4 , borderWidth: 1, backgroundColor: "grey" , color : 'white' }}
            onPress = {this._captureImage}
            >
            <Text>capture</Text>
         </TouchableOpacity>
      </View>

          ) : (

        <View>


               <TextInput
                editable = {true}
                placeholder={'Enter your Caption....'}
                maxLength ={150}
                multiline={true}
                numberOfLine={4}
                onChangeText = {caption => this.setState({ caption : caption })}
                style = {{marginVertical: 10, height : 100,width: 275, padding: 5, borderColor : 'grey', borderWidth:1, borderRadius :3, backgroundColor : 'white', color : 'black'}}
                />

            <TouchableOpacity
                   style = {{ textAlign: 'center', padding: 20, marginHorizontal: 5, borderRadius: 4 , borderWidth: 1, backgroundColor: "grey" , color : 'white' }}
                   onPress = {this._upload}
                   >
                  <Text>Upload</Text>
            </TouchableOpacity>

            <View>
                 <Image
                    source = {{ uri : this.state.image }}
                    style = {{ width : 250, height : 275 , borderRadius: 3, marginTop: 5 }}
                     />
            </View>

        </View>

        )}
      </View>
    );
  }
}
