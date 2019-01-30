import React from "react";
import Button from "./Button";
import { Link, withRouter } from "react-router-dom";
import Auth0Lock from "auth0-lock";
// bro this shit has to link to auth0 (not working)
// then redirect to a specific component which needs to be user specific
// which it is not rn it's just going to generic components lol
// how are we gonna finish this
// TODO: cry
import $ from "jquery";

var lock = new Auth0Lock(
    "uPoNkl6EbS0CdIGluuMXmpi67AlmWLt7",
    "wishlist-2u.auth0.com",
    {
        allowedConnections: [
            "twitter",
            "facebook",
            "linkedin",
            "google",
            "google-oauth2"
        ],
    }
);
class Layer3 extends React.Component {
    constructor(props) {
        super(props);
        const accessToken = sessionStorage.getItem("accessToken");
        if (accessToken) {
            lock.getUserInfo(accessToken, (err, data) => {
                if (err) return;
                console.log(data);
                // console.log(accessToken)

                window.profile = data;
                this.setState({
                    signedIn: true,
                    name: data.name,
                });
            });
        }

        lock.on("authenticated", authResult => {
            // Use the token in authResult to getUserInfo() and save it to sessionStorage
            lock.getUserInfo(authResult.accessToken, (error, profile) => {
                if (error) {
                    // Handle error
                    return;
                }

                console.log(authResult);
                console.log(profile);

                window.profile = profile;

                sessionStorage.setItem("accessToken", authResult.accessToken);
                sessionStorage.setItem("profile", JSON.stringify(profile));

                this.setState({
                    signedIn: true,
                    name: profile.name
                });

                this.checkDB();
                this.props.history.push(this.props.route);
                console.log(this.props.route);

            });
        });
    }
    state = {
        signedIn: false
    };
    login = (p) => {
        lock.show();
    };

    login1 = () => {
        if(sessionStorage.getItem("accessToken")){
            this.history.push("/search");
        }
        else{
            lock.show();
        }
    }

    login2 = () => {
        if(sessionStorage.getItem("accessToken")){
            this.history.push("/profile");
        }
        else{
            lock.show();
        }
    }

    checkDB() {
        console.log("checkdb test");
        let obj = { username: window.profile.email }
        console.log("obj in NavBar: " + JSON.stringify(obj));
        $.get("/api/getUser/" + window.profile.email).then(dbUser => {
            if (!dbUser) {
                $.ajax({
                    type: "POST",
                    url: "/api/newUser",
                    data: {
                        username: window.profile.email,
                        profilename: window.profile.name
                    }
                });
            }
        });
    }

    logout = () => {
        sessionStorage.removeItem("accessToken");
        window.location = "/";
    };
    render() {
        const styles = {
            fontSize: 20,
            width: "150px",
            height: "150px",
            color: "#0d9aaa",
            backgroundColor: "white",
            borderRadius: "50%",
            border: "2px solid",
            borderColor: 'white',
            textAlign: "center",
            marginRight: "15px",
            marginLeft: "15px",
            lineHeight: "150px",
            transition: "all ease .4s",
            ':hover': {
                backgroundColor: "#0d9aaa",
                color: "white",
                border: '4px solid',
                borderColor: 'white',
                width: "200px",
                height: "200px",
            }
        }
        console.log('here')
        console.log(this.props)

        return (
            //sessionStorage.getItem("accessToken")
         <div>
            {!this.state.signedIn && (
                <button style={{ backgroundColor: "#0d9aaa", border: "none" }} route="/search" onClick={this.login1}>
                    <Button> Find User </Button>
                </button>
            )}

            {this.state.signedIn && (
                    <button style={{ backgroundColor: "#0d9aaa", border: "none" }} route="/search">
                        <Link to={"/search"}>
                            <Button> Find User </Button>
                        </Link>
                    </button>
            )} 
            
            {!this.state.signedIn && (
                <button style={{ backgroundColor: "#0d9aaa", border: "none" }} route="/profile" onClick={this.login2}>
                    <Button> My Profile </Button>
                </button>
            )}
            {this.state.signedIn && (
                    <button style={{ backgroundColor: "#0d9aaa", border: "none" }} route="/profile">
                        <Link to={"/profile"}>
                            <Button> My Profile </Button>
                        </Link>
                    </button>
            )}


            {!this.state.signedIn && (
                <button style={{ backgroundColor: "#0d9aaa", border: "none" }} route="/profile" onClick={this.login2}>
                    <Button> Add List </Button>
                </button>
            )}
            {this.state.signedIn && (
                    <button style={{ backgroundColor: "#0d9aaa", border: "none" }} route="/profile">
                        <Link to={"/profile"}>
                            <Button> Add List </Button>
                        </Link>
                    </button>
            )}
        </div>
        )
    }
}

export default (Layer3);