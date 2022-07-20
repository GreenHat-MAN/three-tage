<template>
    <div v-if="cinema">
        <myheard :title="cinema.name" :back="true"></myheard>
        <div class="cbox">
            <h2>{{cinema.name }}</h2>
            <h2>{{cinema.address }}</h2>

        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            cinema:null,
            films:[] , // 电影院里面的电影排片 
            schedules:[] // 每天的排片具体信息
        }
    },
    methods:{
        async getCinema(){
            let res = await this.$ajax.getList({
                cinemaId:this.$route.params.cinemaId
            },{
                'X-Host': 'mall.film-ticket.cinema.info'
            })
            this.cinema = res.data.cinema
        },
        async getCinemaFilms(){
            let res = await this.$ajax.getList({
                cinemaId:this.$route.params.cinemaId
            },{
                'X-Host': 'mall.film-ticket.film.cinema-show-film'
            })
            this.films = res.data.films
        },
        async getschedules(){
            let res = await this.$ajax.getList({
                cinemaId:this.$route.params.cinemaId,
                date: 1658332800,
                filmId: 5910,   // 后期改成活参数 
            },{
                'X-Host': 'mall.film-ticket.schedule.list'
            })
            this.schedules = res.data.schedules;
        }
    },
    mounted(){
        this.getCinema()
        this.getCinemaFilms()
        this.getschedules()
    }
}
</script>

