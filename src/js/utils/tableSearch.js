export default function tableSearch() {
    const desiredCountry = document.querySelector('.countries__search');
    const table = document.querySelector('.countries-cases__content');
    const regPhrase = new RegExp(desiredCountry.value, 'i');
    let flag = false;
    for (let i = 0; i < table.rows.length; i += 1) {
        flag = false;
        for (let j = table.rows[i].cells.length - 1; j >= 0; j -= 1) {
            flag = regPhrase.test(table.rows[i].cells[j].innerHTML);
            if (flag) break;
        }
        if (flag) {
            table.rows[i].style.display = '';
        } else {
            table.rows[i].style.display = 'none';
        }
    }
}
