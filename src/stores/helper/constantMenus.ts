export const menus = [
  {
    path: "/home/index",
    name: "home",
    component: "/home/index",
    meta: {
      icon: "HomeFilled",
      title: "首页",
      isLink: "",
      isHide: false,
      isFull: false,
      isAffix: true,
      isKeepAlive: true
    }
  },
  {
    path: "/store",
    name: "store",
    component: "/store/index",
    meta: {
      icon: "House",
      title: "店铺管理",
      isLink: "",
      isHide: false,
      isFull: false,
      isAffix: false,
      isKeepAlive: true,
      isAdmin: true
    }
  },
  {
    path: "/user",
    name: "user",
    component: "/user/index",
    meta: {
      icon: "UserFilled",
      title: "人员管理",
      isLink: "",
      isHide: false,
      isFull: false,
      isAffix: false,
      isKeepAlive: true,
      menuKey: "5"
    }
  },
  {
    path: "/check",
    name: "check",
    component: "/check/index",
    meta: {
      icon: "Check",
      title: "审核管理",
      isLink: "",
      isHide: false,
      isFull: false,
      isAffix: false,
      isKeepAlive: true,
      menuKey: "5"
    }
  },
  {
    path: "/brand",
    name: "brand",
    component: "/brand/index",
    meta: {
      icon: "StarFilled",
      title: "品牌管理",
      isLink: "",
      isHide: false,
      isFull: false,
      isAffix: false,
      isKeepAlive: true,
      menuKey: "2"
    }
  },
  {
    path: "/watch",
    name: "watch",
    component: "/watch/index",
    meta: {
      icon: "Watch",
      title: "手表管理",
      isLink: "",
      isHide: false,
      isFull: false,
      isAffix: false,
      isKeepAlive: true,
      menuKey: "1"
    }
  }
];
