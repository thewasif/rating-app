import React from 'react';
import './App.css';
import Home from './Home';
import Ranks from './Ranks';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import "antd/dist/antd.css";

class App extends React.Component{
  
  render(){
    return(
      <div>
        <Menu mode="horizontal"  className="menu-style">
              <Menu.Item onClick={() => window.location = '/'} className="menu-style">
                  <Icon type="home" /> Home
              </Menu.Item>
              <Menu.Item onClick={() => window.location = '/ranks'} className="menu-style" >
                  <Icon type="line-chart"  /> Ranks
              </Menu.Item>
        </Menu>
      <Router>
        
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/ranks" exact component={Ranks} />
        </div>
      </Router>
      </div>
    );
  }
} 


export default App;
