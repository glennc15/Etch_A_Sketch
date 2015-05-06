

// build one block of the etch-a-sketch board in HTML markup.
var getBlock = function() {
    return "<td><div class='block'></div></td>";
}

// builds one row of the etch-a-sketch board in HTML markup.
var getRow = function(numOfCols) {
    var result = '<tr>';

    for (var ctr = 0; ctr < numOfCols; ctr++) {
        result += getBlock();
    }
    
    result += '</tr>';
    
    return result;
}

// builds a complete etch-a-sketch board in HTML markup. Default grid size is
// 16x16.
var getBoard = function(numOfRows, numOfCols) {
	numOfRows = typeof numOfRows !== 'undefined' ? numOfRows : 16;
	numOfCols = typeof numOfCols !== 'undefined' ? numOfRows : numOfRows;
//    alert("numOfCols: " + numOfCols + "     numOfRows: " + numOfRows);

	result = '';
	for (var ctr = 0; ctr < numOfRows; ctr++) {
		result += getRow(numOfCols);
	}

	return result;
}

// Adjust the board squres width/height dimensions so they fill the
// lesser dimension (height or width) of '.container'.
var setBlockDimensions = function(blockPerRow) {
    var container = $('.container');
	var containerWidth = container.width();
	var containerHeight = container.height();
    var minDimension = containerHeight < containerWidth ? containerHeight : containerWidth;
//	 alert ("containerHeight: " + containerHeight + " containerWidth: " + containerWidth);
//   	alert ("minDimension: " + minDimension);

   	// The height/width dimensions of each block are set the same (square).
   	// Each block has a 2px border and must be considered in the
   	// calculation. Minimum blockDimensions is 2px;
   	var blockDimensions = Math.floor((minDimension - 2*blockPerRow)/blockPerRow);
    blockDimensions = blockDimensions > 2 ? blockDimensions : 2; 
//    alert ("blockDimensions: " + blockDimensions);
   	var blocks = $('.block')
   	blocks.height(blockDimensions);
   	blocks.width(blockDimensions);
}


// Adds an etch-a-sketch board to the DOM. 
var addBoard = function(numOfRows, numOfCols) {
	// currently only square boards can be built. numOfRows defaults to 16 if
	// it's not specified.
	numOfRows = typeof numOfRows !== 'undefined' ? numOfRows : 16;
	numOfCols = typeof numOfCols !== 'undefined' ? numOfRows : numOfRows;
	
	// Remove existing board then add the new board.
	$('tr').remove();
	var thisBoard = getBoard(numOfRows);
	$('tbody').append($(thisBoard));

	setBlockDimensions(numOfRows);
}



var paintNow = false;
// default color is red.
var currentColor = 'red';


$(document).ready(function() {
	addBoard(16);

	$('div').on('mousedown', function() {
		paintNow = true;
	});

	$('div').on('mouseup', function() {
		paintNow = false;
	});

	$('.block').on('mouseenter', function() {
		// Original code to change the color of a tile.
		// if (paintNow && !$(this).hasClass('makered')) {
		// 	$(this).toggleClass('makered');
		// }

		// paint the tile the selected color if the mouse button is pressed.
		if (paintNow) {
			// Set the opacity. The opacity initially starts out at 0.2 and
			// increases 0.2 each time the tile is recolored. The opacity of
			// an initial, unpainted square is 1.0.
			var currentOpacity = +$(this).css('opacity');

			// if a square has not been painted before it's initial opacity is
			// 1.0 so set the the opacity to 0.2.  If the square has been
			// painted then increase it's opacity by 0.2. Once a painted
			// square's opacity is 1.0 do not change it's opacity agian.
			if ($(this).hasClass('painted') && currentOpacity < 1.0) {
				currentOpacity += 0.2;				
			}

			else if (!$(this).hasClass('painted')){
				currentOpacity = 0.2;
			}
			currentOpacity = currentOpacity.toString();

			// set the square's color, opacity and add the 'painted' class.
			$(this).css({'background-color': currentColor, 'opacity': currentOpacity});
			$(this).addClass('painted');
		}
	});


	$('.button').click(function() {
		var buttons = $('.button');
		buttons.removeClass('selected');
		$(this).addClass('selected');

		// set the color if a color select button was pressed.
		if ($(this).hasClass('color_select')) {
			switch($(this).attr('id')) {
				case 'red':
					currentColor = 'red';
					break;
				case 'blue':
					currentColor = 'blue';
					break;
				case 'yellow':
					currentColor = 'yellow';
					break;
				case 'white':
					currentColor = 'white';
					break;
				case 'black':
					currentColor = 'black';
					break;		
			}
		}


	});
    

});