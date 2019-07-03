## Toast notification
``` js
my.$alert( "test toast alert" );
```

## Navigate to a Space
``` js
Navigation.navTo("System.HomeSpace", {});
```
[PumpCo Cog: Navigate to a Space with Navigation.navTo()](https://www.evernote.com/shard/s424/sh/04521424-66a3-4bca-b407-c2486f3bdaf4/317bbabaf71a5c87)

## Clear down my.model Cards
``` js
my.model.cards.clear();
```
[PumpCo Cog: my.model.cards.clear() - why use it?](https://www.evernote.com/l/AahaJphVeB1AC52PurYEpGPWQCWaxNNmxGI)

## PumpCo print todays date
``` js
my.$date().toDate();

> "26-Feb-2018"
```
[PumpCo cog: Using Date.js in a cog](https://www.evernote.com/l/AajFe6z33QxPJ6t6Copqhy2VOAsDVVy7Ihs)

## PumpCo print a specified date
``` js
my.$date( '2018-02-26', 'yyyy-MM-dd' ).toDateJS().add(1).day();

> Tue Feb 27 2018 00:00:00 GMT+0000 (GMT)
```
[PumpCo cog: Using Date.js in a cog](https://www.evernote.com/l/AajFe6z33QxPJ6t6Copqhy2VOAsDVVy7Ihs)

## Call pulse manually with my.$fire()
``` js
// Fired when the cog is shown
my.$on( "postShown", function( params ) {
    my.$fire("pumpCo.user.calendar.list.response");
} );
```
[PumpCo: Call pulse manually with my.$fire()](https://www.evernote.com/l/Aag4gnFxAy1HiZPBWdT53ScSdD83CHUBrRE)

## PulseAs() for a users calendar

- there are a few aspects to using this functionality so please refer to the full note for usage

``` js
my.$pulseAs( john.uid, "pumpCo.user.calendar.list.request", {}, {});
```
[PumpCo Cog: PulseAs() for a users calendar](https://www.evernote.com/l/Aaju_YGIlt1J6o7p5vAOUl8Q2lUxZ4ur8cs)

## Re-pulse on new notifications received

``` js
// When a new notification is made, re-pulse the request to refresh the cards automatically  
// (Add to the section where you have your pulse response handlers (typically toward the bottom of the file) )
my.$on( "pumpCo.event.notification.new", function(){
   my.requestAll();
}.bind( this ) );
```
[Re-pulse on new notifications received](https://www.evernote.com/l/AagKwO1i7zZARqPudjlyIM55XWQdG_j8bjs)

## Clear a Phil / Knockout Observable
``` js
my.model.nameOfObservable( [] ) ;
```
[PumpCo Cog: Clear a Phil / Knockout Observable](https://www.evernote.com/l/AajBdEVrf3VK_L-CNBwFvVMKktjPPL2jmx4)

## Add images to resources.json

- Refer to full note in Evernote for full usage

``` js
// resources.json

"image":    [
    "/iotaa/localOfficeLandingPageRightCog/images/placeholdercogimage.jpg"
],

"params": {
    // we copy the same path that was added to the image array, simply to allow us to use a variable in our main.js
    "jasonsCustomIotaaImg" : "/iotaa/localOfficeLandingPageRightCog/images/placeholdercogimage.jpg"
},
```

[PumpCo cog: Add images to resources.json](https://www.evernote.com/l/AaglJgclPY5LiK0BrfoqI_4RBqrauT9BTaA)

## Use the roadie pulse / link to an internal link

``` js
// main.js
my.model.navigateToUrl = function( data, evt ){

    // Expects the "pumpUrl" to be passed in. If no pumpUrl then the arrow should not be shown.
    var pumpUrl = __get( "activity.object.pumpUrl", data );
    if( !pumpUrl )
        return -1;

    // If we have a valid Url, lets get the roadie to take us there...
    my.$pulse( "pumpCo.roadie.visit.request", { "url":pumpUrl } );

};
```
[PumpCo cog: Use the roadie pulse / link to an internal link](https://www.evernote.com/l/AahqK1wR8rdPRb0gFvsj7GA6nIXNBDOUDVM)

## How to deal with sending multiple pulse requests to the same pulse response

``` js
// Here we send a pulse request with a refId. Its ignored by the backend, but we
// use it in the front end as filter
my.$pulse( "pumpCo.user.report.get.request",
  {
    "name":"iotaa.localOffice.hub.status",
    "params":{}
  },
  {
    refId: "hub-status-table"
  }
);

// NOTE: We use the same pulse request but with a different name ( to get different json data )
my.$pulse( "pumpCo.user.report.get.request",
  {
    "name":"iotaa.first-morning-activity",
    "params":{}
  },
  {
    refId: "first-morning-activity-table"
  }
);
```

``` js
// This is a generic response handler for pumpCo.user.report.get
my.$on( "pumpCo.user.report.get.response", function( pulse ){
  var report = __get( "pulseBody.report", pulse );

  // Here we get the referenceId that we passed in the request
  var requestType = __get( "pulseHeader.referenceId", pulse );

  // Do do a simple check on the referenceId and then update the appropriate observable
  if( requestType === 'hub-status-table' ) {
      my.model.hubStatus( report );
  }

  if( requestType === 'first-morning-activity-table' ) {
       my.model.clientEvents( report );
  }
});
```

## Using the aOS csv table element

``` js
// main.js

// Static data for table to display a loading message
var csv_loading_message = [
    [ 'Loading...' ]
];

my.$on( "postModelCreate", function(){
  ...
  my.model.myCsv = phil.observe( csv_loading_message );
  ...
});

// Create a 2D array - this is the column heading / 1st row
var csv = [
    [ "A", "Simple", "Test" ]
];

// Push values into the 2nd row
csv.push( [ 'value one', 'value two', 'value three' ] );

// Update the observable
my.model.myCsv( csv );
```

``` html
<!-- // main.html -->
<csv-table params="data:$data.myCsv"></csv-table>
```

### A more complex example

``` js
// main.js

my.$on( "postModelCreate", function(){
  ...
  my.model.myCsv = phil.observe( csv_loading_message );
  ...
});

// Static data for table to display a loading message
var csv_loading_message = [
    [ 'Loading...' ]
];

my.myFunction = function() {
  var csv = [
      [ "Planet", "Population", "Years old" ]
  ];

  var planets = [
    {
      "name": "earth",
      "population": "8 million",
      "age": "12 billion"
    },
    {
      "name": "mars",
      "population": "30",
      "age": "8 billion"
    }
  ];

  for(var i=0; i < planets.length; i++) {
    var planet = planets[ i ];  
    csv.push( [ planet.name, planet.population, planet.age ] );
  }

  // Update the observable
  my.model.myCsv( csv );
};
```

``` html
<!-- // main.html -->
<csv-table params="data:$data.myCsv"></csv-table>
```

### A pulse example ( as used in the IoTAA Local office dashboard Service status card )

``` js
// main.js

var hub_status_no_data = [
    [ my.$i18n( 'hub-status-no-data' ) ]
];

my.$on( "postModelCreate", function(){
  ...
  my.model.hubStatus = phil.observe( [] );
  ...
});

// JCARNEY 25/09/18: report response deals with both report requests
my.$on( "pumpCo.user.report.get.response", function( pulse ){
  var report = __get( "pulseBody.report", pulse );
  var requestType = __get( "pulseHeader.referenceId", pulse );

  if( requestType === 'hub-status-table' ) {

    // @JC 27/09/18: Hard code the heading as the pulse repsonse dosnt supply
    // the intended table row heading
    var hubStatusArr = [
        [ "Forename", "Surname", "Service", "Status", "Last Seen", "Current Action" ]
    ];

    // @JC 27/09/18: dummy array for populating the table
    // statuses = [
    //     [
    //       "fore",
    //       "surname",
    //       "status",
    //       "time"
    //     ],
    //     [
    //         "John",
    //         "Jenkins",
    //         "Hub",
    //         "warning#paused",
    //         "",
    //         "Paused by Bristol Office Admin until 28-Sep-2018 23:17"
    //     ],
    //     [
    //         "trever",
    //         "mac",
    //         "Hub",
    //         "warning#paused",
    //         "",
    //         "Paused by Bristol Office Admin until 28-Sep-2018 23:17"
    //     ],
    //     [
    //       "beth",
    //       "booker",
    //       "Hub",
    //       "warning#paused",
    //       "",
    //       "Paused by Bristol Office Admin until 28-Sep-2018 23:17"
    //     ],
    // ]

  // @JC 27/09/18: Check if we have a pulse other than the un-suitable
  // table row heading
  if( report.length > 1 ) {
    for( var i=1; i<report.length; i++ ){
        hubStatusArr.push([
          report[ i ][ 0 ],
          report[ i ][ 1 ],
          report[ i ][ 2 ],
          report[ i ][ 3 ],
          report[ i ][ 4 ],
          report[ i ][ 5 ]
        ]);
      }
    } else {
      // @JC 27/09/18: If there is no pulse, display the 'no data' message
      hubStatusArr = hub_status_no_data;
    }

    my.model.hubStatus( hubStatusArr );
  }

  if( requestType === 'first-morning-activity-table' ) {
    my.model.clientEvents( report );
  }
});

```

``` html
<!-- // main.html -->
<csv-table params="data:$data.hubStatus"></csv-table>
```
[IoTAA dashboards: CSV table case](https://www.evernote.com/l/Aah4eUJcTexOdqoFr1vGjS9UegNO0ZJB0gA)
