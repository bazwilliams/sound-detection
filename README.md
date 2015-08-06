Sound Detection
===

Library to detect sudden noises above ambient from a network stream such as an IP Webcam or network microphone.

Example usage would be to monitor the microphone of an IP camera used as a Baby monitor, the trigger could be used to switch lights on, trigger a pushover alert or video recording. 

## Installation

``` bash
$ npm install sound-detection
```
## Usage 

The ambient noise is constantly monitored and adapts over time, the `triggerLevel` variables indicates how much over the background noise in decibels is required to trigger the callback which is invoked with the detected decibel value. 

The decibel value is referenced against the maximum volume transmitted in a PCM stream. 

### Sample App

```javascript
var SoundDetection = require('sound-detection');

var options = {
    url = 'http://babymonitorcam/audio.cgi'
    format: {
        bitDepth: 16,
        numberOfChannels: 1,
        signed: true
    },
    triggerLevel = 30
}

var detector = new SoundDetection(options, function(dB) {
    console.log('Noise Detected at %sdB', dB);
});

detector.start();
```
