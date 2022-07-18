const btnSearch = document.getElementById('btn-search');

btnSearch.addEventListener('click', async (e) => {
  e.preventDefault();
  const brand = document.getElementById('input-brand').value || null;
  const color = document.getElementById('input-color').value || null;
  const price = document.getElementById('input-price').value || null;
  if (brand || color || price) {
    brand ? `brand=${brand}` : '';
    const response = await fetch(
      `http://localhost:3000/api/search?${brand ? `brand=${brand}` : ''}${color ? `&color=${color}` : ''}${price ? `&price=${price}` : ''}`);
    const data = await response.json();
    const elemContent = document.getElementById('content');
    elemContent.innerHTML = '';
    for (let i = 0; i < data.result.length; i++) {
      const car = data.result[i];
      const newDiv = document.createElement('div');
      newDiv.classList.add('car');
      for (const property in car) {
        const newP = document.createElement('p');
        console.log(`${property}: ${car[property]}`)
        newP.innerText = `${property}: ${car[property]}`;
        newDiv.append(newP);
      }
      elemContent.appendChild(newDiv);
    }
  }
});
