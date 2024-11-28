// /users/:id
export function buildRoutePath(path) {
  // ajuda indentificar a expressão contida na url
  const routeParametersRegex = /:([a-zA-Z]+)/g;
  
  const pathWithParams = path.replace(routeParametersRegex, "([a-z0-9\-_]+)");

  const pathRegex = new RegExp(`^${pathWithParams}`);

  return pathRegex;
}
