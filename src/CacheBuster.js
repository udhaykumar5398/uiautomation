import React, { useState, useEffect } from 'react';
import packageJson from '../package.json';
global.appVersion = packageJson.version;

// version from response - first param, local version second param
const semverGreaterThan = (versionA, versionB) => {
  const versionsA = versionA.split(/\./g);
  const versionsB = versionB.split(/\./g);

  while (versionsA.length || versionsB.length) {
    const a = Number(versionsA.shift());
    const b = Number(versionsB.shift());

    if (a === b) continue;
    return a > b || isNaN(b);
  }

  return false;
};

const CacheBuster = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isLatestVersion, setIsLatestVersion] = useState(false);

  const refreshCacheAndReload = () => {
    console.log('Clearing cache and hard reloading...');
    if (caches) {
      caches.keys().then(names => {
        names.forEach(name => caches.delete(name));
      });
    }

    // delete browser cache and hard reload
    window.location.reload(true);
  };

  useEffect(() => {
    fetch(`/meta.json?${new Date().getTime()}`, { cache: 'no-cache' })
      .then(response => response.json())
      .then(meta => {
        const latestVersion = meta.version;
        const currentVersion = global.appVersion;

        const shouldForceRefresh = semverGreaterThan(latestVersion, currentVersion);
        if (shouldForceRefresh) {
          console.log(`We have a new version - ${latestVersion}. Should force refresh`);
          setLoading(false);
          setIsLatestVersion(false);
        } else {
          console.log(`You already have the latest version - ${latestVersion}. No cache refresh needed.`);
          setLoading(false);
          setIsLatestVersion(true);
        }
      });
  }, []);

  return children({ loading, isLatestVersion, refreshCacheAndReload });
};

export default CacheBuster;
