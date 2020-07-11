async function loadAuthorData () {
    let response = await fetch('https://reststop.randomhouse.com/resources/authors/52588', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
    let data = await response.json();
    return data;
}

let author;
loadAuthorData()
.then(data => author = data)
.then(() => {
    const authorName = author.authordisplay;
    const authorBio = author.spotlight;
    let titles = [];
    
    author.titles.isbn.forEach((item, index) => {
        titles[index] = item.$;
    });
    
    document.querySelector('.api-header').innerHTML = authorName;
    document.querySelector('.api-biography').innerHTML = authorBio;
    
    
    async function addTitle (string) {
        let isbn = parseInt(string, 10);
        let titleData = await fetch(`https://reststop.randomhouse.com/resources/titles/${isbn}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        titleData = await titleData.json();
        const list = document.querySelector('ul');
        const li = document.createElement('li');
        li.innerHTML = titleData.titleweb;
        list.appendChild(li);
    }
    
    titles.forEach((item) => {
        addTitle(item)
    });
});