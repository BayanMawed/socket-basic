
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from  'socket.io-client'

class App extends Component {

  state = {socket:null , globalNumber:0}
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    const socket = io('http://localhost:8888');

    this.setState({socket:socket})

    socket.on('number:change' , (globalNumber) => {
      this.setState({globalNumber})
    })
    socket.on('user:new',(username) =>{
      console.log('a user called ' + username + ' is connected')
    })

    socket.on ('user:me' , (username)=>{
      this.setState({username})
    })
  }
  handleChange = (evt) =>{
    evt.preventDefault()
    const input_value = evt.target.input.value
    this.setState({input_value})
    console.log(this.state.input_value);}

  handleSubmit(evt) {
    evt.preventDefault();
  }

  onIncrement = () => this.state.socket.emit('increment')
  onDecrement = () => this.state.socket.emit('decrement')
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title" >Welcome to Chat</h1>
        </header>
        {/* <h1>{this.state.globalNumber}</h1>
        {/* <button onClick={this.onIncrement}>increament</button>
        <br/>
        <br/>
        <button onClick={this.onDecrement}>decrement</button>
        <br/>   */} 
        <h1>{this.state.username}</h1>
        <form onSubmit={this.handleChange}>
        <input type='text' placeholder='Type Your Message' name='input'  />
        <input type='submit' name='Submit'/>
        </form>
      </div> 
     );
   };
  }; 
export default App;