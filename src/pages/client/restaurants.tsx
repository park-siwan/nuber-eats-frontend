import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import {
  RestaurantsPageQuery,
  RestaurantsPageQueryVariables,
} from '../../__generated__/graphql';
import { Restaurant } from '../../components/restaurant';

const RESTAURANTS_QUERY = gql`
  query restaurantsPage($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImg
        slug
        restaurantCount
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImg
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

export const Restaurants = () => {
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<
    RestaurantsPageQuery,
    RestaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  return (
    <div>
      <form className="flex w-full items-center justify-center bg-gray-800 py-40">
        <input
          type="Search"
          className="input w-3/12 rounded-md border-0"
          placeholder="Search restaurants..."
        />
      </form>
      {!loading && (
        <div className="mx-auto mt-8 max-w-screen-2xl pb-20">
          <div className="mx-auto flex max-w-sm justify-around ">
            {data?.allCategories.categories?.map((category) => (
              <div className="group flex cursor-pointer flex-col items-center">
                <div
                  className="h-16 w-16 rounded-full bg-cover group-hover:bg-gray-100"
                  style={{ backgroundImage: `url(${category.coverImg})` }}
                ></div>
                <span className="mt-1 text-center text-sm font-medium">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-16 grid grid-cols-3 gap-x-5 gap-y-10">
            {data?.restaurants.results?.map((restaurant) => (
              <Restaurant
                id={restaurant.id + ''}
                coverImg={restaurant.coverImg}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
          <div className="mx-auto mt-10 grid max-w-md grid-cols-3 items-center text-center">
            {page > 1 ? (
              <button
                onClick={onPrevPageClick}
                className="text-2xl font-medium focus:outline-none"
              >
                &larr;
              </button>
            ) : (
              <div></div>
            )}
            <span>
              Page {page} of {data?.restaurants.totalPages}
            </span>
            {page !== data?.restaurants.totalPages ? (
              <button
                onClick={onNextPageClick}
                className="text-2xl font-medium focus:outline-none"
              >
                &rarr;
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
