export function getStyles(fontSize, lineHeight, style) {
  let styles = {};
  if (style) {
	styles = { ...style };
  }
  styles.fontSize = `${fontSize}px`;
  styles.lineHeight = `${lineHeight}px`;
  return styles;
}