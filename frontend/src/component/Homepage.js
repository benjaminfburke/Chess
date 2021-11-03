import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Redirect, Link} from "react-router-dom";
import axios from "axios";

class Homepage extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
        signin: false,
        user_id: "",
      };
      
      
    }
    
    render() {
        
        
        return (
          <div>
              
            <h2>Sign Up</h2>
            <br />
            <Form>
              <Row>
              
                <Col xs="4">
                
                
                
                  <br />
                  <Button type="submit">PlayNewGame</Button>
                  <br />
                  <br />
                  <Button type="submit">History</Button>
                  <br />
                  <br />


                  <Link to="/signup" className="btn btn-primary">Account Information</Link>
                </Col>
              </Row>
            </Form>
          </div>
        );
      }
    }
    
    




export default Homepage;
