<!-- el List.vue es un componente que muestra una lista de registros y permite eliminarlos -->
<script setup lang="ts">
import type { Interprete } from '@/models/interprete'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { onMounted, ref } from 'vue' //ref es una funcion que se encarga de crear una variable reactiva

const ENDPOINT = 'interpretes' //aqui se define el endpoint de la API(ENDPOINT quiere decir punto final)
let interpretes = ref<Interprete[]>([]) //aqui se define la variable interpretes que es un arreglo de objetos de tipo Interprete
const emit = defineEmits(['edit']) //aqui se definen los eventos que se pueden emitir
const interpreteDelete = ref<Interprete | null>(null) //Se define la variable interpreteDelete que es un objeto de tipo Interprete
const mostrarConfirmDialog = ref<boolean>(false)

//esta funcion asincrona se encarga de obtener la lista de interpretes
async function obtenerLista() {
  interpretes.value = await http.get(ENDPOINT).then((response) => response.data)
}

//esta funcion se encarga de emitir el evento edit, es decir, de emitir la edicion de un interprete
function emitirEdicion(interprete: Interprete) {
  emit('edit', interprete)
}

//esta funcion se encarga de mostrar el dialogo de confirmacion para eliminar un interprete
function mostrarEliminarConfirm(interprete: Interprete) {
  interpreteDelete.value = interprete
  mostrarConfirmDialog.value = true
}

//esta funcion asincrona se encarga de eliminar un interprete
async function eliminar() {
  await http.delete(`${ENDPOINT}/${interpreteDelete.value?.id}`) //la estrcutura de la peticion es DELETE /interpretes/:id
  obtenerLista()
  mostrarConfirmDialog.value = false
}

//el onMounted se encarga de ejecutar la funcion obtenerLista cuando el componente es montado
onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<!-- aqui se define la estructura visual del componente , osea la tabla que muestra la lista de interpretes -->
<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Nombre</th>
          <th>Nacionalidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(interprete, index) in interpretes" :key="interprete.id">
          <td>{{ index + 1 }}</td>
          <td>{{ interprete.nombre }}</td>
          <td>{{ interprete.nacionalidad }}</td>
          <td>
            <Button
              icon="pi pi-pencil"
              aria-label="Editar"
              text
              @click="emitirEdicion(interprete)"
            />
            <Button
              icon="pi pi-trash"
              aria-label="Eliminar"
              text
              @click="mostrarEliminarConfirm(interprete)"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <!-- este template es el que se encarga de mostrar el dialogo de confirmacion de eliminacion -->
    <!-- los dialog son ventanas emergentes que se muestran en la pantalla osea no son visibles 
      hasta que se les de click a un boton -->
    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <p>¿Estás seguro de que deseas eliminar este registro?</p>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
        />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
