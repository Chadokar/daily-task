import { axiosGet } from "./queryCalls";

export const onEnterSearchCall = async ({
  value,
  flag = 0,
  length = 0,
  page = 1,
  prevData,
  moviesOnEnter,
}) => {
  console.log("value: ", value);
  if (value.length === 0) throw new Error("No value entered");
  const data1 = await axiosGet("/search/searchOnEnter", {
    query: value,
    page: page,
    flag: flag,
  });
  console.log("data1: ", data1);
  const enterMovies = data1.data;
  if (enterMovies.count === 0 && flag === 1) throw new Error("No movies found");
  let currData = enterMovies;
  if (prevData) {
    currData = {
      count: prevData.count + enterMovies.count,
      movies: [...prevData.movies, ...enterMovies.movies],
    };
  }
  if (length > 20 || enterMovies?.count + length > 20) {
    return { ...currData, other: { length, page, flag, value } };
  } else {
    moviesOnEnter({
      value,
      length: enterMovies?.count + length,
      flag: 1,
      page: page + 1,
      prevData: enterMovies,
      moviesOnEnter,
    });
  }
};
