const app = Vue.createApp({
    data() {
        return {
            taskId: 2,
            types: [
                'Хобби',
                'Отдых',
                'Работа'
            ],
            tasks: [
                {
                    taskId: 0,
                    prio: true,
                    name: 'Вышивка',
                    type: 'Хобби',
                    duration: 10,
                    isDone: false
                },
                {
                    taskId: 1,
                    prio: false,
                    name: 'Лежать',
                    type: 'Отдых',
                    duration: 10,
                    isDone: false
                },
            ],
            new_task: {
                taskId: undefined,
                prio: false,
                name: '',
                type: '',
                duration: 0,
                isDone: false
            }
        }
    },
    computed: {
        date() {
            let today = new Date();
            return today.toLocaleDateString("ru-RU", {month: "numeric", day: "numeric"});
        },
        duration() {
            let dur = 0;
            for (let i = 0; i < this.tasks.length; i++) {
                if (!this.tasks[i].isDone) {
                    dur += this.tasks[i].duration;

                }
            }
            return dur;
        }
    },
    methods: {
        addTask() {
            if (this.new_task.taskId !== undefined) {                
                for (let i = 0; i < this.tasks.length; i++) {
                    if (this.tasks[i].taskId == this.new_task.taskId) {
                        this.tasks.splice(i, 1);
                    }
                }
            } else {
                this.new_task.taskId = this.taskId++;
            }

            let new_task = JSON.parse(JSON.stringify(this.new_task));
            this.tasks.push(new_task);
            this.clearForm();
        },
        editTask(event) {
            this.new_task.taskId = event.target.getAttribute('taskId');
            for (let i = 0; i < this.tasks.length; i++) {
                if (this.tasks[i].taskId == this.new_task.taskId) {
                    this.new_task.prio = this.tasks[i].prio;
                    this.new_task.name = this.tasks[i].name;
                    this.new_task.type = this.tasks[i].type;
                    this.new_task.duration = this.tasks[i].duration;
                    this.new_task.isDone = this.tasks[i].idDone;
                }
            }            
            console.log(this.new_task)
        }, 
        clearForm() {
            this.new_task.taskId = undefined;
            this.new_task.prio = false;
            this.new_task.name = '';
            this.new_task.type = '';
            this.new_task.duration = 0;
            this.new_task.isDone = '';
        }
    }
})

const vm = app.mount('#app')
  