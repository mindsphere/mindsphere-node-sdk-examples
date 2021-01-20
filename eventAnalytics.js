const EventOperationsClient = require('eventanalytics-sdk').EventOperationsClient;
const PatternOperationsClient = require('eventanalytics-sdk').PatternOperationsClient;
const tokenUtil = require('./tokenUtil');

let eventOperationsClient;
let patternOperationsClient;

async function topEvents(req, res) {
    eventOperationsClient = new EventOperationsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));

    let data = {
        "eventsMetadata": {
            "eventTextPropertyName": "text"
        },
        "events": [
            {
                "_time": "2017-10-01T12:00:00.001Z",
                "text": "INTRODUCING FUEL",
                "text_qc": 0
            },
            {
                "_time": "2017-10-01T12:00:01.001Z",
                "text": "Status@Flame On",
                "text_qc": 0
            },
            {
                "_time": "2017-10-01T12:00:02.001Z",
                "text": "Status@Flame On",
                "text_qc": 0
            }
        ],
        "numberOfTopPositionsRequired": 1
    }

    try {
        let response = await eventOperationsClient.topEvents({ data: data });
        res.send(response);
    } catch (err) {
        console.log(err);
        res.send(err);
    };



}

async function countEvents(req, res) {
    eventOperationsClient = new EventOperationsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let data = {
        "eventsMetadata": {
            "eventTextPropertyName": "text",
            "splitInterval": 5000
        },
        "events": [
            {
                "_time": "2017-10-01T12:00:00.001Z",
                "text": "Downloading the module database causes module 11 restart",
                "text_qc": 0
            },
            {
                "_time": "2017-10-01T12:00:01.001Z",
                "text": "The direction for forwarding the time of day is recognized automatically by the module",
                "text_qc": 0
            },
            {
                "_time": "2017-10-01T12:00:02.001Z",
                "text": "Status@Flame On",
                "text_qc": 0
            },
            {
                "_time": "2017-10-01T12:00:02.001Z",
                "text": "Status@Flame On",
                "text_qc": 0
            }
        ]
    }

    try {
        let response = await eventOperationsClient.countEvents({ data: data });
        res.send(response);
    } catch (err) {
        console.log(err);
        res.send(err);
    };

}

async function removeduplicateevent(req, res) {
    eventOperationsClient = new EventOperationsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let data = {
        "eventsMetadata": {
            "eventTextPropertyName": "text",
            "splitInterval": 5000
        },
        "events": [
            {
                "_time": "2017-10-01T12:00:00.001Z",
                "text": "INTRODUCING FUEL",
                "text_qc": 0
            },
            {
                "_time": "2017-10-01T12:00:01.001Z",
                "text": "Status@Flame On",
                "text_qc": 0
            },
            {
                "_time": "2017-10-01T12:00:02.001Z",
                "text": "Status@Flame Off",
                "text_qc": 0
            },
            {
                "_time": "2017-10-01T12:00:03.001Z",
                "text": "Error code: 340",
                "text_qc": 0
            },
            {
                "_time": "2017-10-01T12:00:04.001Z",
                "text": "Error code: 340",
                "text_qc": 0
            },
            {
                "_time": "2017-10-01T12:00:06.001Z",
                "text": "INTRODUCING FUEL",
                "text_qc": 0
            },
            {
                "_time": "2017-10-01T12:00:08.001Z",
                "text": "Status@Flame On",
                "text_qc": 0
            },
            {
                "_time": "2017-10-01T12:00:09.001Z",
                "text": "Status@Flame Off",
                "text_qc": 0
            }
        ]
    }
    try {
        let response = await eventOperationsClient.removeDuplicateEvents({ data: data });
        res.send(response);
    } catch (err) {
        console.log(err);
        res.send(err);
    };
}

async function filterEvents(req, res) {
    eventOperationsClient = new EventOperationsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let data = {
        "eventsMetadata": {
            "eventTextPropertyName": "text"
        },
        "events": [
            {
                "_time": "2017-10-01T12:00:00.001Z",
                "text": "INTRODUCING FUEL",
                "text_qc": 0
            },
            {
                "_time": "2017-10-01T12:00:01.001Z",
                "text": "Status@Flame On",
                "text_qc": 0
            },
            {
                "_time": "2017-10-01T12:00:02.001Z",
                "text": "Status@Flame Off",
                "text_qc": 0
            },
            {
                "_time": "2017-10-01T12:00:03.001Z",
                "text": "Error code: 340",
                "text_qc": 0
            }
        ],
        "filterList": [
            "INTRODUCING FUEL",
            "MEANINGLESS ALARM",
            "Error code: 340"
        ]
    }

    try {
        let response = await eventOperationsClient.filterEvents({ data: data });
        res.send(response);
    } catch (err) {
        console.log(err);
        res.send(err);
    };

}

async function matchEventPatteren(req, res) {
    patternOperationsClient = new PatternOperationsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let data = {
        "maxPatternInterval": 200000,
        "patternsList": [
            {
                "pattern": [
                    {
                        "eventText": "INTRODUCING FUEL",
                        "minRepetitions": 1,
                        "maxRepetitions": 2
                    },
                    {
                        "eventText": "Status@Flame On",
                        "minRepetitions": 0,
                        "maxRepetitions": 1
                    },
                    {
                        "eventText": "Module STOP due to parameter assignment",
                        "minRepetitions": 1,
                        "maxRepetitions": 1
                    }
                ]
            },
            {
                "pattern": [
                    {
                        "eventText": "Downloading the module database causes module .. restart",
                        "minRepetitions": 1,
                        "maxRepetitions": 1
                    },
                    {
                        "eventText": "The SIMATIC mode was selected for time-of-day synchronization of the module with Id: ..",
                        "minRepetitions": 1,
                        "maxRepetitions": 1
                    }
                ]
            }
        ],
        "nonEvents": [
            "Error 2.. occurred",
            "STOPPING ENGINE"
        ],
        "eventsInput": {
            "eventsMetadata": {
                "eventTextPropertyName": "text"
            },
            "events": [
                {
                    "_time": "2017-10-01T12:00:00.001Z",
                    "text": "Downloading the module database causes module 11 restart",
                    "text_qc": 0
                },
                {
                    "_time": "2017-10-01T12:00:01.001Z",
                    "text": "The direction for forwarding the time of day is recognized automatically by the module",
                    "text_qc": 0
                },
                {
                    "_time": "2017-10-01T12:00:02.001Z",
                    "text": "Status@Flame On",
                    "text_qc": 0
                },
                {
                    "_time": "2017-10-01T12:00:03.001Z",
                    "text": "The SIMATIC mode was selected for time-of-day synchronization of the module with Id: 33",
                    "text_qc": 0
                },
                {
                    "_time": "2017-10-01T12:00:06.001Z",
                    "text": "INTRODUCING FUEL",
                    "text_qc": 0
                },
                {
                    "_time": "2017-10-01T12:00:09.001Z",
                    "text": "Module STOP due to parameter assignment",
                    "text_qc": 0
                }
            ]
        }
    }

    try {
        let response = await patternOperationsClient.matchPatternsOverEvents({ data: data });
        res.send(response);
    } catch (err) {
        console.log(err);
        res.send(err);
    };
}

module.exports = {
    topEvents,
    countEvents,
    removeduplicateevent,
    matchEventPatteren,
    filterEvents
}