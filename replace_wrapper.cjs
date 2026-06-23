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

// 1. Whitepaper.tsx
replaceInFile('D:/CEP/src/pages/Whitepaper.tsx', [
    ['LUME-V — Deterministic Governance Wrapper', 'LUME-V — Deterministic Governance Substrate'],
    ['deterministic governance wrapper', 'deterministic governance substrate'],
    ['Deterministic wrapper over legacy systems', 'Deterministic substrate beneath legacy systems'],
    ["LUME-V's enterprise wrapper", "LUME-V's enterprise substrate"],
    ['LUME-V wrapper', 'LUME-V substrate'],
    ['governance wrapper', 'governance substrate'],
    ['Governance Wrapper', 'Governance Substrate'],
    ['wrapping legacy systems', 'substrating legacy systems'],
]);

// 2. TechDeepDive.tsx
replaceInFile('D:/CEP/src/components/engineering/TechDeepDive.tsx', [
    ['LUME-V wrapper', 'LUME-V substrate'],
    ['Lume-V Verification Wrapper', 'Lume-V Verification Substrate'],
    ['Wraps any existing system', 'Operates as a substrate beneath any existing system']
]);

// 3. COPSection.tsx
replaceInFile('D:/CEP/src/components/networknode/COPSection.tsx', [
    ['governance wrapper', 'governance substrate'],
    ['meta-operating system wrapper', 'meta-operating system substrate']
]);

// 4. EcosystemCTA.tsx
replaceInFile('D:/CEP/src/components/networknode/EcosystemCTA.tsx', [
    ['verification wrapper', 'verification substrate']
]);

// 5. ImplementationPath.tsx
replaceInFile('D:/CEP/src/components/networknode/ImplementationPath.tsx', [
    ['governance wrapper', 'governance substrate']
]);

// 6. LotOpsProSection.tsx
replaceInFile('D:/CEP/src/components/networknode/LotOpsProSection.tsx', [
    ['deterministic wrapper', 'deterministic substrate']
]);

// 7. PersonalNote.tsx
replaceInFile('D:/CEP/src/components/networknode/PersonalNote.tsx', [
    ['governance wrapper', 'governance substrate']
]);

// 8. LumeVSection.tsx
replaceInFile('D:/CEP/src/components/networknode/LumeVSection.tsx', [
    ["the COG wrapper surrounds", "the COG substrate underlies"],
    ['Governance Wrapper', 'Governance Substrate'],
    ['modernization wrapper', 'modernization substrate'],
    ['COP wrapper', 'COP substrate']
]);
