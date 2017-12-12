const dash_button = require("node-dash-button");
const Nexmo = require("nexmo");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();

const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET,
  applicationId: process.env.NEXMO_APPLICATION_ID,
  privateKey: process.env.NEXMO_PRIVATE_KEY
});

var dash = dash_button(process.env.AMAZON_DASH_MAC_ADDR, null, null, "udp");
dash.on("detected", function() {
  console.log("Call triggered");
  nexmo.calls.create(
    {
      to: [
        {
          type: "phone",
          number: process.env.ALERT_RECIPIENT_NUMBER
        }
      ],
      from: {
        type: "phone",
        number: process.env.NEXMO_FROM_NUMBER
      },
      answer_url: [`${process.env.DOMAIN}/answer`],
      event_url: [`${process.env.DOMAIN}/event`]
    },
    function(err, data) {
      if (err) {
        throw err;
      }
      if (data.status == 'started') {
        console.log("Call made");
      } else {
        console.log(data);
      }
    }
  );
});

// Serve NCCO and handle events
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post("/event", (req, rs) => {
  if (req.body.to) {
    console.log(`Call from ${req.body.from} to ${req.body.to} is ${req.body.status}`);
  }
});

app.get("/answer", (req, res) => {
  res.json([
    {
      action: "talk",
      text: "Help! I fell down a well"
    }
  ]);
});

app.listen(3000, () => console.log("DrDash listening on port 3000!"));
