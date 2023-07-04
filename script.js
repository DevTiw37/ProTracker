document.getElementById('productivityForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  var productivityLevel = document.getElementById('productivityLevel').value;
  var currentDate = new Date().toLocaleDateString();
  var productivityEntry = {
    level: productivityLevel,
    date: currentDate
  };
  
  addProductivityEntry(productivityEntry);
});

function addProductivityEntry(entry) {
  var entryElement = document.createElement('li');
  entryElement.textContent = entry.date + ' - ' + entry.level;
  
  document.getElementById('productivityList').appendChild(entryElement);
  
  calculateDuration();
}

function calculateDuration() {
  var entries = document.getElementById('productivityList').getElementsByTagName('li');
  
  if (entries.length > 1) {
    var firstEntryDate = new Date(entries[0].textContent.split(' - ')[0]);
    var lastEntryDate = new Date(entries[entries.length - 1].textContent.split(' - ')[0]);
    var duration = Math.round((lastEntryDate - firstEntryDate) / (1000 * 60 * 60 * 24));
    
    document.getElementById('productivityEntries').setAttribute('data-duration', duration);
  }
}
