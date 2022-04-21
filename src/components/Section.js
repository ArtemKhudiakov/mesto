export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderAll() {
    this._items.forEach((item) => {
      this.addItem(item)
    });
  }

  addItem(element) {
    this._container.append(this._renderer(element));
  }
}
