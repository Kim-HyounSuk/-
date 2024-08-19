class Spinner {
  constructor($parent) {
    this.$parent = $parent;
    this.$spinner = null;

    this.init();
  }

  template() {
    const $spinner = document.createElement('div');
    $spinner.classList.add('spinner');

    $spinner.innerHTML = `<div class='spinner-inner'></div>`;

    this.$spinner = $spinner;
    this.$parent.appendChild($spinner);
  }

  remove() {
    if (this.$spinner) {
      this.$spinner.remove();
      this.$spinner = null;
    }
  }

  init() {
    this.template();
  }
}

export default Spinner;
