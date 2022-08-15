const homeURL = {
  route: "/",
  url: "/",
};

export const URLS = {
  home: {
    ...homeURL,
  },
  viewkART: {
    route: "/kart",
    url: homeURL.url + "/kart",
  },
  listProducts: {
    route: "/:category",
    url: homeURL.url + "category",
  },
  showDetails: {
    route: "/details/:id",
    url: homeURL.url + "/details",
  },
  allComponents: {
    route: "/components",
    url: homeURL.url + "/components",
  },
  notFound: {
    route: "*",
    url: "*",
  },
};
