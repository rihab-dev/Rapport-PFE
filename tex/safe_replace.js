const fs = require('fs');

const files = [
    'd:/PFE/Rapport1/tex/chapitre3.tex',
    'd:/PFE/Rapport1/tex/chapitre4.tex',
    'd:/PFE/Rapport1/tex/chapitre5.tex',
];

function u2l(str) {
    return Buffer.from(str, 'utf8').toString('latin1');
}

for (const f of files) {
    const content = fs.readFileSync(f, 'latin1');
    const lines = content.split(/\r?\n/);

    let inAlt = false;
    let inExc = false;
    let itemizeDepth = 0;

    for (let i = 0; i < lines.length; i++) {
        // 1. Headers fixes
        lines[i] = lines[i]
            .replace(u2l('\\textbf{Scénarios alternatifs}'), u2l('\\textbf{Scénario alternatif}'))
            .replace(u2l('\\textbf{Scénario alternatifs}'), u2l('\\textbf{Scénario alternatif}'))
            .replace(u2l('\\textbf{Scénarios d\'exception}'), u2l('\\textbf{Scénario d\'exception}'))
            .replace(u2l('\\textbf{Scénario exceptionnels}'), u2l('\\textbf{Scénario d\'exception}'))
            .replace(u2l('\\textbf{Scénarios exceptionnels}'), u2l('\\textbf{Scénario d\'exception}'))
            .replace(u2l('\\textbf{Préconditions}'), u2l('\\textbf{Précondition}'))
            .replace(u2l('\\textbf{Postconditions}'), u2l('\\textbf{Postcondition}'))
            // Also fallback without accents just in case
            .replace('\\textbf{Scenarios alternatifs}', '\\textbf{Scénario alternatif}')
            .replace('\\textbf{Scenarios d\'exception}', '\\textbf{Scénario d\'exception}')
            .replace('\\textbf{Preconditions}', '\\textbf{Précondition}')
            .replace('\\textbf{Postconditions}', '\\textbf{Postcondition}');

        // 2. Track blocks
        if (lines[i].includes(u2l('\\textbf{Scénario alternatif}'))) {
            inAlt = true;
            inExc = false;
            itemizeDepth = 0;
        } else if (lines[i].includes(u2l('\\textbf{Scénario d\'exception}'))) {
            inAlt = false;
            inExc = true;
            itemizeDepth = 0;
        } else if (lines[i].includes('\\hline') || lines[i].includes('\\end{longtable}')) {
            inAlt = false;
            inExc = false;
        }

        // 3. Replace itemize to enumerate inside blocks
        if (inAlt || inExc) {
            if (lines[i].includes('\\begin{itemize}')) {
                itemizeDepth++;
                if (itemizeDepth === 1) {
                    const prefix = inAlt ? 'A' : 'E';
                    lines[i] = lines[i].replace(/\\begin\{itemize\}(\[[^\]]*\])?/, `\\begin{enumerate}[label=${prefix}\\arabic*.,nosep,leftmargin=0.6cm,topsep=0pt,itemsep=1pt]`);
                }
            }
            if (lines[i].includes('\\end{itemize}')) {
                if (itemizeDepth === 1) {
                    lines[i] = lines[i].replace('\\end{itemize}', '\\end{enumerate}');
                }
                itemizeDepth = Math.max(0, itemizeDepth - 1);
            }
        }

        // 4. Standardize the textual description headings
        // Match Description textuelle d[e|u] cas d[’|']utilisation...
        // We want to handle guillemets safely.
        const titleRegex = /Description textuelle d[eu] cas d[’'\xE2\x80\x99]+utilisation\s*(\xc2\xab)?\s*(.*?)\s*(\xc2\xbb)?/g;
        lines[i] = lines[i].replace(titleRegex, (m, gStart, innerText, gEnd) => {
            // innerText could accidentally match until the end of line if there are no guillemets
            // If it's a \captionof{table}{Description textuelle du cas d'utilisation « Ajouter client »} 
            // The `}` is at the end. We must not consume it.
            let clean = innerText.replace(/\xc2\xab/g, '').replace(/\xc2\xbb/g, '').trim();
            if (clean.endsWith('}')) {
                clean = clean.slice(0, -1).trim();
                return u2l("Description textuelle du cas d’utilisation « ") + clean + u2l(" »}");
            }
            return u2l("Description textuelle du cas d’utilisation « ") + clean + u2l(" »");
        });
    }

    // To be super safe about `d'utilisation` vs `d’utilisation`
    let joined = lines.join('\n');
    fs.writeFileSync(f, joined, 'latin1');
    console.log(`Processed ${f}`);
}
