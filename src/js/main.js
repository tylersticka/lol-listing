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

  // FILTERING

  var input = document.getElementById('filter');
  var rows = document.querySelectorAll('tr:not(:first-of-type)');
  var filterEvent = function () {
    var search = input.value.trim();
    var row, link, linkText, show, i;
    for (i = 0; i < rows.length; i++) {
      row = rows[i];
      show = true;
      if (search.length) {
        link = row.querySelector('td:nth-child(2) > a');
        linkText = link.innerHTML;
        show = linkText.indexOf(search) > -1;
      }
      row.style.display = show ? '' : 'none';
    }
  };
  input.addEventListener('keyup', filterEvent);

})(window, document, moment);
