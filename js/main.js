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
            ],
            new_task: {
                taskId: undefined,
                prio: false,
                name: '',
                type: 'Хобби',
                duration: 0,
                isDone: false
            },
            errors: {
                'name' : true,
                'duration' : true
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
        validate() {
            if (this.new_task.name.trim() === '') {
                this.errors['name'] = false;
            } else {
                this.errors['name'] = true;
            }
            if ( !(this.new_task.duration >= '0' && this.new_task.duration <= '9') ||
                this.new_task.duration < 0) {
                this.errors['duration'] = false;
            } else {
                this.errors['duration'] = true;
            }
            for (let key in this.errors){
                if (!this.errors[key]) {
                    return false;
                }
            }
            return true;
        },
        addTask() {
            if (!this.validate()) {
                return;
            }
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
            localStorage.setItem(String(new_task.taskId), JSON.stringify(new_task));
            localStorage.setItem('taskId', String(this.taskId));
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
                    this.new_task.isDone = this.tasks[i].isDone;
                }
            }            
        }, 
        clearForm() {
            this.new_task.taskId = undefined;
            this.new_task.prio = false;
            this.new_task.name = '';
            this.new_task.type = 'Хобби';
            this.new_task.duration = 0;
            this.new_task.isDone = '';
        },
        clearStorage() {
            localStorage.clear();
        }
    },
    mounted() {
        let keys = Object.keys(localStorage);
        for(let key of keys) {
            if (key == 'taskId') {
                this.taskId = parseInt(localStorage.getItem(key));
                continue;
            }
            this.tasks.push(JSON.parse(localStorage.getItem(key)));
        }
    }
})

const vm = app.mount('#app')