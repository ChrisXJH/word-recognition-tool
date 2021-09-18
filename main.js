(() => {
    const TAG_MAP = {
        block1CB1: 'BLOCK_1_CB_1',
        block1CB2: 'BLOCK_1_CB_2',
        block2CB1: 'BLOCK_2_CB_1',
        block2CB2: 'BLOCK_2_CB_2',
        prac1: 'PRAC_1',
        prac2: 'PRAC_2'
    };

    const generateData = data => {
        const lines = data.split('\n').slice(1);

        const objects = lines.map(line => {
            const row = line.split(',');
            const [word, length, mask, type, answer, sq = ''] = row;
    
            return {
                word,
                length,
                mask,
                type,
                answer,
                isLowQuality: sq.includes('low')
            };
        });

        return JSON.stringify(objects);
    };

    const sectionSelect = document.getElementById('section-select');
    const objectFileSpan = document.getElementById('object-file');
    const csvInput = document.getElementById('csv-input');
    const generateBtn = document.getElementById('generate-btn');
    const resultTextarea = document.getElementById('result');

    const config = {};
    
    const onSectionUpdate = section => {
        config.section = section;
        config.tag = TAG_MAP[section];
        objectFileSpan.innerText = `${section}.js`;
    };

    onSectionUpdate(sectionSelect.value);

    sectionSelect.addEventListener('change', e => onSectionUpdate(e.target.value));

    generateBtn.addEventListener('click', () => {
        const inputData = csvInput.value;
        const outputData = generateData(inputData);

        resultTextarea.value = `const ${config.tag} = ${outputData};`;
    });
})();
