Vue.component('error-component', {
    data() {
        return {
            message: '',
        }
    },
    template: `<div>{{message}}</div>`,
    methods: {
        updateMessage(msg) {
            this.message = msg;
        }
    }
})