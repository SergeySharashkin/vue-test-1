<template>
  <section>
    <div class="wrapper">
      <h2 class="tittel">
        It's your Profile, {{ user.first_name }} {{ user.last_name }}!
      </h2>
      <div class="profile-contain">
        <img
          class="avatar"
          :src="user.avatar"
          alt="avatar"
          width="200"
          height="200"
        />
        <div class="inform-contain">
          <ul class="list list__profile">
            <li class="inform-item">
              First Name: <span>{{ user.first_name }}</span>
            </li>
            <li class="inform-item">
              Last Name: <span>{{ user.last_name }}</span>
            </li>
            <li class="inform-item">
              User Name: <span>{{ user.username }}</span>
            </li>
            <li class="inform-item">
              Gender: <span>{{ user.gender }}</span>
            </li>
            <li class="inform-item">
              Birthday: <span>{{ user.date_of_birth }}</span>
            </li>
          </ul>
          <ul class="list list__profile">
            <li class="inform-item">
              Email: <a :href="`mailto:${user.email}`">{{ user.email }}</a>
            </li>
            <li class="inform-item">
              Phone Number:
              <a :href="`tel:${user.phone_number}`">{{ user.phone_number }}</a>
            </li>
            <li class="inform-item __with-btn">
              <button @click="userUpdater()" class="user-update-btn">
                Update user add remove liked beer list
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2 class="tittel">Heve a new beer</h2>
      <div class="inform-contain">
        <img class="beer-img"
          width="250"
          height="250"
          src="https://lifestyle.24tv.ua/resources/photos/news/1200x1200_DIR/201710/879865.jpg?v=201903234800"
          alt="на апишке нет фотки поэтому я тут"
        />
        <div class="new-beer-inform">
           <ul class="list list__new-beer">
          <li class="inform-item">
            Brand: <span>{{ newBeer.brand }}</span>
          </li>
          <li class="inform-item">
            Name: <span>{{ newBeer.name }}</span>
          </li>
          <li class="inform-item">
            Style: <span>{{ newBeer.style }}</span>
          </li>
          <li class="inform-item">
            Hop: <span>{{ newBeer.hop }}</span>
          </li>
          <li class="inform-item">
            Yeast: <span>{{ newBeer.yeast }}</span>
          </li>
          <li class="inform-item">
            Malts: <span>{{ newBeer.malts }}</span>
          </li>
        </ul>
        <ul class="list list__new-beer">
          
          <li class="inform-item">
            Ibu: <span>{{ newBeer.ibu }}</span>
          </li>
          <li class="inform-item">
            Alcohol: <span>{{ newBeer.alcohol }}</span>
          </li>
          <li class="inform-item">
            Blg: <span>{{ newBeer.blg }}</span>
          </li>
        </ul>
        </div>
       
        
      </div>
      <div class="button-contain">
          <button class="user-update-btn __add" type="button" @click="addBeerInList()">Will be beer</button>
          <button class="user-update-btn __update"  type="button" @click="newBeerHandler()">Another beer</button>
        </div>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2 class="tittel">Liked Beer</h2>
      <div class="inform-contain">
        <template v-if="likedBeers.length === 0">
          <p class="notify-text" key="nothing">Push beer in list</p>
        </template>
        <template v-else>
          <ul  class="list " key="pushedList">
            <li class="beer-list-item"  v-for="(lB, i) of likedBeers" :key="lB.id">
              <p class="beer-list-text">
                {{ i + 1 }}. {{ lB.brand }} - <span> {{ lB.name }} </span>
              </p>
              <div class="button-contain _beer-list">

              <button @click="select(lB)" :id='lB.id' class="user-update-btn __more">More inform</button>
              <button @click="del(lB)" class="user-update-btn __del">Delete</button>
              </div>
              
            </li>
          </ul>
          <Popup :isOpen="isPopupOpen" @close="isPopupOpen = false">
                  <ul class="list list__new-beer">
          <li class="inform-item">
            Brand: <span>{{ selectBeer.brand }}</span>
          </li>
          <li class="inform-item">
            Name: <span>{{ selectBeer.name }}</span>
          </li>
          <li class="inform-item">
            Style: <span>{{ selectBeer.style }}</span>
          </li>
          <li class="inform-item">
            Hop: <span>{{ selectBeer.hop }}</span>
          </li>
          <li class="inform-item">
            Yeast: <span>{{ selectBeer.yeast }}</span>
          </li>
          <li class="inform-item">
            Malts: <span>{{ selectBeer.malts }}</span>
          </li>
          <li class="inform-item">
            Ibu: <span>{{ selectBeer.ibu }}</span>
          </li>
          <li class="inform-item">
            Alcohol: <span>{{ selectBeer.alcohol }}</span>
          </li>
          <li class="inform-item">
            Blg: <span>{{ selectBeer.blg }}</span>
          </li>
        </ul>
                </Popup> 
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import { loadUser, loadBeer } from "./api";
import Popup from './components/Popup.vue';

export default {
  components: { Popup },
  // name: "Popup",
  data() {
    return {
      user: {},
      likedBeers: [],
      newBeer: {},
      seletedBeer: null,
      isPopupOpen: false,
    };
  },

  created() {
    this.userHandler();
    this.newBeerHandler();
    this.beerPreloader();
    return;
  },

  computed: {},

  methods: {
    async userHandler() {
      const lSKey = "user-data";
      const userData = localStorage.getItem(lSKey);
      if (userData) {
        return (this.user = JSON.parse(userData));
      }
      this.user = await loadUser();
      return this.storageAdder(this.user, lSKey);
    },
    async newBeerHandler() {
      this.newBeer = await loadBeer();
      return;
    },
    storageAdder(obj, name) {
      const saver = localStorage.setItem(name, JSON.stringify(obj));
      return saver;
    },
    userUpdater() {
      localStorage.clear();
      this.user= {};
      this.likedBeers = [];
      this.userHandler();
      return
    },
    
    addBeerInList() {
      if (this.likedBeers.includes(this.newBeer)) {
        return alert("This beer is already on your list");
      }
      this.likedBeers = [...this.likedBeers, this.newBeer];
      return this.storageAdder(this.likedBeers, 'likedBeer')
    },
    beerPreloader() {
      const lSKey = "likedBeer";
      const beersData = localStorage.getItem(lSKey);
      if (beersData) {
return (this.likedBeers= JSON.parse(beersData));
      }
      return 
      },
    select(selectBeer) {
      this.seletedBeer = selectBeer;
      console.log(this.seletedBeer);
      this.isPopupOpen = true;
    },
    del(deletedBeer) {
     
      const newList = this.likedBeers.filter((likedBeer)=>{
      return likedBeer.id !== deletedBeer.id
      
      })
      this.likedBeers = newList;
      return this.storageAdder(this.likedBeers, 'likedBeer')
    },  
  },

  watch: {},
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin: 0px;
}
</style>
