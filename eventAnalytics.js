const EventOperationsClient = require('eventanalytics-sdk').EventOperationsClient;
const PatternOperationsClient = require('eventanalytics-sdk').PatternOperationsClient;
const tokenUtil = require('./tokenUtil');

let eventOperationsClient;
let patternOperationsClient;
/**
	 * For complete API specification of eventanalytics service refer :
	 * https://developer.mindsphere.io/apis/analytics-eventanalytics/api-eventanalytics-api.html
*/
async function topEvents(req, res) {
    /**
	 * @route /eventanalytics/topevents
	 * @return The most frequent events, which are sorted by the number of appearances in a dataset in a descending order.
	 * @description This method - topEvents internally calls method topEvents of EventOperationsClient class.
	 * 				This class is available as dependency in eventanalytics-sdk-<version-here>.tgz
	 *              
	 *  @apiEndpoint : POST /api/eventanalytics/v3/findTopEvents of eventanalytics
	 *              service.
	 * @apiNote Finds the most frequent events, which are sorted by the number of appearances in a dataset in a descending order.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
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

    /**
	 * @route /eventanalytics/countevents
	 
	 * @return Output the given time interval (startTime, endTime) and the resulted number of event occurrences.
	 
	 * @description This method - countEvents internally calls method countEvents of EventOperationsClient class.
	 * 				This class is available as dependency in eventanalytics-sdk-<version-here>.tgz. 
     *              The request object is formed and passed dynamically.
	 * 				This method takes data as part of request body.
	 * 				`data` is a Data structure with two parts eventsMetadata, events.
	 * 				eventsMetadata Metadata ->  for the events list specifying the property name of the item in the events list 
     *              that contains the text of the event (eventTextPropertyName) and time window length in miliseconds of the 
     *              period in which time interval will be split (splitInterval).
	 *				events List -->  with the events that will be processed.
	 *              
	* @apiEndpoint : POST /api/eventanalytics/v3/countEvents of eventanalytics
	 *              service.
	 * @apiNote Determines the number of events for a required time resolution.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 
	 */
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
    /**
	 * @route /eventanalytics/removeduplicateevents
	 
	 * @return List of events after removal of duplicate events.
	 
	 * @description This method - removeDuplicateEvents internally calls method removeDuplicateEvents of EventOperationsClient class.
	 * 				This class is available as dependency in eventanalytics-sdk-<version-here>.tgz. 
     *              The request object is formed and passed dynamically.
	 * 				This method takes data as part of request body.
	 * 				`data` is a Data structure with two parts eventsMetadata, events.
	 * 				eventsMetadata Metadata ->  for the events list specifying the property name of the item in the events list that contains 
	 *				the text of the event (eventTextPropertyName) and time window length in miliseconds of the period in which time interval 
	 *				will be split (splitInterval).
     *				events List -->  with the events that will be processed.
     *
	 *  @apiEndpoint : POST /api/eventanalytics/v3/removeDuplicateEvents of eventanalytics
	 *              service.
	 * @apiNote Removes the duplicate events. Determine pre-existing relationships between events for a requested temporal 
     *          resolution (example 500ms) and reduce the data set by aggregating events with duplicate value.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	
	 */
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
    /**
	 * @route /eventanalytics/filterevents
	 
	 * @return List of events after filtering.
	 
	 * @description This method - filterEvents internally calls method filterEvents of EventOperationsClient class.
	 * 				This class is available as dependency in eventanalytics-sdk-<version-here>.tgz. 
     *              The request object is formed and passed dynamically.
	 * 				This method takes data as part of request body.
	 * 				`data` is a Data structure with two parts eventsMetadata, events.
	 * 				eventsMetadata Metadata ->  for the events list specifying the property name of the item in the events list 
     *              that contains the text of the event (eventTextPropertyName) and time window length in miliseconds of the 
     *              period in which time interval will be split (splitInterval).
	 *				events List -->  with the events that will be processed.
	 *              
	 *  @apiEndpoint : POST /api/eventanalytics/v3/filterEvents of eventanalytics
	 *              service.
	 * @apiNote  Simplifies the dataset to the most meaningful data. Filtering the dataset based on the text of the event.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	
	 */
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

    /**
	 * @route /eventanalytics/matcheventpatterns
	 
	 * @return List of events matching pattern.
	
     * @description This method - matchEventPatterns internally calls method matchPatternsOverEvents of PatternOperationsClient 
                    class.
	 * 				This class is available as dependency in eventanalytics-sdk-<version-here>.tgz. 
     *              The request object is formed and passed dynamically.
	 * 				This method takes data as part of request body.
	 * 				Data structure with four parts - maxPatternInterval, patternsList, nonEvents and eventsInput.
	 * 
	 * 				maxPatternInterval ---> The maximum time length (in milliseconds) of the sliding window where the 
     *              pattern occurs (Maximum difference allowed between the first event of the pattern and the last one).
	 * 				
	 * 				patternsList ---> The patterns to be found in events. The eventText can contain regular expressions. 
     *              The acceptable syntax for the regular expressions is the java syntax. minRepetitions and maxRepetitions 
     *              represent the minimum and maximum number of events of the specified type that are allowed to occur in order 
     *              for the pattern to be matched on the events.
	 * 				
	 * 				nonEvents ---> A list of events that is not allowed to be part of a pattern. Any pattern which contains a 
     *              non-event is excluded from the final report.
	 * 				
	 * 				eventsInput ---> Metadata for the events list specifying the property name of the item in the events list 
     *              that contains the text of the event and the list with the events that will be processed.
	 *              
	* @apiEndpoint : POST /api/eventanalytics/v3/matchEventPatterns of eventanalytics
	 *              service.
	 * @apiNote Applies the patterns specified in body on a list of events. Finds all instances of the specified pattern(s) 
     *          in a collection of events.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	
	 */
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