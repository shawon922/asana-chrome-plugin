const addStartAndEndButtons = function() {
  const singleTaskPaneSpreadsheetHeader = document.querySelector('.SingleTaskPaneSpreadsheet-header');
  if (!singleTaskPaneSpreadsheetHeader) return;
  const startButton = document.createElement('button');
  startButton.setAttribute('class', 'start-btn Button Button--secondary Button--secondaryColorOnHoverOnly Button--xsmall StatusButton--isUnset StatusButton--isSpreadsheetTaskPane StatusButton TaskPaneToolbarCompletionButton');
  startButton.innerText = `S`;
  startButton.addEventListener('click', function(event) {
    alert('task started!')
  });
  
  const endButton = document.createElement('button');
  
  endButton.setAttribute('class', 'end-btn Button Button--secondary Button--secondaryColorOnHoverOnly Button--xsmall StatusButton--isUnset StatusButton--isSpreadsheetTaskPane StatusButton TaskPaneToolbarCompletionButton');
  endButton.innerText = `E`;
  endButton.addEventListener('click', function(event) {
    alert('task ended!')
  });

  singleTaskPaneSpreadsheetHeader.prepend(endButton);

  singleTaskPaneSpreadsheetHeader.prepend(startButton);

};

window.addEventListener("load", function() { 
  this.setTimeout(function() {
    addStartAndEndButtons();
  }, 3000);
  console.log('Here we go...');
});

