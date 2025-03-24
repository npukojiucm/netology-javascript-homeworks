/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
import { autorun } from 'mobx';

export default class WorkLog {
  constructor(container, stateManager) {
    this.container = document.querySelector(container);
    this.worklog = null;
    this.worklogList = null;

    this.stateManager = stateManager;

    this.createWidget = this.createWidget.bind(this);
  }

  init() {
    this.createWidget();

    autorun(() => {
      this.logging(this.stateManager.INSTANCES, 'Creating');
    });
    autorun(() => {
      this.logging(this.stateManager.INSTANCES, 'Create');
    });
    autorun(() => {
      this.logging(this.stateManager.INSTANCES, 'Starting');
    });
    autorun(() => {
      this.logging(this.stateManager.INSTANCES, 'Start');
    });
    autorun(() => {
      this.logging(this.stateManager.INSTANCES, 'Stopping');
    });
    autorun(() => {
      this.logging(this.stateManager.INSTANCES, 'Stop');
    });
    autorun(() => {
      this.logging(this.stateManager.INSTANCES, 'Deleting');
    });
    autorun(() => {
      this.logging(this.stateManager.INSTANCES, 'Delete');
    });
  }

  createWidget() {
    const widget = `
      <div class="worklog">
        <h2 class="worklog-title">Worklog:</h2>

        <div class="worklog-list"></div>
      </div>
    `;

    this.container.insertAdjacentHTML('beforeend', widget);
    this.worklog = this.container.querySelector('.worklog');
    this.worklogList = this.container.querySelector('.worklog-list');
  }

  logging(instances, action) {
    const updateStateInstance = instances
      .filter((instance) => instance.status === action && instance.showLog === false);

    if (updateStateInstance.length > 0) {
      const instance = updateStateInstance[updateStateInstance.length - 1];
      this.worklogList.insertAdjacentHTML('beforeend', this.listItem(instance));

      this.worklog.scrollTop = this.worklogList.scrollHeight;

      return this.stateManager.updateStateChange(instance, 'worklog');
    }
  }

  listItem(instance) {
    return `
      <div class="worklog-item">
        <div class="item-date">${instance.date}</div>
        
        <div class="item-server">
          <div class="item-server-text">Server:</div>
          <div class="item-server-id">${instance.id}</div>
        </div>
        <div class="item-info">
          <div class="item-info-text">INFO:</div>
          <div class="item-server-command">Received "${instance.info}"</div>
        </div>
      </div>
    `;
  }
}
