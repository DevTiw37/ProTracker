document.getElementById('motivationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    var motivationLevel = document.getElementById('motivationLevel').value;
    var currentDate = new Date().toLocaleDateString();
    var motivationEntry = {
      level: motivationLevel,
      date: currentDate
    };
    
    addMotivationEntry(motivationEntry);
  });
  
  function addMotivationEntry(entry) {
    var entryElement = document.createElement('li');
    entryElement.textContent = entry.date + ' - ' + entry.level;
    
    document.getElementById('motivationList').appendChild(entryElement);
    
    calculateDuration();
  }
  
  function calculateDuration() {
    var entries = document.getElementById('motivationList').getElementsByTagName('li');
    
    if (entries.length > 1) {
      var firstEntryDate = new Date(entries[0].textContent.split(' - ')[0]);
      var lastEntryDate = new Date(entries[entries.length - 1].textContent.split(' - ')[0]);
      var duration = Math.round((lastEntryDate - firstEntryDate) / (1000 * 60 * 60 * 24));
      
      document.getElementById('motivationEntries').setAttribute('data-duration', duration);
    }
  }
  