const fs = require('fs');
const path = require('path');

const dir = 'D:/CEP/src/components/manheim';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const images = [
  'architecture.png',
  'cep_cog_integration.png',
  'cop_command_center.png',
  'fractal_ledger.png',
  'implementation.png',
  'ledger.png',
  'lotops.png',
  'vet-infrastructure.png'
];

files.forEach(f => {
    const p = path.join(dir, f);
    let txt = fs.readFileSync(p, 'utf8');
    let original = txt;
    
    images.forEach(img => {
        const regex = new RegExp(`<img[^>]*src="\\/assets\\/images\\/photos\\/${img}"[^>]*\\/>`, 'g');
        txt = txt.replace(regex, (match) => {
            return `<img src="/assets/images/photos/${img}" alt="Enterprise visual" style={{ width: '100%', maxWidth: '800px', height: 'auto', maxHeight: '360px', objectFit: 'contain', margin: '0 auto 2.5rem auto', display: 'block', borderRadius: '16px', opacity: 0.85 }} />`;
        });
    });

    if (txt !== original) {
        fs.writeFileSync(p, txt);
        console.log('Updated ' + f);
    }
});
