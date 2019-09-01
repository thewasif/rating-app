import React, {Component} from 'react';
import "antd/dist/antd.css";
import './Card.css'
import Card from './Card'
import { Button, Icon, Rate, message, Modal } from 'antd';
import { girls } from './Girls';
import * as firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyAYLnbiFRzB5siRa4vYcyT1hUCnOlJV4rU",
    authDomain: "connect-me-app.firebaseapp.com",
    databaseURL: "https://connect-me-app.firebaseio.com",
    projectId: "connect-me-app",
    storageBucket: "connect-me-app.appspot.com",
    messagingSenderId: "762676113065",
    appId: "1:762676113065:web:9349b3b2e84217b7"
};
firebase.initializeApp(firebaseConfig);

class Home extends Component {
    constructor(props){
        super(props);
        this.state = { 
            currentGirl: 0,
            isDisable: true,
            val: 0
        }
        this.nextGirl = this.nextGirl.bind(this);
        this.handleRate = this.handleRate.bind(this);
    }
    componentDidMount(){
        setTimeout(() => {
          Modal.info({
            title: "Hey there!",
            content: (<p>Your task is to rate girls based on thier <b>cuteness</b> & beauty. If you are a really good person and don't want to rate girls, you can check rakings on the <b>Ranks</b> tab.<br /> Happy rating!</p>)
          })
        }, 500);
        firebase.database().ref('hits').once('value', (snap) => {
          firebase.database().ref('hits').set({hits: snap.val().hits+1})
        })
      }
    nextGirl(){
        const store = firebase.firestore();
        const name = girls[this.state.currentGirl].name
        store.collection(name).get().then((doc) => {
           doc.forEach((e) => {
               const id = e.id;
               let arr = e.data().ratings;
               arr.push(this.state.val);
               store.collection(name).doc(id).update({ratings: arr})
           })
        }).then((e) => {
            this.setState({
                currentGirl: this.state.currentGirl == 22 ? this.state.currentGirl + 0 : this.state.currentGirl + 1 ,
                isDisable: true, 
                val: 0
            });
        })
        
        if(this.state.currentGirl == 22){
            message.warning("You've rated enough girls today!");
        }

    }
    handleRate(v){
        if(this.state.isDisable){
            this.setState({
                isDisable: false
            })
        }
        this.setState({
            val: v
        })
    }
    render() { 
        const rate = <Rate className="rate" onChange={this.handleRate} value={this.state.val} allowHalf />;
        const girl = girls[this.state.currentGirl];

        return ( 
            <div className="container">
               <Card title={girl.name} img={girl.img} 
                rating={rate} 
               />
               <div style={{display: 'flex', justifyContent: 'center'}} >
                <Button type="primary" onClick={this.nextGirl} disabled={this.state.isDisable} >Next <Icon type="arrow-right" className='btn' /> </Button>
               </div>
            </div>
        );
    }
}
 
export default Home;