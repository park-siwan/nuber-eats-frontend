import { gql, useQuery } from '@apollo/client';
import React from 'react';
import {
  RestaurantsPageQuery,
  RestaurantsPageQueryVariables,
} from '../../__generated__/graphql';

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
  const { data, loading } = useQuery<
    RestaurantsPageQuery,
    RestaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });

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
        <div className="mx-auto mt-8 max-w-screen-2xl">
          <div className="mx-auto flex max-w-sm justify-around ">
            {data?.allCategories.categories?.map((category) => (
              <div className="flex cursor-pointer flex-col items-center">
                <div
                  className="h-14 w-14 rounded-full bg-cover hover:bg-gray-100"
                  style={{ backgroundImage: `url(${category.coverImg})` }}
                ></div>
                <span className="mt-1 text-center text-sm font-medium">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
