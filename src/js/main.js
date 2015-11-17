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

  var filterRows = function (search, rows, labelSelector) {
    var row;
    var link;
    var linkText;
    var show;
    var i;

    search = search || '';
    rows = rows || document.querySelector('tr');
    labelSelector = labelSelector || 'a';

    for (i = 0; i < rows.length; i++) {
      row = rows[i];
      show = true;

      if (search.length) {
        link = row.querySelector(labelSelector);
        linkText = link.innerHTML;
        show = linkText.indexOf(search) > -1;
      }

      row.style.display = show ? '' : 'none';
    }
  };

  var filterEvent = function () {
    filterRows(input.value.trim(), rows, 'td:nth-child(2) > a');
  };

  input.addEventListener('keyup', filterEvent);
  input.addEventListener('change', filterEvent);

  // SORT INDICATORS

  var queryString = window.location.search;
  var ascending = (queryString.indexOf('O=D') === -1);
  var currentHeading;

  if (queryString.indexOf('C=M') > -1) {
    currentHeading = document.querySelector('th > a[href*="?C=M"]');
  } else if (queryString.indexOf('C=S') > -1) {
    currentHeading = document.querySelector('th > a[href*="?C=S"]');
  } else {
    currentHeading = document.querySelector('th > a[href*="?C=N"]');
  }

  currentHeading.classList.add(ascending ? 'asc' : 'desc');

})(window, document, moment);
