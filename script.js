const form = document.getElementById('productivity-form');
const list = document.getElementById('productivity-list');
const exportExcelBtn = document.getElementById('export-excel-btn');
const copyClipboardBtn = document.getElementById('copy-clipboard-btn');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const productivityLevel = document.getElementById('productivity-level').value;
  const currentTime = new Date().toLocaleString();

  const listItem = document.createElement('li');
  listItem.classList.add('productivity-item');
  listItem.innerHTML = `<span>Productivity Level:</span> ${productivityLevel} - <span>Time:</span> ${currentTime}`;

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-btn');
  deleteButton.innerText = 'Delete';

  deleteButton.addEventListener('click', function() {
    listItem.remove();
    removeEntry(productivityLevel, currentTime);
  });

  listItem.appendChild(deleteButton);

  list.insertBefore(listItem, list.firstChild);

  saveEntry(productivityLevel, currentTime);

  form.reset();
});

window.addEventListener('load', function() {
  loadEntries();
});

function saveEntry(level, time) {
  let entries = JSON.parse(localStorage.getItem('productivityEntries')) || [];

  entries.push({ level, time });
  localStorage.setItem('productivityEntries', JSON.stringify(entries));
}

function loadEntries() {
  const entries = JSON.parse(localStorage.getItem('productivityEntries'));

  if (entries) {
    entries.reverse().forEach(function(entry) {
      const listItem = document.createElement('li');
      listItem.classList.add('productivity-item');
      listItem.innerHTML = `<span>Productivity Level:</span> ${entry.level} - <span>Time:</span> ${entry.time}`;

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-btn');
      deleteButton.innerText = 'Delete';

      deleteButton.addEventListener('click', function() {
        listItem.remove();
        removeEntry(entry.level, entry.time);
      });

      listItem.appendChild(deleteButton);

      list.appendChild(listItem);
    });
  }
}

function removeEntry(level, time) {
  let entries = JSON.parse(localStorage.getItem('productivityEntries'));

  entries = entries.filter(function(entry) {
    return !(entry.level === level && entry.time === time);
  });

  localStorage.setItem('productivityEntries', JSON.stringify(entries));
}

exportExcelBtn.addEventListener('click', function() {
  const entries = JSON.parse(localStorage.getItem('productivityEntries'));
  if (entries) {
    const worksheet = XLSX.utils.json_to_sheet(entries);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Productivity Entries');
    XLSX.writeFile(workbook, 'productivity_entries.xlsx');
  } else {
    console.log('No entries to export.');
  }
});

copyClipboardBtn.addEventListener('click', function() {
  const entries = JSON.parse(localStorage.getItem('productivityEntries'));
  if (entries) {
    const clipboardData = entries.map(entry => Object.values(entry).join('\t')).join('\n');
    const clipboard = new ClipboardJS('#copy-clipboard-btn', {
      text: function() {
        return clipboardData;
      }
    });
    clipboard.on('success', function(e) {
      console.log('Copied to clipboard');
      clipboard.destroy();
    });
    clipboard.on('error', function(e) {
      console.log('Failed to copy to clipboard');
      clipboard.destroy();
    });
    clipboard.onClick({ currentTarget: document.getElementById('copy-clipboard-btn') });
  } else {
    console.log('No entries to copy.');
  }
});