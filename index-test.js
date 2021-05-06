const MTG = require('mtgsdk');

const isInArray = (array, text) => {
    let found = false;
    for (const item of array) {
        if (item['text'] === text) {
            found = true;
            break;
        }
    }
    return found;
}

const printCards = (cards, name) => {
    let found = [];
    let maxItems = name.includes('//') ? 2 : 1;
    for (let i = 0; i < cards.length && maxItems != found.size; i++) {
        if (cards[i]['name'] === name) {
            if (!isInArray(found, cards[i]['text'])) {
                found.push(cards[i]);
            }
        }
    }
    if (found.length === 2 && found[0].text.includes('Transforms')) {
        const tmp = found[0];
        found[0] = found[1];
        found[1] = tmp;
    }
    console.log(found);
    for (const f of found) {
        console.log(f['name'] + ' | ' + f['manaCost']);
        console.log(f['text']);
    }
}

MTG.card.where({ name: 'Primal Amulet // Primal Wellspring', page: 0 })
    .then((cards) => {
        printCards(cards, 'Primal Amulet // Primal Wellspring');
    }).catch((error) => {
        console.log(error);
    });

// MTG.card.where({ name: 'Expansion // Explosion', page: 0 })
//     .then((cards) => {
//         // console.log(cards[0]);
//         printCards(cards, 'Expansion // Explosion');
//     }).catch((error) => {
//         console.log(error);
//     });

// MTG.card.where({ name: 'Commit // Memory', page: 0 })
//     .then((cards) => {
//         printCards(cards, 'Commit // Memory');
//     }).catch((error) => {
//         console.log(error);
//     });

// MTG.card.where({ name: 'Breaking // Entering', page: 0 })
//     .then((cards) => {
//         printCards(cards, 'Breaking // Entering');
//     }).catch((error) => {
//         console.log(error);
//     });

// MTG.card.where({ name: 'Akki Lavarunner // Tok-Tok, Volcano Born', page: 0 })
//     .then((cards) => {
//         printCards(cards, 'Akki Lavarunner // Tok-Tok, Volcano Born');
//     }).catch((error) => {
//         console.log(error);
//     });
// // Long-Term Plans
// MTG.card.where({ name: 'Island', page: 0 })
//     .then((cards) => {
//         printCards(cards, 'Island');
//     }).catch((error) => {
//         console.log(error);
//     });

// MTG.card.where({ name: 'Long-Term Plans', page: 0 })
// .then((cards) => {
//     printCards(cards, 'Long-Term Plans');
// }).catch((error) => {
//     console.log(error);
// });