(function(window, document, moment, undef) {
  'use strict';

  // DATE FORMATTING

  var modifiedCells = document.querySelectorAll('td:nth-child(3)');
  Array.prototype.forEach.call(modifiedCells, function(cell, i) {
    var content = cell.textContent;
    var m = moment(new Date(content));
    var newContent = '<time datetime="' + m.format('YYYY-MM-DD HH:mm') + '">';

    if (m.isBefore(moment().subtract(1, 'week'))) {
      newContent += m.format('MMM D, YYYY h:mm A');
    } else {
      newContent += m.fromNow();
    }

    newContent += '</time>';
    cell.innerHTML = newContent;
  });

})(window, document, moment);
