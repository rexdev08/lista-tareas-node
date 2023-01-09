import inquirer from "inquirer";
import colors from "colors";

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "Que desea Hacer?",
    choices: [
      { value: "1", name: `${"1.".green} Crear Tarea` },
      { value: "2", name: `${"2.".green} Lista Tareas` },
      { value: "3", name: `${"3.".green} Lista Tareas completadas` },
      { value: "4", name: `${"4.".green} Lista Tareas pendientes` },
      { value: "5", name: `${"5.".green} Completar tarea(s)` },
      { value: "6", name: `${"6.".green} Borrar tarea(s)` },
      { value: "0", name: `${"0.".green} Salir` },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("=======================".green);
  console.log(" Seleccione una opcion ".bgGreen.bold);
  console.log("=======================\n".green);

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

const pausa = async () => {
  console.log("\n");

  const question = await inquirer.prompt([
    {
      type: "input",
      name: "Continuar",
      message: `Presione ${"ENTER".green} para continuar`,
    },
  ]);
};

const leerImput = async (message) => {
  const question = [
    {
      type: "imput",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }

        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const indice = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${indice} ${tarea.desc}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0.".green + " Cancelar",
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);
  return id;
};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);

  return ok;
};

const mostrarListadoCheckList = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const indice = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${indice} ${tarea.desc}`,
      checked: (tarea.completadoEn)? true : false,
    };
  });


  const preguntas = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(preguntas);
  return ids;
};

export {
  pausa,
  leerImput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList,
};
export default inquirerMenu;
