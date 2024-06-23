<template>
  <div class="auth-wrapper">
    <div class="auth-container">
      <div class="auth-block">
        <h2>Авторизация</h2>
        <form @submit.prevent="handleLogin">
          <div>
            <label for="login-login">Логин:</label>
            <input type="text" id="login-login" v-model="loginData.login" required />
          </div>
          <div>
            <label for="login-password">Пароль:</label>
            <input
              type="password"
              id="login-password"
              v-model="loginData.password"
              required
            />
          </div>
          <OrderButton type="submit">
            Войти
          </OrderButton>
        </form>
      </div>
      <div class="auth-block">
        <h2>Регистрация</h2>
        <form @submit.prevent="handleRegister">
          <div>
            <label for="register-username">Логин:</label>
            <input
              type="text"
              id="register-username"
              v-model="registerData.login"
              required
            />
          </div>
          <div>
            <label for="register-password">Пароль:</label>
            <input
              type="password"
              id="register-password"
              v-model="registerData.password"
              required
            />
          </div>
          <OrderButton type="submit">
            Зарегистрироваться
          </OrderButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import router from "@/router";
import OrderButton from '../components/OrderButton.vue';


onMounted(async () => {
  let auth = localStorage.getItem("jwt");
  if (auth) {
    let authJson = JSON.parse(auth);
    if (authJson && authJson.role && authJson.role.name == "USER") {
      router.push("/user");
    } else if (authJson && authJson.role && authJson.role.name == "ADMIN") {
      router.push("/admin");
    }
  }
});

const loginData = ref({ login: "", password: "" });
const registerData = ref({ login: "", password: "" });

const handleLogin = async () => {
  const formData = new FormData();
  formData.append("login", loginData.value.username);
  formData.append("password", loginData.value.password);

  try {
    const response = await fetch("http://localhost:8080/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData.value),
    });

    if (response.ok) {
      let jwt = await response.json();
      localStorage.setItem("jwt", JSON.stringify(jwt));
      window.location.href = "/";
    } else {
      console.log(400);
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};

const handleRegister = async () => {
  try {
    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData.value),
    });
    // обработка ответа от сервера
    window.location.href = "/";
    console.log("Register response:", await response.json());
  } catch (error) {
    console.error("Register error:", error);
  }
};
</script>

<style>
.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.auth-container {
  display: flex;
  justify-content: space-between;
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  gap: 40px;
}

.auth-block {
  width: 300px;
}

.auth-block h2 {
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.auth-block form div {
  margin-bottom: 15px;
}

.auth-block label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

.auth-block input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.auth-block button {
  font-family: "YanoneKaffeesatz-regular";
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 25px;
}

.auth-block button:hover {
  background-color: #0056b3;
}
</style>
