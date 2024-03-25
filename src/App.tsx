import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import headerImage from './assets/logo.png';
import fallbackImage from './assets/no-logo.png';
import fallbackAvatarImage from './assets/missing-avatar.jpeg';
import crunchbaseLogo from './assets/crunchbase.png';
import linkedInLogo from './assets/linkedIn.png';
import twitterLogo from './assets/twitter.png';
import GitHubButton from 'react-github-btn';

import {
  Configure,
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
  SearchBox,
  RefinementList,
} from 'react-instantsearch';

import { Panel } from './Panel';

import type { Hit } from 'instantsearch.js';

import './App.css';

const searchClient = algoliasearch(
  'UD1VE6KV0J',
  '1b3aa8792d6de4c1dde62071448d8a6d'
);

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

const transformItems = (items) => {
  return items.map((item) => ({
    ...item,
    label: item.label.replace(/_/g, ' '),
  }));
};

const future = { preserveSharedStateOnUnmount: true };

export function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>

      <header className="header">
        <h1 className="header-title">
          <img src={headerImage} className="logo" />
        </h1>
        <p className="header-subtitle">
          Find Mentors
        </p>
        <div className="gh-btn">
          <GitHubButton href="https://github.com/d1b1/techstar-search" data-color-scheme="no-preference: light; light: light; dark: dark;" data-size="large" data-show-count="true" aria-label="Star d1b1/techstar-search on GitHub">Star</GitHubButton>
        </div>
      </header>

      <div className="container-fluid">

        <InstantSearch
          searchClient={searchClient}
          indexName="Techstars-Mentors"
          future={future}
        >
        
        <Configure hitsPerPage={10} />

          <div className="row">
            <div className="col-3 d-none d-md-block d-lg-block">

              <div className="filter-el">
                <h4>
                  Programs:
                </h4>
                <RefinementList searchable="true" searchablePlaceholder="Enter a vertical..." attribute="program_names" limit="5" />
              </div>

              <div className="filter-el">
                <h4>
                  Last Program:
                </h4>
                <RefinementList attribute="year_max" />
              </div>

            </div>
            <div className="col-md-9">

              <SearchBox placeholder="Enter a techstars company..." className="searchbox" />

              <Hits hitComponent={Hit}/>

              <div className="pagination">
                <Pagination padding={2}/>
              </div>
              
            </div>
        </div>

        </InstantSearch>
      </div>
    </div>
  );
}

type HitProps = {
  hit: Hit;
};

function ImageWithFallback({ src, alt, classname, ...props }) {
  const handleError = (e) => {
    e.target.src = fallbackImage;
  };

  return <img src={src} className={classname} alt={alt} onError={handleError} {...props} />;
}

function AvatarWithFallback({ src, alt, classname, ...props }) {
  const handleError = (e) => {
    e.target.src = fallbackAvatarImage;
  };

  return <img src={src || ''} width="80" className={classname} onError={handleError} {...props} />;
}

const YearsBetween = ({ year }) => {
  const currentYear = new Date().getFullYear();
  const yearsBetween = currentYear - year;

  return <span>{yearsBetween} years</span>;
};

function Hit({ hit }: HitProps) {
  return (
    <article>
      <div className="row">
        <div className="col-10">

          <ImageWithFallback src={hit.image_url || ''} width="80" className="compLogo" alt={hit.first_name} />

          <h5>
            <Highlight attribute="first_name" hit={hit} />&nbsp;<Highlight attribute="last_name" hit={hit} />
            <small className="small">
               @<Highlight attribute="company_name" hit={hit} />
            </small>
          </h5>

          <p>
            <b>Programs:</b> {hit['program_names'].join(', ')} 
          </p>

          <p>
            <b>Last Program:</b> {hit.year_max}
          </p>
          
        </div>
        <div className="col-2 text-end">

            {hit['linkedin_url'] ?
              <a href={`https://${hit['linkedin_url']}`} target="_blank">
                <img src={linkedInLogo} className="crunch" width="35" />
              </a>
              : null}

            {hit['twitter_url'] ?
              <a href={`https://${hit['twitter_url']}`} target="_blank">
                <img src={twitterLogo} className="crunch" width="35" />
              </a>
              : null}
              
        </div>
      </div>
    </article>
  );
}
