import React, { useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { capitalizeFirstWord } from '../utils';

export const BreadCrumb = () => {
  const [pathSegments, setPathSegments] = useState<string[]>([]);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith('/')) {
      const path = pathname.substring(1);
      setPathSegments(path.split('/'));
    } else {
      setPathSegments(pathname.split('/'));
    }
  }, [pathname]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => (
          <React.Fragment key={segment}>
            {pathSegments.length - 1 !== index ? (
              <>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link to={`/${segment}`}>
                      {capitalizeFirstWord(segment)}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </>
            ) : (
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbPage>{capitalizeFirstWord(segment)}</BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
