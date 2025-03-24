/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
import { autorun } from 'mobx';
import buttons from './button';

export default class Instances {
  constructor(container, stateManager) {
    this.container = document.querySelector(container);
    this.instances = null;
    this.instanceList = null;
    this.btnNewInstance = null;

    this.stateManager = stateManager;

    this.onClickBtnCreateNewInstance = this.onClickBtnCreateNewInstance.bind(this);
    this.onClickBtnStart = this.onClickBtnStart.bind(this);
    this.onClickBtnStop = this.onClickBtnStop.bind(this);
    this.onClickBtnRemove = this.onClickBtnRemove.bind(this);
  }

  init() {
    autorun(() => {
      this.instanceAction(this.stateManager.INSTANCES, 'Create');
    });

    autorun(() => {
      this.instanceAction(this.stateManager.INSTANCES, 'Start');
    });

    autorun(() => {
      this.instanceAction(this.stateManager.INSTANCES, 'Stop');
    });

    autorun(() => {
      this.instanceAction(this.stateManager.INSTANCES, 'Delete');
    });

    this.createWidget();
  }

  createWidget() {
    const widget = `
      <div class="instances">
        <h2 class="instances-title">Your micro instances</h2>
        <div class="instances-list">
          <input class="btn-new-instance" type="button" value="Create new instance">
        </div>
      </div>
    `;

    this.container.insertAdjacentHTML('beforeend', widget);
    this.instances = this.container.querySelector('.instances');
    this.instanceList = this.container.querySelector('.instances-list');
    this.btnNewInstance = this.instanceList.querySelector('.btn-new-instance');

    return this.btnNewInstance.addEventListener('click', this.onClickBtnCreateNewInstance);
  }

  instanceAction(instances, action) {
    const updateStateInstance = instances
      .filter((instance) => instance.status === action && instance.showInstance === false);

    const instance = updateStateInstance[0];

    if (updateStateInstance.length > 0) {
      if (action === 'Create') {
        this.newInstance(instance, buttons);
        this.stateManager.updateStateChange(instance, 'instance');

        this.instances.scrollTop = this.instances.scrollHeight;
        return;
      }

      const items = this.instanceList.querySelectorAll('.list-item');

      items.forEach((item) => {
        if (item.dataset.id === instance.id) {
          switch (action) {
            case 'Start':
              this.updateActionBtnAndStatusText(action, item);
              this.stateManager.updateStateChange(instance, 'instance');

              break;

            case 'Stop':
              this.updateActionBtnAndStatusText(action, item);
              this.stateManager.updateStateChange(instance, 'instance');

              break;

            case 'Delete':
              item.remove();
              this.stateManager.updateStateChange(instance, 'instance');

              break;

            default:
              break;
          }
        }
      });
    }
  }

  newInstance(instance, objBtns) {
    const newInstance = `
      <div class="list-item" data-id="${instance.id}">
        <div class="item-id">${instance.id}</div>
    
        <div class="item-status">
          <div class="status-text menu-name">Status:</div>
          <div class="status-state-ico item-btn bg-color-yellow"></div>
          <div class="status-state-text item-btn">${instance.status}</div>
        </div>
    
        <div class="item-actions">
          <div class="actions-text menu-name">Actions:</div>
          
          <div class="container-btn">  
            <button type="button" class="btn btn-active item-btn" data-name="${objBtns.start.name}">
              <img class="btn-actions" src="${objBtns.start.src}">
            </button>

            <button type="button" class="btn item-btn" data-name="${objBtns.stop.name}">
              <img class="btn-actions" src="${objBtns.stop.src}">
            </button>

            <button type="button" class="item-btn" data-name="${objBtns.remove.name}">
              <img class="btn-actions" src="${objBtns.remove.src}">
            </button>
          </div>
        </div>
      </div>`;

    this.btnNewInstance.insertAdjacentHTML('beforebegin', newInstance);

    const items = this.instanceList.querySelectorAll('.list-item');
    const item = items[items.length - 1];

    const { btnStart, btnStop, btnRemove } = this.findBtnControlAndStatusStateText(item);

    btnStart.addEventListener('click', this.onClickBtnStart);
    btnStop.addEventListener('click', this.onClickBtnStop);
    btnRemove.addEventListener('click', this.onClickBtnRemove);
  }

  updateActionBtnAndStatusText(action, item) {
    const { btnStart, btnStop, statusStateText } = this.findBtnControlAndStatusStateText(item);
    const statusIco = item.querySelector('.status-state-ico');

    switch (action) {
      case 'Start':
        btnStop.classList.add('btn-active');
        btnStop.disabled = false;

        btnStart.classList.remove('btn-active');

        statusIco.classList.remove('bg-color-red');
        statusIco.classList.add('bg-color-green');

        statusStateText.textContent = 'Running';

        break;

      case 'Stop':
        btnStart.classList.add('btn-active');
        btnStart.disabled = false;

        btnStop.classList.remove('btn-active');

        statusIco.classList.remove('bg-color-green');
        statusIco.classList.add('bg-color-red');

        statusStateText.textContent = 'Stop';

        break;

      default:
        break;
    }
  }

  findBtnControlAndStatusStateText(item) {
    const elements = {};

    const statusStateText = item.querySelector('.status-state-text');
    elements.statusStateText = statusStateText;

    const btns = item.querySelectorAll('button');
    btns.forEach((btn) => {
      const { name } = btn.dataset;

      switch (name) {
        case 'start':
          elements.btnStart = btn;
          break;

        case 'stop':
          elements.btnStop = btn;
          break;

        case 'remove':
          elements.btnRemove = btn;
          break;

        default:
          break;
      }
    });

    return elements;
  }

  onClickBtnCreateNewInstance() {
    return this.stateManager.sendCommandOnServer('command', {
      command: 'Create',
    });
  }

  onClickBtnStart(e) {
    const btn = e.target.closest('button');
    btn.disabled = true;

    const itemList = e.target.closest('.list-item');
    const { id } = itemList.dataset;

    this.stateManager.sendCommandOnServer('command', {
      command: 'Start',
      instance: {
        id,
      },
    });
  }

  onClickBtnStop(e) {
    const btn = e.target.closest('button');
    btn.disabled = true;

    const itemList = e.target.closest('.list-item');
    const { id } = itemList.dataset;

    this.stateManager.sendCommandOnServer('command', {
      command: 'Stop',
      instance: {
        id,
      },
    });
  }

  onClickBtnRemove(e) {
    const itemList = e.target.closest('.list-item');
    const { id } = itemList.dataset;

    const { btnStart, btnStop, btnRemove } = this.findBtnControlAndStatusStateText(itemList);
    btnStart.disabled = true;
    btnStop.disabled = true;
    btnRemove.disabled = true;

    this.stateManager.sendCommandOnServer('command', {
      command: 'Remove',
      instance: {
        id,
      },
    });
  }
}
