// cria um novo elemento
function createElement(tag = "div", attributes = {}, othersAttributes = {}, childs = []) {
  const element = document.createElement(tag);

  if (attributes) Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));
  if (othersAttributes) Object.keys(othersAttributes).forEach(key => element[key] = othersAttributes[key]);
  if (childs) childs.forEach(child => element.appendChild(createElement(child.tag, child.attributes, child.othersAttributes, child.childs)));

  return element;
}

const btnModals = document.querySelectorAll('[data-btn-modal]');

if (btnModals.length > 0) {
  btnModals.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const modalsActive = document.querySelectorAll('.modal.active');
      
      const modal = document.querySelector(`[data-modal="${e.target.dataset.btnModal}"]`);
      modal.classList.add('active');
    });
  });
}

// quando clicar fora do modal ele fecha
const modals = document.querySelectorAll('[data-modal]');

if (modals.length > 0) {
  // quando algum modal tiver aberto e apaertar esc ele fecha
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modalActive = document.querySelector('.modal.active');
      if (modalActive) modalActive.classList.remove('active');
    }
  });
  
  modals.forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) modal.classList.remove('active');
    });
  });
}

const btnModalsClose = document.querySelectorAll('[data-modal-close]');

if (btnModalsClose.length > 0) {
  btnModalsClose.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const modal = document.querySelector(`[data-modal="${e.target.dataset.modalClose}"]`);
      modal.classList.remove('active');
    });
  });
}

const richTexts = document.querySelectorAll('[data-rich-text]');

if (richTexts.length > 0) {
  document.body.addEventListener('keydown', e => {
    const key = e.key,
      code = e.code,
      positon = document.getSelection().getRangeAt(0),
      tag = positon.commonAncestorContainer.parentNode.tagName.toLowerCase();

    const headerKeys = ['Key1', 'Key2', 'Key3', 'Key4', 'Key5', 'Key6', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6'];

    if (e.ctrlKey && e.shiftKey && headerKeys.includes(code)) e.preventDefault();

    const controlsKeys = ['Minus', 'Equal', 'KeyI', 'KeyT', 'KeyK', 'KeyEnter', 'KeyEspace'];

    if (e.ctrlKey && controlsKeys.includes(code)) e.preventDefault();

    const justifyKeys = ['KeyJ', 'KeyC', 'KeyL', 'KeyR', 'Key8', 'Key7'];
    if (e.ctrlKey && e.shiftKey && justifyKeys.includes(code) || key === 'Tab') e.preventDefault();
  });

  const commands = {
    bold: () => document.execCommand('bold'),
    italic: () => document.execCommand('italic'),
    underline: () => document.execCommand('underline'),
    strike: () => document.execCommand('strikeThrough'),
    list: () => document.execCommand('insertUnorderedList'),
    listOl: () => document.execCommand('insertOrderedList'),
    textAlign: (value) => document.execCommand('justify' + value),
    fontFamily: (value) => document.execCommand('fontName', false, value),
    fontSize: (value) => { 
      document.execCommand("fontSize", false, value);
      var fontElements = window.getSelection().anchorNode.parentNode
      fontElements.removeAttribute("size");
      fontElements.style.fontSize = value + "px";
    },
    color: (value) => document.execCommand('foreColor', false, value),
    backgroundColor: (value) => document.execCommand('backColor', false, value),
    fontStyle: (value) => document.execCommand('formatBlock', false, value),
    lineHeight: (value) => {
      document.execCommand('lineHeight', false, Number(value));
      var fontElements = window.getSelection().anchorNode.parentNode
      fontElements.removeAttribute("size");
      fontElements.style.lineHeight = value;
    }
  }

  function pageControl(e, me, fater){
    style(e, fater);

    const key = e.key,
      code = e.code,
      positon = document.getSelection().getRangeAt(0),
      tag = positon.commonAncestorContainer.parentNode.tagName.toLowerCase(),
      component = positon.commonAncestorContainer;

    // cria uma lisat nao ordenada: ctrl + shift + 8 ou *
    // cria uma lista ordenada: ctrl + shift + 7 ou &

    const listsKeys = ['Digit8', 'Digit9'];
    if (e.ctrlKey && e.shiftKey && listsKeys.includes(code)) {
      const list = code === 'Digit8' ? 'ul' : 'ol';
      if (list === 'ul') document.execCommand('insertUnorderedList');
      else document.execCommand('insertOrderedList');
    }

    // justifica o texto: ctrl + shift + key J, C, L, R
    // centraliza o texto: ctrl + shift + c
    // alinha o texto a esquerda: ctrl + shift + l
    // alinha o texto a direita: ctrl + shift + r
    const justifyKeys = ['KeyJ', 'KeyC', 'KeyL', 'KeyR'];
    if (e.ctrlKey && e.shiftKey && justifyKeys.includes(code)) {
      document.execCommand('justify' + (justifyKeys.indexOf(code) === 0 ? 'Full' : justifyKeys.indexOf(code) === 1 ? 'Center' : justifyKeys.indexOf(code) === 2 ? 'Left' : 'Right'));
    }

    // títulos: ctrl + shift + 1, 2, 3, 4, 5, 6
    // ctrl + shift + !, @, #, $, %, &
    const headerKeys = ['Key1', 'Key2', 'Key3', 'Key4', 'Key5', 'Key6', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6'];
    if (e.ctrlKey && e.shiftKey && headerKeys.includes(code)) {
      const hs = ["!", "@", "#", "$", "%", "&"];
      document.execCommand('formatBlock', false, 'h' + (hs.includes(key) ? hs.indexOf(key) + 1 : key));
    }

    // link 
    if (e.ctrlKey && key === 'k') {
      const link = prompt('Digite o link: ');
      document.execCommand('createLink', false, link);
    }

    const selectKeys = ['KeyZ', 'KeyV', 'KeyY', 'KeyC', 'KeyA', 'KeyI', 'Space', 'Enter']
    if (e.ctrlKey && selectKeys.includes(code)) {
      if (code === 'KeyZ') document.execCommand('undo');
      if (code === 'KeyY') document.execCommand('redo');
      if (code === 'KeyV') document.execCommand('paste', null, null);
      if (code === 'KeyC') document.execCommand('copy');
      if (code === 'KeyA') document.execCommand('selectAll');
      if (code === 'Space') document.execCommand('removeFormat');
      if (code === 'Enter') document.execCommand('insertParagraph');
      if (code === 'KeyI') document.execCommand('italic');
    }

    // tab
    if (e.key === 'Tab') {
      e.preventDefault();

      document.execCommand('insertHtml', false, '&nbsp;&nbsp;&nbsp;&nbsp;');

      // se for um elemento de lista: ul ou ol
      if (tag === 'li' || tag === 'ol') {
        console.log('lista', tag)
        const list = positon.commonAncestorContainer.parentNode.parentNode.tagName.toLowerCase();
        const level = positon.commonAncestorContainer.parentNode.parentNode.parentNode.tagName.toLowerCase();
        
        if (list === 'ul') {
          // se for uma lista não ordenada, cria um novo elemento de lista com um tab de distância de acordo com o nível
          document.execCommand('insertHTML', false, '<li style="margin-left: ' + (level === 'ul' ? '10px' : level === 'ol' ? '20px' : '30px') + ';">&#009</li>');
        }

        if (list === 'ol') {
          // se for uma lista ordenada, cria um novo elemento de lista com um tab de distância, de acordo com o nível
          document.execCommand('insertHTML', false, '<li style="margin-left: ' + (level === 'ul' ? '10px' : level === 'ol' ? '20px' : '30px') + ';">&#009</li>');
        }

      } else document.execCommand('insertHTML', false, '&#009');
    }

    // Minus e Plus
    const fontSizeControls = ['Equal', 'Minus'];
    if (e.ctrlKey && e.shiftKey && fontSizeControls.includes(code)) {
      if (key === 'Equal') document.execCommand('decreaseFontSize', false, true);
      else document.execCommand('incraseFontSize', false, true);
    }

    // add imagem: ctrl + alt + i
    if (e.ctrlKey && e.altKey && key === 'i') {
      e.preventDefault();
      const url = prompt('Digite a url da imagem: ');
      document.execCommand('insertImage', false, url);
    }

    // add table: ctrl + alt + t
    if (e.ctrlKey && e.altKey && key === 't') {
      e.preventDefault();
      const rows = prompt('Digite o número de linhas: '),
        cols = prompt('Digite o número de colunas: ');

      document.execCommand('insertHTML', false, `<table style="width: 100%; border-collapse: collapse; border: 1px solid #ccc;">${'<tr>' + '<td style="border: 1px solid #ccc; padding: 5px;">' + '</td>'.repeat(cols) + '</tr>'.repeat(rows)}</table>`);
    }
  }

  function style(e, father){
    const position = document.getSelection().getRangeAt(0),
      text = e.target.innerHTML, 
      tag = position.commonAncestorContainer.parentNode.tagName.toLowerCase(),
      child = position.commonAncestorContainer.parentNode,
      allStyle = getComputedStyle(child);

    const elements = {
      color: father.querySelector('[data-rich-color]'),
      backgroundColor: father.querySelector('[data-rich-background-color]'),
      fontFamily: father.querySelector('[data-rich-font-family]'),
      fontSize: father.querySelector('[data-rich-font-size]'),
      fontStyle: father.querySelector('[data-rich-font-style]'),
      textAlign: father.querySelector('[data-rich-text-align]'),
      bold: father.querySelector('[data-rich-bold]'),
      italic: father.querySelector('[data-rich-italic]'),
      underline: father.querySelector('[data-rich-underline]'),
      strike: father.querySelector('[data-rich-strike]'),
      listUl: father.querySelector('[data-rich-list]'),
      listOl: father.querySelector('[data-rich-list-ol]')
    }

    const style = {
      fontFamily: allStyle.fontFamily.replace(/"/g, ""),
      fontSize: allStyle.fontSize,
      backgroundColor: allStyle.backgroundColor,
      color: allStyle.color,
      fontStyle: allStyle.fontStyle,
      listStyleType: allStyle.listStyleType,
      textAlign: allStyle.textAlign === 'start' ? 'left' : allStyle.textAlign,
      fontStretch: allStyle.fontStretch,
      fontStyle: allStyle.fontStyle,
      fontWeight: allStyle.fontWeight,
      textDecoration: allStyle.textDecoration,
      textTransform: allStyle.textTransform,
      verticalAlign: allStyle.verticalAlign,
      textDecorationLine: allStyle.textDecorationLine,
      textDecorationStyle: allStyle.textDecorationStyle
    }

    const titles = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

    elements.color.value = "#" + rgb2Hex(style.color);
    elements.backgroundColor.value = "#" + rgb2Hex(style.backgroundColor);
    elements.fontFamily.value = style.fontFamily;
    elements.fontSize.value = Number(style.fontSize.replace('px', ''));
    elements.fontStyle.value = titles.includes(tag) ? tag : "normal";
    elements.textAlign.value = style.textAlign;
    elements.bold.classList.toggle('rich-active', style.fontWeight >= 600);
    elements.italic.classList.toggle('rich-active', style.fontStyle === 'italic');
    elements.underline.classList.toggle('rich-active', style.textDecorationLine === 'underline');
    elements.strike.classList.toggle('rich-active', style.textDecorationLine === 'line-through');

    if (tag == 'li') { 
      elements.listUl.classList.toggle('rich-active', style.listStyleType === 'disc' || style.listStyleType === 'circle' || style.listStyleType === 'square');
      elements.listOl.classList.toggle('rich-active', style.listStyleType === 'decimal');
    }
  }   

  function rgb2Hex(color){
    if (color.includes('rgb') && !color.includes('rgba')) {
      return color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(function (x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
        })
        .join("");
    }

    if (color.includes('rgba')) {
      return color.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)$/).slice(1, 4).map(function (x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
        })
        .join("");
    }
  }

  richTexts.forEach(item => {
    const richData = item.getAttribute('data-rich-text');
    const richMenu = createElement("div", { class: "rich-text-menu" }, { "data-rich-menu": richData }, [
      {
        tag: "select",
        attributes: { class: "rich-text-font-style", "data-rich-font-style": richData },
        childs: [
          { tag: "option", attributes: { value: "normal" }, othersAttributes: { innerText: "Texto normal" } },
          { tag: "option", attributes: { value: "h1" }, othersAttributes: { innerText: "Título 1" } },
          { tag: "option", attributes: { value: "h2" }, othersAttributes: { innerText: "Título 2" } },
          { tag: "option", attributes: { value: "h3" }, othersAttributes: { innerText: "Título 3" } },
          { tag: "option", attributes: { value: "h4" }, othersAttributes: { innerText: "Título 4" } },
          { tag: "option", attributes: { value: "h5" }, othersAttributes: { innerText: "Título 5" } },
          { tag: "option", attributes: { value: "h6" }, othersAttributes: { innerText: "Título 6" } },
        ]
      }, {
        tag: "select",
        attributes: { class: "rich-text-font-family", "data-rich-font-family": richData },
        childs: [
          { tag: "option", attributes: { value: "Roboto, sans-serif" }, othersAttributes: { innerText: "Roboto" } },
          { tag: "option", attributes: { value: "Arial" }, othersAttributes: { innerText: "Arial" } },
          { tag: "option", attributes: { value: "Arial Black" }, othersAttributes: { innerText: "Arial Black" } },
          { tag: "option", attributes: { value: "Comic Sans MS" }, othersAttributes: { innerText: "Comic Sans MS" } },
          { tag: "option", attributes: { value: "Courier New" }, othersAttributes: { innerText: "Courier New" } },
          { tag: "option", attributes: { value: "Georgia" }, othersAttributes: { innerText: "Georgia" } },
          { tag: "option", attributes: { value: "Impact" }, othersAttributes: { innerText: "Impact" } },
          { tag: "option", attributes: { value: "Lucida Console" }, othersAttributes: { innerText: "Lucida Console" } },
          { tag: "option", attributes: { value: "Lucida Sans Unicode" }, othersAttributes: { innerText: "Lucida Sans Unicode" } },
          { tag: "option", attributes: { value: "Palatino Linotype" }, othersAttributes: { innerText: "Palatino Linotype" } },
          { tag: "option", attributes: { value: "Tahoma" }, othersAttributes: { innerText: "Tahoma" } },
          { tag: "option", attributes: { value: "Times New Roman" }, othersAttributes: { innerText: "Times New Roman" } },
          { tag: "option", attributes: { value: "Trebuchet MS" }, othersAttributes: { innerText: "Trebuchet MS" } },
          { tag: "option", attributes: { value: "Verdana" }, othersAttributes: { innerText: "Verdana" } },
        ]
      }, {
        tag: "select",
        attributes: { class: "rich-text-font-size", "data-rich-font-size": richData },
        childs: [
          { tag: "option", attributes: { value: "8" }, othersAttributes: { innerText: "8" } },
          { tag: "option", attributes: { value: "9" }, othersAttributes: { innerText: "9" } },
          { tag: "option", attributes: { value: "10" }, othersAttributes: { innerText: "10" } },
          { tag: "option", attributes: { value: "11" }, othersAttributes: { innerText: "11" } },
          { tag: "option", attributes: { value: "12", selected: "selected" }, othersAttributes: { innerText: "12" } },
          { tag: "option", attributes: { value: "14" }, othersAttributes: { innerText: "14" } },
          { tag: "option", attributes: { value: "18" }, othersAttributes: { innerText: "18" } },
          { tag: "option", attributes: { value: "24" }, othersAttributes: { innerText: "24" } },
          { tag: "option", attributes: { value: "30" }, othersAttributes: { innerText: "30" } },
          { tag: "option", attributes: { value: "36" }, othersAttributes: { innerText: "36" } },
          { tag: "option", attributes: { value: "48" }, othersAttributes: { innerText: "48" } },
          { tag: "option", attributes: { value: "60" }, othersAttributes: { innerText: "60" } },
          { tag: "option", attributes: { value: "72" }, othersAttributes: { innerText: "72" } },
          { tag: "option", attributes: { value: "96" }, othersAttributes: { innerText: "96" } },
        ]
      }, {
        tag: "select",
        attributes: { class: "rich-text-line-height", "data-rich-line-height": richData },
        childs: [
          { tag: "option", attributes: { value: "1" }, othersAttributes: { innerText: "1" } },
          { tag: "option", attributes: { value: "1.15" }, othersAttributes: { innerText: "1.15" } },
          { tag: "option", attributes: { value: "1.5" }, othersAttributes: { innerText: "1.5" } },
          { tag: "option", attributes: { value: "1.75" }, othersAttributes: { innerText: "1.75" } },
          { tag: "option", attributes: { value: "2" }, othersAttributes: { innerText: "2" } },
          { tag: "option", attributes: { value: "2.5" }, othersAttributes: { innerText: "2.5" } },
          { tag: "option", attributes: { value: "3" }, othersAttributes: { innerText: "3" } },
        ]
      }, {
        tag: "button",
        attributes: { type: "button", class: "rich-text-bold", "data-rich-bold": richData },
        othersAttributes: { innerHTML: '<i class="fas fa-bold"></i>' }
      }, {
        tag: "button",
        attributes: { type: "button", class: "rich-text-italic", "data-rich-italic": richData },
        othersAttributes: { innerHTML: '<i class="fas fa-italic"></i>' }
      }, {
        tag: "button",
        attributes: { type: "button", class: "rich-text-underline", "data-rich-underline": richData },
        othersAttributes: { innerHTML: '<i class="fas fa-underline"></i>' }
      }, {
        tag: "button",
        attributes: { type: "button", class: "rich-text-strike", "data-rich-strike": richData },
        othersAttributes: { innerHTML: '<i class="fas fa-strikethrough"></i>' }
      }, {
        tag: "button",
        attributes: { type: "button", class: "rich-text-list", "data-rich-list": richData },
        othersAttributes: { innerHTML: '<i class="fas fa-list"></i>' }
      }, {
        tag: "button",
        attributes: { type: "button", class: "rich-text-list-ol", "data-rich-list-ol": richData },
        othersAttributes: { innerHTML: '<i class="fas fa-list-ol"></i>' }
      }, {
        tag: "input",
        attributes: { type: "color", value: "#000000", "data-rich-color": richData }
      }, {
        tag: "input",
        attributes: { type: "color", value: "#ffffff", "data-rich-background-color": richData }
      }, {
        tag: "select",
        attributes: { class: "rich-text-text-align", "data-rich-text-align": richData },
        childs: [
          { tag: "option", attributes: { value: "left" }, othersAttributes: { innerText: "Esquerda" } },
          { tag: "option", attributes: { value: "center" }, othersAttributes: { innerText: "Centro" } },
          { tag: "option", attributes: { value: "right" }, othersAttributes: { innerText: "Direita" } },
          { tag: "option", attributes: { value: "justify" }, othersAttributes: { innerText: "Justificado" } },
        ]
      }
    ]);

    const richContent = createElement("div", { class: "rich-pages" }, {}, [{ tag: "div", attributes: { class: "rich-content", contenteditable: "true", onspellcheck: "true", "data-rich-content": richData }, othersAttributes: {} }]);
    item.appendChild(richMenu);
    item.appendChild(richContent);

    const rich = item.querySelector('[data-rich-content]');
    rich.addEventListener('keyup', e => pageControl(e, rich, item));
    rich.addEventListener('mouseup', e => style(e, item));

    item.querySelector('[data-rich-font-style]').addEventListener('change', e => commands.fontStyle(e.target.value));
    item.querySelector('[data-rich-font-family]').addEventListener('change', e => commands.fontFamily(e.target.value));
    item.querySelector('[data-rich-font-size]').addEventListener('change', e => commands.fontSize(e.target.value));
    item.querySelector('[data-rich-color]').addEventListener('change', e => commands.color(e.target.value));
    item.querySelector('[data-rich-line-height]').addEventListener('change', e => commands.lineHeight(e.target.value));
    item.querySelector('[data-rich-background-color]').addEventListener('change', e => commands.backgroundColor(e.target.value));
    item.querySelector('[data-rich-bold]').addEventListener('click', e => commands.bold());
    item.querySelector('[data-rich-italic]').addEventListener('click', e => commands.italic());
    item.querySelector('[data-rich-underline]').addEventListener('click', e => commands.underline());
    item.querySelector('[data-rich-strike]').addEventListener('click', e => commands.strike());
    item.querySelector('[data-rich-text-align]').addEventListener('change', e => commands.textAlign(e.target.value));
    item.querySelector('[data-rich-list]').addEventListener('click', e => commands.list());
    item.querySelector('[data-rich-list-ol]').addEventListener('click', e => commands.listOl());
  });
}