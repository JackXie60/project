import Vue from "vue"
import Vuex from "vuex"

import car from "@/store/modules/car.js"
import path from '@/store/modules/path.js'
import login from '@/store/modules/login.js'

Vue.use(Vuex)

export default new Vuex.Store({
	modules:{
		car,
		path,
		login,
	}
})