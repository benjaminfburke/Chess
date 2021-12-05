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
              
            <h2>Main page</h2>
            <br />
            <Form>
              <Row>
              
                <Col xs="4">
                
                
                
                  <br />
                  <Button type="submit">PlayNewGame</Button>
                  <br />
                  <br />
                  <Link to="/history" className="btn btn-primary">History</Link>
                  <br />
                  <br />


                  <Link to="/accountinformation" className="btn btn-primary">Account Information</Link>
                </Col>
              </Row>
            </Form>
          </div>
        );
    }

    async componentDidMount() {
      if (document.cookie) {
        const token = document.cookie.substring(13);
        const decoded = jsonWeb.verify(token, "123456");
        await this.setState({ user: decoded, signIn: true });
        console.log(this.state);

        await axios
          .get(`http://127.0.0.1:5000/pairing?user1_id=${this.state.user_id}`)
          .then((result) => {
            console.log(result);
            this.setState({ games: result.data });
          })
          .catch((err) => {
          console.log(err);
        });
      }
    }
  }
    
    




export default Homepage;
