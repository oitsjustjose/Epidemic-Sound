export interface dimension {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface StorageOptions {
  configName: string;
  defaults: dimension;
}
