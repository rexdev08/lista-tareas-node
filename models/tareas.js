import Tarea from "./tarea.js";

class Tareas {
  constructor() {
    this._listado = {};
  }

  get getListadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  listadoCompleto() {
    this.getListadoArr.forEach((tarea, i) => {
      const indice = `${i + 1}`.green;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? `${completadoEn}`.green : "Pendiente".red;

      console.log(`${indice}. ${desc} :: ${estado}`);
    });
  }

  listarPendientesCompletadas(completadas = true) {
    let listado;

    if (completadas) {
      listado = this.getListadoArr.filter((tarea) => tarea.completadoEn);
    } else {
      listado = this.getListadoArr.filter((tarea) => !tarea.completadoEn);
    }

    listado.forEach((tarea, i) => {
      const indice = `${i + 1}`.green;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? `${completadoEn}`.green : "Pendiente".red;
      console.log(`${indice}${".".green} ${desc} :: ${estado.green}`);
    });
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];

      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }

      this.getListadoArr.forEach((tarea) => {
        if (!ids.includes(tarea.id)) {
          this._listado[tarea.id].completadoEn = null;
        }
      });
    });
  }
}

export default Tareas;
