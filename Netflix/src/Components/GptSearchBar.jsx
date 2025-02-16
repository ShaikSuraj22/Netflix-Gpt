import React, { useRef } from "react";
import {
  API_OPTIONS,
  BG,
  OPENAI_KEY,
  SUPPORTED_LANGUAGES,
} from "../Utils/constants"; // Import API Key
import language from "../Utils/langConstants";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../Utils/configSlice";
import { addGptMovieResult } from "../Utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const langkey = useSelector((store) => store.config.lang);
  // WE ARE USING IT FOR TO STORE THE INPUT TEXT INTO THE SEARCHTEXT VARIBALE, WITHOUT USING ANY E.TARGET.VALUE
  const searchText = useRef(null);

  // SEARCH MOVIE IN TMDBAPI
  const searchMovieTmdb = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchText = async () => {
    const query = searchText.current.value.trim();
    if (!query) return;

    console.log("User Query:", query);

    const gptQuery = `Act as a Movie Recommendation System and suggest some movies for the Query: ${query}. Only give the top 5 movies, comma-separated. Example result: GunturKaaram, RRR, Animal, Seetharamam, Lucky Bhaskar`;

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${OPENAI_KEY}`, // Use the stored API key
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "qwen/qwen2.5-vl-72b-instruct:free",
            messages: [
              { role: "user", content: [{ type: "text", text: gptQuery }] },
            ],
          }),
        }
      );

      if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

      const data = await response.json();
      console.log("GPT Results:", data);
      const searchResults = data?.choices?.[0]?.message?.content?.split(",");
      //  ['The Hangover', ' Bridesmaids', ' Superbad', ' Step Brothers', ' Anchorman']
      // IT HAVE THIS DATA IN ABOVE FORMAT
      console.log(searchResults);
      // TRAVELLING IN THE ARRAY AND GETTING 5 MOVIES DATA THROUGH THE API
      const promiseArray = searchResults.map((movie) => searchMovieTmdb(movie));
      // here it will return the array of promises not the results
      // [promise,promise,promise,promise,promise,] promise will take some time to get result, so it will return the promise not the result intially
      const tmdbResults = await Promise.all(promiseArray);
      // here we are converting the all promises into the result by promise.all() function
      console.log(tmdbResults);

      // pushing data into the redux store
      dispatch(
        addGptMovieResult({
          movieNames: searchResults,
          movieResults: tmdbResults,
        })
      );

      // Extract and display movie recommendations
      if (data.choices && data.choices.length > 0) {
        alert(`Recommended Movies: ${data.choices[0].message.content}`);
      }
    } catch (error) {
      console.error("Error fetching GPT results:", error);
    }
  };

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${BG})` }}
    >
      {/* Language Selector */}
      <div className="absolute top-5 right-50 z-10">
        <select
          onChange={handleLanguageChange}
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white px-3 py-2 rounded-md shadow-md focus:outline-none"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.identifier} value={lang.identifier}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Search Form */}
      <form
        className="absolute top-1/3 w-full max-w-md"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex items-center bg-white shadow-lg rounded-full overflow-hidden p-2">
          <input
            ref={searchText}
            type="text"
            placeholder={language[langkey].gptPlaceholder}
            className="flex-1 px-4 py-2 text-gray-700 outline-none"
          />
          <button
            onClick={handleGptSearchText}
            type="submit"
            className=" cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-all"
          >
            {language[langkey].search}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GptSearchBar;
