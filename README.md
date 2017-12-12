# DrDash

Press an Amazon Dash button, trigger a phone call

## Usage

* Ensure your Amazon button is connected to wifi but *not* configured to make a purchase
* Clone this repo
* Install libpcap
  * `sudo apt-get install libpcap-dev` on Ubuntu
  * `brew install libpcap` on MacOS
* `cd ./node_modules/node-dash-button/bin`
* `sudo ./findbutton`
* Find the MAC address of your button. It'll likely be the one that's `type: UDP` if it's a newer button (code `JK29LP`)
* `Ctrl-C` this process
* Create a new [Nexmo](https://dashboard.nexmo.com) application
* Copy the `private.key` in to the current directory
* `cp .env.example .env`
* Populate `.env` with the required information
* Run `sudo node index.js` (we need root as `libpcap` needs privileged access to your network card)

## Implementation

This is built on top of the Nexmo API. It currently makes a simple TTS call. 
Here are some ideas on how to improve it:

### Option 1
* Make TTS call
* Receive events to know if it's been answered
* Perhaps use DTMF to confirm message receipt?
* If not, fall back to SMS

### Option 2
* Use the verify system to confirm message receipt?
