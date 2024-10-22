class Grapheditor {
  constructor(canvas, graph) {
    this.canvas = canvas;
    this.graph = graph;
    this.ctx = this.canvas.getContext("2d");
    this.hover = null;
    this.selected = null;
    this.draging = false;
    this.#addEventListeners();
  }
  #addEventListeners() {
    this.canvas.addEventListener("mousedown", (evt) => {
      // Handle right-click (button === 2)
      if (evt.button === 2) {
        if (this.hover) {
          this.graph.removepoint(this.hover);
          if (this.selected == point) {
            this.selected = null;
          }
          this.hover = null;
        }else{
          this.selected = null;
        }
      }

      // Handle left-click (button === 0)
      if (evt.button === 0) {
        const mouse = new point(evt.offsetX, evt.offsetY);
        if (this.hover) {
          if (this.selected) {
            this.graph.tryaddSeg(new segment(this.selected, this.hover));
          }
          this.selected = this.hover;
          this.draging = true;
          return;
        }
        this.graph.addpoint(mouse);
        if (this.selected) {
          this.graph.tryaddSeg(new segment(this.selected, mouse));
        }
        this.selected = mouse;
      }
    });
    this.canvas.addEventListener("mousemove", (evt) => {
      const mouse = new point(evt.offsetX, evt.offsetY);
      this.hover = findNearestPoint(mouse, this.graph.points, 10);
      if (this.draging === true) {
        this.selected.x = mouse.x;
        this.selected.y = mouse.y;
        // this.graph.updatepoints();
      }
    });
    // this.canvas.addEventListener("mouseup", (evt) => {});
    this.canvas.addEventListener("contextmenu", (evt) => {
      evt.preventDefault();
    });
    window.addEventListener("mouseup", () => {
      this.draging = false;
    });
  }
  display() {
    this.graph.draw(this.ctx);
    if (this.hover) {
      this.hover.draw(this.ctx, { fill: true });
    }
    if (this.selected) {
      this.selected.draw(this.ctx, { outline: true });
    }
  }
}
