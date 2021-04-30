/* gatsby-node.js specific helper functions */
const { pathTranslations } = require('../i18n/path-translations');

const { slugify, compose, stripDirectoryPath } = require('./utils');

const SUPPORTED_LOCALES = ['es', 'en'];
const DEFAULT_LOCALE = 'en';

const SUPPORTED_VERSIONS = [
  'v.0.30',
  'v.0.29',
  'v.0.28',
  'v.0.27',
  'v.0.26',
  'v.0.25',
  'v.0.24',
  'v.0.23',
];
const LATEST_VERSION = 'v.0.31';

// create a container;
const utils = {};

// ensures that no trailing slash is left
const noTrailingSlash = (path) =>
  path === '/' ? '/' : path.replace(/(.+)\/$/, '$1');

// ensures that path has a trailing slash
const addTrailingSlash = (path) => path.replace(/\/$|$/, `/`);

const translatePathPart = (item, locale) => {
  if (
    typeof pathTranslations[item] !== 'undefined' &&
    typeof pathTranslations[item][locale] !== 'undefined'
  ) {
    return pathTranslations[item][locale];
  }
  return item;
};

// translates all parts of path to selected locale using path-translations.js
const translatePath = (path, locale) =>
  path
    .split('/')
    .map((part) => translatePathPart(part, locale))
    .join('/');

// buildBreadcrumbs(path: String) -> Array<Object>
const buildBreadcrumbs = (path) => {
  let accumulatedPath = '';
  return path.split('/').map((part, i) => {
    accumulatedPath += `/${part}`;
    const slug = slugify(accumulatedPath);
    let name;
    if (i === 0) {
      name = new RegExp(/javascript api/i).test(part)
        ? 'Javascript API'
        : part.slice(0, 1).toUpperCase() + part.slice(1);
    } else if (i === 1) {
      name = new RegExp(/k6-/i).test(part) ? part.replace(/-/g, '/') : part;
    } else {
      name = part;
    }
    return {
      name,
      path: addTrailingSlash(slug),
    };
  });
};

// builds a single file tree node
// buildFileTreeNode(name: String) -> Object
const buildFileTreeNode = (name, meta = {}, children = {}) => ({
  name,
  meta,
  children,
});

// creates a file tree structure
// buildFileTree(nodeBuild: Function) -> Object
const buildFileTree = (nodeBuilder) => {
  const root = nodeBuilder('_root');

  const addNode = (path, name, meta = {}) => {
    let parent = root;
    const parts = path.split('/');

    const locale =
      SUPPORTED_LOCALES.find((loc) => parts.includes(loc)) || DEFAULT_LOCALE;

    parts.push(name);

    let currentPath = '';

    parts.forEach((part) => {
      if (
        parent.children === undefined ||
        parent.children[part] === undefined
      ) {
        // add translated folder name to meta.title for each node in tree
        const translatedName = translatePathPart(part, locale);

        // add translated path to meta.path for each node, ignore /en path
        currentPath =
          part === DEFAULT_LOCALE
            ? '/'
            : compose(
                // eslint-disable-next-line no-use-before-define
                removeEnPrefix,
                // eslint-disable-next-line no-use-before-define
                redirectWelcome,
                // eslint-disable-next-line no-use-before-define
                dedupePath,
                slugify,
              )(`${currentPath}/${translatedName}`);

        parent.children[part] = nodeBuilder(part, {
          title: translatedName,
          path: currentPath,
        });
      } else {
        // if node is in the tree already, just update current path
        currentPath =
          part === DEFAULT_LOCALE
            ? '/'
            : compose(
                // eslint-disable-next-line no-use-before-define
                removeEnPrefix,
                // eslint-disable-next-line no-use-before-define
                redirectWelcome,
                // eslint-disable-next-line no-use-before-define
                dedupePath,
                slugify,
              )(`${currentPath}/${part}`);
      }

      parent.children[part] = parent.children[part] || nodeBuilder(part);
      parent = parent.children[part];
    });

    parent.meta = { ...meta };
  };

  const getTree = () => root;

  return {
    root,
    addNode,
    getTree,
  };
};

// takes a string like 'docs/001-Directory/01-file' or just '001-Directory'
// and removes all the order numbers like 'docs/Directory/file' or 'Directory'
// unorderify(str: String, nameOnly?: Bool) -> String
const unorderify = (str, nameOnly = false) => {
  const unorderEntry = (entry) => entry.replace(/^(\d*\W*)(\.*)/, '$2');
  return nameOnly
    ? unorderEntry(str)
    : str.split('/').map(unorderEntry).join('/');
};

// creating-docs-pages-specific function; extracts the category after
// 'docs'; e.g. /whatever/some-more -> whatever
// getDocSection(str: String) -> String
const getDocSection = (str) => str.replace(/^(.*?)\/.*$/, '$1');

// extracts a certain part of a sidebar which
// which root key matches passed child
// getChildSidebar(sidebar: Object -> child: String) -> Object
const getChildSidebar = (sidebar) => (child, locale = null) =>
  locale ? sidebar.children[locale].children[child] : sidebar.children[child];

// accepts a logger (reporter, console.log)
// and returns a set of functions
// to perform the path collision detection
const pathCollisionDetector = (logger) => {
  /* paths store */
  const PATHS = [];
  /* private functions */

  // shout message template
  const buildWarning = ({ current, stored }) =>
    // eslint-disable-next-line max-len
    `\n\n### ATTENTION!\n\nDetected path collision at the following files:\n\nFile 1: name: ${stored.name}, path: ${stored.path}, status: CREATED  \nFile 2: name: ${current.name}, path: ${current.path}, status: ATTEMPT TO CREATE \nSKIPPING PAGE CREATION OF FILE 2\n\nMost likely the reason for collision is the 'title' fields in frontmatter area that became identic after slugifying. Consider changing it, using 'slug' field of frontmatter to override default path generation or contact the developer team.\n\n`;
  // check if the path already exist in collection
  const contains = (path) => PATHS.some(({ path: $path }) => $path === path);
  // get an pathMeta entity
  const get = (path) => PATHS.find((pathMeta) => pathMeta.path === path);

  /* public functions */
  // puts path into the storage if there is no such yet
  // otherwise loggs warning message
  const add = ({ name, path }) => {
    if (contains(path)) {
      logger(buildWarning({ current: { name, path }, stored: get(path) }));
      return {
        isUnique: () => false,
      };
    }
    PATHS.push({ name, path });
    return {
      isUnique: () => true,
    };
  };
  return {
    add,
  };
};

// english pages are the root: / or /docs in prod, so we remove that part
const removeEnPrefix = (path) => {
  if (path.startsWith('en/')) {
    return path.replace(/en\//i, '');
  }
  return path.replace(/\/en\//i, '/');
};

// removes duplicates from path, e.g.
// examples/examples -> examples
const dedupePath = (path) => Array.from(new Set(path.split('/'))).join('/');

// welcome is redirecting to the root path
// for sidebar links processing
const redirectWelcome = (path) =>
  path
    .replace(/en\/getting-started\/welcome/i, '')
    .replace(/empezando\/bienvenido/i, '');

const getSlug = (path) => {
  const slug = compose(
    removeEnPrefix,
    addTrailingSlash,
    redirectWelcome,
    dedupePath,
    unorderify,
    slugify,
  )(path);

  return slug;
};

// translated path + title
const getTranslatedSlug = (
  relativeDirectory,
  title,
  locale = 'es',
  type = 'guides',
) => {
  const strippedDirectory = stripDirectoryPath(relativeDirectory, type);
  const path = unorderify(strippedDirectory);
  const translatedPath = translatePath(path, locale);

  const slug = compose(
    addTrailingSlash,
    redirectWelcome,
    dedupePath,
    slugify,
  )(`${translatedPath}/${unorderify(title.replace(/\//g, '-'))}`);

  return slug;
};

Object.defineProperties(utils, {
  addTrailingSlash: {
    value: addTrailingSlash,
  },
  noTrailingSlash: {
    value: noTrailingSlash,
  },
  redirectWelcome: {
    value: redirectWelcome,
  },
  dedupePath: {
    value: dedupePath,
  },
  buildBreadcrumbs: {
    value: buildBreadcrumbs,
  },
  buildFileTreeNode: {
    value: buildFileTreeNode,
  },
  buildFileTree: {
    value: buildFileTree,
  },
  unorderify: {
    value: unorderify,
  },
  getDocSection: {
    value: getDocSection,
  },
  getChildSidebar: {
    value: getChildSidebar,
  },
  pathCollisionDetector: {
    value: pathCollisionDetector,
  },
  SUPPORTED_LOCALES: {
    value: SUPPORTED_LOCALES,
  },
  DEFAULT_LOCALE: {
    value: DEFAULT_LOCALE,
  },
  removeEnPrefix: {
    value: removeEnPrefix,
  },
  translatePathPart: {
    value: translatePathPart,
  },
  translatePath: {
    value: translatePath,
  },
  getSlug: {
    value: getSlug,
  },
  getTranslatedSlug: {
    value: getTranslatedSlug,
  },
  SUPPORTED_VERSIONS: {
    value: SUPPORTED_VERSIONS,
  },
  LATEST_VERSION: {
    value: LATEST_VERSION,
  },
});

module.exports = utils;
