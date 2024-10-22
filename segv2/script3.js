function findNearestPoint(loc, points, threshoold = Number.MAX_SAFE_INTEGER) {
  let mindist = Number.MAX_SAFE_INTEGER;
  let nearest = null;
  for (const point of points) {
    const dist = distance(point, loc);
    if (dist < mindist && dist < threshoold) {
      mindist = dist;
      nearest = point;
    }
  }
  return nearest;
}

function distance(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}
