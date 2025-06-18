function createLogItem(text) {
  const li = document.createElement('li');
  li.textContent = text;

  const deleteBtn = document.createElement('span');
  deleteBtn.textContent = 'x';
  deleteBtn.style.color = 'red';
  deleteBtn.style.marginLeft = '10px';
  deleteBtn.style.cursor = 'pointer';
  deleteBtn.title = 'Delete this entry';
  
  //When clicked, remove the entry and update localStorage
  deleteBtn.addEventListener('click', () => {
    li.remove();

    //Update localStoarge by removing this text
    const existing = JSON.parse(localStorage.getItem('liftLog') || '[]');
    const filtered = existing.filter(item => item !== text);
    localStorage.setItem('liftLog', JSON.stringify(filtered)); 
  });

  li.appendChild(deleteBtn);
  return li;
}

document.getElementById('log-btn').addEventListener('click', () => {
  const split = document.getElementById('split').value;
  const muscleGroup = document.getElementById('muscle-group').value;
  const exercise = document.getElementById('exercise').value;
  const weight = document.getElementById('weight').value;
  const reps = document.getElementById('reps').value;

  const logItem = `${new Date().toLocaleString()} — ${split} — ${muscleGroup}— ${exercise}: ${weight} lbs x ${reps} reps`;

  const li = createLogItem(logItem);
  document.getElementById('log-list').prepend(li);


  // Save to localStorage
  const existing = JSON.parse(localStorage.getItem('liftLog') || '[]');
  existing.unshift(logItem);
  localStorage.setItem('liftLog', JSON.stringify(existing));

  // Clear inputs
  document.getElementById('muscle-group').value = '';
  document.getElementById('exercise').value = '';
  document.getElementById('weight').value = '';
  document.getElementById('reps').value = '';
});

// Load saved log on page load
window.addEventListener('load', () => {
  const existing = JSON.parse(localStorage.getItem('liftLog') || '[]');
  const list = document.getElementById('log-list');
  existing.forEach(item => {
    const li = createLogItem(item);
    list.appendChild(li);
  });
});