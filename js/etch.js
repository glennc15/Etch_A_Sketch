

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


$(document).ready(function() {
	addBoard(16);

	$('div').on('mousedown', function() {
		paintNow = true;
	});

	$('div').on('mouseup', function() {
		paintNow = false;
	});

	$('.block').on('mouseenter', function() {
	// $('.block').on('hover', function() {

		// alert("paintNow: " + paintNow);
		if (paintNow && !$(this).hasClass('makered')) {
			$(this).toggleClass('makered');
		}
       // alert("I'm clicked!");
		// $(this).toggleClass('makered');
	});
    
 //    // this works!!! Test click event handler to get correct block working.
 //    $('.block').click(function() {
	// 	$(this).toggleClass('makered');
	// });

});