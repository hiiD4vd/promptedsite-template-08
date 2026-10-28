export interface ScrollAnchor { position: number; percentage: number }
/** Exported runtime maps the viewport bottom between section anchors. */
export function scrollTimeline(scrollY: number, viewport: number, documentHeight: number, anchors: ScrollAnchor[]): number {
  const bottom = viewport + scrollY;
  const ordered = anchors.filter(anchor => anchor.position > viewport).sort((a,b)=>a.position-b.position);
  let left: ScrollAnchor = { position: viewport, percentage: 0 };
  let right: ScrollAnchor = { position: documentHeight, percentage: 1 };
  for (const anchor of ordered) {
    if (anchor.position > bottom) { right=anchor; break; }
    left=anchor;
  }
  if (left.position===right.position) return left.percentage;
  return left.percentage + (right.percentage-left.percentage)*(bottom-left.position)/(right.position-left.position);
}
