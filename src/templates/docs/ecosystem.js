import { ExtensionsList } from 'components/pages/doc-ecosystem/extensions-list';
import { PageInfo } from 'components/pages/doc-welcome/page-info';
import docPageContent from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import LocaleProvider from 'contexts/locale-provider';
import { useScrollToAnchor } from 'hooks';
import { DocLayout } from 'layouts/doc-layout';
import React from 'react';
import SeoMetadata from 'utils/seo-metadata';

export default function ({ pageContext: { navLinks } }) {
  useScrollToAnchor();
  const pageMetadata = SeoMetadata.ecosystem;

  const ecosystemSidebar = {
    name: 'ecosystem',
    meta: {
      title: 'Ecosystem',
      path: '/ecosystem/',
    },
    children: {
      Ecosystem: {
        name: 'ecosystem',
        meta: {
          title: 'Ecosystem',
          path: '/ecosystem/',
        },
        children: {
          Discovery: {
            name: 'Discovery',
            meta: {
              title: 'Discovery',
              isActiveSidebarLink: true,
              path: '/ecosystem/',
            },
            children: {},
          },
          'Bundle Builder': {
            name: 'Bundle Builder',
            meta: {
              title: 'Bundle Builder',
              isActiveSidebarLink: true,
              path: '/ecosystem/bundle-builder/',
            },
            children: {},
          },
        },
      },
      Types: {
        name: 'types',
        meta: {
          title: 'Types',
          path: '/ecosystem/',
        },
        children: {
          Extensions: {
            name: 'Extensions',
            meta: {
              title: 'Extensions',
              isActiveSidebarLink: true,
              path: '/ecosystem/?type=extensions',
            },
            children: {},
          },
          'Reporting Templates': {
            name: 'Reporting Templates',
            meta: {
              title: 'Reporting Templates',
              isActiveSidebarLink: true,
              path: '/ecosystem/?type=reporting-templates',
            },
            children: {},
          },
        },
      },
      Category: {
        name: 'Category',
        meta: {
          title: 'Category',
          path: '/ecosystem/',
        },
        children: {},
      },
    },
  };

  return (
    <LocaleProvider>
      <DocLayout
        // sidebarTree={sidebarTree}
        sidebarTree={ecosystemSidebar}
        navLinks={navLinks}
        pageMetadata={pageMetadata}
      >
        <PageInfo
          title={'Discovery'}
          description={`Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Donec proin urna, fusce vitae et eget sed enim, quam. 
          Sed aliquet molestie nec tincidunt habitasse erat enim platea.`}
        />
        <div className={`${docPageContent.inner} `}>
          <ExtensionsList />
        </div>
      </DocLayout>
    </LocaleProvider>
  );
}