export default function sortInformation(lines, columnNumber) {
    return Array.from(lines)
        .slice(1)
        .sort((rowA, rowB) => Number(rowB.cells[columnNumber].innerHTML) - Number(rowA.cells[columnNumber].innerHTML));
}
