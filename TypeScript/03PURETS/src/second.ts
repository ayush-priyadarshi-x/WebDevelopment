// Why we use Interfaces

interface takePhoto {
  cameraMode: string;
  filter: string;
  burst: number;
}

interface story {
  short: boolean;
  music: string;
  filter: string;
  createStory(): number;
}

class instagram implements takePhoto {
  constructor(
    public cameraMode: string,
    public filter: string,
    public burst: number
  ) {}
}

class youtubeStory implements story {
  constructor(
    public short: boolean,
    public music: string,
    public filter: string
  ) {}
  createStory(): number {
    return 3000;
  }
}

export {};
