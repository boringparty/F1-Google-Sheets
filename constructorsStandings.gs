function constructorsStandings() {
  const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('data');
  const url = "https://ergast.com/api/f1/2022/constructorStandings.json";
  const response = UrlFetchApp.fetch(url);
  const dataAll = JSON.parse(response.getContentText());
  const dataSet = dataAll.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
  const output = []
  
  dataSet.forEach((entrie, i) => {
    const objects = {
      "#": entrie.position,
      Name: entrie.Constructor.name,
      "Pts.": entrie.points,
      Wins: entrie.wins
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
 
 // console.log(output);

ss.getRange(1,28,output.length,output[0].length).setValues(output);

}
