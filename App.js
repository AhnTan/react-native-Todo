import React from 'react';
import { StyleSheet, StatusBar, Text, TextInput, View, Dimensions, Platform, ScrollView } from 'react-native';
import ToDo from "./ToDo";


const { height, width } = Dimensions.get("window");

export default class App extends React.Component {

  state = {
    newTodo: "",
    loadedToDos: false
  };

  render() {
    const { newToDo } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Kawai To Do</Text>
        <View style={styles.card} >
          <TextInput
            style={styles.input}
            placeholder={"New to Do"}
            value={newToDo}
            onChangeText={this._controlNewToDo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            autoCorrect={false}
            />
          <ScrollView contentContainerStyle={styles.toDos}>
              <ToDo text = {"Hello I am a To Do.."}/>
          </ScrollView>
        </View>
      </View>
    );
  }

  _controlNewToDo = text => {
    this.setState({
      newToDo: text
    });
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f23657',
    alignItems: 'center',
  },
  title : {
    color : "white",
    fontSize: 30,
    marginTop : 50,
    fontWeight: "300",
    marginBottom: 30,
  },
  card : {
    backgroundColor : "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select(
      {
        ios:{
          shadowColor: "rgba(50, 50, 50)",
          shadowOpacity: 0.5,
          shadowRadius: 5,
          shadowOffset: {
            height: -1,
            width: 0,
          }
        },
        android : {
          elevation: 3
        }
      }
    )
  },
  input : {
    padding: 20,
    borderBottomColor : "#bbb",
    fontSize: 25,

  },
  toDos : {
    alignItems : "center",
  },
});
