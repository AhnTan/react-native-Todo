import React from 'react';
import { StyleSheet, StatusBar, Text, TextInput, View, Dimensions, Platform, ScrollView } from 'react-native';
import ToDo from "./ToDo";
import uuidv1 from "uuid/v1";
import { AppLoading } from "expo";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {

  state = {
    newTodo: "",
    loadedToDos: false,
    toDos : {},
  };
  componentDidMount = () => {
    this._loadToDos();
  }

  render() {
    const { newToDo, loadedToDos, toDos } = this.state;
    console.log(toDos);
    if(!loadedToDos){
      return <AppLoading />;
    }

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
            onSubmitEditing={this._addToDo}
            />
          <ScrollView contentContainerStyle={styles.toDos}>
            {Object.values(toDos).map(toDo => (
              <ToDo
                key={toDo.id} {...toDo}
                deleteToDo={this._deleteToDo}
                uncompleteToDo={this._uncompleteToDo}
                completeToDo={this._completeToDo}
                {...toDo}
                />
          ))}
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

  _loadToDos = () => {
    this.setState({
      loadedToDos: true
    });
  };

  _addToDo = () => {
    const { newToDo } = this.state;
    if(newToDo !== ""){
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID] : {
            id: ID,
            isCompleted : false,
            text : newToDo,
            createdAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newToDo: "",
          toDos: {
            ...prevState.toDos,
            ...newToDoObject
          }
        }
        return { ...newState } ;
      });
      }
    };

    _deleteToDo = (id) => {
      this.setState(prevState => {
        const toDos = prevState.toDos;
        delete toDos[id];
        const newState = {
          ...prevState,
          ...toDos
        };
        return { ...newState };
      });
    };

    _uncompleteToDo = id => {
      this.setState(prevState => {
        const newState = {
          ...prevState,
          toDos: {
            ...prevState.toDos,
            [id] : {
              ...prevState.toDos[id],
              isCompleted: false
            }
          }
        }
        return { ...newState };
      });
    };

    _completeToDo = id => {
      this.setState(prevState => {
        const newState = {
          ...prevState,
          toDos: {
            ...prevState.toDos,
            [id] : {
              ...prevState.toDos[id],
              isCompleted: true
            }
          }
        }
        return { ...newState };
      });
    }
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
