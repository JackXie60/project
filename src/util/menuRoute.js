const menuRoute = {
  coustomer: [
    { name: 'Product' },
    { name: 'ProductList' },
    { name: 'ProductAdd' },
    { name: 'ProductEdit' },
  ],
  admin: [
    { name: 'Product' },
    { name: 'ProductList' },
    { name: 'ProductAdd' },
    { name: 'Category' },
    { name: 'ProductEdit' },
  ],
};
// 根据不同的身份过滤路由
export default function getMenuRoute(role, route) {
  const allowRoute = menuRoute[role].map((it) => it.name);
  const resultRoute = route.filter((it) => {
    const obj = it;
    if (allowRoute.includes(it.name)) {
      obj.children = obj.children.filter((childItem) => allowRoute.includes(childItem.name));
      return true;
    }
    return false;
  });
  return resultRoute;
}
