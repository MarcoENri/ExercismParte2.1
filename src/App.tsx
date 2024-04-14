import React from 'react';

function decodedResistorValue([first, second, third]: string[]) {
    let colorsMap = new Map<string, number>([
        ['black', 0],
        ['brown', 1],
        ['red', 2],
        ['orange', 3],
        ['yellow', 4],
        ['green', 5],
        ['blue', 6],
        ['violet', 7],
        ['grey', 8],
        ['white', 9],
    ]);

    let prefixMap = new Map<number, string>([
        [3, 'kilo'],
        [6, 'mega'],
        [9, 'giga'],
    ]);

    let value: string = '';
    const firstValue = colorsMap.get(first);
    const secondValue = colorsMap.get(second);
    const thirdValue = colorsMap.get(third);
    
    if (firstValue !== undefined && secondValue !== undefined && thirdValue !== undefined) {
        value = `${firstValue}${secondValue}${'0'.repeat(thirdValue)}`.replace(/^0+/, '') || '0';
    }
    
    let match = value.match(/[0]*$/);
    let lastDigitsCount = match ? match[0].length : 0;
    let prefix: string | undefined = prefixMap.get(
        lastDigitsCount - (lastDigitsCount % 3)
    );

    return `${value.substring(
        0,
        value.length - lastDigitsCount + (lastDigitsCount % 3)
    )} ${prefix ?? ''}ohms`;
}

function ResistorDecoder() {
    const [firstColor, setFirstColor] = React.useState('');
    const [secondColor, setSecondColor] = React.useState('');
    const [thirdColor, setThirdColor] = React.useState('');
    const [decodedValue, setDecodedValue] = React.useState('');

    const handleDecode = () => {
        const result = decodedResistorValue([firstColor, secondColor, thirdColor]);
        setDecodedValue(result);
    };

    return (
        <div>
            <select value={firstColor} onChange={(e) => setFirstColor(e.target.value)}>
                <option value="black" style={{backgroundColor: 'black', color: 'white'}}>Black</option>
                {/* Otras opciones para el primer color */}
            </select>
            <select value={secondColor} onChange={(e) => setSecondColor(e.target.value)}>
                <option value="brown" style={{backgroundColor: 'brown', color: 'white'}}>Brown</option>
                {/* Otras opciones para el segundo color */}
            </select>
            <select value={thirdColor} onChange={(e) => setThirdColor(e.target.value)}>
                <option value="red" style={{backgroundColor: 'red', color: 'white'}}>Red</option>
                {/* Otras opciones para el tercer color */}
            </select>
            <button onClick={handleDecode}>Decode</button>
            <p>Decoded Value: {decodedValue}</p>
        </div>
    );
}

export default ResistorDecoder;
