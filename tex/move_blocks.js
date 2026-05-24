const fs = require('fs');

function moveBlock(fileName, blockMarker, endMarker, insertMarker) {
    let content = fs.readFileSync(fileName, 'utf8');
    let lines = content.split('\n');

    let startIdx = lines.findIndex(l => l.includes(blockMarker));
    if (startIdx === -1) {
        console.log('Start marker not found in ' + fileName);
        return;
    }

    let endIdx = lines.findIndex((l, i) => i > startIdx && l.includes(endMarker));
    if (endIdx === -1) {
        console.log('End marker not found in ' + fileName);
        return;
    }

    // We want to leave the endMarker where it is, so we do endIdx instead of endIdx+1 for slice
    let toMove = lines.slice(startIdx, endIdx);

    // remove the block from the original array
    lines.splice(startIdx, endIdx - startIdx);

    let insertIdx = lines.findIndex(l => l.includes(insertMarker));
    if (insertIdx === -1) {
        console.log('Insert marker not found in ' + fileName);
        return;
    }

    // insert the block
    lines.splice(insertIdx, 0, ...toMove);

    fs.writeFileSync(fileName, lines.join('\n'));
    console.log('Moved successfully in ' + fileName);
}

// Chapitre 3
// In chap 3, the block starts with "Descriptions textuelles des cas d'utilisation sans raffinement"
// Ends with "% SECTION 3 : CONCEPTION" (which is now right after it)
// Inserts before: "Analyse de la fonctionnalité « S'inscrire »" or at the beginning of the file?
// In chap 3, the file starts with Analyse de la... S'inscrire. Let's search for "Analyse de la fonctionnalité « S'inscrire »"
moveBlock(
    'chapitre3.tex',
    "Descriptions textuelles des cas d'utilisation sans raffinement",
    '% SECTION 3 : CONCEPTION',
    'Analyse de la fonctionnalité « S\'inscrire »'
);

// Chapitre 4
// In chap 4, the block starts with "Descriptions textuelles des cas d'utilisation sans raffinement"
// Ends with "\section{Diagramme de classes du deuxième sprint}"
// Inserts before: "\subsection{Analyse de la fonctionnalité « Gérer clients »}"
moveBlock(
    'chapitre4.tex',
    "Descriptions textuelles des cas d'utilisation sans raffinement",
    '\\section{Diagramme de classes du deuxième sprint}',
    '\\subsection{Analyse de la fonctionnalité « Gérer clients »}'
);
