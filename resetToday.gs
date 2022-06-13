// TODAY() is slow. Use this on a daily trigger

function resetToday() {
  const ss = SpreadsheetApp.getActive();
  const timezone = ss.getSpreadsheetTimeZone();
  const sh = ss.getSheetByName('data'); // put the name of your sheet
  const date = Utilities.formatDate(new Date(), timezone, "MM/dd/yyyy");
  sh.getRange('B1').setValue(date);
}
