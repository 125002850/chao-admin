import { defineStore } from "pinia";
import piniaPersistConfig from "@/stores/helper/persist";
import { Operations } from "@/enums";
import { computed, ref } from "vue";
import { Login } from "@/api/interface";

export const useUserStore = defineStore(
  "user",
  () => {
    const token = ref("");
    const userInfo = ref<Login.ResLogin>({});
    const isAdmin = computed(() => userInfo.value.admin);
    const auths = computed(() =>
      isAdmin.value ? ["1", "2", "3", "4", "5"] : (userInfo.value.operateAuthorization?.split(",") ?? [])
    );

    const setToken = (data: string) => (token.value = data);
    const setUserInfo = (data: Login.ResLogin) => (userInfo.value = data);

    return {
      token,
      userInfo,
      isAdmin,
      auths,
      setToken,
      setUserInfo
    };
  },
  { persist: piniaPersistConfig("user") }
);
