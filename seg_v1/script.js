class graph {
  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
  }

  addpoint(points) {
    this.points.push(points);
  }

  removepoint(points) {
    const segs = this.getsomesegmentwithpoint(points);
    for (const seg of segs) {
      this.removeseg(seg);
    }
    this.points.splice(this.points.indexOf(points), 1);
  }
  removeseg(seg) {
    this.segments.splice(this.segments.indexOf(seg), 1);
  }

  containspoint(points) {
    return this.points.find((p) => p.equalpoints(points));
  }

  tryaddpoint(points) {
    if (!this.containspoint(points)) {
      this.addpoint(points);
      return true;
    }
    return false;
  }

  addsegment(seg) {
    this.segments.push(seg);
  }
  containssegments(seg) {
    return this.segments.find((s) => s.equals(seg));
  }

  tryaddSeg(seg) {
    if (!this.containssegments(seg)) {
      this.addsegment(seg);
      return true;
    }
    return false;
  }

  getsomesegmentwithpoint(points) {
    const segs = [];
    for (const seg of this.segments) {
      if (seg.include(points)) {
        segs.push(seg);
      }
    }
    return segs;
  }

  dispose() {
    this.segments.length = 0;
    this.points.length = 0;
  }

  draw(ctx) {
    for (const seg of this.segments) {
      seg.draw(ctx);
    }
    for (const point of this.points) {
      point.draw(ctx);
    }
  }
}

class point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equalpoints(points) {
    return this.x === points.x && this.y === points.y;
  }
  draw(ctx, size = 10, color = "red") {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
    ctx.fill();
  }
}

class segment {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }
  equals(seg) {
    return this.include(seg.p1) && this.include(seg.p2);
  }
  include(point) {
    return this.p1.equalpoints(point) || this.p2.equalpoints(point);
  }
  draw(ctx, width = 3, color = "black") {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.stroke();
  }
}

function removerandomsegmetn() {
  if (graph2.segments.length == 0) {
    return;
  }
  const index = Math.floor(Math.random() * graph2.segments.length);
  graph2.removeseg(graph2.segments[index]);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  graph2.draw(ctx); // Corrected this line
}

function addrandompoint() {
  const success = graph2.tryaddpoint(
    new point(Math.random() * canvas.width, Math.random() * canvas.height)
  );
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  graph2.draw(ctx); // Corrected this line
}

function addrandomsegmetn() {
  const index1 = Math.floor(Math.random() * graph2.points.length);
  const index2 = Math.floor(Math.random() * graph2.points.length);
  let success = false;
  if (index1 != index2) {
    success = graph2.tryaddSeg(
      new segment(graph2.points[index1], graph2.points[index2])
    );

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    graph2.draw(ctx); // Corrected this line
  }
}

function removerandompoints() {
  if (graph2.points.length == 0) {
    return;
  }
  const index = Math.floor(Math.random() * graph2.points.length);
  graph2.removepoint(graph2.points[index]);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  graph2.draw(ctx); // Corrected this line
}

function clearall() {
  graph2.dispose();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  graph2.draw(ctx); // Corrected this line
}

canvas.height = 600;
canvas.width = 600;
const ctx = canvas.getContext("2d");

const p1 = new point(200, 200);
const p2 = new point(500, 200);
const p3 = new point(400, 400);
const p4 = new point(100, 300);

const seg1 = new segment(p1, p2);
const seg2 = new segment(p2, p3);
const seg3 = new segment(p3, p4);

const graph2 = new graph([p1, p2, p3, p4], [seg1, seg2, seg3]);
graph2.draw(ctx); // Corrected this line
