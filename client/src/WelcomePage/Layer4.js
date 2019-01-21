import React from "react";
import kathleen from "../kathleen.jpg";
import cristina from "../cristina.jpg";
import meg from "../meg.png";
import thomas from "../thomas.jpg";
import Grid from '@material-ui/core/Grid';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab);

class Layer4 extends React.Component {
    render() {
        const styles = {
            borderRadius: "50%",
            height: "150px",
            transition: "all ease .4s",
            ':hover': {
                width: "200px",
                height: "200px",
            }
        };

        const pstyle = {
            textAlign: "center",
            fontSize: '17px',
        };

        return <div>
            <h1> Meet the Team </h1>
            <Grid container spacing={24}>
              <Grid item xs={6}>
                <p style={pstyle}> Kathleen </p>
                <img src={kathleen} style={styles} />
                <br />
                <p style={pstyle}>
                  {" "}
                  Some info about Kathleen goes here.{" "}
                </p>
                <a style={{ color: "white" }} href="https://www.linkedin.com/in/kathleen-doviken/">
                  <FontAwesomeIcon style={{ marginRight: "10px" }} icon={["fab", "linkedin"]} />
                </a>
                <a style={{ color: "white" }} href="https://github.com/kathdovi">
                  <FontAwesomeIcon icon={["fab", "github"]} />
                </a>
              </Grid>
              <Grid item xs={6}>
                <p style={pstyle}> Cristina </p>
                <img src={cristina} style={styles} />
                <br />
                <p style={pstyle}>
                  {" "}
                  Some info about Cristina goes here.{" "}
                </p>
                <a style={{ color: "white" }} href="https://www.linkedin.com/in/cristina-kernan/">
                  <FontAwesomeIcon style={{ marginRight: "10px" }} icon={["fab", "linkedin"]} />
                </a>
              <a style={{ color: "white" }} href="https://github.com/ckernan">
                  <FontAwesomeIcon icon={["fab", "github"]} />
                </a>
              </Grid>
              <Grid item xs={6}>
                <p style={pstyle}> Meg </p>
                <img src={meg} style={styles} />
                <br />
                <p style={pstyle}> Some info about Meg goes here. </p>
              <a style={{ color: "white" }} href="https://www.linkedin.com/in/mgallagher6/">
                  <FontAwesomeIcon style={{ marginRight: "10px" }} icon={["fab", "linkedin"]} />
                </a>
              <a style={{ color: "white" }} href="https://github.com/megzimo">
                  <FontAwesomeIcon icon={["fab", "github"]} />
                </a>
              </Grid>
              <Grid item xs={6}>
                <p style={pstyle}> Thomas </p>
                <img src={thomas} style={styles} />
                <br />
                <p style={pstyle}>Some info about Thomas goes here.</p>
              <a style={{ color: "white" }} href="https://www.linkedin.com/in/thomas-smajstrla-8b8879b4/">
                  <FontAwesomeIcon style={{ marginRight: "10px" }} icon={["fab", "linkedin"]} />
                </a>
              <a style={{ color: "white" }} href="https://github.com/TomSmaj">
                  <FontAwesomeIcon icon={["fab", "github"]} />
                </a>
              </Grid>
            </Grid>
          </div>;
    }
};

export default (Layer4);