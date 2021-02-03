document.addEventListener('DOMContentLoaded', () => {
    const cardArray = []
    const cardsWon = []
    const usedIDs = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0
    }
    
    function generateID() {
        let id = Math.ceil(Math.random() * 8) 

        while (usedIDs[id] >= 2) {
            id = Math.ceil(Math.random() * 8) 
        }

        usedIDs[id]++;
        return id;
    }

    for(let i = 0; i < 16; i++) {
        let id = generateID()
        cardArray.push({
            dataID: id,
            img: 'images/d_'+id+'.png'
        })
    }
    
    const grid = document.querySelector('.grid')
    let cardsChosen = []
    let cardsChosenID = []
    const result = document.getElementById('result')
    result.textContent = 0

    for(let i = 0; i < cardArray.length; i++) {
        var card = document.createElement('img')
        card.setAttribute('src', 'images/black.png')
        card.setAttribute('imgNum', i)
        card.addEventListener('click', flipCard)
        grid.appendChild(card)
    }

    function checkForMatch() {
        var cards = document.querySelectorAll('img')
        if(cardsChosen[0] === cardsChosen[1] &&
            cardsChosenID[0] !== cardsChosenID[1]) {

            for (let i=0; i<cardsChosen.length; i++) {
                cards[cardsChosenID[i]]
                    .setAttribute('src', 'images/w_' + 
                    String(Number(cardsChosenID[i]) + 1) 
                    + '.png')
                cards[cardsChosenID[i]]
                    .removeEventListener('click', flipCard)
            }

            cardsWon.push(cardsChosen)
        } else {
            cards[cardsChosenID[0]].setAttribute('src', 'images/black.png')
            cards[cardsChosenID[1]].setAttribute('src', 'images/black.png')
        }

        cardsChosen = []
        cardsChosenID = []
        result.textContent = cardsWon.length
        //debugger
        if(cardsWon.length * 2 === cardArray.length) {
            document.getElementById('score').innerHTML = 'Congrats! You Won 🎉';
            result.textContent = ' ';
        }
    }
    function flipCard() {
        //debugger 
        var cardID = this.getAttribute('imgNum')
        cardsChosen.push(cardArray[cardID].dataID)
        cardsChosenID.push(cardID)
        this.setAttribute('src', cardArray[cardID].img)

        if(cardsChosen.length === 2) {
            setTimeout(checkForMatch, 700)
        }
    }

})