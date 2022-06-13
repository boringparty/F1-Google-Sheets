function qualyResults() {
  const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('data');
  const url = "https://ergast.com/api/f1/current/last/qualifying.json";
  const response = UrlFetchApp.fetch(url);
  const dataAll = JSON.parse(response.getContentText());
  const dataSet = dataAll.MRData.RaceTable.Races[0].QualifyingResults
  const output = []

  dataSet.forEach((entrie, i) => {
    const objects = {
      Grid: entrie.Driver.givenName + " " + entrie.Driver.familyName
    }
 
    //Pushes the header names to the output array, you can clear this if you want.
    const headers = Object.keys(objects)
    //Only pushing the headers in the first itteration.
    if( i == 0 ){
      output.push(headers)
    }
 
    const objectValuesToArray = Object.values(objects)
    output.push(objectValuesToArray)
  })

ss.getRange(1,18,output.length,output[0].length).setValues(output);

}
