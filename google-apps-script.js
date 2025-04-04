// Google Apps Script function that serves spreadsheet data as JSON
function doGet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheets()[0];  // Get first sheet
  
  // Get the total ingresos/egresos data
  var totalsRange = sheet.getRange(1, 1, 2, 2);
  var totalsValues = totalsRange.getValues();
  
  // Get the cuotas data
  var cuotasRange = sheet.getRange(5, 1, 11, 3);  // From row 5 to 15, columns A to C
  var cuotasValues = cuotasRange.getValues();
  
  // Create the JSON structure
  var jsonData = {
    totals: {
      [totalsValues[0][0]]: totalsValues[1][0],  // Total Ingresos
      [totalsValues[0][1]]: totalsValues[1][1]   // Total Egresos
    },
    cuotas: []
  };
  
  // Process cuotas data
  for(var i = 1; i < cuotasValues.length; i++) {
    var row = cuotasValues[i];
    if (row[0] !== '') {  // Only process rows with month names
      jsonData.cuotas.push({
        mes: row[0],
        cuotasPagadas: row[1],
        cuotasPendientes: row[2]
      });
    }
  }
  
  // Return the JSON data
  return ContentService.createTextOutput(JSON.stringify(jsonData))
    .setMimeType(ContentService.MimeType.JSON);
}

/*
Instructions for deployment:
1. Open Google Sheets
2. Go to Extensions > Apps Script
3. Paste this code
4. Click "Deploy" > "New deployment"
5. Click "Select type" > "Web app"
6. Configure:
   - Description: "Spreadsheet JSON API"
   - Execute as: "Me"
   - Who has access: "Anyone"
7. Click "Deploy"
8. Authorize the application
9. Copy the Web app URL for use in script.js

Current deployment URL:
https://script.google.com/macros/s/AKfycbxQ9bxkWrcH58DMwrM3jWX_6Efm9UX7CcFEL0QqigFb4OhI6wfJ67fleQ9wHchcqGeT/exec
*/ 