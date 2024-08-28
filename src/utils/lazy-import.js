import { lazy } from 'react'

// named imports for React.lazy: https://github.com/facebook/react/issues/14603#issuecomment-726551598
export function lazyImport(factory, name) {
  return Object.create({
    [name]: lazy(() => factory().then((module) => ({ default: module[name] }))),
  })
}

// Usage
// const { Home } = lazyImport(() => import("./Home"), "Home");
