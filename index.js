var http = require('http');
var _ = require('underscore');
var pcm = require('pcm-boilerplate');
var qmean = require('compute-qmean');
var mean = require('compute-incrmmean');

function NoiseDetection(url, triggerLevel, callback) {
    var streamDecoder = new pcm.StreamDecoder({bitDepth: 16, numberOfChannels: 1, signed: true});
    var rmsAvg = mean(2000);

    function toDecibel(rms) {
        return 20*(Math.log(rms) / Math.log(10));
    }

    function processBlock() {
        var block = streamDecoder.read();
        var samples = [];
        var rms;
        var db;
        if (block) {
            _.forEach(block[0], function (sample) {
                samples.push(sample);
            });
            rms = qmean(samples);
            rmsAvg(rms);
            dB = toDecibel(rms);
            if (dB > toDecibel(rmsAvg()) + triggerLevel) {
                callback(dB);
            }
        }
    }

    this.start = function() {
        http.get(url, function (source) {
            source.pipe(streamDecoder);
            streamDecoder.on('readable', processBlock);
        });
    }
}
module.exports = NoiseDetection;
