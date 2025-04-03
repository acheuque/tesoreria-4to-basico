// Google Apps Script function that serves spreadsheet data as JSON
function doGet() {
  // Use getActiveSpreadsheet() only for the specific spreadsheet
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheets()[0];  // Get first sheet
  
  // Only read operations
  var dataRange = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn());
  var values = dataRange.getValues();
  
  // Get headers from first row
  var headers = values[0];
  
  // Create array to hold objects
  var jsonData = [];
  
  // Loop through rows starting from index 1 to skip headers
  for(var i = 1; i < values.length; i++) {
    var row = values[i];
    var record = {};
    
    // Only add rows that have data
    if (row[0] !== '' || row[1] !== '') {
      for(var j = 0; j < headers.length; j++) {
        if (headers[j] !== '') {
          record[headers[j].replace(/\s+/g, '')] = row[j];
        }
      }
      jsonData.push(record);
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