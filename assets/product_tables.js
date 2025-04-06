class SpecSheetTabs {
  constructor() {
    document.addEventListener('DOMContentLoaded', () => this.init());
  }

  init() {
    const parent = document.querySelector('.product__description');
    const targetTables = document.querySelectorAll('.product__description table');

    if (!parent || targetTables.length === 0) return;

    const tables = this.extractTables(targetTables);

    // Split tables into groups of 3
    const tableGroups = this.chunkTables(tables, 3);

    // Clear existing tables
    targetTables.forEach((table, index) => {
      if (index === 0) {
        table.replaceWith(...this.createTabGroups(tableGroups));
      } else {
        table.remove();
      }
    });
  }

  extractTables(targetTables) {
    return Array.from(targetTables).map((table) => {
      let strongElement = table.querySelector('tbody tr td p strong') || table.querySelector('tbody tr td p');

      const tbody = table.querySelector('tbody');
      if (tbody && tbody.firstElementChild) tbody.removeChild(tbody.firstElementChild);

      const tableHeading = strongElement.innerText.replace('SPEC SHEET -', '').replace('MODEL', '').trim();

      return { heading: tableHeading, data: table.innerHTML };
    });
  }

  chunkTables(tables, size) {
    const result = [];
    for (let i = 0; i < tables.length; i += size) {
      result.push(tables.slice(i, i + size));
    }
    return result;
  }

  createTabGroups(groups) {
    return groups.map((tables) => this.createTabStructure(tables));
  }

  createTabStructure(tables) {
    const structure = document.createElement('div');
    structure.classList.add('tabs-group');

    const tabsWrapper = document.createElement('div');
    tabsWrapper.classList.add('tabs');

    const tabTitle = document.createElement('p');
    tabTitle.innerText = 'SPEC SHEET';
    tabsWrapper.appendChild(tabTitle);

    const tabsHeadingsContainer = document.createElement('div');
    tabsHeadingsContainer.classList.add('tabs-headings-container');

    const displayBox = document.createElement('div');
    displayBox.classList.add('display-box');
    const dataBox = document.createElement('div');
    dataBox.classList.add('data');
    displayBox.appendChild(dataBox);

    let firstTab = null;

    tables.forEach((x, index) => {
      const tabHeading = document.createElement('div');
      tabHeading.classList.add('tabs-headings');

      const tabButton = document.createElement('button');
      tabButton.classList.add('tab-btn');
      tabButton.innerText = x.heading;

      tabHeading.addEventListener('click', () => {
        document.querySelectorAll('.tabs-headings').forEach((btn) => btn.classList.remove('active'));
        tabHeading.classList.add('active');
        dataBox.innerHTML = `<div class="tab-content"><table>${x.data}</table></div>`;
      });

      if (index === 0) firstTab = tabHeading;

      tabHeading.appendChild(tabButton);
      tabsHeadingsContainer.appendChild(tabHeading);
    });

    tabsWrapper.appendChild(tabsHeadingsContainer);
    structure.appendChild(tabsWrapper);
    structure.appendChild(displayBox);

    if (firstTab) firstTab.click();

    return structure;
  }
}

new SpecSheetTabs();
