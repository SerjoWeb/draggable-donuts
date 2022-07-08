;(() => {
  'use strict';

  class Dashboard {
    blocks = document.querySelectorAll('.block');
    draggableChart = null;

    constructor() {
      if (Dashboard.exists) {
        return Dashboard.instance;
      }

      Dashboard.instance = this;
      Dashboard.exists = true;
    }

    init() {
      this.createChart('chart-1', [
        'Blue',
        'Green',
        'Orange'
      ], [
        19,
        5,
        3
      ], [
        'rgba(54, 162, 235, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ], [
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 159, 64, 1)'
      ]);

      this.createChart('chart-2', [
        'Red',
        'Blue',
        'Yellow',
      ], [
        12,
        19,
        3
      ], [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)'
      ], [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ]);

      this.createChart('chart-3', [
        'Green',
        'Purple',
        'Orange'
      ], [
        5,
        2,
        3
      ], [
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ], [
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ]);

      this.dragAndDropCharts();
    }

    createChart(element, labels, data, backgroundColor, borderColor) {
      const ctx = document.getElementById(element).getContext('2d');

      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels,
          datasets: [{
            label: '# of Votes',
            data,
            backgroundColor,
            borderColor,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    onDragStart(e, block) {
      this.draggableChart = block;

      for (let block of this.blocks) {
        if (block !== this.draggableChart) {
          block.style.border = 'thin dashed #ccc';
        }
      }
    }

    onDragEnter(e, block) {
      if (block === this.draggableChart) {
        block.style.opacity = .1;
      } else {
        block.style.backgroundColor = '#fafafa';
      }
    }

    onDragLeave(e, block) {
      block.style.border = '3px solid #fafafa';
    }

    onDragEnd(e, block) {
      for (let block of this.blocks) {
        block.style.border = 'none';
        block.style.backgroundColor = 'white';
        block.style.opacity = 1;
      }
    }

    onDragOver(e, block) {
      e.preventDefault(); 
    }

    onDrop(e, block) {
      e.preventDefault();
      
      if (block !== this.draggableChart) {
        const draggableCharts = document.querySelectorAll('.block');
        let draggedPos = 0;
        let droppedPos = 0;

        for (let i = 0; i < draggableCharts.length; i++) {
          if (this.draggableChart == draggableCharts[i]) {
            draggedPos = i;
          }

          if (block == draggableCharts[i]) {
            droppedPos = i;
          }
        }

        if (draggedPos < droppedPos) {
          block.parentNode.insertBefore(this.draggableChart, block.nextSibling);
        } else {
          block.parentNode.insertBefore(this.draggableChart, block);
        }
      }
    }

    onClick(e, block) {
      e.preventDefault();

      for (let blc of this.blocks) {
        if (blc != block && blc.classList.contains('details')) {
          blc.classList.remove('details');
        }
      }

      block.classList.toggle('details');
    }

    dragAndDropCharts() {
      for (let block of this.blocks) {
        block.addEventListener('dragstart', e => this.onDragStart(e, block));
        block.addEventListener('dragenter', e => this.onDragEnter(e, block));
        block.addEventListener('dragleave', e => this.onDragLeave(e, block));
        block.addEventListener('dragend', e => this.onDragEnd(e, block));
        block.addEventListener('dragover', e => this.onDragOver(e, block));
        block.addEventListener('drop', e => this.onDrop(e, block));
        block.addEventListener('click', e => this.onClick(e, block));
      };
    }
  };

  window.addEventListener('load', () => {
    const dashboard = new Dashboard();
    dashboard.init();
  });
})();