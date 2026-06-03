const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    for (const [search, replace] of replacements) {
        content = content.split(search).join(replace);
    }
    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log('Updated ' + filePath);
    }
}

// 1. PersonalNote.tsx
replaceInFile('D:/CEP/src/components/manheim/PersonalNote.tsx', [
    ['There are a dozen sections below covering everything from the governance substrate and the private ledger', 'There are more than a dozen sections below covering everything from the governance substrate to the fractal dual-ledger architecture']
]);

// 2. TechDeepDive.tsx
replaceInFile('D:/CEP/src/components/engineering/TechDeepDive.tsx', [
    ['Enterprise Trust Chain (CAL)', 'Fractal Trust Chain (CAL)'],
    ['Dual-ledger architecture (CAL + VET)', 'Dual-ledger per division (CAL + VET)']
]);

// 3. PlainEnglish.tsx
replaceInFile('D:/CEP/src/components/manheim/PlainEnglish.tsx', [
    ['I built a **dual-ledger architecture** to completely isolate your data.', 'I built a **fractal dual-ledger architecture** (a dual-ledger per division) to completely isolate your data.']
]);

// 4. Whitepaper.tsx
replaceInFile('D:/CEP/src/pages/Whitepaper.tsx', [
    // Update CAL section
    ['A private, permissioned cryptographic ledger', 'A division-level private, permissioned cryptographic ledger'],
    ['It provides the tamper-proof operational truth layer', 'As part of the fractal ledger architecture, it provides the tamper-proof operational truth layer'],
    // Update VET section
    ['VET is architecturally distinct from CAL.', "VET forms the public half of the division's dual-ledger."],
    ['CAL is the private, internal operational ledger', "CAL is the division's private, internal operational ledger"],
    ['VET is the commercial-facing verification ledger', "VET is the division's commercial-facing verification ledger"]
]);

// 5. CoxLedgerSection.tsx
replaceInFile('D:/CEP/src/components/manheim/CoxLedgerSection.tsx', [
    ['The private, tamper-proof operational ledger', 'The division-level private, tamper-proof operational ledger']
]);
