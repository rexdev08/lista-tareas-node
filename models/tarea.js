import { v4 as uuid } from "uuid";

class Tarea {
  constructor(desc) {
    this.id = uuid();
    this.desc = desc;
    this.completadoEn = null;
  }

}

export default Tarea;
