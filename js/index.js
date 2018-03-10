    function handleFiles(files) {
      // Check for the various File API support.
      if (window.FileReader) {
          // FileReader API is supported.
          getAsText(files[0]);
      } else {
          alert('The FileReader API is not supported in this browser.');
      }
    }

    function getAsText(fileToRead) {
      var reader = new FileReader();
      // Read file into memory as UTF-8      
      reader.readAsText(fileToRead);
      // Handle load errors
      reader.onload = loadHandler;
      reader.onerror = errorHandler;
    }

    function loadHandler(event) {
      var csv = event.target.result;
      processData(csv);
    }

    function processData(csv) {
        var dataRows;
        var dataColumns;
        var allTextLines = csv.split(/\r\n|\n/);
        var lines = [];
        for (var i=0; i < allTextLines.length; i++) {
            var data = allTextLines[i].split(',');
                var tarr = [];
                for (var j=0; j < data.length; j++) {
                    tarr.push(Number(data[j]));
                }
                lines.push(tarr);
        }
      
console.log(lines);
console.log(lines[0].length);
      dataRows = Number(lines.length);
      if (lines[lines.length - 1].length < lines[0].length) dataRows--;
      console.log(dataRows);
      $(".rowsDetected").append(" " + dataRows + " <input type='text' name='FirstName' value='" + dataRows + "'>");
      $(".columnsDetected").append(" " + lines[0].length + " <input type='text' name='FirstName' value='" + lines[0].length + "'>");
      $(".targetsColumn").append(" <input type='text' name='FirstName' value='1'>");
    }

    function errorHandler(evt) {
      if(evt.target.error.name == "NotReadableError") {
          alert("Cannot read file !");
      }
    }