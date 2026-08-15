const credentials = { username: 'john_doe', password: 'pass123' };
fetch('https://fakestoreapi.com/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(credentials)
})
  .then(response => response.json())
  .then(data => console.log(data));