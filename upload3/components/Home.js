import React, {useState , useEffect} from 'react';
import { StyleSheet, Text, View ,TextInput, Button,FlatList, TouchableOpacity,Alert,Keyboard, Image,TouchableWithoutFeedback ,AsyncStorage} from 'react-native';
import fb from '../firebase/ApiKeys'

export default function Home({navigation}) {
  
  const [Notes,setNotes] = useState([]);
  const [Note,setNote] = useState('');
  const [Loading,setLoading] = useState(true);
  const [curUserId,setcurUserId] = useState(fb.auth().currentUser.email);




  useEffect( () => {
    const ar = [];
    fb
    .firestore()
    .collection("notes")
    .where("userId","==",curUserId)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            ar.push(doc.data())
        });
        setNotes(ar)
        setNotes((preNotes) =>{
          return preNotes.filter(note => note.userId == curUserId); 
       });
   
      })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

  },[]);
  useEffect(()=>{
    // fb.collection("notes")
    // .where("userId","==",curUserId)
    // .onSnapshot((querySnapshot) =>{
    //     var ar = [];
    //     querySnapshot.forEach(function(doc) {
    //         ar.push(doc.data());
    //     });
    //     setNotes(ar)
    //   });
  },[])
   function xyz(){
    // const response = await fetch('https://jsonplaceholder.typicode.com/todos?fbclid=IwAR0j6ft1tR9h9nK81PVRenaePaBkwGksBwck62NNIOGdQRl69Bq9YooT0OM');
    // const data = await response.json();
    // setNotes(data)
    const ar = [];
    fb
    .firestore()
    .collection("notes")
    .where("userId","==",curUserId)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            ar.push(doc.data())
        });
        setNotes(ar)
        setNotes((preNotes) =>{
          return preNotes.filter(note => note.userId == curUserId); 
       });
   
      })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }
console.log( Notes)

// const storeData = async () => {
//   try {
//     await AsyncStorage.setItem("items", JSON.stringify(Notes));
//     console.log("LOOOOOCAAAAAALLLLL"+JSON.stringify(Notes))
//   } catch (e) {
//     // Error saving data
//     console.log(e)
//   }
// };
// const retrieveData = async () => {
//   try {
//     const value = await AsyncStorage.getItem('items');
//     if (value !== null) {
//       console.log(value);
//       return value;
//     }
//   } catch (error) {
//   }
// };

  const EditText = (val) => {
    if(val !== null){
      console.log('ET fires')
        // Notes.map(function(note){
        //   if(note.id === val.id)
        //    console.log('found it ' +note.id+" "+val.id)
        //    note.title = val.title
        //    deleto(note)
        //   //  addToNotes(navigation.getParam('x'))
        //    console.log(Notes)
        //   })
        setNotes((preNotes) =>{
          return preNotes.filter(note =>{
            if(note.id === val.id){
              note.title = val.title
              addToNotes(val)
              deleto(note)
            }
          })
        })

    }
  }

  const onSubmitHandle = (value) => {
     setNote(value)
    };
  
  const addToNotes = (note)=>{
    // setNotes(retrieveData)
    setNotes((preNotes) =>{ 
      if(note !== ''){
        fb
        .firestore()
        .collection("notes")
        .add({userId:curUserId,title:note,id:Math.random(),completed:false})
        .then(()=>{
          console.log('ADDED')
        })
        .catch((error)=>{
          console.log(error)
        })

        return(
          [{userId:curUserId,title:note,id:Math.random(),completed:false},...preNotes]
          
        )
      }
      else{ 
        Alert.alert('OOPS!','You can\'t do that',[{text:'Okay',onPress:()=>console.log('tmm')}]);
        return [...preNotes]
    }});
  }
    
  const lineThrough = (item) =>{
    setNotes((preNotes)=>{
      fb
      .firestore()
      .collection("notes")
      .where("id","==",item.id)
      .get()
      .then((querySnapshot) =>{
       console.log(querySnapshot.docs[0].id)
       
     fb
     .firestore()
     .collection("notes")
     .doc(querySnapshot.docs[0].id)
     .update({completed:!item.completed})
     .then(()=>{
       console.log('deleted')
     }).catch((error)=>{
       console.log(error)
     })
   });
      return preNotes.filter(note => { if ((note.id != item.id) == false) { note.completed = !note.completed } return true });
      
    })
    // deleto(item.id);
    // addToNotes(item);  

    // setLinestyle((preLineStyle)=>{
    //   if(preLineStyle.textDecorationLine === 'none')
    //    return preLineStyle = styles.clicked;
    //   else if(preLineStyle.textDecorationLine !== 'none')
    //    return preLineStyle = styles.note;
    //   });
  }
console.log(Loading)
  const removeNote = (item) =>{
    const conca = {item,EditText}
    navigation.navigate('details',conca)
  }
  const deleto = (id) =>{
    setNotes((preNotes) =>{
        return preNotes.filter(note => note.id != id); 
     }); 
   
     fb
     .firestore()
     .collection("notes")
     .where("id","==",id)
     .get()
     .then((querySnapshot) =>{
      console.log(querySnapshot.docs[0].id)
        
  
    fb
    .firestore()
    .collection("notes")
    .doc(querySnapshot.docs[0].id)
    .delete()
    .then(()=>{
      console.log('deleted')
    }).catch((error)=>{
      console.log(error)
    })
    console.log(docId)
  });

  }

  return (
  <TouchableWithoutFeedback>{
    (Loading)?(
    <View style={styles.container} on>
      <View onSubmit={() => setNotes(inputNote)}>
        <TextInput placeholder="Type your note" style={styles.inputField} onChangeText={onSubmitHandle} multiline={true}/>
        <Button title="Submit" onPress={()=>addToNotes(Note)}/>
      </View>
      <FlatList
        data={Notes}
        renderItem={({item})=>(
          <View id = {item.id}  style={styles.tasky}>
            <Button style={styles.buttonn} onPress={()=>lineThrough(item)} title="Done"></Button>
            <TouchableOpacity onPress={()=>removeNote(item)}>
              <Text style={(item.completed === true)?styles.clicked:styles.note }>{item.title}</Text>
            </TouchableOpacity>
            <Button title='delete' onPress={()=>deleto(item.id)}></Button>
          </View>
          )}
          />
          <Button title='Refresh' onPress={()=>xyz()}></Button>
    </View>):
    (
    <View style = {styles.container1}>
      <Text style={styles.splash}>'TODOLIST'</Text>    
  </View>
    )
  }
  </TouchableWithoutFeedback>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding:20
  },
  splash:{
    fontSize:50,
    color:'white',
    fontWeight:'900'
  }
  ,
  container1: {
    flex: 1,
    backgroundColor: 'black',
    padding:20,
    alignItems: 'center',
    justifyContent: 'center',
},
  inputField:{
    borderWidth:1,
    borderColor:'grey',
    padding:10,
    color:"white"
  },
  note:{
    textDecorationLine:'none',
    marginTop:20,
    backgroundColor:'grey',
    color:'white',
    borderWidth:1,
    height:70,
    borderColor:'grey',
    padding:10,
    fontWeight:'bold',
    fontSize:15,
    width:200

  },
  header:{
    backgroundColor:"white",
    height:40,
    marginTop:15,
    marginBottom:15,
    padding:10,
    fontSize:30,
    alignItems:"center"
  },
  clicked:{
    textDecorationLine:'line-through',
    marginTop:20,
    backgroundColor:'grey',
    color:'white',
    borderWidth:1,
    height:70,
    borderColor:'grey',
    padding:10,
    fontWeight:'bold',
    fontSize:15,
    width:200
  },
  tasky:{
    flexDirection:"row"
  },
  buttonn:{
    flex:1,
    marginTop:20,
    color:'white',
    borderWidth:1,
    height:60,
    borderColor:'grey',
    padding:10,
    fontWeight:'bold',
    fontSize:15
  }
});
