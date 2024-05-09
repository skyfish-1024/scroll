export function getImage(name: string) {
  return new URL(`/src/assets/image/${name}`, import.meta.url).href;
}
