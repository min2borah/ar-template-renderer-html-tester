function hideLoading() {
  if (document.querySelector('.skeleton-loading')) {
    document.querySelector('.skeleton-loading').remove();
  }
}

function render(article, template, config, tags, customTags, userData) {
  getValidTemplatePages(article, template, config, tags, customTags, userData, null, function (templates) {
    if (templates != null) {
      renderTemplate(article, templates, config, tags, customTags, userData);
    }
  });
}

function renderTemplate(article, template, config, tags, customTags, userData) {
  const container = document.getElementById('listContainer');
  container.innerHTML = "";
  let containerWidth = container.offsetWidth;
  const templateList = typeof template == 'string' ? JSON.parse(template) : template;
  templateList.forEach((page, i) => {
    let pageWidth = page.pageWidth;
    let pageHeight = page.pageHeight;

    const itemId = `item-${i + 1}`;
    const itemElement = document.createElement('div');
    itemElement.className = 'item';
    itemElement.id = itemId;

    let canvasScale = Math.min(containerWidth / pageWidth, 1);

    itemElement.style.height = Math.round(pageHeight * canvasScale) + "px";
    itemElement.style.width = containerWidth + "px";
    container.appendChild(itemElement);

    createTemplateRendererApp(
      article,
      JSON.stringify(page.template),
      config,
      tags,
      customTags,
      userData,
      null,
      itemElement,
      createCallback(itemId)
    );
  });
}

function createCallback(itemId) {
  return function () {
    hideLoading();
  };
}


