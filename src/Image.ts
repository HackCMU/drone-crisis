// @ts-ignore
import imageUrlNestedMapping from './../images/**/*.png';

type NestedMapping = {
  [path in string]: string | NestedMapping;
};
const imageUrlFlattenedMapping = new Map<string, string>();

function flattenAndAdd(nestedMapping: NestedMapping, prefix = '') {
  for (const pathPart of Object.keys(nestedMapping)) {
    const urlOrNestedMapping = nestedMapping[pathPart];
    if (typeof urlOrNestedMapping === 'string') {
      imageUrlFlattenedMapping.set(prefix + pathPart, urlOrNestedMapping);
    } else {
      flattenAndAdd(urlOrNestedMapping, prefix + pathPart + '/');
    }
  }
}
flattenAndAdd(imageUrlNestedMapping);

function loadImageOnce(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = url;
    img.addEventListener('load', () => {
      resolve(img);
    });
    img.addEventListener('error', () => {
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
for (const imageName of imageUrlFlattenedMapping.keys()) {
  images.set(imageName, new Image(imageUrlFlattenedMapping.get(imageName)!));
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
  const image = images.get(name);
  if (image === undefined) {
    throw new Error(`Cannot find image "${name}". Available: ${Array.from(imageUrlFlattenedMapping.keys()).join(', ')}.`);
  }
  return image.tag;
}
