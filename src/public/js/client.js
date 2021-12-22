async function getUserSelected() {
  const url = '/api/student/selected';
  const container = document.getElementById('container-users-selected');
  container.getElementsByTagName('ul')[0].textContent = '';
  const response = await request(url, {
    method: 'GET'
  });
  if(response.length === 0) {
    const message = document.createElement('h4');
    message.textContent = 'No hay usuarios selecconados por favor de click para seleccionar un usuario al azar';
    container.appendChild(message);
    return;
  }

  response.forEach(element => {
    const li = document.createElement('li');
    li.textContent = element;
    container.getElementsByTagName('ul')[0].appendChild(li);
  });
}

async function getUserRandom() {
  const url = '/api/student/random';
  const container = document.getElementById('user-selected');
  container.textContent = '';
  const response = await request(url, {
    method: 'GET'
  });
  container.textContent = response.studentSelected;
  container.appendChild(message);
}
