const MTG = require('mtgsdk');
const FS = require('fs');
const PATH = require('path');
const fetch = require("node-fetch");

const CARD_MAP = {};
const dataObjs = [];

// const cardMapIsReady = () => {
//     let isReady = false;
//     let firstTimePass = true;
//     for (const key in CARD_MAP) {
//         if (firstTimePass) {
//             isReady = true;
//             firstTimePass = false;
//         }
//         if (key) {
//             isReady = isReady && CARD_MAP[key];
//         }
//     }
//     return isReady;
// }

// const cardMapIsFull200 = () => {
//     let isAll200 = false;
//     let firstTimePass = true;
//     for (const key in CARD_MAP) {
//         if (firstTimePass) {
//             isAll200 = true;
//             firstTimePass = false;
//         }
//         if (key) {
//             isAll200 = isAll200 && CARD_MAP[key] == 2;
//         }
//     }
//     return isAll200;
// }

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

const readCardFromDB = (mtgCard) => {
    const nickName = mtgCard['Nickname'];
    MTG.card.where({ name: nickName, page: 0 })
        .then((cards) => {
            let cardItems = [];
            let maxItems = nickName.includes('//') ? 2 : 1;
            for (let i = 0; i < cards.length && maxItems != cardItems.size; i++) {
                if (cards[i]['name'] === nickName) {
                    if (!isInArray(cardItems, cards[i]['text'])) {
                        cardItems.push(cards[i]);
                    }
                }
            }

            if (cardItems.length === 2
                && (cardItems[0]['text'].includes('Transforms')
                    || cardItems[0]['text'].includes('Aftermath')
                    || cardItems[1]['text'].includes('flip it'))) {
                const tmp = cardItems[0];
                cardItems[0] = cardItems[1];
                cardItems[1] = tmp;
            }

            for (let i = 0; i < cardItems.length; i++) {
                if (i == 0) {
                    mtgCard['Nickname'] = cardItems[i]['name'].split(' // ')[0];
                    if (cardItems[i]['manaCost']) {
                        mtgCard['Nickname'] += ' | ' + cardItems[i]['manaCost'];
                    }
                    mtgCard['Description'] = '[b]' + cardItems[i]['type'] + '[/b]\n' + cardItems[i]['text'];
                    if (cardItems[i]['type'].includes('Creature')) {
                        mtgCard['Description'] += '\n[b]' + cardItems[i]['power'] + ' / ' + cardItems[i]['toughness'] + '[/b]';
                    } else if (cardItems[i]['type'].includes('Planeswalker')) {
                        mtgCard['Description'] += '\n[b][' + cardItems[i]['loyalty'] + '][/b]';
                    }
                } else {
                    mtgCard['Nickname'] += ' // ' + cardItems[i]['name'].split(' // ')[1];
                    if (cardItems[i]['manaCost']) {
                        mtgCard['Nickname'] += ' | ' + cardItems[i]['manaCost'];
                    }
                    mtgCard['Description'] += '\n//[b]\n' + cardItems[i]['type'] + '[/b]\n' + cardItems[i]['text'];
                    if (cardItems[i]['type'].includes('Creature')) {
                        mtgCard['Description'] += '\n[b]' + cardItems[i]['power'] + ' / ' + cardItems[i]['toughness'] + '[/b]';
                    } else if (cardItems[i]['type'].includes('Planeswalker')) {
                        mtgCard['Description'] += '\n[b][' + cardItems[i]['loyalty'] + '][/b]';
                    }
                }
            }
            console.log(nickName + ' -> done!');
            CARD_MAP[nickName] = 2;
            return mtgCard;
        }).catch((error) => {
            console.log('\n\n\n>>' + nickName + ' ERROR!!!!\n\n\n');
            CARD_MAP[nickName] = 1;
            return null;
        });
};

const recursiveCall = (i) => {
    if (dataObjs && (i || i === 0) && i < dataObjs.length) {
        const url = 'http://localhost:8080/api/mtg/save-tabletop-json';
        const params = {
            body: JSON.stringify(dataObjs[i])
            , method: 'POST'
            , headers: {
                'content-type': 'application/json; charset=UTF-8'
            }
        };
        fetch(url, params)
            .then(data => data.json())
            .then(res => {
                console.log('>> CALL ' + i + ' DONE!!');
                recursiveCall(i + 1)
            });
    }
}

const backEndCall = (i) => {
    if (dataObjs && (i || i === 0) && i < dataObjs.length) {
        const url = 'http://localhost:8080/api/mtg/save-tabletop-json';
        const params = {
            body: JSON.stringify(dataObjs[i])
            , method: 'POST'
            , headers: {
                'content-type': 'application/json; charset=UTF-8'
            }
        };
        fetch(url, params)
            .then(data => data.json())
            .then(res => {
                console.log('>> CALL ' + i + ' DONE!!');
            });
    }
}

const directoryPath = PATH.join(__dirname, 'input');
//passsing directoryPath and callback function
const files = FS.readdirSync(directoryPath);
let timeout = 0;
for (let a = 0; a < files.length; a++) {
    const data = FS.readFileSync(PATH.join(directoryPath, files[a]), 'utf8');
    const dataObj = JSON.parse(data);
    dataObj['fileName'] = files[a];
    dataObjs.push(dataObj);
    for (const objState of dataObj['ObjectStates']) {
        if (objState['CardID']) {
            timeout += 250;
            setTimeout(() => {
                // if (objState['Nickname'].includes('//')) {
                CARD_MAP[objState['Nickname']] = 0;
                readCardFromDB(objState);
                // }
            }, timeout);
        } else {
            for (const card of objState['ContainedObjects']) {
                timeout += 250;
                setTimeout(() => {
                    // if (card['Nickname'].includes('//')) {
                    CARD_MAP[card['Nickname']] = 0;
                    readCardFromDB(card);
                    // }
                }, timeout);
            }
        }
    }
    setTimeout(() => {
        backEndCall(a);
    }, (timeout + 3000));
}

// setTimeout(() => {
//     if (cardMapIsReady()) {
//         if (cardMapIsFull200()) {
//             console.log('>> DONE!');
//             recursiveCall(0);
//             // for (const dataObj of dataObjs) {
//             //     console.log('\n');
//             //     for (const objectState of dataObj['ObjectStates']) {
//             //         console.log('\n');
//             //         if (objectState['CardID']) {
//             //             console.log(objectState['Nickname']);
//             //             console.log(objectState['Description']);
//             //         } else {
//             //             for (const card of objectState['ContainedObjects']) {
//             //                 console.log('\n');
//             //                 console.log(card['Nickname']);
//             //                 console.log(card['Description']);
//             //             }
//             //         }
//             //     }
//             // }
//         } else {
//             console.log('>> ERRORS!');
//             for (const key in CARD_MAP) {
//                 if (key && CARD_MAP[key] === 1) {
//                     console.log(key);
//                 }
//             }
//         }
//     } else {
//         console.log('>> Not done yet');
//     }
// }, (timeout + 10000));
