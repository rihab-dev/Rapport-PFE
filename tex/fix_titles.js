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
    let content = fs.readFileSync(f, 'latin1');

    // We want to fix ONLY the title formats, cleaning up the garbage guillemets
    // Example bad string: \captionof{table}{Description textuelle du cas dâ€™utilisation Â«  Â»Signaler un problÃ¨me non rÃ©solu Â»}
    // Let's just find "Description textuelle d", match until "utilisation", then match the junk!

    const regex = /Description textuelle d[eu] cas d[\s\S]{1,5}utilisation([^\}]*)/g;

    content = content.replace(regex, (m, rest) => {
        // This matches inside \subsection{...} and \captionof{table}{...}
        // "rest" is everything until the '}'
        // e.g. " Â«  Â»Signaler un problÃ¨me non rÃ©solu Â»"

        // Remove all guillemet characters, spaces, and other junk from the edges of the name
        let clean = rest
            .replace(/\xc2\xab/g, '')
            .replace(/\xc2\xbb/g, '')
            .replace(/\xab/g, '')
            .replace(/\xbb/g, '')
            .replace(/«/g, '')
            .replace(/»/g, '')
            .replace(/:/g, '')
            .trim();

        // What if it's \subsection{Description textuelle du cas d'utilisation ... \label{...}} ?
        // Then rest would stop at the FIRST }, which is perfect.

        // Reconstruct the exact string the user wants:
        // Description textuelle du cas d’utilisation « cleanName »
        return u2l("Description textuelle de cas d’utilisation « ") + clean + u2l(" »");
    });

    fs.writeFileSync(f, content, 'latin1');
    console.log(`Processed ${f}`);
}
