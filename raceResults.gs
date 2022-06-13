function raceResults() {
  const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('data');
  const url = "https://ergast.com/api/f1/current/last/results.json";
  const response = UrlFetchApp.fetch(url);
  const dataAll = JSON.parse(response.getContentText());
  const dataSet = dataAll.MRData.RaceTable.Races[0].Results
  const output = []
  
  dataSet.forEach((entry, i) => {
    const valuesWeNeedInsideObject = {
      Driver: entry.Driver.givenName + " " + entry.Driver.familyName,
      Status: entry.status,
      Pos: entry.positionText,
      Laps: entry.laps,
      FLap: entry.FastestLap.rank
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

ss.getRange(1,22,output.length,output[0].length).setValues(output);
}
