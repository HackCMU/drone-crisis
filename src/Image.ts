// @ts-ignore
import imageUrlMapping from './../images/*.png';

function loadImageOnce(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = url;
    img.addEventListener('load', () => {
      resolve(img);
    });
    img.addEventListener('error', error => {
      reject(new Error(`Failed to load ${url}.`));
    });
  });
}

async function loadImage(url: string): Promise<HTMLImageElement> {
  let lastError: any;
  for (let i = 0; i < 3; i++) {
    try {
      return await loadImageOnce(url);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

/** Represents an image */
export class Image {
  public tag!: HTMLImageElement;
  public constructor(
    public readonly url: string,
  ) {}
  public async load(): Promise<void> {
    this.tag = await loadImage(this.url);
  }
}

const images = new Map<string, Image>();
for (const imageName of Object.keys(imageUrlMapping)) {
  images.set(imageName, new Image(imageUrlMapping[imageName]));
}
export function loadImages(): Promise<void> {
  return new Promise(resolve => {
    const loadStatus = document.createElement('div');
    loadStatus.classList.add('load-status');
    const updateLoadStatus = () => {
      loadStatus.innerText = `Loading image: [${loaded} / ${images.size}]`;
    };
    updateLoadStatus();
    document.body.appendChild(loadStatus);

    let loaded = 0;
    for (const [name, image] of images.entries()) {
      image.load()
        .then(() => {
          loaded++;
          updateLoadStatus();
          if (loaded === images.size) {
            loadStatus.remove();
            resolve();
          }
        })
        .catch(error => {
          loadStatus.classList.add('failed');
          loadStatus.innerText = `Failed to load "${name}": ${error}`;
        });
    }
  });
}
export function getImage(name: string) {
  return images.get(name)!.tag;
}
