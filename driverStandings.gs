function driversStandings() {
  const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('data');
  const url = "https://ergast.com/api/f1/2022/driverStandings.json";
  const response = UrlFetchApp.fetch(url);
  const dataAll = JSON.parse(response.getContentText());
  const dataSet = dataAll.MRData.StandingsTable.StandingsLists[0].DriverStandings
  const output = []
  
  dataSet.forEach((entrie, i) => {
    const valuesWeNeedInsideObject = {
      "#": entrie.position,
      Name: entrie.Driver.givenName + " " + entrie.Driver.familyName,
      "Pts.": entrie.points,
      Wins: entrie.wins
    }
 
    //Pushes the header names to the output array, you can clear this if you want.
    const headers = Object.keys(valuesWeNeedInsideObject)
    //Only pushing the headers in the first itteration.
    if( i == 0 ){
      output.push(headers)
    }
 
    const objectValuesToArray = Object.values(valuesWeNeedInsideObject)
    output.push(objectValuesToArray)
  })
 
 // console.log(output);

ss.getRange(1,12,output.length,output[0].length).setValues(output);

}
