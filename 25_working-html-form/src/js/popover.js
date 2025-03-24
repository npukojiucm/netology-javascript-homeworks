class Popover {
  constructor(container) {
    this.container = document.querySelector(container);
  }

  create() {
    this.container.insertAdjacentHTML(
      'afterbegin',
      `
      <button class="popover">
        Click to toggle to popover
        <div class="popover-message">
            <div class="message-title">Popover title</div>
            <div class="message-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</div>
        </div>
      </button>
      `,
    );

    const btn = this.container.querySelector('.popover');

    return btn.addEventListener('click', (e) => {
      const { target } = e;
      const messageBox = target.querySelector('.popover-message');
      return messageBox.classList.toggle('active');
    });
  }
}

const popover = new Popover('body');
popover.create();
