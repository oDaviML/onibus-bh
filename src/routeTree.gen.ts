/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as CoordenadasNumeroLinhaSentidoImport } from './routes/coordenadas.$numeroLinha.$sentido'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const CoordenadasNumeroLinhaSentidoRoute =
  CoordenadasNumeroLinhaSentidoImport.update({
    id: '/coordenadas/$numeroLinha/$sentido',
    path: '/coordenadas/$numeroLinha/$sentido',
    getParentRoute: () => rootRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/coordenadas/$numeroLinha/$sentido': {
      id: '/coordenadas/$numeroLinha/$sentido'
      path: '/coordenadas/$numeroLinha/$sentido'
      fullPath: '/coordenadas/$numeroLinha/$sentido'
      preLoaderRoute: typeof CoordenadasNumeroLinhaSentidoImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/coordenadas/$numeroLinha/$sentido': typeof CoordenadasNumeroLinhaSentidoRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/coordenadas/$numeroLinha/$sentido': typeof CoordenadasNumeroLinhaSentidoRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/coordenadas/$numeroLinha/$sentido': typeof CoordenadasNumeroLinhaSentidoRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/coordenadas/$numeroLinha/$sentido'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/coordenadas/$numeroLinha/$sentido'
  id: '__root__' | '/' | '/coordenadas/$numeroLinha/$sentido'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CoordenadasNumeroLinhaSentidoRoute: typeof CoordenadasNumeroLinhaSentidoRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CoordenadasNumeroLinhaSentidoRoute: CoordenadasNumeroLinhaSentidoRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/coordenadas/$numeroLinha/$sentido"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/coordenadas/$numeroLinha/$sentido": {
      "filePath": "coordenadas.$numeroLinha.$sentido.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
