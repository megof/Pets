const { createApp } = Vue;
createApp({
    data() {
        return {
            Userl: 'redleopard805',
            Pass: 'tennis',
            NameP: '',
            TypeP: 'Cat',
            GenderP: 'Female',
            SpeciesP: '',
            AgeP: '',
            ColorP: '',
            ImageP: 0,
            User: [],
            Users: [],
            Log: 0,
            Pets: [],
            Adopt: [],
        }
    },
    methods: {
        Login() {
            let User = '';
            this.Users.map(user => {
                if (user.login.username == this.Userl) {
                    User = user;
                    this.User.push(user);
                }
            });
            (User != '') ?
                (User.login.password == this.Pass) ?
                    this.Log = 1 :
                    swal(
                        'Error', 'Ivalid password', 'error'
                    )
                :
                swal(
                    'Error', 'Invalid user', 'error'
                )
        },
        Register() {
            this.Pets.push({
                Pet: this.ImageP,
                Name: this.NameP,
                Type: this.TypeP,
                Gender: this.GenderP,
                Species: this.SpeciesP,
                Age: this.AgeP,
                Color: this.ColorP,
                Status: 'Adoptable',
            })
            localStorage.setItem('Pets', JSON.stringify(this.Pets));
            swal(
                'Success', 'Registered pet', 'success'
            )
            this.Log = 1;
        },
        async Results() {
            let Users = [];
            let User = '';
            let Type = 0;
            await fetch('https://randomuser.me/api/?results=10')
                .then((response) => response.json())
                .then((data) => this.Users = data.results)
            this.Users.map(element => {
                User = element;
                User.Type = Type;
                User.Adopt = 0;
                User.Pets = 0;
                Users.push(User);
                if (Type == 0) {
                    Type = 1;
                }
            })
            this.Users = Users;
            localStorage.setItem('Users', JSON.stringify(this.Users))
        },
    },
    mounted() {
    },
    created() {
        (localStorage.getItem('Users') == null) ?
            this.Results() :
            this.Users = JSON.parse(localStorage.getItem('Users'));

        if (localStorage.getItem('Pets') == null) {
            localStorage.setItem('Pets', JSON.stringify([]))
        }
        this.Pets = JSON.parse(localStorage.getItem('Pets'));
    },
}).mount("#root");