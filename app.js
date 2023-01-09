// import colors from "colors";
import inquirerMenu, {
  pausa,
  leerImput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList,
} from "./helpers/inquirer.js";
import Tareas from "./models/tareas.js";
import guardarDB, { leerDB } from "./helpers/guardarArchivo.js";

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu();
    console.log({ opt });

    switch (opt) {
      case "1":
        const desc = await leerImput("descripcion: ");
        tareas.crearTarea(desc);
        break;
      case "2":
        // console.log(tareas.getListadoArr);
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listarPendientesCompletadas();
        break;
      case "4":
        tareas.listarPendientesCompletadas(false);
        break;
      case "5":
      const ids = await mostrarListadoCheckList(tareas.getListadoArr);
      tareas.toggleCompletadas(ids)
        break;
      case "6":
        const id = await listadoTareasBorrar(tareas.getListadoArr);
        if (id !== "0") {
          const ok = await confirmar("Estas seguro?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea Borrada Correctamente");
          }
        }

        break;
      default:
        console.log("ingrese 1 o 2");
    }

    guardarDB(tareas.getListadoArr);

    if (opt !== "0") {
      await pausa();
    }
  } while (opt !== "0");
};

main();
