const fs = require('fs');
const path = require('path');
const dir = 'D:/CEP/src/components/manheim';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

files.forEach(f => {
    const p = path.join(dir, f);
    let txt = fs.readFileSync(p, 'utf8');
    
    // Replace the style attribute of these specific images to limit max-width to 800px and center them
    let newTxt = txt.replace(/<img src="\/assets\/images\/photos\/(architecture|cep_cog_integration|cop_command_center|fractal_ledger|implementation|ledger|lotops|vet-infrastructure)\.png"[^>]*style={{([^}]+)}}[^>]*\/>/g, (match, p1, p2) => {
        return match.replace(p2, ` width: '100%', maxWidth: '800px', margin: '0 auto 2.5rem auto', display: 'block', height: 'auto', borderRadius: '20px', border: '1px solid var(--border-light)', opacity: 0.85 `);
    });

    if (txt !== newTxt) {
        fs.writeFileSync(p, newTxt);
        console.log('Updated ' + f);
    }
});
