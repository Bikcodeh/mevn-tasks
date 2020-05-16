<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a href="/" class="navbar-brand">MEVN</a>
    </nav>
    <div class="container">
      <div class="row mt-5">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="sendTask">
                <div class="form-group">
                  <input
                    type="text"
                    v-model="task.title"
                    name=""
                    id=""
                    class="form-control"
                    placeholder="Ingrese tarea"
                  />
                </div>
                <div class="form-group">
                  <textarea
                    name=""
                    id=""
                    v-model="task.description"
                    cols="30"
                    rows="10"
                    placeholder="Ingrese descripcion"
                    class="form-control"
                  ></textarea>
                </div>
                <template v-if="!edit">
                  <div>
                    <button class="btn btn-primary btn-block">Enviar</button>
                  </div>
                </template>
                <template v-else>
                  <div>
                    <button class="btn btn-primary btn-block">
                      Actualizar
                    </button>
                  </div>
                </template>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Tarea</th>
                <th>Descripcion</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(task, index) of tasks" :key="index">
                <td>{{ task.title }}</td>
                <td>{{ task.description }}</td>
                <td>
                  <button @click="updateTask(task._id)" class="btn btn-primary">
                    Actualizar
                  </button>
                  <button @click="deleteTask(task._id)" class="btn btn-danger">
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      task: {
        title: "",
        description: "",
      },
      tasks: [],
      edit: false,
      idTaskToEdit: "",
    };
  },
  created() {
    this.getTasks();
  },
  methods: {
    sendTask() {
      if (!this.edit) {
        fetch("/api/tasks", {
          method: "POST",
          body: JSON.stringify(this.task),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            this.tasks.push(data);
          })
          .catch((err) => console.log(err));
      } else {
        fetch("/api/tasks/"+this.idTaskToEdit, {
          method: "PUT",
          body: JSON.stringify(this.task),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
              this.edit = !this.edit;
            this.getTasks()
          })
          .catch((err) => console.log(err));
      }
    },
    getTasks() {
      fetch("/api/tasks")
        .then((res) => res.json())
        .then((data) => {
          this.tasks = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteTask(id) {
      fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.getTasks();
        })
        .catch((err) => console.log(err));
    },
    updateTask(id) {
      this.edit = !this.edit;
      fetch(`/api/tasks/${id}`)
        .then((res) => res.json())
        .then((data) => {
          this.idTaskToEdit = data._id;
          this.task.title = data.title;
          this.task.description = data.description;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
