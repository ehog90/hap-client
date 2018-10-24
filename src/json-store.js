import * as fs from "fs";


function getAllPasswords() {
    return Promise.create((resolve, reject) => {
        fs.readFile("./pwd-store.json", (err, data) => {
            resolve(JSON.parse(data));
        })
    });
}

function savePasswords(data) {
    return Promise.create((resolve, reject) => {
        fs.writeFile("./pwd-store.json", JSON.stringify(data), (err) => {
            resolve();
        })
    });
}


export async function setPassword(service, account, password) {
    const existingData = await getAllPasswords;
    const existing = existingData.find(x => x.service === service && x.account === account);
    if (existing.length === 0) {
        existingData.push({service: service, account: account, password: password});
    } else {
        existing[0].password = password
    }
    await savePasswords(existingData);
    return Promise.resolve();
}

export async function getPassword(service, account) {
    const existingData = await getAllPasswords;
    existingData.find(x => x.service === service && x.account === account);
    return Promise.resolve(existingData.length === 0 ? null : existingData[0].password);
}