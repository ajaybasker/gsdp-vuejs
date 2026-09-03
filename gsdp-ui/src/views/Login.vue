<template>
  <div class="min-h-screen flex text-gray-900 font-sans">
    <!-- Left Pane -->
    <div class="hidden lg:flex lg:w-1/2 bg-[#0f172a] text-white p-12 flex-col justify-between relative overflow-hidden">
      <!-- Background overlay image if needed -->
      <div class="absolute inset-0 opacity-20 bg-cover bg-center" :style="{ backgroundImage: `url(${heroImg})` }"></div>
      
      <div class="relative z-10">
        <!-- Logo -->
        <div class="flex items-center space-x-2 mb-16">
          <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z"/></svg>
          <span class="text-2xl font-bold uppercase tracking-wider">Salesian<br/>Online</span>
        </div>
        
        <h1 class="text-5xl font-extrabold leading-tight mb-4">
          One digital home for<br/>the Salesian family,<br/>
          <span class="text-yellow-500">globally.</span>
        </h1>
        <p class="text-lg text-gray-300 mb-12">
          A unified platform to connect, collaborate and drive mission forward — together.
        </p>

        <div class="grid grid-cols-3 gap-6 mb-12">
          <div>
            <div class="w-10 h-10 rounded border border-gray-600 flex items-center justify-center mb-3">
              <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </div>
            <h3 class="font-bold mb-1">One federated registry</h3>
            <p class="text-sm text-gray-400">Region, Province, Community and Sector.</p>
          </div>
          <div>
            <div class="w-10 h-10 rounded border border-gray-600 flex items-center justify-center mb-3">
              <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <h3 class="font-bold mb-1">Governed workflows</h3>
            <p class="text-sm text-gray-400">Automated compliance and escalation.</p>
          </div>
          <div>
            <div class="w-10 h-10 rounded border border-gray-600 flex items-center justify-center mb-3">
              <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            </div>
            <h3 class="font-bold mb-1">Curated digital resources</h3>
            <p class="text-sm text-gray-400">Published and accessed globally.</p>
          </div>
        </div>

        <div class="flex items-start space-x-4">
          <div class="w-12 h-12 rounded-full bg-gray-500 overflow-hidden flex-shrink-0">
             <img src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Don_Bosco.jpg" alt="Don Bosco" class="w-full h-full object-cover">
          </div>
          <div>
            <p class="italic text-gray-300 text-sm mb-1">"It is not enough to love the young; they must know that they are loved."</p>
            <p class="text-yellow-500 text-sm font-semibold">— St. Don Bosco</p>
          </div>
        </div>
      </div>
      
      <div class="relative z-10 flex justify-between text-xs text-gray-500 border-t border-gray-700 pt-4 mt-8">
        <div class="flex space-x-4">
          <span>🌍 Salesian Congregation</span>
          <span>Via della Pisana 1111, 00163 Roma, Italy</span>
          <a href="#" class="hover:text-white">Official Sources ↗</a>
        </div>
      </div>
    </div>

    <!-- Right Pane -->
    <div class="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center p-8 relative">
      <div class="w-full max-w-md">
        <div class="flex flex-col items-center mb-8">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-500">
             <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
          </div>
          <h2 class="text-3xl font-bold font-serif mb-2 text-gray-900">Welcome back</h2>
          <p class="text-gray-500">Sign in to continue to Salesian Online.</p>
        </div>

        <div v-if="errorMessage" class="mb-6 p-3 text-sm text-red-700 bg-red-50 rounded-lg flex items-center justify-between transition-all duration-300 shadow-sm border border-red-200">
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            {{ errorMessage }}
          </div>
          <button type="button" @click="errorMessage = ''" class="text-red-500 hover:text-red-800">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <form @submit.prevent="login" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email or username</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <input type="text" v-model="email" class="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-blue-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" placeholder="admin@gmail.com" />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              </div>
              <input :type="showPassword ? 'text' : 'password'" v-model="password" class="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg bg-blue-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" placeholder="••••••••" />
              <div @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer hover:text-gray-600">
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div class="text-sm">
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <button type="submit" class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
            Sign in
          </button>
        </form>
        

      </div>
      
      <!-- Footer items -->
      <div class="absolute bottom-4 w-full px-8 flex justify-between text-xs text-gray-400 max-w-md">
        <span>© 2026 Salesian Online</span>
        <div class="flex space-x-4">
          <a href="#" class="hover:text-gray-600">Privacy Policy</a>
          <a href="#" class="hover:text-gray-600">Terms of Use</a>
          <a href="#" class="hover:text-gray-600">Data Policy</a>
          <a href="#" class="hover:text-gray-600">Accessibility</a>
          <a href="#" class="hover:text-gray-600 flex items-center"><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> Contact</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import heroImg from '../assets/hero.png';

export default {
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      heroImg,
      errorMessage: ""
    };
  },
  inject: ["$auth"],
  async mounted() {
    if (this.$route?.query?.route) {
      this.redirect_route = this.$route.query.route;
      this.$router.replace({ query: null });
    }
  },
  methods: {
    async login() {
      this.errorMessage = "";
      if (this.email && this.password) {
        try {
          let res = await this.$auth.login(this.email, this.password);
          if (res) {
            window.location.href = "/app";
          } else {
            this.errorMessage = "Enter valid user name and password";
          }
        } catch (e) {
          this.errorMessage = "Enter valid user name and password";
        }
      } else {
        this.errorMessage = "Enter valid user name and password";
      }
    },
  },
};
</script>
