
export class Route extends Schema {
  @type("boolean") static smallGame: boolean = true;
  @type("string") readonly name: string = "";
  @type("uint8") readonly points: number = 0;
  @type("string") readonly color1: string = "";
  @type("string") readonly color2?: string = "";
  @type("boolean") taken1: boolean = false;
  @type("boolean") taken2?: boolean = false;

  constructor(name: string, points: number, color1: string, color2?: string) {
    super();
    this.name = name;
    this.points = points;
    this.color1 = color1;
    this.color2 = color2;
  }
}
