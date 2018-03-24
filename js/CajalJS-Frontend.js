
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
      $(".rowsDetected").append(" " + dataRows + " <input type='text' name='FirstName' value='" + dataRows + "'>").hide().fadeIn(1000);
      $(".columnsDetected").append(" " + lines[0].length + " <input type='text' name='FirstName' value='" + lines[0].length + "'>").hide().fadeIn(1000);
      $(".targetsColumn").append(" <input type='text' name='targetsCol' value='1'>").hide().fadeIn(1000);
      $(".xPixels").append(" <input type='text' name='xPix' class='xPix' value='" + Math.sqrt(lines[0].length - 1) + "' disabled>").hide().fadeIn(1000);
      $(".yPixels").append(" <input type='text' name='yPix' class='yPix' value='" + Math.sqrt(lines[0].length - 1) + "' disabled>").hide().fadeIn(1000);
      $(".train").prop('disabled', false);
      $('#checkBox').change(function() {
        if ($('#checkBox').is(':checked') == true){
          $('.xPix').prop('disabled', false);
          $('.yPix').prop('disabled', false);
       } else {
         $('.xPix').prop('disabled', true);
         $('.yPix').prop('disabled', true);
       }
    
    });
    }
    
    function errorHandler(evt) {
      if(evt.target.error.name == "NotReadableError") {
          alert("Cannot read file !");
      }
    }


    function train() {
        //$(".dataPreview").append("<canvas id='myCanvas' width='" + (Math.sqrt(lines[0].length - 1)) * 4 + "' height='100' style='border:1px solid #000000;'></canvas>");
        $(".dataPreview").append("<p><div class='trainingInProgress'>Training...</div></p>")
        $(".dataPreview").append("<canvas id='dPreview' width='" + (28 * 4) + "' height='" + (28 * 4) + "' style='border:1px solid #000000;'></canvas>");
        $(".dataPreview").append("<p>Element X of Y</p>")
        $(".dataPreview").append("<p><button type='button' class='cancel' onclick='train()'>Cancel</button></p>");
        $(".train").prop('disabled', true);
        $("#csvFileInput").prop('disabled', true);
        transformData($("#dTransform").val());
        setInterval(function(){ $(".trainingInProgress").fadeTo(900, 0).fadeTo(900, 1); }, 1000);
        console.log(test.data);
    }

    function transformData(transform) {
        if ($("#dTransform").val() == "") {
          transform = "X";
        }
        const compiled = math.compile(transform);
        const mapFunction = function(X) {
          const scope = { X: X };
          return compiled.eval(scope);
        };
        const result = math.map(Y, mapFunction); 
        console.log(result);
        return result;
      }
      

    

    function drawData (el, sample) {
        var counter = 1;
        var c=document.getElementById("dPreview");
        var ctx=c.getContext("2d");
    
        var x1 = 0, x2 = 0, y1 = 0, y2 = 0;
   
    for (y = 0; y < 28; y++) {
        for (x = 0; x < 28; x++) {
            ctx.beginPath();
            ctx.rect(x1,y1,x2,y2);
            ctx.fillStyle = "rgb(" + (255 - el[sample][counter]) + "," + (255 - el[sample][counter]) + "," + (255 - el[sample][counter]) + ")";
            ctx.fill();
            //console.log(x1);
            counter++;
            x1 += 4;
            x2 += 4;
         }
    }
}