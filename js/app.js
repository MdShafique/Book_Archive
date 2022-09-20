const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', () => {
    // previous content clear
    document.getElementById('items').innerHTML = '';
    document.getElementById('warning').innerHTML = '';

    const inputText = document.getElementById('input').value;
    // validation
    if (inputText.length > 0) {
        document.getElementById('spinner').classList.remove('d-none');
        getData(inputText);
    } else {
        warningMessage("No Input! Please input a book name!");
    }
    document.getElementById('input').value = '';
})

// fetch data from the function
const fetchData = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

const getData = (inputText) => {
    fetchData(`https://openlibrary.org/search.json?q=${inputText}`).then(data => {
        // console.log(data);
        document.getElementById('spinner').classList.add('d-none');
        if (data.docs.length === 0) {
            warningMessage("Search results not found!");
        } else {
            document.getElementById('warning').innerHTML = `
            <h2>Search results found ${data.numFound}</h2>
        `
            const parentDiv = document.getElementById('items');
            data.docs.forEach(book => {
                const { title, first_publish_year, publisher, author_name, cover_i } = book;
                const col = document.createElement('div');
                col.classList.add('col');
                col.style.boxShadow = "0 10px 20px gray";
                const image = cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg` : `img/me.jpg`;
                col.innerHTML = `
            <div class="card h-100">
            <img height="300px" width="150px" src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p>Author: ${author_name ? author_name[0] : `empty!`}</p>
              <p>Published year: ${first_publish_year ? first_publish_year : `empty!`}</p>
              <p>Publisher: ${publisher ? publisher[0] : `empty!`}</p>
            </div>
          </div>
            `
                parentDiv.appendChild(col);
            })
        }
    })
}

const warningMessage = (message) => {
    document.getElementById('warning').innerHTML = `
        <h2>${message}</h2>
    `
}