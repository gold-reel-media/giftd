const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

const db = require("./models");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Define API routes here
require("./routes/dbTestRoute.js")(app);
require("./routes/APIRoutes.js")(app);

// Send every other request to the React app
// Define any API routes before this runs
if(process.env.NODE_ENV === "production"){
    app.get("*", (req, res) => {
        app.use(express.status("./client/build"));
    });
} 

const syncOptions = { force: false };

db.sequelize.sync(syncOptions).then(() => {
    app.listen(PORT, () => {
        console.log(`🌎 ==> API server now on port ${PORT}!`);
    });
});
