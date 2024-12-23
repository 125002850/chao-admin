import { ref } from "vue";

interface DrawerProps<T extends object> {
  title: string;
  disabled: boolean;
  data: Partial<T>;
  onConfirm?: (params: any) => Promise<any>;
  callback?: () => void;
}

export const useDrawer = <T extends object>() => {
  const visible = ref(false);

  const defaultProps = {
    disabled: false,
    title: "",
    data: {}
  } satisfies DrawerProps<any>;

  const drawerProps = ref<DrawerProps<T>>(defaultProps);

  // 接收父组件传过来的参数
  const acceptParams = (params: DrawerProps<T>) => {
    drawerProps.value = { ...defaultProps, ...params };
    visible.value = true;
  };

  return {
    visible,
    acceptParams,
    drawerProps
  };
};
