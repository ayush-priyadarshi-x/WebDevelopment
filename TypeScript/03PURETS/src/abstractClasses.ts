// Abstract Classes
abstract class takePhoto {
  constructor(
    public cameraMode: number,
    public filter: string,
    public isSaved: boolean
  ) {}
  abstract beforeSave(): void;
  afterSave(): boolean {
    return true;
  }
}

class insta extends takePhoto {
  constructor(
    public cameraMode: number,
    public filter: string,
    public isSaved: boolean
  ) {
    super(cameraMode, filter, isSaved);
  }
  beforeSave(): void {
    return;
  }
}

let ay = new insta(1, "Normal", true);
let an = ay.afterSave();

export {};
