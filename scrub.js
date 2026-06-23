import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPLACEMENTS = [
    { search: /flaautoinc\.com/g, replace: 'darkwavestudios.com' },
    { search: /fla\.tlid\.io/g, replace: 'fla.tlid.io' },
    { search: /fla-automotive-ledger\.onrender\.com/g, replace: 'fla-ledger.onrender.com' },
    { search: /Fractal Ledger Architecture/g, replace: 'Fractal Ledger Architecture' },
    { search: /FLA Enterprise/g, replace: 'FLA Enterprise' },
    { search: /Fractal Ledger Architecture/g, replace: 'Fractal Ledger Architecture' },
    { search: /FLA Operating System/g, replace: 'FLA Operating System' },
    { search: /FLA-DEP/g, replace: 'FLA-DEP' },
    { search: /FLA-DEP/g, replace: 'FLA-DEP' },
    { search: /FLA-PL/g, replace: 'FLA-PL' },
    { search: /FLA-VL/g, replace: 'FLA-VL' },
    { search: /FLA-LGS/g, replace: 'FLA-LGS' },
    { search: /FLA-OS/g, replace: 'FLA-OS' },
    { search: /NetworkNode/g, replace: 'NetworkNode' },
    { search: /networknode/g, replace: 'networknode' },
    { search: /FLA/g, replace: 'FLA' },
    { search: /FLA/g, replace: 'FLA' },
    { search: /fla/g, replace: 'fla' }
];

const ALLOWED_EXTS = ['.ts', '.tsx', '.js', '.jsx', '.html', '.md', '.json', '.css', '.cjs'];
const IGNORE_DIRS = ['node_modules', '.git', 'dist', 'build', 'public'];

function renameRecursive(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (IGNORE_DIRS.includes(file) && dir === __dirname) continue;
        
        const fullPath = path.join(dir, file);
        let newName = file
            .replace(/NetworkNode/g, 'NetworkNode')
            .replace(/networknode/g, 'networknode')
            .replace(/FLA/g, 'FLA')
            .replace(/FLA/g, 'FLA')
            .replace(/fla/g, 'fla');
            
        const newPath = path.join(dir, newName);
        if (newName !== file) {
            fs.renameSync(fullPath, newPath);
        }
        
        if (fs.statSync(newPath).isDirectory()) {
            renameRecursive(newPath);
        }
    }
}

function walkAndReplace(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            if (!IGNORE_DIRS.includes(file)) {
                walkAndReplace(fullPath);
            }
        } else {
            const ext = path.extname(fullPath);
            if (ALLOWED_EXTS.includes(ext) && file !== 'package-lock.json') {
                let content = fs.readFileSync(fullPath, 'utf8');
                let modified = false;
                
                for (const rule of REPLACEMENTS) {
                    if (rule.search.test(content)) {
                        content = content.replace(rule.search, rule.replace);
                        modified = true;
                    }
                }
                
                if (modified) {
                    fs.writeFileSync(fullPath, content, 'utf8');
                    console.log(`Scrubbed: ${fullPath}`);
                }
            }
        }
    }
}

console.log('Starting file renaming...');
renameRecursive(__dirname);

console.log('Starting file content replacement...');
walkAndReplace(__dirname);
console.log('Scrub complete.');
