/*const { createCheck } = require('./Routers/task/create_task');

async function main() {
  try {
    const noteData = {
      name: 'Test',
      description: 'Probando la bd desde codigo.',
      date_start: new Date('2024-03-12T05:00:00.000Z'),
      date_end: new Date('2024-04-13T05:00:00.000Z')
    };

    const newCheck = await createCheck(noteData);
  } catch (error) {
    console.error('Error al crear la nota:', error);
  }
}

// Llamar a la función main para iniciar el proceso
main();*/

const { updateCheckByIdentification } = require('./routers/task/crud/update_task');

async function main() {
  try {
    const identification = 1; // La identificación de la nota que se va a actualizar
    const newData = {
      name: 'ver nombre',
      description: 'Nueva descripción',
      date_start: new Date('2024-03-12T05:00:00.000Z'),
      date_end: new Date('2024-04-13T05:00:00.000Z'),
      type_notf_identification: 4 // La identificación del tipo de notificación que se va a asignar
    };

    // Actualizar la nota en la base de datos
    const updatedCheck = await updateCheckByIdentification(identification, newData);
    console.log('Nota actualizada:', updatedCheck);
  } catch (error) {
    console.error('Error al actualizar la nota:', error);
  }
}

// Llamar a la función main para iniciar el proceso
main();



//probando