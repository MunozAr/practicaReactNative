/*es-lint*/
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export class Todo extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      newTodo: '',
    };
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }
  componentDidMount() {
    fetch('http://localhost:5000/todos', {
      headers: {
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(todos => {
        this.setState({todos});
      });
  }
  handleChangeText(text) {
    this.setState({newTodo: text});
  }
  handlePress() {
    fetch('http://localhost:5000/todos', {
      method: 'post',
      body: JSON.stringify({
        name: this.state.newTodo,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        const todos = [...this.state.todos, data];
        this.setState({todos, newTodo: ''});
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={this.state.newTodo}
          onChangeText={this.handleChangeText}
        />
        <TouchableOpacity style={styles.button} onPress={this.handlePress}>
          <Text style={styles.text}>Create</Text>
        </TouchableOpacity>
        <View>
          {this.state.todos.map((todo, i) => (
            <Text style={styles.title} key={i}>
              {todo.name}
            </Text>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'red',
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 21,
  },
  input: {
    color: 'white',
    fontSize: 16,
    borderColor: 'gray',
    borderWidth: 1,
    height: 40,
    width: 250,
    margin: 20,
  },
  button: {
    backgroundColor: '#DDDDDD',
    width: 150,
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
  },
  text: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});
